const DAPI='https://api.dictionaryapi.dev/api/v2/entries/en/';
let recent=JSON.parse(localStorage.getItem('yd_r')||'[]');
let favs=JSON.parse(localStorage.getItem('yd_f')||'[]');
let from={code:'en',name:'English',flag:'🇬🇧'};
let to={code:'ar',name:'Arabic',flag:'🇸🇦'};
let langTarget='from';
let lastWord='';

const LANGS=[
  {code:'en',name:'English',flag:'🇬🇧'},{code:'ar',name:'Arabic',flag:'🇸🇦'},
  {code:'fr',name:'French',flag:'🇫🇷'},{code:'es',name:'Spanish',flag:'🇪🇸'},
  {code:'de',name:'German',flag:'🇩🇪'},{code:'it',name:'Italian',flag:'🇮🇹'},
  {code:'pt',name:'Portuguese',flag:'🇧🇷'},{code:'ru',name:'Russian',flag:'🇷🇺'},
  {code:'zh',name:'Chinese',flag:'🇨🇳'},{code:'ja',name:'Japanese',flag:'🇯🇵'},
  {code:'ko',name:'Korean',flag:'🇰🇷'},{code:'tr',name:'Turkish',flag:'🇹🇷'},
  {code:'hi',name:'Hindi',flag:'🇮🇳'},{code:'nl',name:'Dutch',flag:'🇳🇱'},
  {code:'pl',name:'Polish',flag:'🇵🇱'},{code:'sv',name:'Swedish',flag:'🇸🇪'},
  {code:'fa',name:'Persian',flag:'🇮🇷'},{code:'id',name:'Indonesian',flag:'🇮🇩'},
  {code:'vi',name:'Vietnamese',flag:'🇻🇳'},{code:'th',name:'Thai',flag:'🇹🇭'},
];

// ── TTS BRIDGE ─────────────────────────────────────────────
// Uses Android TTS (via AndroidBridge) → works on ALL devices including Huawei
// Falls back to Web Speech API if bridge not available
function speakNative(text, langCode) {
  if (window.AndroidBridge && typeof window.AndroidBridge.speakWord === 'function') {
    window.AndroidBridge.speakWord(text, langCode || 'en');
    return true;
  }
  return false;
}

function speakWithFallback(text, langCode) {
  if (speakNative(text, langCode)) return;
  // Web Speech API fallback (works in browser/non-Android)
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = langCode || 'en';
    // Try to load voices and speak
    const trySpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        const v = voices.find(x => x.lang.startsWith(langCode || 'en')) || voices[0];
        u.voice = v;
      }
      window.speechSynthesis.speak(u);
    };
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = trySpeak;
      window.speechSynthesis.speak(u); // also try directly
    } else {
      trySpeak();
    }
  }
}

function playAudio(url) {
  if (!url) return;
  // Fix protocol-relative URLs
  if (url.startsWith('//')) url = 'https:' + url;
  try {
    const a = new Audio(url);
    a.onerror = () => {
      // If audio fails, fall back to TTS
      if (lastWord) speakWithFallback(lastWord, 'en');
    };
    a.play().catch(() => {
      if (lastWord) speakWithFallback(lastWord, 'en');
    });
  } catch(e) {
    if (lastWord) speakWithFallback(lastWord, 'en');
  }
}

function speakText() {
  const t = document.getElementById('tcTxt')?.textContent;
  if (t) speakWithFallback(t, to.code);
}

// ── THEME ──────────────────────────────────────────────────
function initTheme(){
  const t=localStorage.getItem('yd_t')||'dark';
  document.body.className=t;
  const b=document.getElementById('themeBtn');
  if(b)b.textContent=t==='dark'?'☀️':'🌙';
}
function toggleTheme(){
  const t=document.body.className==='dark'?'light':'dark';
  document.body.className=t;localStorage.setItem('yd_t',t);
  const b=document.getElementById('themeBtn');
  if(b)b.textContent=t==='dark'?'☀️':'🌙';
}

// ── LANG MODAL ─────────────────────────────────────────────
function openLang(target){
  langTarget=target;
  const cur=target==='from'?from.code:to.code;
  document.getElementById('langItems').innerHTML=LANGS.map(l=>`
    <div class="lang-row-item ${l.code===cur?'sel':''}" onclick="pickLang('${l.code}','${l.name}','${l.flag}')">
      <span class="lri-flag">${l.flag}</span>
      <span>${l.name}</span>
      ${l.code===cur?'<span class="lri-check">✓</span>':''}
    </div>`).join('');
  document.getElementById('langModal').style.display='flex';
}
function closeLang(){document.getElementById('langModal').style.display='none';}
function pickLang(code,name,flag){
  if(langTarget==='from'){from={code,name,flag};_set('fFlag',flag);_set('fName',name);}
  else{to={code,name,flag};_set('tFlag',flag);_set('tName',name);}
  closeLang();
  if(lastWord){translate(lastWord);}
}
function swapLangs(){
  const tmp=from;from=to;to=tmp;
  _set('fFlag',from.flag);_set('fName',from.name);
  _set('tFlag',to.flag);_set('tName',to.name);
  if(lastWord)translate(lastWord);
}
function _set(id,txt){const e=document.getElementById(id);if(e)e.textContent=txt;}

// ── OFFLINE FIRST LOOKUP ───────────────────────────────────
async function search(word){
  const inp=document.getElementById('inp');
  if(word){if(inp)inp.value=word;}
  else{word=inp?.value.trim();}
  if(!word)return;
  word=word.toLowerCase().trim();
  lastWord=word;
  hideSugg();showResult();

  _html('wordHero','<div style="padding:16px"><div style="width:160px;height:32px;background:var(--BD);border-radius:8px;animation:pulse 1.5s infinite"></div></div>');
  _html('pronRow','<div style="height:44px"></div>');
  _html('secDict','<div class="spin-center" style="padding:40px"><div class="spinner"></div></div>');
  _html('secTrans','<div class="spin-center" style="padding:32px"><div class="spinner"></div></div>');
  _html('secSyn','<div class="spin-center" style="padding:32px"><div class="spinner"></div></div>');

  // Try offline first
  const offlineData = (typeof offlineLookup === 'function') ? offlineLookup(word) : null;
  if (offlineData) {
    buildWordHeroOffline(offlineData, word);
    buildPronRowOffline(offlineData, word);
    buildDictSectionOffline(offlineData, word);
    buildSynSectionOffline(offlineData);
    saveRecent(word);
    translate(word);
    // Show offline badge
    const badge = document.getElementById('offlineBadge');
    if (badge) badge.style.display = 'inline-flex';
    return;
  }

  // Hide offline badge if online
  const badge = document.getElementById('offlineBadge');
  if (badge) badge.style.display = 'none';

  // Online fallback
  try{
    const r=await fetch(DAPI+encodeURIComponent(word));
    if(!r.ok)throw 0;
    const data=await r.json();
    buildWordHero(data,word);
    buildPronRow(data);
    buildDictSection(data);
    buildSynSection(data);
    saveRecent(word);
  }catch{
    _html('wordHero','');
    _html('pronRow','');
    _html('secDict',`<div class="err-box"><div class="err-icon">🔍</div><h3>Word not found</h3><p>No results for "<strong>${word}</strong>"</p><p style="font-size:12px;opacity:.6">Try the offline library — ${typeof offlineWordList==='function'?offlineWordList().length:0}+ words available</p><button class="btn-grad" onclick="goHome()">← Home</button></div>`);
    _html('secTrans','');_html('secSyn','');
  }
  translate(word);
}

// ── OFFLINE BUILDERS ───────────────────────────────────────
function buildWordHeroOffline(data, word){
  const isFav=favs.includes(word);
  _html('wordHero',`
    <div class="wh-top">
      <div class="wh-word">${word}</div>
      <div class="wh-acts">
        <button class="wh-act" onclick="speakWithFallback('${word}','en')" title="Pronounce">🔊</button>
        <button class="wh-act ${isFav?'fav-on':''}" id="favBtn" onclick="toggleFav('${word}',this)">${isFav?'❤️':'🤍'}</button>
      </div>
    </div>`);
}

function buildPronRowOffline(data, word){
  let h='';
  if(data.phonetic){
    h=`<div class="pron-pill" onclick="speakWithFallback('${word}','en')">
      <span class="pp-flag">🇬🇧</span>
      <span class="pp-lbl">UK</span>
      <span class="pp-ipa">${data.phonetic}</span>
      <span class="pp-play">▶</span>
    </div>
    <div class="pron-pill" onclick="speakWithFallback('${word}','en-US')">
      <span class="pp-flag">🇺🇸</span>
      <span class="pp-lbl">US</span>
      <span class="pp-ipa">${data.phonetic}</span>
      <span class="pp-play">▶</span>
    </div>`;
  }
  _html('pronRow', h || '<div style="height:12px"></div>');
}

function buildDictSectionOffline(data, word){
  let h=`<div class="m-card">
    <div class="m-pos-row"><div class="m-pos">${data.pos}</div><div class="m-pos-line"></div></div>`;
  data.defs.forEach((d,i)=>{
    h+=`<div class="def-item">
      <div class="def-top"><div class="def-num">${i+1}</div><div class="def-txt">${d.d}</div></div>
      ${d.e?`<div class="def-ex">${d.e}</div>`:''}
    </div>`;
  });
  h+='</div>';
  _html('secDict',h);
}

function buildSynSectionOffline(data){
  let h='';
  if(data.syns&&data.syns.length){
    h+=`<div class="syn-card"><div class="syn-label">Synonyms</div><div class="syn-chips">${data.syns.map(s=>`<span class="syn-chip" onclick="search('${s}')">${s}</span>`).join('')}</div></div>`;
  }
  if(data.ants&&data.ants.length){
    h+=`<div class="syn-card"><div class="syn-label">Antonyms</div><div class="syn-chips">${data.ants.map(a=>`<span class="syn-chip ant-chip" onclick="search('${a}')">${a}</span>`).join('')}</div></div>`;
  }
  if(!h) h='<div class="err-box" style="padding:24px"><div style="font-size:32px;margin-bottom:8px">🔤</div><p>No synonyms found for this word.</p></div>';
  _html('secSyn',h);
}

// ── ONLINE BUILDERS ────────────────────────────────────────
function buildWordHero(data,word){
  const e=data[0];const isFav=favs.includes(word);
  const phs=e.phonetics?.filter(p=>p.audio)||[];
  _html('wordHero',`
    <div class="wh-top">
      <div class="wh-word">${e.word}</div>
      <div class="wh-acts">
        ${phs.length?`<button class="wh-act" onclick="playAudio('${phs[0].audio}')">🔊</button>`:
        `<button class="wh-act" onclick="speakWithFallback('${word}','en')">🔊</button>`}
        <button class="wh-act ${isFav?'fav-on':''}" id="favBtn" onclick="toggleFav('${word}',this)">${isFav?'❤️':'🤍'}</button>
      </div>
    </div>`);
}

function buildPronRow(data){
  const e=data[0];
  const phs=e.phonetics?.filter(p=>p.text||p.audio)||[];
  const uk=phs.find(p=>p.audio?.includes('-uk'))||phs[0];
  const us=phs.find(p=>p.audio?.includes('-us'))||phs[1];
  let h='';
  if(uk) h+=`<div class="pron-pill" onclick="playAudio('${uk.audio||''}')"><span class="pp-flag">🇬🇧</span><span class="pp-lbl">UK</span><span class="pp-ipa">${uk.text||''}</span><span class="pp-play">▶</span></div>`;
  if(us&&us!==uk) h+=`<div class="pron-pill" onclick="playAudio('${us.audio||''}')"><span class="pp-flag">🇺🇸</span><span class="pp-lbl">US</span><span class="pp-ipa">${us.text||''}</span><span class="pp-play">▶</span></div>`;
  if(!h&&lastWord) h=`<div class="pron-pill" onclick="speakWithFallback('${lastWord}','en')"><span class="pp-flag">🔊</span><span class="pp-lbl">TTS</span><span class="pp-ipa">tap to hear</span><span class="pp-play">▶</span></div>`;
  _html('pronRow',h||'<div style="height:12px"></div>');
}

function buildDictSection(data){
  const e=data[0];let h='';
  e.meanings.forEach(m=>{
    h+=`<div class="m-card">
      <div class="m-pos-row"><div class="m-pos">${m.partOfSpeech}</div><div class="m-pos-line"></div></div>`;
    m.definitions.slice(0,5).forEach((d,i)=>{
      h+=`<div class="def-item">
        <div class="def-top"><div class="def-num">${i+1}</div><div class="def-txt">${d.definition}</div></div>
        ${d.example?`<div class="def-ex">${d.example}</div>`:''}
      </div>`;
    });
    h+=`</div>`;
  });
  _html('secDict',h);
}

function buildSynSection(data){
  const e=data[0];let syns=[],ants=[];
  e.meanings.forEach(m=>{
    syns=[...syns,...(m.synonyms||[])];
    ants=[...ants,...(m.antonyms||[])];
  });
  e.meanings.forEach(m=>{
    m.definitions.forEach(d=>{
      syns=[...syns,...(d.synonyms||[])];
      ants=[...ants,...(d.antonyms||[])];
    });
  });
  syns=[...new Set(syns)].slice(0,16);
  ants=[...new Set(ants)].slice(0,16);
  let h='';
  if(syns.length) h+=`<div class="syn-card"><div class="syn-label">Synonyms</div><div class="syn-chips">${syns.map(s=>`<span class="syn-chip" onclick="search('${s}')">${s}</span>`).join('')}</div></div>`;
  if(ants.length) h+=`<div class="syn-card"><div class="syn-label">Antonyms</div><div class="syn-chips">${ants.map(a=>`<span class="syn-chip ant-chip" onclick="search('${a}')">${a}</span>`).join('')}</div></div>`;
  if(!syns.length&&!ants.length) h='<div class="err-box" style="padding:24px"><div style="font-size:32px;margin-bottom:8px">🔤</div><p>No synonyms found for this word.</p></div>';
  _html('secSyn',h);
}

// ── TRANSLATION ────────────────────────────────────────────
async function translate(word){
  const tp=document.getElementById('secTrans');if(!tp)return;
  tp.innerHTML='<div class="spin-center" style="padding:32px"><div class="spinner"></div></div>';
  try{
    const r=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=${from.code}|${to.code}`);
    const d=await r.json();
    const result=d.responseData.translatedText;
    tp.innerHTML=`<div class="trans-card">
      <div class="tc-lang"><span class="tc-flag">${to.flag}</span><span class="tc-name">${to.name}</span></div>
      <div class="tc-text" id="tcTxt">${result}</div>
      <div class="tc-acts">
        <button class="tc-btn" onclick="navigator.clipboard?.writeText(document.getElementById('tcTxt').textContent)">📋 Copy</button>
        <button class="tc-btn" onclick="speakText()">🔊 Listen</button>
        <button class="tc-btn" onclick="openLang('to')">🌐 Change</button>
      </div>
    </div>`;
  }catch{
    tp.innerHTML='<div class="err-box"><div class="err-icon">🌐</div><h3>Translation failed</h3><p>Check internet connection</p></div>';
  }
}

// ── TABS ──────────────────────────────────────────────────
function showSection(s){
  ['dict','trans','syn'].forEach(x=>{
    document.getElementById('sec'+x.charAt(0).toUpperCase()+x.slice(1)).style.display=x===s?'block':'none';
  });
  document.querySelectorAll('.stab').forEach(t=>t.classList.toggle('active',t.dataset.s===s));
}

function showResult(){
  document.getElementById('resultArea').style.display='block';
  document.getElementById('homeArea').style.display='none';
  showSection('dict');
}
function goHome(){
  document.getElementById('resultArea').style.display='none';
  document.getElementById('homeArea').style.display='block';
  const inp=document.getElementById('inp');if(inp)inp.value='';
  updateClear();hideSugg();lastWord='';
  const badge = document.getElementById('offlineBadge');
  if (badge) badge.style.display = 'none';
}
function clearAll(){const inp=document.getElementById('inp');if(inp)inp.value='';updateClear();hideSugg();if(lastWord)goHome();}
function updateClear(){
  const inp=document.getElementById('inp'),x=document.getElementById('sbX');
  if(x)x.style.display=inp?.value.trim()?'flex':'none';
}

// ── FAVORITES ─────────────────────────────────────────────
function toggleFav(word,btn){
  const i=favs.indexOf(word);
  if(i===-1){favs.push(word);btn.innerHTML='❤️';btn.classList.add('fav-on');}
  else{favs.splice(i,1);btn.innerHTML='🤍';btn.classList.remove('fav-on');}
  localStorage.setItem('yd_f',JSON.stringify(favs));
}

// ── RECENT ─────────────────────────────────────────────────
function saveRecent(w){
  recent=[w,...recent.filter(x=>x!==w)].slice(0,12);
  localStorage.setItem('yd_r',JSON.stringify(recent));renderRecent();
}
function clearRecent(){recent=[];localStorage.setItem('yd_r','[]');renderRecent();}
function renderRecent(){
  const b=document.getElementById('recentBlk'),c=document.getElementById('recentChips');
  if(!b||!c)return;
  if(!recent.length){b.style.display='none';return;}
  b.style.display='block';
  c.innerHTML=recent.map(w=>`<button class="chip" onclick="search('${w}')">${w}</button>`).join('');
}

// ── SUGGESTIONS (offline-powered) ─────────────────────────
function showSugg(val){
  const box=document.getElementById('suggDrop');if(!box)return;
  let m=recent.filter(w=>w.startsWith(val)).slice(0,3);
  // Add offline suggestions
  if(typeof offlineSuggest==='function'){
    const offSugg=offlineSuggest(val,5).filter(w=>!m.includes(w));
    m=[...m,...offSugg].slice(0,8);
  }
  if(m.length){
    box.style.display='block';
    box.innerHTML=m.map(w=>{
      const isRecent=recent.includes(w);
      return `<div class="sd-item" onclick="search('${w}')"><span class="sd-ic">${isRecent?'🕐':'📖'}</span>${w}</div>`;
    }).join('');
  }else hideSugg();
}
function hideSugg(){const b=document.getElementById('suggDrop');if(b){b.style.display='none';b.innerHTML='';}}

// ── WOD ────────────────────────────────────────────────────
const WODS=['ephemeral','serendipity','melancholy','resilience','eloquence','luminous','tenacious','labyrinth','solitude','whimsical','paradigm','catalyst','authentic','profound','vibrant'];
async function loadWOD(){
  const card=document.getElementById('wodCard');if(!card)return;
  const word=WODS[new Date().getDate()%WODS.length];

  // Try offline first
  const off = (typeof offlineLookup==='function') ? offlineLookup(word) : null;
  if (off) {
    card.innerHTML=`<div class="wod-badge">📅 Word of the Day</div>
      <div class="wod-word">${word}</div>
      ${off.phonetic?`<div class="wod-ph">${off.phonetic}</div>`:''}
      <div class="wod-pos">${off.pos}</div>
      <div class="wod-def">${off.defs[0].d}</div>
      ${off.defs[0].e?`<div class="wod-ex">${off.defs[0].e}</div>`:''}
      <button class="wod-btn" onclick="search('${word}')">Explore word →</button>`;
    return;
  }
  try{
    const r=await fetch(DAPI+word);const d=await r.json();
    const e=d[0];const def=e.meanings[0].definitions[0];
    card.innerHTML=`<div class="wod-badge">📅 Word of the Day</div>
      <div class="wod-word">${e.word}</div>
      ${e.phonetic?`<div class="wod-ph">${e.phonetic}</div>`:''}
      <div class="wod-pos">${e.meanings[0].partOfSpeech}</div>
      <div class="wod-def">${def.definition}</div>
      ${def.example?`<div class="wod-ex">${def.example}</div>`:''}
      <button class="wod-btn" onclick="search('${e.word}')">Explore word →</button>`;
  }catch{card.innerHTML='<div style="text-align:center;padding:16px;color:var(--T3)">Could not load today\'s word</div>';}
}

// ── OFFLINE WORD BROWSER ───────────────────────────────────
function showOfflineLibrary(){
  if(typeof offlineWordList!=='function')return;
  const words=offlineWordList();
  const modal=document.getElementById('langModal'); // reuse modal
  const title=document.querySelector('.modal-head span');
  const items=document.getElementById('langItems');
  if(title) title.textContent=`Offline Library (${words.length} words)`;
  items.innerHTML=`<div style="padding:8px 16px">
    <input type="text" id="libSearch" placeholder="Filter words..." style="width:100%;padding:10px;border-radius:8px;border:1px solid var(--BD);background:var(--BG2);color:var(--T1);font-size:14px" oninput="filterLib(this.value)">
  </div>
  <div id="libList">${words.map(w=>`<div class="lang-row-item" onclick="closeLang();search('${w}')" style="cursor:pointer">
    <span class="lri-flag">📖</span><span>${w}</span>
  </div>`).join('')}</div>`;
  modal.style.display='flex';
}

function filterLib(val){
  const list=document.getElementById('libList');if(!list)return;
  const filtered=(typeof offlineWordList==='function'?offlineWordList():[]).filter(w=>w.includes(val.toLowerCase()));
  list.innerHTML=filtered.slice(0,200).map(w=>`<div class="lang-row-item" onclick="closeLang();search('${w}')" style="cursor:pointer">
    <span class="lri-flag">📖</span><span>${w}</span>
  </div>`).join('');
}

function _html(id,h){const e=document.getElementById(id);if(e)e.innerHTML=h;}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  initTheme();renderRecent();loadWOD();
  const inp=document.getElementById('inp');
  if(inp){
    inp.addEventListener('keydown',e=>{if(e.key==='Enter')search();});
    inp.addEventListener('input',()=>{
      updateClear();
      const v=inp.value.trim();
      if(v.length>=2)showSugg(v);else hideSugg();
    });
    document.addEventListener('click',e=>{if(!inp.contains(e.target))hideSugg();});
  }
  const p=new URLSearchParams(window.location.search);
  if(p.get('word'))search(p.get('word'));
});
