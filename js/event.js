/* Event page: countdown + tab fitur + filter event mendatang */
(function () {
  // --- Countdown ---
  var cd = document.querySelector('.countdown[data-deadline]');
  if (cd) {
    var deadline = new Date(cd.getAttribute('data-deadline')).getTime();
    var pad = function (n) { return n < 10 ? '0' + n : '' + n; };
    var set = function (id, v) { var e = document.getElementById(id); if (e) e.textContent = pad(v); };
    var tick = function () {
      var d = Math.max(0, deadline - Date.now());
      var days = Math.floor(d / 86400000); d -= days * 86400000;
      var hrs = Math.floor(d / 3600000); d -= hrs * 3600000;
      var mins = Math.floor(d / 60000); d -= mins * 60000;
      set('cd-days', days); set('cd-hrs', hrs); set('cd-mins', mins); set('cd-secs', Math.floor(d / 1000));
    };
    tick(); setInterval(tick, 1000);
  }

  // --- Tab fitur (Akan Datang / Kelas Live / ...) : active + scroll ke daftar ---
  var ftabs = document.querySelectorAll('.ev-tab');
  ftabs.forEach(function (t) {
    t.addEventListener('click', function () {
      ftabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      var arch = t.getAttribute('data-scroll');
      if (arch) { var el = document.getElementById(arch); if (el) el.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // --- Filter "Semua Event Mendatang" ---
  var fbtns = document.querySelectorAll('.ev-fbtn');
  var rows = Array.prototype.slice.call(document.querySelectorAll('.ev-row'));
  var emptyMsg = document.getElementById('ev-empty');
  fbtns.forEach(function (b) {
    b.addEventListener('click', function () {
      fbtns.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
      var f = b.getAttribute('data-filter');
      var shown = 0;
      rows.forEach(function (r) {
        var cats = (r.getAttribute('data-cat') || '').split(' ');
        var ok = (f === 'all') || cats.indexOf(f) !== -1;
        r.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (emptyMsg) emptyMsg.style.display = shown ? 'none' : 'block';
    });
  });
})();
