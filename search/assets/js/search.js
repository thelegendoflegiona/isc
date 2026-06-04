// ========================
// ASSET DATABASE
// ========================
const ASSETS = [
  {
    category: "Legal Documentation",
    title: "Declaration of Establishment",
    desc: "The foundational document of the Legiona community. The original mandate that outlined the sovereignty and unity of the Legiona sectors.",
    link: "https://drive.google.com/file/d/13Vh0GT8TQECPdc80TUfAY7e5NtC7BYVP/view?usp=drive_link",
    linkText: "VIEW PDF",
    tags: ["declaration establishment tlio", "legal", "sovereignty", "legiona"]
  },
  {
    category: "Historical File",
    title: "Origin: The Sus Squad",
    desc: "Details regarding the pre-ISC volunteer unit and their role during the 2025 terror attacks.",
    link: "/isc/national/#timeline",
    linkText: "READ HISTORY",
    tags: ["sus squad history origin", "grassroots", "defense", "unit", "history"]
  },
  {
    category: "Mission Brief",
    title: "Operation: Skyxion Shield",
    desc: "A specialized drone protocol deployed in Skyxion Center for territory protection.",
    link: "https://drive.google.com/file/d/1539_KS8-I6m2fBXlQlEkPBFhrN3Kv1Ky/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["operation skyxion shield mission", "operation", "drones", "protection", "mission"]
  },
  {
    category: "Agency Update",
    title: "TLIO Reclassification",
    desc: "Documentation regarding the rebranding of The Legend of Legiona Intelligence Organization to ISC.",
    link: "/isc/national/#evolution",
    linkText: "VIEW UPDATE",
    tags: ["tlio integration rebranding", "tlio", "isc", "reclassification", "rebrand"]
  },
  {
    category: "Incident Report",
    title: "The First Unknown Attacks in The LoL City",
    desc: "The small explosion was reported by The LoL people in The LoL City. Initial ISC response documentation.",
    link: "https://drive.google.com/file/d/1HDTUudIP_rZ8IZDJWHLNCkTVulhci86r/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["the lol city attacks", "explosion", "attack", "incident", "city", "the lol"]
  },
  {
    category: "Incident Report",
    title: "The LoL Sign Was Bombed",
    desc: "The shocking explosion was reported by Former The LoL President during the conflict in The LoL City.",
    link: "https://drive.google.com/file/d/1sUK1VVkDXsiBoxacP5eztT_n5SDPRWWr/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["the lol city attacks", "bombing", "attack", "president", "conflict", "the lol"]
  },
  {
    category: "OPERATION",
    title: "Safety Operation Record: 2023-03-03",
    desc: "A field image captured during a safety operation, documenting an ████████ and ████████████ joining the mission together.",
    link: "https://drive.google.com/file/d/1nFkrLNUfOzBVP8u_9XCnG9OqgE7M6IWq/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["operation", "safety-ops", "classified", "image"]
  },
  {
    category: "OPERATION",
    title: "Field Reconnaissance: Unit-█████",
    desc: "Classified visual record of a clandestine operation within the Skyxion sector. Details remain restricted to Level 5 clearance.",
    link: "/thelol/gov/isc/assets/publics/SAFETY-OPS/2023-05-11 (1).png",
    linkText: "VIEW IMAGE",
    tags: ["operation", "redacted", "skyxion", "classified"]
  },
  {
    category: "OPERATION",
    title: "Infrastructure Infiltration: 2023-05-11",
    desc: "Surveillance log documenting the night-phase deployment of specialized assets. All mission specifics have been expunged from the public record.",
    link: "https://drive.google.com/file/d/1JvNFVLUKePu1t03PfLsSibSvD3KS4Whn/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["operation", "night-ops", "internal-security", "redacted"]
  },
  {
    category: "ATTACK",
    title: "TLCC Twin Towers: Hub Compromise",
    desc: "Post-incident documentation of The LoL Convention Center (TLCC). Evidence of the UltraX-█████ infiltration is present, though the operative's identity remains classified.",
    link: "https://drive.google.com/file/d/1JfZzr_BEBbihJnZlL7GMQaAkwbXxqm1E/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["attack", "tlcc", "commercial-hub", "sabotage"]
  },
  {
    category: "ATTACK",
    title: "TLCC Twin Towers: Residential Audit",
    desc: "Visual log from the residential and hotel levels of the TLCC following the 2023-05-30 event. Structural tampering and unauthorized access documented.",
    link: "https://drive.google.com/file/d/1-20jb9ubog5Yr-FKGGgwNRZZudky066O/view?usp=drive_link",
    linkText: "VIEW IMAGE",
    tags: ["attack", "tlcc", "residential", "redacted"]
  },
  {
    category: "HISTORY",
    title: "Neverland Protocol: Unit-█████ Origins",
    desc: "Classified archival footage from the Neverland Era (2020). Documents early experimental redstone testing and biological containment procedures.",
    link: "https://drive.google.com/file/d/1WHVK__NXBg7MODeLZcMdJh-eLEG4JFdX/view?usp=drive_link",
    linkText: "VIEW RECORD",
    tags: ["neverland", "pre-skyxion", "legacy", "origins"]
  },
  {
    category: "HISTORY",
    title: "Legacy Tactical Loadout: Operation Flowey",
    desc: "An archived visual from the pre-Skyxion era documenting Unit-█████ in full tactical gear. One of the few surviving records of the operative's early combat efficiency.",
    link: "https://drive.google.com/file/d/1WSZzfKu8hkiGMRnTVgaRFwcB6rYbqJT2/view?usp=drive_link",
    linkText: "VIEW RECORD",
    tags: ["legacy", "tactical", "unauthorised", "pre-skyxion"]
  }
];

// ========================
// DOM Elements
// ========================
const searchInput = document.getElementById('archive-search');
const resultsList = document.getElementById('results-list');
const defaultState = document.getElementById('default-state');
const noResults = document.getElementById('no-results');
const resultsCount = document.getElementById('results-count');
const totalCountSpan = document.getElementById('total-count');
const catCountSpan = document.getElementById('cat-count');
const countNumSpan = document.getElementById('count-num');

// ========================
// Helpers
// ========================
function escapeHTML(str) {
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

// Update stats on load
totalCountSpan.textContent = ASSETS.length;
countNumSpan.textContent = ASSETS.length;
const uniqueCats = new Set(ASSETS.map(a => a.category)).size;
catCountSpan.textContent = uniqueCats;

// Debounce utility
let debounceTimer;
function debounce(func, delay) {
  return function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// Set search query from hint tags
function setQuery(query) {
  searchInput.value = query;
  filterResults();
}

// Core filtering & rendering (XSS safe)
function filterResults() {
  const rawQuery = searchInput.value.toLowerCase().trim();
  const query = rawQuery; // keep original for display after escaping

  if (!query) {
    defaultState.style.display = 'flex';
    resultsList.style.display = 'none';
    noResults.style.display = 'none';
    resultsCount.innerHTML = `ENTER A QUERY TO SEARCH <strong>${ASSETS.length}</strong> DECLASSIFIED ASSETS`;
    return;
  }

  defaultState.style.display = 'none';

  const filtered = ASSETS.filter(a =>
    a.title.toLowerCase().includes(query) ||
    a.desc.toLowerCase().includes(query) ||
    a.category.toLowerCase().includes(query) ||
    a.tags.some(t => t.toLowerCase().includes(query))
  );

  if (!filtered.length) {
    resultsList.style.display = 'none';
    noResults.style.display = 'flex';
    const safeQuery = escapeHTML(query.toUpperCase());
    resultsCount.innerHTML = `SHOWING <strong>0</strong> RESULTS FOR "${safeQuery}"`;
    return;
  }

  noResults.style.display = 'none';
  resultsList.style.display = 'block';
  const safeQuery = escapeHTML(query.toUpperCase());
  resultsCount.innerHTML = `SHOWING <strong>${filtered.length}</strong> RESULT${filtered.length !== 1 ? 'S' : ''} FOR "${safeQuery}"`;

  // Group by category
  const groups = {};
  filtered.forEach(a => {
    if (!groups[a.category]) groups[a.category] = [];
    groups[a.category].push(a);
  });

  resultsList.innerHTML = '';
  let delay = 0;

  Object.entries(groups).forEach(([cat, items]) => {
    const groupDiv = document.createElement('div');
    groupDiv.className = 'cat-group';
    const catLabel = document.createElement('p');
    catLabel.className = 'cat-label';
    catLabel.textContent = cat; // safe: plain text
    groupDiv.appendChild(catLabel);

    items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'result-card card-animate';
      card.style.animationDelay = `${delay * 0.055}s`;

      // Build inner HTML – all dynamic content is escaped or from safe source
      const safeTitle = escapeHTML(item.title);
      const safeDesc = escapeHTML(item.desc);
      const safeLinkText = escapeHTML(item.linkText);
      const targetAttr = item.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : '';

      card.innerHTML = `
        <div class="card-body">
          <span class="card-tag">${escapeHTML(item.category)}</span>
          <h3>${safeTitle}</h3>
          <p>${safeDesc}</p>
        </div>
        <a href="${escapeHTML(item.link)}" class="result-link" ${targetAttr}>
          ${safeLinkText} →
        </a>
      `;
      groupDiv.appendChild(card);
      delay++;
    });
    resultsList.appendChild(groupDiv);
  });
}

// ========================
// Event Listeners (no inline handlers)
// ========================
// Debounced search input
searchInput.addEventListener('input', debounce(filterResults, 250));

// Hint tags – click + keyboard
document.querySelectorAll('.hint-tag').forEach(tag => {
  const query = tag.getAttribute('data-query');
  if (!query) return;

  const clickHandler = () => setQuery(query);
  tag.addEventListener('click', clickHandler);
  tag.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setQuery(query);
    }
  });
});

// Initial state: if input has value (e.g., autofill), trigger search
window.addEventListener('DOMContentLoaded', () => {
  if (searchInput.value.trim() !== '') {
    filterResults();
  }
});
