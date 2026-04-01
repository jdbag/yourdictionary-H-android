#!/usr/bin/env python3
"""
╔══════════════════════════════════════════════════════════════╗
║   YOUR DICTIONARY — Offline Database Builder                 ║
║   Builds dict.db from WordNet (170,000+ entries)             ║
║                                                              ║
║   RUN ON YOUR PC:                                            ║
║   1. pip install nltk                                        ║
║   2. python3 build_dict_db.py                               ║
║   3. Copy dict.db → app/src/main/assets/www/dict.db         ║
║   4. Also upload dict.db to Huawei Cloud Storage             ║
╚══════════════════════════════════════════════════════════════╝
"""

import sqlite3
import os
import sys
import json
import time

# ── Check NLTK ─────────────────────────────────────────────
try:
    import nltk
    from nltk.corpus import wordnet as wn
except ImportError:
    print("Installing NLTK...")
    os.system("pip install nltk")
    import nltk
    from nltk.corpus import wordnet as wn

# Download WordNet data
print("Downloading WordNet data...")
nltk.download('wordnet', quiet=False)
nltk.download('omw-1.4', quiet=False)  # Open Multilingual Wordnet (translations!)

# ── Database Path ───────────────────────────────────────────
DB_PATH = "dict.db"

def pos_to_string(pos):
    mapping = {
        wn.NOUN: 'noun',
        wn.VERB: 'verb',
        wn.ADJ: 'adjective',
        wn.ADV: 'adverb',
        'n': 'noun', 'v': 'verb', 'a': 'adjective',
        's': 'adjective', 'r': 'adverb'
    }
    return mapping.get(pos, 'noun')

def build_database():
    print(f"\nBuilding offline dictionary database...")
    start = time.time()

    # Remove existing DB
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)

    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()

    # ── Schema ───────────────────────────────────────────────
    c.executescript('''
    PRAGMA journal_mode=WAL;
    PRAGMA synchronous=NORMAL;
    PRAGMA cache_size=10000;

    CREATE TABLE words (
        id       INTEGER PRIMARY KEY,
        word     TEXT UNIQUE NOT NULL COLLATE NOCASE,
        phonetic TEXT,
        pos      TEXT
    );

    CREATE TABLE definitions (
        id         INTEGER PRIMARY KEY,
        word_id    INTEGER NOT NULL,
        definition TEXT NOT NULL,
        example    TEXT,
        FOREIGN KEY(word_id) REFERENCES words(id)
    );

    CREATE TABLE synonyms (
        id      INTEGER PRIMARY KEY,
        word_id INTEGER NOT NULL,
        synonym TEXT NOT NULL,
        FOREIGN KEY(word_id) REFERENCES words(id)
    );

    CREATE TABLE antonyms (
        id      INTEGER PRIMARY KEY,
        word_id INTEGER NOT NULL,
        antonym TEXT NOT NULL,
        FOREIGN KEY(word_id) REFERENCES words(id)
    );

    CREATE INDEX idx_word   ON words(word COLLATE NOCASE);
    CREATE INDEX idx_def_wid ON definitions(word_id);
    CREATE INDEX idx_syn_wid ON synonyms(word_id);
    CREATE INDEX idx_ant_wid ON antonyms(word_id);
    ''')

    # ── Process WordNet ──────────────────────────────────────
    # Group lemmas → collect all synsets for each word
    word_data = {}  # word → {pos, defs, syns, ants}

    print("Processing WordNet synsets...")
    all_synsets = list(wn.all_synsets())
    total = len(all_synsets)

    for i, synset in enumerate(all_synsets):
        if i % 5000 == 0:
            print(f"  {i}/{total} synsets processed...")

        pos = pos_to_string(synset.pos())
        definition = synset.definition()
        examples = synset.examples()
        example = examples[0] if examples else None

        # Collect synonyms within synset
        lemma_names = [l.name().replace('_', ' ') for l in synset.lemmas()]

        for lemma in synset.lemmas():
            word = lemma.name().replace('_', ' ').lower()

            # Skip multi-word unless space-separated (keep phrases under 3 words)
            if word.count(' ') > 2:
                continue

            if word not in word_data:
                word_data[word] = {
                    'pos': pos,
                    'defs': [],
                    'syns': set(),
                    'ants': set()
                }

            # Add definition (max 5 per word)
            if len(word_data[word]['defs']) < 5:
                word_data[word]['defs'].append({
                    'd': definition,
                    'e': example or ''
                })

            # Add synonyms (other lemmas in same synset)
            for other in lemma_names:
                if other.lower() != word:
                    word_data[word]['syns'].add(other.lower())

            # Add antonyms
            for ant_lemma in lemma.antonyms():
                ant = ant_lemma.name().replace('_', ' ').lower()
                word_data[word]['ants'].add(ant)

    print(f"\nTotal unique words: {len(word_data)}")
    print("Writing to database...")

    # ── Insert into DB ───────────────────────────────────────
    words_inserted = 0
    defs_inserted = 0
    syns_inserted = 0
    ants_inserted = 0

    BATCH = 1000
    word_rows = []
    def_rows = []
    syn_rows = []
    ant_rows = []
    word_id = 1

    for word, data in word_data.items():
        if not data['defs']:
            continue

        word_rows.append((word_id, word, '', data['pos']))

        for def_item in data['defs']:
            def_rows.append((word_id, def_item['d'], def_item['e'] or None))
            defs_inserted += 1

        for syn in list(data['syns'])[:20]:  # max 20 synonyms
            syn_rows.append((word_id, syn))
            syns_inserted += 1

        for ant in list(data['ants'])[:10]:  # max 10 antonyms
            ant_rows.append((word_id, ant))
            ants_inserted += 1

        word_id += 1
        words_inserted += 1

        if words_inserted % BATCH == 0:
            c.executemany('INSERT INTO words (id, word, phonetic, pos) VALUES (?,?,?,?)', word_rows)
            c.executemany('INSERT INTO definitions (word_id, definition, example) VALUES (?,?,?)', def_rows)
            c.executemany('INSERT INTO synonyms (word_id, synonym) VALUES (?,?)', syn_rows)
            c.executemany('INSERT INTO antonyms (word_id, antonym) VALUES (?,?)', ant_rows)
            word_rows, def_rows, syn_rows, ant_rows = [], [], [], []

            if words_inserted % 10000 == 0:
                conn.commit()
                print(f"  Inserted {words_inserted} words...")

    # Final batch
    if word_rows:
        c.executemany('INSERT INTO words (id, word, phonetic, pos) VALUES (?,?,?,?)', word_rows)
        c.executemany('INSERT INTO definitions (word_id, definition, example) VALUES (?,?,?)', def_rows)
        c.executemany('INSERT INTO synonyms (word_id, synonym) VALUES (?,?)', syn_rows)
        c.executemany('INSERT INTO antonyms (word_id, antonym) VALUES (?,?)', ant_rows)

    conn.commit()
    conn.close()

    elapsed = time.time() - start
    size_mb = os.path.getsize(DB_PATH) / (1024 * 1024)

    print(f"\n✅ Database built successfully!")
    print(f"   Words:       {words_inserted:,}")
    print(f"   Definitions: {defs_inserted:,}")
    print(f"   Synonyms:    {syns_inserted:,}")
    print(f"   Antonyms:    {ants_inserted:,}")
    print(f"   Size:        {size_mb:.1f} MB")
    print(f"   Time:        {elapsed:.1f}s")
    print(f"\n📂 Output: {os.path.abspath(DB_PATH)}")
    print(f"\n📋 Next steps:")
    print(f"   1. Copy dict.db → app/src/main/assets/www/dict.db")
    print(f"   2. Upload dict.db to Huawei Cloud Storage (for download feature)")
    print(f"   3. Update CLOUD_DB_URL in offline_download_manager.js")

if __name__ == "__main__":
    build_database()
