/* Tabs halaman detail buku */
(function () {
  var tabs = document.querySelectorAll('.bd-tab');
  var panels = document.querySelectorAll('.bd-panel');
  tabs.forEach(function (t) {
    t.addEventListener('click', function () {
      tabs.forEach(function (x) { x.classList.remove('active'); });
      panels.forEach(function (p) { p.classList.remove('active'); });
      t.classList.add('active');
      var target = document.getElementById(t.getAttribute('data-tab'));
      if (target) target.classList.add('active');
    });
  });
})();
