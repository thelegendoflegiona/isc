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

    document.getElementById('total-count').textContent = ASSETS.length;
    document.getElementById('count-num').textContent   = ASSETS.length;
    const uniqueCats = new Set(ASSETS.map(a => a.category)).size;
    document.getElementById('cat-count').textContent = uniqueCats;

    function setQuery(q) {
      document.getElementById('archive-search').value = q;
      filterResults();
    }

    function filterResults() {
      const q    = document.getElementById('archive-search').value.toLowerCase().trim();
      const list = document.getElementById('results-list');
      const none = document.getElementById('no-results');
      const def  = document.getElementById('default-state');
      const cnt  = document.getElementById('results-count');

      if (!q) {
        def.style.display   = 'flex';
        list.style.display  = 'none';
        none.style.display  = 'none';
        cnt.innerHTML = `ENTER A QUERY TO SEARCH <strong>${ASSETS.length}</strong> DECLASSIFIED ASSETS`;
        return;
      }

      def.style.display = 'none';

      const filtered = ASSETS.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.desc.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );

      if (!filtered.length) {
        list.style.display = 'none';
        none.style.display = 'flex';
        cnt.innerHTML = `SHOWING <strong>0</strong> RESULTS FOR "${q.toUpperCase()}"`;
        return;
      }

      none.style.display = 'none';
      list.style.display = 'block';
      cnt.innerHTML = `SHOWING <strong>${filtered.length}</strong> RESULT${filtered.length !== 1 ? 'S' : ''} FOR "${q.toUpperCase()}"`;

      const groups = {};
      filtered.forEach(a => {
        if (!groups[a.category]) groups[a.category] = [];
        groups[a.category].push(a);
      });

      list.innerHTML = '';
      let delay = 0;
      Object.entries(groups).forEach(([cat, items]) => {
        const group = document.createElement('div');
        group.className = 'cat-group';
        group.innerHTML = `<p class="cat-label">${cat}</p>`;

        items.forEach(item => {
          const card = document.createElement('div');
          card.className = 'result-card card-animate';
          card.style.animationDelay = `${delay * 0.055}s`;
          card.innerHTML = `
            <div class="card-body">
              <span class="card-tag">${item.category}</span>
              <h3>${item.title}</h3>
              <p>${item.desc}</p>
            </div>
            <a href="${item.link}" class="result-link" ${item.link.startsWith('http') ? 'target="_blank"' : ''}>
              ${item.linkText} →
            </a>
          `;
          group.appendChild(card);
          delay++;
        });

        list.appendChild(group);
      });
    }
