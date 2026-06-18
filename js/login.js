/* Login — Supabase signInWithPassword */
(function () {
  var form = document.getElementById('login-form');
  var msg = document.getElementById('auth-msg');
  function show(t, ok) { msg.textContent = t; msg.className = 'auth-msg' + (ok ? ' ok' : ' err'); }

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    var pass = document.getElementById('password').value;
    if (!email || !pass) { show('Email dan password wajib diisi.', false); return; }

    if (SP.demo || !SP.client) {
      show('Mode demo: login dummy berhasil. Mengarahkan ke dashboard...', true);
      setTimeout(function () { window.location.href = SP.cfg.AFTER_LOGIN || 'dashboard.html'; }, 700);
      return;
    }
    show('Memproses...', true);
    var r = await SP.client.auth.signInWithPassword({ email: email, password: pass });
    if (r.error) { show(r.error.message, false); return; }
    window.location.href = SP.cfg.AFTER_LOGIN || 'dashboard.html';
  });

  // "Lupa password?" — kirim email reset bila kolom email sudah diisi
  var forgot = document.getElementById('forgot-link');
  if (forgot) forgot.addEventListener('click', async function (e) {
    e.preventDefault();
    var email = document.getElementById('email').value.trim();
    if (!email) { show('Isi email dulu, lalu klik "Forgot" untuk kirim link reset.', false); return; }
    if (SP.demo || !SP.client) { show('Mode demo: link reset tidak dikirim.', true); return; }
    var r = await SP.client.auth.resetPasswordForEmail(email);
    show(r.error ? r.error.message : 'Link reset password dikirim ke email Anda.', !r.error);
  });
})();
