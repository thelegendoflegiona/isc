    function tick() {
      const now = new Date(Date.now() + 8 * 3600000);
      const p = n => String(n).padStart(2, '0');
      document.getElementById('clock').textContent =
        `${p(now.getUTCHours())} : ${p(now.getUTCMinutes())} : ${p(now.getUTCSeconds())}`;
    }
    setInterval(tick, 1000); tick();

    (function () {
      const now = new Date(Date.now() + 8 * 3600000);
      const p = n => String(n).padStart(2, '0');
      document.getElementById('myt-date').textContent =
        `${p(now.getUTCDate())}/${p(now.getUTCMonth() + 1)}/${now.getUTCFullYear()}`;
    })();
