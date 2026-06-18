/* Toggle menu mobile (hamburger). Dipakai di semua halaman ber-navbar. */
(function () {
  document.addEventListener('click', function (e) {
    var ham = e.target.closest('.nav-hamburger');
    if (ham) {
      var nav = ham.closest('.nav');
      if (nav) {
        var open = nav.classList.toggle('nav-open');
        ham.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
      return;
    }
    // tutup menu saat sebuah link/menu diklik
    var link = e.target.closest('.nav-menu a, .nav-actions a, .nav-logout');
    if (link) {
      var navp = link.closest('.nav');
      if (navp) navp.classList.remove('nav-open');
    }
  });
})();
