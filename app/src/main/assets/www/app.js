// ============================================================
// YOUR DICTIONARY - App Logic v2.0
// Features: Offline DB, TTS Pronunciation, Tablet Support,
//           Multi-language, U Dictionary inspired UX
// ============================================================

const API_BASE = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let recentSearches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
let currentLang = localStorage.getItem('currentLang') || 'en';
let isOnline = navigator.onLine;
let downloadedPacks = JSON.parse(localStorage.getItem('downloadedPacks') || '["en"]');

// ─── ONLINE STATUS ───────────────────────────────────────────
window.addEventListener('online',  () => { isOnline = true;  showToast('🌐 Back online', 'success'); });
window.addEventListener('offline', () => { isOnline = false; showToast('📴 Offline mode', 'info'); });

// ─── SPEECH / PRONUNCIATION ──────────────────────────────────
function speakWord(word, lang) {
  lang = lang || 'en';

  // 1. Android TTS bridge (most reliable in WebView)
  if (window.AndroidBridge && window.AndroidBridge.speakText) {
    const langMap = { en: 'en-US', ar: 'ar', fr: 'fr-FR', es: 'es-ES', de: 'de-DE', zh: 'zh-CN', ja: 'ja-JP', pt: 'pt-BR', ru: 'ru-RU', it: 'it-IT', ko: 'ko-KR' };
    window.AndroidBridge.speakText(word, langMap[lang] || 'en-US');
    return;
  }

  // 2. Web Speech API
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(word);
    const langMap = { en: 'en-US', ar: 'ar-SA', fr: 'fr-FR', es: 'es-ES', de: 'de-DE', zh: 'zh-CN', ja: 'ja-JP', pt: 'pt-BR', ru: 'ru-RU', it: 'it-IT', ko: 'ko-KR' };
    utter.lang = langMap[lang] || 'en-US';
    utter.rate = 0.85;
    utter.pitch = 1.0;
    utter.volume = 1.0;

    const speak = () => {
      const voices = window.speechSynthesis.getVoices();
      const match = voices.find(v => v.lang.startsWith(utter.lang.split('-')[0]));
      if (match) utter.voice = match;
      window.speechSynthesis.speak(utter);
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      speak();
    } else {
      window.speechSynthesis.onvoiceschanged = speak;
      setTimeout(speak, 300);
    }
    return;
  }

  // 3. Audio URL fallback
  if (window._lastAudioUrl) {
    new Audio(window._lastAudioUrl).play().catch(() => showToast('Audio unavailable', 'error'));
  }
}

function playAudio(url) {
  window._lastAudioUrl = url;
  const audio = new Audio(url);
  audio.play().catch(() => {
    const word = document.querySelector('.result-word')?.textContent;
    if (word) speakWord(word, 'en');
  });
}

// ─── SEARCH ─────────────────────────────────────────────────
async function searchWord(word) {
  if (!word.trim()) return;
  word = word.trim();
  const wordLower = word.toLowerCase();

  const resultsSection = document.getElementById('resultsSection');
  const resultsContent = document.getElementById('resultsContent');
  const wodSection = document.getElementById('wodSection');
  const categoriesSection = document.querySelector('.categories-section');

  if (!resultsSection) return;

  resultsSection.style.display = 'block';
  resultsContent.innerHTML = '<div class="loading-spinner"><div class="spinner"></div><p>Searching...</p></div>';
  if (wodSection) wodSection.style.display = 'none';
  if (categoriesSection) categoriesSection.style.display = 'none';

  // 1. Offline DB first
  if (typeof searchOffline === 'function') {
    const offlineResult = searchOffline(wordLower);
    if (offlineResult.found) {
      renderOfflineResults(offlineResult);
      saveRecent(wordLower);
      return;
    }

    // 2. Online API
    if (isOnline) {
      try {
        const res = await fetch(API_BASE + encodeURIComponent(wordLower));
        if (!res.ok) throw new Error('Not found');
        const data = await res.json();
        renderResults(data, wordLower);
        saveRecent(wordLower);
        return;
      } catch {}
    }

    // 3. Not found
    const suggestions = offlineResult.suggestions || [];
    resultsContent.innerHTML = `
      <div class="error-card">
        <div class="error-icon">🔍</div>
        <h3>Word not found</h3>
        <p>We couldn't find "<strong>${word}</strong>"${!isOnline ? ' (offline mode)' : ''}.</p>
        ${suggestions.length ? `
          <div class="suggestion-section">
            <p class="suggestion-title">Did you mean?</p>
            <div class="suggestion-chips">
              ${suggestions.map(s => `<button class="chip" onclick="searchWord('${s}')">${s}</button>`).join('')}
            </div>
          </div>` : ''}
        <button class="btn-secondary" onclick="clearResults()">← Go Back</button>
      </div>`;
  }
}

// ─── RENDER OFFLINE ──────────────────────────────────────────
function renderOfflineResults(result) {
  const { word, data, type, langName } = result;
  const isFav = favorites.includes(word);

  let html = `
    <div class="result-header">
      <div class="result-word-info">
        <h2 class="result-word">${word}</h2>
        ${data.phonetic ? `<span class="phonetic">${data.phonetic}</span>` : ''}
        <button class="audio-btn" onclick="speakWord('${word.replace(/'/g,"\\'")}', '${type}')" title="Pronounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
        <span class="offline-badge">📴 Offline</span>
        ${type !== 'en' ? `<span class="lang-badge">${langName || type.toUpperCase()}</span>` : ''}
      </div>
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${word}', this)">
        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        ${isFav ? 'Saved' : 'Save'}
      </button>
    </div>
    <div class="meaning-block">
      <div class="pos-badge">${data.pos}</div>
      <ol class="definitions-list">
        ${data.defs.map(def => `<li><p class="def-text">${def}</p></li>`).join('')}
      </ol>
      ${data.example ? `<p class="def-example">"${data.example}"</p>` : ''}
      ${data.synonyms?.length ? `
        <div class="word-tags">
          <span class="tag-label">Synonyms:</span>
          ${data.synonyms.map(s => `<span class="word-tag" onclick="searchWord('${s}')">${s}</span>`).join('')}
        </div>` : ''}
      ${data.antonyms?.length ? `
        <div class="word-tags">
          <span class="tag-label">Antonyms:</span>
          ${data.antonyms.map(a => `<span class="word-tag antonym" onclick="searchWord('${a}')">${a}</span>`).join('')}
        </div>` : ''}
    </div>
    <button class="btn-secondary back-btn" onclick="clearResults()">← Back to Home</button>`;

  document.getElementById('resultsContent').innerHTML = html;
  window.scrollTo(0, 0);
}

// ─── RENDER ONLINE ────────────────────────────────────────────
function renderResults(data, word) {
  const resultsContent = document.getElementById('resultsContent');
  const entry = data[0];
  const isFav = favorites.includes(word);
  const audioObj = entry.phonetics?.find(p => p.audio);
  if (audioObj) window._lastAudioUrl = audioObj.audio;

  let html = `
    <div class="result-header">
      <div class="result-word-info">
        <h2 class="result-word">${entry.word}</h2>
        ${entry.phonetic ? `<span class="phonetic">${entry.phonetic}</span>` : ''}
        <button class="audio-btn" onclick="speakWord('${entry.word.replace(/'/g,"\\'")}', 'en')" title="Pronounce">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
          </svg>
        </button>
        <span class="online-badge">🌐 Online</span>
      </div>
      <button class="fav-btn ${isFav ? 'active' : ''}" onclick="toggleFav('${word}', this)">
        <svg viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        ${isFav ? 'Saved' : 'Save'}
      </button>
    </div>`;

  entry.meanings.forEach(meaning => {
    html += `
      <div class="meaning-block">
        <div class="pos-badge">${meaning.partOfSpeech}</div>
        <ol class="definitions-list">`;
    meaning.definitions.slice(0, 4).forEach(def => {
      html += `<li>
        <p class="def-text">${def.definition}</p>
        ${def.example ? `<p class="def-example">"${def.example}"</p>` : ''}
      </li>`;
    });
    html += `</ol>`;
    if (meaning.synonyms?.length) {
      html += `<div class="word-tags"><span class="tag-label">Synonyms:</span>
        ${meaning.synonyms.slice(0, 6).map(s => `<span class="word-tag" onclick="searchWord('${s}')">${s}</span>`).join('')}
      </div>`;
    }
    if (meaning.antonyms?.length) {
      html += `<div class="word-tags"><span class="tag-label">Antonyms:</span>
        ${meaning.antonyms.slice(0, 6).map(a => `<span class="word-tag antonym" onclick="searchWord('${a}')">${a}</span>`).join('')}
      </div>`;
    }
    html += `</div>`;
  });

  html += `<button class="btn-secondary back-btn" onclick="clearResults()">← Back to Home</button>`;
  document.getElementById('resultsContent').innerHTML = html;
  window.scrollTo(0, 0);
}

function clearResults() {
  const r = document.getElementById('resultsSection');
  const w = document.getElementById('wodSection');
  const c = document.querySelector('.categories-section');
  if (r) r.style.display = 'none';
  if (w) w.style.display = 'block';
  if (c) c.style.display = 'block';
}

// ─── FAVORITES ───────────────────────────────────────────────
function toggleFav(word, btn) {
  const idx = favorites.indexOf(word);
  if (idx === -1) {
    favorites.push(word);
    btn.classList.add('active');
    btn.querySelector('svg').setAttribute('fill', 'currentColor');
    btn.lastChild.textContent = ' Saved';
    showToast('Added to favorites', 'success');
  } else {
    favorites.splice(idx, 1);
    btn.classList.remove('active');
    btn.querySelector('svg').setAttribute('fill', 'none');
    btn.lastChild.textContent = ' Save';
    showToast('Removed from favorites', 'info');
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

// ─── RECENT ──────────────────────────────────────────────────
function saveRecent(word) {
  recentSearches = recentSearches.filter(w => w !== word);
  recentSearches.unshift(word);
  recentSearches = recentSearches.slice(0, 10);
  localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  renderRecent();
}

function renderRecent() {
  const section = document.getElementById('recentSection');
  const list = document.getElementById('recentList');
  if (!section || !list) return;
  if (recentSearches.length === 0) { section.style.display = 'none'; return; }
  section.style.display = 'block';
  list.innerHTML = recentSearches.map(w =>
    `<button class="recent-tag" onclick="searchWord('${w}')">${w}</button>`
  ).join('');
}

// ─── WORD OF THE DAY ─────────────────────────────────────────
async function loadWordOfDay() {
  const card = document.getElementById('wodCard');
  if (!card) return;

  const word = typeof getWordOfDay === 'function' ? getWordOfDay() : 'serendipity';

  if (typeof searchOffline === 'function') {
    const offlineResult = searchOffline(word);
    if (offlineResult.found) {
      const { data } = offlineResult;
      card.innerHTML = `
        <div class="wod-inner">
          <div class="wod-word">${word}</div>
          ${data.phonetic ? `<div class="wod-phonetic">${data.phonetic}</div>` : ''}
          <div class="wod-pos">${data.pos}</div>
          <p class="wod-def">${data.defs[0]}</p>
          ${data.example ? `<p class="wod-example">"${data.example}"</p>` : ''}
          <div class="wod-actions">
            <button class="btn-primary" onclick="searchWord('${word}')">Explore Word →</button>
            <button class="audio-btn-wod" onclick="speakWord('${word}', 'en')">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            </button>
          </div>
        </div>`;
      return;
    }
  }

  if (!navigator.onLine) { card.innerHTML = `<p style="padding:20px;color:#64748b">Connect to internet for Word of the Day</p>`; return; }

  try {
    const res = await fetch(API_BASE + word);
    const data = await res.json();
    const entry = data[0];
    const def = entry.meanings[0].definitions[0];
    card.innerHTML = `
      <div class="wod-inner">
        <div class="wod-word">${entry.word}</div>
        ${entry.phonetic ? `<div class="wod-phonetic">${entry.phonetic}</div>` : ''}
        <div class="wod-pos">${entry.meanings[0].partOfSpeech}</div>
        <p class="wod-def">${def.definition}</p>
        ${def.example ? `<p class="wod-example">"${def.example}"</p>` : ''}
        <div class="wod-actions">
          <button class="btn-primary" onclick="searchWord('${entry.word}')">Explore Word →</button>
          <button class="audio-btn-wod" onclick="speakWord('${entry.word}', 'en')">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="22" height="22">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          </button>
        </div>
      </div>`;
  } catch {
    card.innerHTML = `<p style="padding:20px;color:#64748b">Could not load word of the day.</p>`;
  }
}

// ─── LANGUAGE PACKS ──────────────────────────────────────────
function renderLanguagePacks() {
  const container = document.getElementById('languagePacksGrid');
  if (!container || typeof LANGUAGE_PACKS === 'undefined') return;

  container.innerHTML = Object.entries(LANGUAGE_PACKS).map(([code, pack]) => {
    const isDownloaded = downloadedPacks.includes(code);
    return `
      <div class="pack-card ${isDownloaded ? 'downloaded' : ''}">
        <div class="pack-flag">${pack.flag}</div>
        <div class="pack-info">
          <div class="pack-name">${pack.name}</div>
          <div class="pack-native">${pack.nativeName}</div>
          <div class="pack-size">${pack.size}</div>
        </div>
        <button class="pack-btn ${isDownloaded ? 'downloaded' : ''}" onclick="togglePack('${code}', this)">
          ${isDownloaded ? '✓ Ready' : '⬇ Download'}
        </button>
      </div>`;
  }).join('');
}

function togglePack(code, btn) {
  if (downloadedPacks.includes(code)) return;
  btn.textContent = '⏳ Installing...';
  btn.disabled = true;
  setTimeout(() => {
    downloadedPacks.push(code);
    localStorage.setItem('downloadedPacks', JSON.stringify(downloadedPacks));
    btn.textContent = '✓ Ready';
    btn.classList.add('downloaded');
    btn.closest('.pack-card').classList.add('downloaded');
    showToast(`${LANGUAGE_PACKS[code].name} language pack installed!`, 'success');
  }, 1500);
}

// ─── SEARCH SUGGESTIONS ──────────────────────────────────────
function setupSearch() {
  const input = document.getElementById('heroInput');
  const btn = document.getElementById('heroBtn');
  const suggestions = document.getElementById('suggestions');

  if (!input) return;

  btn?.addEventListener('click', () => { searchWord(input.value); if(window.onSearch) onSearch(); });
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { searchWord(input.value); if(window.onSearch) onSearch(); }
  });

  input.addEventListener('input', () => {
    const val = input.value.trim();
    if (!suggestions) return;
    if (val.length < 2) { suggestions.innerHTML = ''; suggestions.style.display = 'none'; return; }

    const offlineSugg = typeof getOfflineSuggestions === 'function' ? getOfflineSuggestions(val) : [];
    const recentMatches = recentSearches.filter(w => w.startsWith(val.toLowerCase())).slice(0, 3);
    const allSugg = [...new Set([...recentMatches, ...offlineSugg])].slice(0, 6);

    if (allSugg.length) {
      suggestions.style.display = 'block';
      suggestions.innerHTML = allSugg.map(w =>
        `<div class="suggestion-item" onclick="searchWord('${w}')">
          ${recentMatches.includes(w) ? '🕐 ' : '📖 '}<span>${w}</span>
        </div>`
      ).join('');
    } else {
      suggestions.innerHTML = '';
      suggestions.style.display = 'none';
    }
  });

  document.addEventListener('click', e => {
    if (suggestions && !input.contains(e.target)) suggestions.style.display = 'none';
  });
}

// ─── MOBILE NAV ──────────────────────────────────────────────
function setupMobileNav() {
  const btn = document.getElementById('menuBtn');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', () => nav.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) nav.classList.remove('open');
  });
}

// ─── CATEGORIES ──────────────────────────────────────────────
function setupCategories() {
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('click', () => {
      const word = card.dataset.word;
      if (word) searchWord(word);
    });
  });
}

// ─── TOAST ───────────────────────────────────────────────────
function showToast(message, type) {
  const existing = document.getElementById('toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.className = `toast toast-${type || 'info'}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('visible'), 10);
  setTimeout(() => { toast.classList.remove('visible'); setTimeout(() => toast.remove(), 300); }, 2500);
}

// ─── INIT ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupSearch();
  setupMobileNav();
  setupCategories();
  renderRecent();
  loadWordOfDay();
  renderLanguagePacks();
  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();
  if (!navigator.onLine) showToast('Offline mode - using local dictionary', 'info');
});
