/* ═══════════════════════════════════════════════════════
   intel.js — ISC Internal Portal Logic
   Firebase Auth + Citizen Registry
═══════════════════════════════════════════════════════ */

/* ── Clock ── */
function pad(n) { return String(n).padStart(2, '0'); }
function tick() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));
  const el = document.getElementById('clock');
  if (el) el.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
}
setInterval(tick, 1000);

/* ── DevTools guard ── */
document.onkeydown = function(e) {
  if (e.keyCode === 123 ||
     (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) ||
     (e.ctrlKey && e.keyCode === 85)) return false;
};

/* ── Blur on window switch (only when logged in) ── */
window.addEventListener('blur', () => {
  const mc = document.getElementById('main-content');
  if (mc && mc.style.display === 'flex') document.body.style.filter = 'blur(20px)';
});
window.addEventListener('focus', () => { document.body.style.filter = ''; });

/* ── Firebase Auth ── */
async function auth() {
  const email = (document.getElementById('login-email')?.value || '').trim();
  const pass  = (document.getElementById('passcode')?.value || '');
  const err   = document.getElementById('error-msg');
  const btn   = document.getElementById('auth-btn');

  err.style.display = 'none';

  if (!email || !pass) {
    err.textContent = 'ENTER EMAIL AND PASSWORD';
    err.style.display = 'block';
    return;
  }

  btn.disabled = true;
  btn.textContent = 'AUTHENTICATING...';

  try {
    await window._signIn(email, pass);
    /* onAuthStateChanged in HTML module script handles the rest */
  } catch(e) {
    err.style.display = 'block';
    if (e.code === 'auth/too-many-requests') {
      err.textContent = 'SYSTEM LOCKED — TOO MANY ATTEMPTS';
      setTimeout(() => {
        err.style.display = 'none';
        btn.disabled = false;
        btn.textContent = 'AUTHENTICATE →';
      }, 60000);
    } else {
      err.textContent = 'ACCESS DENIED — INVALID CREDENTIALS';
      btn.disabled = false;
      btn.textContent = 'AUTHENTICATE →';
    }
    const p = document.getElementById('passcode');
    if (p) p.value = '';
  }
}
window.auth = auth;

/* Enter key on either login field */
['login-email','passcode'].forEach(id => {
  document.getElementById(id)?.addEventListener('keydown', e => {
    if (e.key === 'Enter') auth();
  });
});

/* ── Logout ── */
function logout() { window._signOut?.(); }
window.logout = logout;

/* ── Called by Firebase onAuthStateChanged after successful auth ── */
window.onAdminReady = function() {
  tick();
  loadRegistry();
  /* Staggered reveal */
  setTimeout(() => {
    document.querySelectorAll('.reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 90);
    });
  }, 80);
};

/* ═══════════════════════════════════════════════════════
   CITIZEN REGISTRY
═══════════════════════════════════════════════════════ */
let _citizens = [];

/* Avatar URL — same convention as the admin dashboard: Java accounts use
   Minotar, Bedrock accounts use Crafthead with a `*` prefix on the
   username, keyed off each citizen doc's `platform` field. Falls back to
   Java/Minotar if platform is unset. */
function avatarUrl(c) {
  const name = c.username || '';
  if (!name) return '';
  if ((c.platform || 'java').toLowerCase() === 'bedrock') {
    return `https://crafthead.net/avatar/*${encodeURIComponent(name)}/32`;
  }
  return `https://minotar.net/avatar/${encodeURIComponent(name)}/32`;
}

async function loadRegistry() {
  const body    = document.getElementById('reg-body');
  const countEl = document.getElementById('reg-count');
  if (!body) return;

  body.innerHTML = '<div class="reg-state">// QUERYING CITIZEN REGISTRY...</div>';

  if (!window._db || !window._fire) {
    body.innerHTML = '<div class="reg-state" style="color:var(--red)">// FIRESTORE UNAVAILABLE</div>';
    return;
  }

  try {
    const { collection, getDocs } = window._fire;
    const snap = await getDocs(collection(window._db, 'citizens'));
    _citizens = [];
    snap.forEach(d => _citizens.push({ id: d.id, ...d.data() }));
    _citizens.sort((a, b) => a.id.localeCompare(b.id));
    filterRegistry();
  } catch(e) {
    body.innerHTML = `<div class="reg-state" style="color:var(--red)">// QUERY ERROR: ${e.message}</div>`;
  }
}
window.loadRegistry = loadRegistry;

function filterRegistry() {
  const q  = (document.getElementById('reg-search')?.value || '').toUpperCase().trim();
  const fs = document.getElementById('reg-status')?.value || '';
  const ft = document.getElementById('reg-tier')?.value  || '';

  const filtered = _citizens.filter(c => {
    const matchQ = !q || c.id.includes(q) || (c.username || '').toUpperCase().includes(q);
    const matchS = !fs || (c.status || 'active') === fs;
    const matchT = !ft || (c.tier   || 'citizen') === ft;
    return matchQ && matchS && matchT;
  });

  const countEl = document.getElementById('reg-count');
  if (countEl) countEl.textContent = `${filtered.length} RECORD${filtered.length !== 1 ? 'S' : ''}`;

  const body = document.getElementById('reg-body');
  if (!body) return;

  if (!filtered.length) {
    body.innerHTML = '<div class="reg-state">// NO RECORDS MATCH QUERY</div>';
    return;
  }

  const tierLabel = { citizen: 'Citizen', senior: 'Senior', elder: 'Elder', founding: 'Founding' };
  const clrLabel  = { citizen: 'CL-1',    senior: 'CL-2',   elder: 'CL-3',  founding: 'CL-F'    };

  body.innerHTML = filtered.map(c => {
    const status    = (c.status || 'active').toLowerCase();
    const tagCls    = status === 'active' ? 'on' : (status === 'suspended' ? 'warn' : 'off');
    const clearance = clrLabel[c.tier || 'citizen']  || 'CL-?';
    const avatar    = avatarUrl(c);

    return `<div class="reg-row">
      <span class="reg-id">${c.id}</span>
      <span class="reg-name" style="display:flex;align-items:center;gap:8px;">
        ${avatar ? `<img src="${avatar}" alt="" width="20" height="20" style="image-rendering:pixelated;border:1px solid var(--line-faint);flex-shrink:0;" onerror="this.style.display='none'">` : ''}
        <span>${c.username || '—'}</span>
      </span>
      <span class="reg-clr">${clearance}</span>
      <span class="st-tag ${tagCls}">${status.toUpperCase()}</span>
      <span class="reg-territory">${c.territory || 'Mainland Legiona'}</span>
      <span class="reg-tier">${tierLabel[c.tier || 'citizen'] || c.tier || '—'}</span>
      <span class="reg-date">${c.issuedDate || '—'}</span>
    </div>`;
  }).join('');
}
window.filterRegistry = filterRegistry;
