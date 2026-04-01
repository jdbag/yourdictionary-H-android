// ═══════════════════════════════════════════════════════════════
// YOUR DICTIONARY — Offline Package Download Manager
// Similar to U Dictionary's "Offline Package" screen
// ═══════════════════════════════════════════════════════════════

// ⚠️ Replace with your actual Huawei Cloud Storage URL after uploading
const CLOUD_DB_URL = "https://ops-dre.agcstorage.link/v1/yourdictionary-offline/dict_v1.db";
const DB_VERSION   = "1.0";
const DB_KEY       = "yd_offline_db_v1";        // IndexedDB key
const META_KEY     = "yd_offline_meta";          // localStorage meta

let sqlDB          = null;
let offlineDbReady = false;
let downloadInProgress = false;

// ── Package Definitions (like U Dictionary) ─────────────────
const OFFLINE_PACKAGES = [
  {
    id:      "en_wordnet",
    name:    "WordNet English Dictionary",
    desc:    "72,305+ words • Definitions, examples",
    size:    "7.2M",
    sizeMB:  7.2,
    lang:    "en",
    icon:    "📖",
    url:     CLOUD_DB_URL,
    type:    "dictionary"
  },
  {
    id:      "en_synonyms",
    name:    "Synonyms & Antonyms",
    desc:    "128,409+ entries",
    size:    "included",
    sizeMB:  0,
    lang:    "en",
    icon:    "🔤",
    url:     null,
    type:    "bundled",
    note:    "Included in Dictionary package"
  },
  {
    id:      "en_phrases",
    name:    "Common Phrases",
    desc:    "25,516+ phrases",
    size:    "0.9M",
    sizeMB:  0.9,
    lang:    "en",
    icon:    "💬",
    url:     null,       // Add URL when available
    type:    "coming_soon"
  }
];

// ── IndexedDB Storage (for large files) ─────────────────────
const IDB_NAME    = "YourDictionaryDB";
const IDB_VERSION = 1;
const IDB_STORE   = "offline_files";

function openIDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore(IDB_STORE);
    };
    req.onsuccess  = e => resolve(e.target.result);
    req.onerror    = e => reject(e.target.error);
  });
}

async function saveToIDB(key, data) {
  const db  = await openIDB();
  const tx  = db.transaction(IDB_STORE, "readwrite");
  const st  = tx.objectStore(IDB_STORE);
  return new Promise((resolve, reject) => {
    const req = st.put(data, key);
    req.onsuccess = () => resolve();
    req.onerror   = e => reject(e.target.error);
  });
}

async function loadFromIDB(key) {
  const db = await openIDB();
  const tx = db.transaction(IDB_STORE, "readonly");
  const st = tx.objectStore(IDB_STORE);
  return new Promise((resolve, reject) => {
    const req = st.get(key);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror   = e => reject(e.target.error);
  });
}

async function deleteFromIDB(key) {
  const db = await openIDB();
  const tx = db.transaction(IDB_STORE, "readwrite");
  tx.objectStore(IDB_STORE).delete(key);
}

// ── Check if offline DB already downloaded ──────────────────
function isOfflineDbDownloaded() {
  const meta = localStorage.getItem(META_KEY);
  if (!meta) return false;
  const m = JSON.parse(meta);
  return m.version === DB_VERSION && m.downloaded === true;
}

// ── Initialize: load from IDB if available ──────────────────
async function initOfflineDB() {
  // First try loading the bundled dict.db asset
  await loadBundledDB();

  // Then try loading downloaded full DB (overrides bundled)
  if (isOfflineDbDownloaded()) {
    await loadDownloadedDB();
  }
}

async function loadBundledDB() {
  try {
    const SQL = await loadSqlJs();
    const r   = await fetch('dict.db');
    if (!r.ok) return;
    const buf = await r.arrayBuffer();
    sqlDB        = new SQL.Database(new Uint8Array(buf));
    offlineDbReady = true;
    const count  = getWordCount();
    console.log(`Bundled DB: ${count} words`);
    updateOfflineBadge(count, false);
  } catch(e) {
    console.log('No bundled DB:', e.message);
  }
}

async function loadDownloadedDB() {
  try {
    const SQL  = await loadSqlJs();
    const data = await loadFromIDB(DB_KEY);
    if (!data) return;
    sqlDB        = new SQL.Database(new Uint8Array(data));
    offlineDbReady = true;
    const count  = getWordCount();
    console.log(`Full offline DB loaded: ${count} words`);
    updateOfflineBadge(count, true);
  } catch(e) {
    console.error('Error loading downloaded DB:', e);
    localStorage.removeItem(META_KEY);
  }
}

// ── sql.js loader (cached) ───────────────────────────────────
let _sqlJsPromise = null;
function loadSqlJs() {
  if (_sqlJsPromise) return _sqlJsPromise;
  _sqlJsPromise = new Promise((resolve, reject) => {
    if (typeof initSqlJs !== 'undefined') {
      initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` })
        .then(resolve).catch(reject);
    } else {
      const script = document.createElement('script');
      script.src   = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/sql-wasm.js';
      script.onload = () => {
        initSqlJs({ locateFile: f => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.2/${f}` })
          .then(resolve).catch(reject);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
  return _sqlJsPromise;
}

// ── Download with progress ───────────────────────────────────
async function downloadOfflinePackage(pkg, onProgress) {
  if (downloadInProgress) {
    alert("Download already in progress!");
    return false;
  }
  if (!pkg.url) {
    alert("This package is not available yet.");
    return false;
  }

  downloadInProgress = true;

  try {
    onProgress({ phase: 'downloading', percent: 0, text: 'Connecting...' });

    const response = await fetch(pkg.url);
    if (!response.ok) throw new Error(`Server error: ${response.status}`);

    const contentLength = parseInt(response.headers.get('Content-Length') || '0');
    const reader        = response.body.getReader();
    const chunks        = [];
    let   received      = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      received += value.length;
      const pct = contentLength > 0 ? Math.round((received / contentLength) * 80) : -1;
      onProgress({
        phase:   'downloading',
        percent: pct,
        text:    `Downloading... ${(received / 1024 / 1024).toFixed(1)} MB`
      });
    }

    onProgress({ phase: 'processing', percent: 85, text: 'Processing database...' });

    // Combine chunks
    const total  = chunks.reduce((n, c) => n + c.length, 0);
    const buffer = new Uint8Array(total);
    let   offset = 0;
    for (const c of chunks) { buffer.set(c, offset); offset += c.length; }

    onProgress({ phase: 'saving', percent: 90, text: 'Saving to device...' });

    // Save to IndexedDB
    await saveToIDB(DB_KEY, buffer);

    onProgress({ phase: 'loading', percent: 95, text: 'Loading dictionary...' });

    // Load into sql.js
    const SQL = await loadSqlJs();
    sqlDB        = new SQL.Database(buffer);
    offlineDbReady = true;

    // Save meta
    localStorage.setItem(META_KEY, JSON.stringify({
      version:     DB_VERSION,
      downloaded:  true,
      packageId:   pkg.id,
      downloadedAt: new Date().toISOString(),
      wordCount:   getWordCount()
    }));

    const count = getWordCount();
    updateOfflineBadge(count, true);

    onProgress({ phase: 'done', percent: 100, text: `${count.toLocaleString()} words ready!` });

    downloadInProgress = false;
    return true;

  } catch(e) {
    downloadInProgress = false;
    console.error('Download error:', e);
    onProgress({ phase: 'error', percent: 0, text: `Error: ${e.message}` });
    return false;
  }
}

// ── Delete downloaded DB ─────────────────────────────────────
async function deleteOfflinePackage() {
  await deleteFromIDB(DB_KEY);
  localStorage.removeItem(META_KEY);
  // Fall back to bundled DB
  await loadBundledDB();
  if (!offlineDbReady) updateOfflineBadge(0, false);
}

// ── Dictionary Lookup ────────────────────────────────────────
function offlineLookup(word) {
  if (!offlineDbReady || !sqlDB) return null;
  word = word.toLowerCase().trim();
  try {
    const wr = sqlDB.exec(
      "SELECT id, word, phonetic, pos FROM words WHERE word = ? COLLATE NOCASE LIMIT 1",
      [word]
    );
    if (!wr.length || !wr[0].values.length) return null;
    const [id, w, phonetic, pos] = wr[0].values[0];

    const dr = sqlDB.exec("SELECT definition, example FROM definitions WHERE word_id = ? LIMIT 5", [id]);
    const defs = dr.length ? dr[0].values.map(([d, e]) => ({ d, e: e || '' })) : [];

    const sr = sqlDB.exec("SELECT synonym FROM synonyms WHERE word_id = ? LIMIT 20", [id]);
    const syns = sr.length ? sr[0].values.map(r => r[0]) : [];

    const ar = sqlDB.exec("SELECT antonym FROM antonyms WHERE word_id = ? LIMIT 10", [id]);
    const ants = ar.length ? ar[0].values.map(r => r[0]) : [];

    return { word: w, phonetic: phonetic || '', pos, defs, syns, ants };
  } catch(e) {
    return null;
  }
}

// ── Autocomplete ─────────────────────────────────────────────
function offlineSuggest(prefix, limit) {
  if (!offlineDbReady || !sqlDB) return [];
  limit = limit || 8;
  try {
    const rows = sqlDB.exec(
      "SELECT word FROM words WHERE word LIKE ? COLLATE NOCASE LIMIT ?",
      [prefix.toLowerCase() + '%', limit]
    );
    return rows.length ? rows[0].values.map(r => r[0]) : [];
  } catch(e) { return []; }
}

function offlineWordList() {
  if (!offlineDbReady || !sqlDB) return [];
  try {
    const rows = sqlDB.exec("SELECT word FROM words ORDER BY word LIMIT 500");
    return rows.length ? rows[0].values.map(r => r[0]) : [];
  } catch(e) { return []; }
}

function getWordCount() {
  if (!sqlDB) return 0;
  try {
    return sqlDB.exec("SELECT COUNT(*) FROM words")[0].values[0][0];
  } catch(e) { return 0; }
}

// ── UI Badge ─────────────────────────────────────────────────
function updateOfflineBadge(count, isFull) {
  const badge = document.getElementById('offlineBadge');
  if (!badge) return;
  if (count === 0) { badge.style.display = 'none'; return; }
  badge.style.display = 'inline-flex';
  if (isFull) {
    badge.textContent = `⚡ ${count.toLocaleString()} words offline`;
    badge.style.background = '#22c55e22';
    badge.style.color = '#22c55e';
    badge.style.border = '1px solid #22c55e44';
  } else {
    badge.textContent = `📦 ${count} bundled words`;
    badge.style.background = '#f59e0b22';
    badge.style.color = '#f59e0b';
    badge.style.border = '1px solid #f59e0b44';
  }
}

// ── Offline Packages Screen ──────────────────────────────────
function showOfflineLibrary() {
  const meta    = isOfflineDbDownloaded()
    ? JSON.parse(localStorage.getItem(META_KEY)) : null;
  const count   = getWordCount();
  const modal   = document.getElementById('langModal');
  const title   = document.querySelector('.modal-head span');
  const items   = document.getElementById('langItems');

  if (title) title.textContent = 'Offline Packages';

  const storageInfo = meta
    ? `<div class="pkg-storage-info">
         <span>💾 ${(meta.wordCount || count).toLocaleString()} words stored</span>
         <button class="pkg-delete-btn" onclick="confirmDeleteOffline()">🗑 Delete</button>
       </div>` : '';

  items.innerHTML = `
    <div class="pkg-header">
      <div class="pkg-lang-row">
        <div class="pkg-lang-pill active">🇬🇧 English</div>
      </div>
      ${storageInfo}
    </div>
    <div class="pkg-list">
      ${OFFLINE_PACKAGES.map(pkg => renderPackageRow(pkg, meta)).join('')}
    </div>
    <div class="pkg-note">
      📡 Packages are downloaded once and stored on your device.<br>
      Works completely offline after download.
    </div>
  `;

  modal.style.display = 'flex';
}

function renderPackageRow(pkg, meta) {
  const isDownloaded = meta && meta.packageId === pkg.id;
  const isBundled    = pkg.type === 'bundled';
  const isComingSoon = pkg.type === 'coming_soon';

  let actionBtn = '';
  if (isDownloaded) {
    actionBtn = `<div class="pkg-status downloaded">✓</div>`;
  } else if (isBundled) {
    actionBtn = `<div class="pkg-status bundled">✓</div>`;
  } else if (isComingSoon) {
    actionBtn = `<div class="pkg-status soon">…</div>`;
  } else {
    actionBtn = `<button class="pkg-download-btn" onclick="startPackageDownload('${pkg.id}')">⬇</button>`;
  }

  return `
    <div class="pkg-row" id="pkg-${pkg.id}">
      <div class="pkg-info">
        <div class="pkg-name">${pkg.name}</div>
        <div class="pkg-desc">${isBundled ? pkg.note || pkg.desc : pkg.desc}${!isBundled && !isComingSoon ? ` • ${pkg.size}` : ''}</div>
        <div class="pkg-progress-wrap" id="progress-${pkg.id}" style="display:none">
          <div class="pkg-progress-bar"><div class="pkg-progress-fill" id="fill-${pkg.id}"></div></div>
          <div class="pkg-progress-text" id="ptxt-${pkg.id}">0%</div>
        </div>
      </div>
      ${actionBtn}
    </div>`;
}

function startPackageDownload(pkgId) {
  const pkg = OFFLINE_PACKAGES.find(p => p.id === pkgId);
  if (!pkg) return;

  const progressWrap = document.getElementById(`progress-${pkgId}`);
  const fillEl       = document.getElementById(`fill-${pkgId}`);
  const txtEl        = document.getElementById(`ptxt-${pkgId}`);
  const btn          = document.querySelector(`#pkg-${pkgId} .pkg-download-btn`);

  if (progressWrap) progressWrap.style.display = 'block';
  if (btn) btn.style.display = 'none';

  downloadOfflinePackage(pkg, ({ phase, percent, text }) => {
    if (fillEl) fillEl.style.width = (percent > 0 ? percent : 0) + '%';
    if (txtEl)  txtEl.textContent = text;

    if (phase === 'done') {
      setTimeout(() => showOfflineLibrary(), 1000);
    } else if (phase === 'error') {
      if (btn) btn.style.display = 'block';
      if (progressWrap) progressWrap.style.display = 'none';
      alert('Download failed: ' + text);
    }
  });
}

function confirmDeleteOffline() {
  if (confirm('Delete offline dictionary? You can re-download it anytime.')) {
    deleteOfflinePackage().then(() => showOfflineLibrary());
  }
}
