/* Halaman hasil pencarian: baca ?q=, highlight, filter tab */
(function () {
  function getQ() {
    var m = new URLSearchParams(location.search).get('q');
    return (m && m.trim()) ? m.trim() : 'Perjanjian Lama';
  }
  var q = getQ();

  // tampilkan query
  var qEl = document.getElementById('sr-q');
  if (qEl) qEl.textContent = q;
  var input = document.getElementById('sr-input');
  if (input) input.value = q;

  // form submit -> ?q=
  var form = document.getElementById('sr-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var v = input.value.trim();
    location.href = 'search.html?q=' + encodeURIComponent(v || q);
  });

  // highlight kata kunci di judul & deskripsi
  function esc(s){ return s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'); }
  if (q) {
    var re = new RegExp('(' + esc(q) + ')', 'gi');
    document.querySelectorAll('.sr-title a, .sr-desc').forEach(function (el) {
      el.innerHTML = el.innerHTML.replace(re, '<mark>$1</mark>');
    });
  }

  // filter tab
  var tabs = document.querySelectorAll('.sr-tab');
  var items = Array.prototype.slice.call(document.querySelectorAll('.sr-item'));
  var empty = document.getElementById('sr-empty');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      var f = t.getAttribute('data-type');
      var shown = 0;
      items.forEach(function (it) {
        var types = (it.getAttribute('data-type') || '').split(' ');
        var ok = (f === 'all') || types.indexOf(f) !== -1;
        it.style.display = ok ? '' : 'none';
        if (ok) shown++;
      });
      if (empty) empty.style.display = shown ? 'none' : 'block';
    });
  });
})();
