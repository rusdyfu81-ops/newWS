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

  // submit -> lanjut ke halaman pembayaran donasi
  var form = document.getElementById('dn-form');
  if (form) form.addEventListener('submit', function (e) {
    e.preventDefault();
    var freq = document.querySelector('.dn-seg button.active');
    var amt = document.querySelector('.dn-amt.active');
    var rawAmt = (custom && custom.value) ? custom.value.replace(/[^0-9]/g, '') : (amt ? amt.textContent.replace(/[^0-9]/g, '') : '0');
    var freqText = freq ? freq.textContent.trim() : 'One Time';
    window.location.href = 'bayar-donasi.html?amount=' + encodeURIComponent(rawAmt) + '&freq=' + encodeURIComponent(freqText);
  });
})();
