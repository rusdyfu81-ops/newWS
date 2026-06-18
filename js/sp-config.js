/* ============================================================
   KONFIGURASI SUPABASE
   Isi URL & anon key dari: Supabase Dashboard > Project Settings > API.
   anon key MEMANG aman dipakai di browser ASALKAN RLS aktif (lihat schema.sql).
   ============================================================ */
window.SP_CONFIG = {
  SUPABASE_URL: "https://YOUR-PROJECT.supabase.co",  // <-- ganti
  SUPABASE_ANON_KEY: "YOUR-ANON-KEY",                // <-- ganti

  // DEMO_MODE true  -> halaman tampil dgn data contoh TANPA login (untuk review tim).
  // DEMO_MODE false -> autentikasi & proteksi halaman AKTIF (untuk produksi).
  // Set false setelah URL + anon key diisi.
  DEMO_MODE: true,

  // Ke mana user diarahkan setelah login berhasil:
  AFTER_LOGIN: "dashboard.html",
  // Halaman login (tujuan jika belum login membuka halaman member):
  LOGIN_PAGE: "login.html"
};
