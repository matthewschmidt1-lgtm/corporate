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

// Header sub-menus on phones and touch screens: tap a header to open its list of sections
(function () {
  var items = document.querySelectorAll('.nav-item');
  if (!items.length || !window.matchMedia) return;
  var tapMode = window.matchMedia('(hover: none), (max-width: 860px)');
  var close = function (except) {
    items.forEach(function (it) {
      if (it === except) return;
      it.classList.remove('open');
      var t = it.querySelector(':scope > a');
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  };
  items.forEach(function (it) {
    var top = it.querySelector(':scope > a');
    var sub = it.querySelector('.nav-sub');
    if (!top || !sub) return;
    var home = document.createElement('a');
    home.className = 'nav-sub-home';
    home.href = top.getAttribute('href');
    home.textContent = top.textContent;
    sub.insertBefore(home, sub.firstChild);
    top.setAttribute('aria-haspopup', 'true');
    top.setAttribute('aria-expanded', 'false');
    top.addEventListener('click', function (e) {
      if (!tapMode.matches) return;
      e.preventDefault();
      var open = !it.classList.contains('open');
      close(it);
      it.classList.toggle('open', open);
      top.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    sub.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.nav-item')) close();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  window.addEventListener('pageshow', function () { close(); });
})();

