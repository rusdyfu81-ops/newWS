/* ============================================================
   components.js — Komponen terpusat: NAVBAR + FOOTER
   Ubah nav/footer CUKUP di file ini; semua halaman ikut berubah.

   Cara pakai di tiap halaman:
     <div id="site-nav" data-active="buku"></div>     (data-active opsional)
     <div id="site-footer"></div>
     <script src="js/components.js"></script>
   Untuk halaman member (dashboard), tandai logout:
     <div id="site-nav" data-logout></div>
   ============================================================ */
(function () {

  /* ---------- NAVBAR ---------- */
  function navHTML(active, logout) {
    var item = function (href, label, key) {
      return '<li><a href="' + href + '"' + (active === key ? ' class="active"' : '') + '>' + label + '</a></li>';
    };
    var actions = logout
      ? '<a href="#" class="nav-logout" id="logout-btn">Keluar</a>'
      : '<a href="login.html" class="nav-auth">Sign In / Sign Up</a>';
    return '' +
'<nav class="nav">' +
'  <a href="index.html"><img src="assets/images/logo_sp.png" alt="Sejarah Penebusan" class="nav-logo"/></a>' +
'  <ul class="nav-menu">' +
     item('buku.html', 'Buku', 'buku') +
'    <li><a href="index.html#perjalanan">Belajar</a></li>' +
     item('komunitas.html', 'Komunitas', 'komunitas') +
     item('event.html', 'Event', 'event') +
     item('tentang.html', 'Tentang', 'tentang') +
     item('donasi.html', 'Donasi', 'donasi') +
'    <li><a href="search.html" class="nav-search" aria-label="Cari">&#9099;</a></li>' +
'  </ul>' +
'  <div class="nav-actions">' + actions +
'    <span class="nav-lang">&#127470;&#127465; Indonesia</span>' +
'  </div>' +
'  <div class="nav-hamburger" aria-label="Menu"><span></span><span></span><span></span></div>' +
'</nav>';
  }

  /* ---------- FOOTER ---------- */
  var FOOTER_HTML = "<footer class=\"footer\" id=\"kontak\">\n  <div class=\"wrap\">\n    <div class=\"footer-grid\">\n      <!-- Brand -->\n      <div class=\"footer-col footer-col--brand\">\n        <div class=\"footer-logo-wrap\">\n          <img src=\"assets/images/logo_sp.png\" alt=\"Sejarah Penebusan\" class=\"footer-logo-icon\"/>\n        </div>\n        <p class=\"footer-desc\">Lorem ipsum dolor sit amet, consectetur moon el adipiscing elit, sed do eiusmod tempor incididunt ut labore et doloe magna aliqua.</p>\n        <p class=\"footer-section-title\">Follow Us</p>\n        <div class=\"footer-social\">\n          <a href=\"#\">f</a>\n          <a href=\"#\">\ud835\udd4f</a>\n          <a href=\"#\">\ud835\udc0f</a>\n          <a href=\"#\">\u2295</a>\n          <a href=\"#\">G+</a>\n        </div>\n      </div>\n\n      <!-- Contact -->\n      <div class=\"footer-col footer-col--contact\">\n        <p class=\"footer-section-title\">Contact Info</p>\n        <div class=\"footer-contact-list\">\n          <div class=\"footer-contact-item\"><span>\ud83d\udccd</span><span>AD : Cepok, jalan raya Cinere no8, po box 1843</span></div>\n          <div class=\"footer-contact-item\"><span>\ud83d\udcde</span><span>(+24) 1344 205 699</span></div>\n          <div class=\"footer-contact-item\"><span>\u2709</span><span>ContactArch@gmail.com</span></div>\n          <div class=\"footer-contact-item\"><span>\ud83d\udd50</span><span>Monday- Friday : 8am - 6pm</span></div>\n        </div>\n      </div>\n\n      <!-- Mail Us -->\n      <div class=\"footer-col footer-col--mail\">\n        <p class=\"footer-section-title\">Mail Us</p>\n        <input type=\"text\" class=\"mailus-field\" placeholder=\"Dari:\"/>\n        <input type=\"text\" class=\"mailus-field\" placeholder=\"Subject:\"/>\n        <textarea class=\"mailus-field\" placeholder=\"Isi pesan\"></textarea>\n        <div class=\"mailus-submit\">\n          <button class=\"btn-hero-orange\">Kirim</button>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"footer-copy\">\n      Copyright \u00a9 2026 Designed by <a href=\"#\">sejarah penebusan</a>. All rights reserved. &middot; <a href=\"privacy.html\">Privacy Policy</a>\n    </div>\n  </div>\n</footer>";

  /* ---------- INJECT ---------- */
  var navEl = document.getElementById('site-nav');
  if (navEl) {
    navEl.outerHTML = navHTML(navEl.getAttribute('data-active') || '', navEl.hasAttribute('data-logout'));
  }
  var ftEl = document.getElementById('site-footer');
  if (ftEl) { ftEl.outerHTML = FOOTER_HTML; }

  /* ---------- INTERAKSI NAV (delegasi, jadi tahan terhadap urutan) ---------- */
  document.addEventListener('click', function (e) {
    // hamburger toggle
    var ham = e.target.closest('.nav-hamburger');
    if (ham) {
      var nav = ham.closest('.nav');
      if (nav) { var open = nav.classList.toggle('nav-open'); ham.setAttribute('aria-expanded', open ? 'true' : 'false'); }
      return;
    }
    // logout (halaman member)
    var lo = e.target.closest('#logout-btn');
    if (lo) {
      e.preventDefault();
      if (window.SP && typeof SP.signOut === 'function') SP.signOut();
      else window.location.href = 'login.html';
      return;
    }
    // tutup menu mobile saat link diklik
    var link = e.target.closest('.nav-menu a, .nav-actions a');
    if (link) { var n = link.closest('.nav'); if (n) n.classList.remove('nav-open'); }
  });
})();
