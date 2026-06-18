// Countdown kelas live — ubah tanggal target di atribut data-deadline (format ISO).
(function () {
  var el = document.querySelector('.countdown');
  if (!el) return;
  var deadline = new Date(el.getAttribute('data-deadline')).getTime();

  // Tampilkan label tanggal otomatis dari data-deadline
  var dateEl = document.querySelector('.live-date');
  if (dateEl) {
    try {
      var d = new Date(deadline);
      var fmt = d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
      dateEl.textContent = fmt + ' \u00b7 19.00 WIB \u00b7 Zoom';
    } catch (e) {}
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function set(id, v) { var n = document.getElementById(id); if (n) n.textContent = pad(v); }

  function tick() {
    var diff = Math.max(0, deadline - Date.now());
    var days = Math.floor(diff / 86400000); diff -= days * 86400000;
    var hrs = Math.floor(diff / 3600000); diff -= hrs * 3600000;
    var mins = Math.floor(diff / 60000); diff -= mins * 60000;
    var secs = Math.floor(diff / 1000);
    set('cd-days', days); set('cd-hrs', hrs); set('cd-mins', mins); set('cd-secs', secs);
  }
  tick();
  setInterval(tick, 1000);
})();
