/* ============================================================
   HELPER AUTH BERSAMA (dipakai login.js, signup.js, dashboard.js)
   Memuat client Supabase bila terkonfigurasi & DEMO_MODE=false.
   ============================================================ */
(function () {
  var cfg = window.SP_CONFIG || {};
  var configured =
    cfg.SUPABASE_URL && cfg.SUPABASE_ANON_KEY &&
    cfg.SUPABASE_URL.indexOf("YOUR-PROJECT") === -1 &&
    cfg.SUPABASE_ANON_KEY.indexOf("YOUR-ANON") === -1;

  // true = jalankan sebagai demo (tanpa Supabase)
  var demo = cfg.DEMO_MODE || !configured;

  var sb = null;
  if (!demo && window.supabase && typeof window.supabase.createClient === "function") {
    sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY);
  }

  window.SP = {
    cfg: cfg,
    demo: demo,
    client: sb,

    // Guard halaman member: panggil di halaman yang butuh login.
    // Pakai getUser() (verifikasi ke server), BUKAN getSession().
    requireAuth: async function () {
      if (demo || !sb) return null;                 // mode demo: lewati proteksi
      var res = await sb.auth.getUser();
      var user = res && res.data ? res.data.user : null;
      if (!user) {
        window.location.href = cfg.LOGIN_PAGE || "login.html";
        return null;
      }
      return user;
    },

    signOut: async function () {
      if (sb) { try { await sb.auth.signOut(); } catch (e) {} }
      window.location.href = cfg.LOGIN_PAGE || "login.html";
    }
  };
})();
