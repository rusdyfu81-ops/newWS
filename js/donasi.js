/* Form donasi: toggle frekuensi + pilih nominal + input custom */
(function () {
  // frekuensi
  var seg = document.querySelectorAll('.dn-seg button');
  seg.forEach(function (b) {
    b.addEventListener('click', function () {
      seg.forEach(function (x) { x.classList.remove('active'); });
      b.classList.add('active');
    });
  });

  // nominal preset
  var amts = document.querySelectorAll('.dn-amt');
  var custom = document.getElementById('dn-custom');
  amts.forEach(function (a) {
    a.addEventListener('click', function () {
      amts.forEach(function (x) { x.classList.remove('active'); });
      a.classList.add('active');
      if (custom) custom.value = '';
    });
  });
  // ketik nominal sendiri -> batalkan preset
  if (custom) custom.addEventListener('input', function () {
    amts.forEach(function (x) { x.classList.remove('active'); });
  });

  // submit (demo)
  var form = document.getElementById('dn-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var freq = document.querySelector('.dn-seg button.active');
    var amt = document.querySelector('.dn-amt.active');
    var val = (custom && custom.value) ? ('Rp ' + custom.value) : (amt ? amt.textContent.trim() : '-');
    var msg = document.getElementById('dn-msg');
    if (msg) {
      msg.textContent = 'Terima kasih! Donasi ' + val + ' (' + (freq ? freq.textContent.trim() : '') + ') — gerbang pembayaran akan ditambahkan.';
      msg.style.display = 'block';
    }
  });
})();
