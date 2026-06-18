/* Dashboard — guard + ambil data user dari Supabase (fallback ke data demo) */
(function () {
  var DEMO = {
    first_name: 'Rini', last_name: 'Susanto', role: 'Pelajar',
    avatar_url: '', owned: 3, total_books: 8, overall_pct: 37,
    videos_watched: 14, total_minutes: 480, worksheets_done: 3,
    resume: { vol: 1, ep: 5, total_ep: 12, title: 'Protoevangelium: Janji Keselamatan Pertama',
              minutes_left: 38, pct: 35 },
    books: [
      { title: 'Awal Mula Segalanya', pct: 35, ep: 5, total_ep: 12 },
      { title: 'Awal Mula Segalanya', pct: 35, ep: 5, total_ep: 12 },
      { title: 'Awal Mula Segalanya', pct: 35, ep: 5, total_ep: 12 }
    ]
  };

  function h(min) { return Math.round(min / 60); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function set(id, v) { var e = document.getElementById(id); if (e) e.textContent = v; }
  function setW(id, pct) { var e = document.getElementById(id); if (e) e.style.width = pct + '%'; }

  function render(d) {
    if (d.avatar_url) {
      var av = document.getElementById('u-avatar');
      if (av) { av.textContent = ''; av.style.backgroundImage = 'url(' + d.avatar_url + ')'; av.style.backgroundSize = 'cover'; av.style.backgroundPosition = 'center'; }
    }
    set('u-name', (d.first_name + ' ' + (d.last_name || '')).trim().toUpperCase());
    set('u-role', '+ ' + (d.role || 'Pelajar'));
    set('u-progress-label', d.owned + '/' + d.total_books + ' buku \u00b7 ' + d.overall_pct + '%');
    setW('u-progress-bar', d.overall_pct);
    set('stat-books', pad(d.owned));
    set('stat-videos', pad(d.videos_watched));
    set('stat-hours', h(d.total_minutes) + 'h');
    set('stat-worksheets', pad(d.worksheets_done));

    if (d.resume) {
      set('resume-meta', 'Vol. ' + d.resume.vol + ' \u00b7 Episode ' + d.resume.ep + ' dari ' + d.resume.total_ep);
      set('resume-title', d.resume.title);
      set('resume-sub', 'Video \u00b7 ' + d.resume.minutes_left + ' menit tersisa');
      set('resume-pct', d.resume.pct + '% selesai');
      setW('resume-bar', d.resume.pct);
    }

    var grid = document.getElementById('mybooks-grid');
    if (grid && d.books) {
      grid.innerHTML = d.books.map(function (b) {
        return '' +
          '<div class="mb-card">' +
            '<div class="mb-cover">' +
              '<img src="assets/images/book-2.png" alt="" onerror="this.onerror=null;this.src=\'assets/images/book-1.png\'"/>' +
            '</div>' +
            '<div class="mb-body">' +
              '<p class="mb-title">' + b.title + '</p>' +
              '<div class="mb-bar"><span style="width:' + b.pct + '%"></span></div>' +
              '<p class="mb-meta">' + b.pct + '% \u00b7 EP. ' + b.ep + '/' + b.total_ep + '</p>' +
            '</div>' +
          '</div>';
      }).join('');
    }
  }

  async function fetchReal(user) {
    var sb = SP.client;
    var prof = (await sb.from('profiles').select('*').eq('id', user.id).single()).data || {};
    var ub = (await sb.from('user_books').select('*, books(title, total_episodes)').eq('user_id', user.id)).data || [];
    var totalBooks = (await sb.from('books').select('id', { count: 'exact', head: true })).count || 8;

    var owned = ub.length;
    var overall = owned ? Math.round(ub.reduce(function (s, r) { return s + (r.progress_pct || 0); }, 0) / owned) : 0;
    var resumeRow = ub.slice().sort(function (a, b) { return new Date(b.updated_at) - new Date(a.updated_at); })[0];

    return {
      first_name: prof.first_name || 'Member', last_name: prof.last_name || '', role: prof.role || 'Pelajar',
      owned: owned, total_books: totalBooks, overall_pct: overall,
      videos_watched: prof.videos_watched || 0, total_minutes: prof.total_minutes || 0,
      worksheets_done: prof.worksheets_done || 0,
      resume: resumeRow ? {
        vol: (resumeRow.books && resumeRow.books.title) ? resumeRow.current_episode : resumeRow.current_episode,
        ep: resumeRow.current_episode, total_ep: (resumeRow.books && resumeRow.books.total_episodes) || 12,
        title: resumeRow.resume_title || 'Lanjutkan materi Anda',
        minutes_left: resumeRow.resume_minutes_left || 0, pct: resumeRow.progress_pct || 0
      } : null,
      books: ub.map(function (r) {
        return { title: (r.books && r.books.title) || 'Buku', pct: r.progress_pct || 0,
                 ep: r.current_episode || 1, total_ep: (r.books && r.books.total_episodes) || 12 };
      })
    };
  }

  // Tombol keluar
  var out = document.getElementById('logout-btn');
  if (out) out.addEventListener('click', function (e) { e.preventDefault(); SP.signOut(); });

  (async function init() {
    if (SP.demo || !SP.client) { render(DEMO); return; }      // review: tampil tanpa login
    var user = await SP.requireAuth();                         // produksi: wajib login
    if (!user) return;
    try { render(await fetchReal(user)); }
    catch (err) { console.error(err); render(DEMO); }
  })();
})();
