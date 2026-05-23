function pad(n) { return String(n).padStart(2, '0'); }
function tick() {
  const now = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kuala_Lumpur' }));
  const el = document.getElementById('clock');
  if (el) el.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes()) + ':' + pad(now.getSeconds());
  const dt = document.getElementById('myt-date');
  if (dt) dt.textContent = pad(now.getDate()) + '/' + pad(now.getMonth() + 1) + '/' + now.getFullYear();
}
tick();
setInterval(tick, 1000);
