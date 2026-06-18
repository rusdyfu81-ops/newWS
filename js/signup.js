/* Sign Up — Supabase signUp (first/last name -> user_metadata) */
(function () {
  var form = document.getElementById('signup-form');
  var msg = document.getElementById('auth-msg');
  function show(t, ok) { msg.textContent = t; msg.className = 'auth-msg' + (ok ? ' ok' : ' err'); }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var first = document.getElementById('first_name').value.trim();
    var last = document.getElementById('last_name').value.trim();
    var email = document.getElementById('email').value.trim();
    var pass = document.getElementById('password').value;

    if (!email || !pass) { show('Email dan password wajib diisi.', false); return; }
    if (pass.length < 8) { show('Password minimal 8 karakter.', false); return; }

    if (SP.demo || !SP.client) {
      show('Mode demo: akun dummy dibuat. Mengarahkan ke dashboard...', true);
      setTimeout(function () { window.location.href = SP.cfg.AFTER_LOGIN || 'dashboard.html'; }, 800);
      return;
    }
    show('Mendaftarkan...', true);
    var r = await SP.client.auth.signUp({
      email: email, password: pass,
      options: { data: { first_name: first, last_name: last } }
    });
    if (r.error) { show(r.error.message, false); return; }
    show('Berhasil! Cek email Anda untuk konfirmasi sebelum login.', true);
    form.reset();
  });
})();
