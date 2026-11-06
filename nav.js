(function () {
  var m = document.querySelector('.nav-menu');
  if (!m) return;
  m.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.nav-panel a')) m.open = false;
  });
  document.addEventListener('click', function (e) {
    if (m.open && !m.contains(e.target)) m.open = false;
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && m.open) { m.open = false; var s = m.querySelector('summary'); if (s) s.focus(); }
  });
})();
