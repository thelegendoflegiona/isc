    let attempts = 0;

    function auth() {
      const val = document.getElementById('passcode').value;
      const err = document.getElementById('error-msg');
      const btn = document.getElementById('auth-btn');

      if (val.toUpperCase() === 'LEGIONA2026') {
        const overlay = document.getElementById('login-overlay');
        overlay.style.opacity = '0';
        setTimeout(() => {
          overlay.style.display = 'none';
          document.getElementById('main-content').style.display = 'block';
          setTimeout(() => {
            document.querySelectorAll('.reveal').forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
          }, 50);
        }, 500);
      } else {
        attempts++;
        err.style.display = 'block';
        if (attempts >= 3) {
          btn.disabled = true;
          let t = 30;
          err.textContent = `SYSTEM LOCKED — COOLDOWN: ${t}s`;
          const cd = setInterval(() => {
            t--;
            err.textContent = `SYSTEM LOCKED — COOLDOWN: ${t}s`;
            if (t <= 0) {
              clearInterval(cd);
              btn.disabled = false;
              attempts = 0;
              err.style.display = 'none';
            }
          }, 1000);
        } else {
          err.textContent = `ACCESS DENIED — ${3 - attempts} ATTEMPT${3 - attempts !== 1 ? 'S' : ''} REMAINING`;
        }
        document.getElementById('passcode').value = '';
      }
    }

    document.onkeydown = e => {
      if (e.keyCode === 123 ||
         (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) ||
         (e.ctrlKey && e.keyCode === 85)) return false;
    };

    window.addEventListener('blur',  () => document.body.style.filter = 'blur(20px)');
    window.addEventListener('focus', () => document.body.style.filter = '');

    function tick() {
      const el = document.getElementById('clock');
      if (el) el.textContent = new Date().toLocaleTimeString('en-US', { hour12: false, timeZone: 'UTC' });
    }
    setInterval(tick, 1000); tick();
