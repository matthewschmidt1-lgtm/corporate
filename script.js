(function () {
  document.documentElement.classList.add('js');

  // Field guide, rendered from the shared deck
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  var D = window.DECK;
  var catalog = document.getElementById('catalog');
  if (D && catalog) {
    D.cats.forEach(function (c) {
      if (c.id === 'tells') return;
      var cards = D.cards.filter(function (x) { return x.cat === c.id; });
      var block = mk('div', 'cat reveal');
      var head = mk('div', 'cat-head');
      head.appendChild(mk('h3', null, c.name));
      head.appendChild(mk('span', null, cards.length + ' practices'));
      block.appendChild(head);
      var list = mk('ol', 'crows');
      cards.forEach(function (x) {
        var li = mk('li');
        li.appendChild(mk('span', 'n', (x.id < 10 ? '0' : '') + x.id));
        var t = mk('span', 't');
        t.appendChild(mk('strong', null, x.t));
        t.appendChild(mk('em', null, x.joke));
        li.appendChild(t);
        li.appendChild(mk('span', 'd', x.why));
        list.appendChild(li);
      });
      block.appendChild(list);
      block.appendChild(mk('p', 'example', c.example));
      var better = mk('p', 'better');
      better.appendChild(mk('strong', null, 'Better approach: '));
      better.appendChild(document.createTextNode(c.better));
      block.appendChild(better);
      catalog.appendChild(block);
    });
  }
  var tells = document.getElementById('tells');
  if (D && tells) {
    var tl = mk('ol', 'crows tells-list reveal');
    D.cards.filter(function (x) { return x.cat === 'tells'; }).forEach(function (x, i) {
      var li = mk('li');
      li.appendChild(mk('span', 'n', (i + 1 < 10 ? '0' : '') + (i + 1)));
      li.appendChild(mk('span', 't phrase', '“' + x.t + '”'));
      li.appendChild(mk('span', 'd', x.why));
      tl.appendChild(li);
    });
    tells.appendChild(tl);
  }
  var ar = document.getElementById('antirules');
  if (D && ar) {
    D.rules.forEach(function (r, i) {
      var li = mk('li');
      li.appendChild(mk('span', 'n', (i + 1 < 10 ? '0' : '') + (i + 1)));
      li.appendChild(mk('span', 'd', r));
      ar.appendChild(li);
    });
  }


  // Swipeable comparison: keep the position counter honest
  var vs = document.getElementById('vs-list'), vc = document.getElementById('vs-count');
  if (vs && vc) {
    var total = vs.children.length;
    vs.addEventListener('scroll', function () {
      var w = vs.children[0].getBoundingClientRect().width + 12;
      var i = Math.min(total, Math.max(1, Math.round(vs.scrollLeft / w) + 1));
      vc.textContent = i + ' of ' + total + '. Swipe for more.';
    }, { passive: true });
  }

  // Five questions: each opens as you scroll to it. Tap a row to jump to it.
  var q5 = document.querySelectorAll('.q5-d');
  var track = document.getElementById('q5-track'), pin = document.getElementById('q5-pin');
  if (track && pin && q5.length) {
    var rows = [], dots = mk('div', 'q5-dots'); dots.setAttribute('aria-hidden', 'true');
    q5.forEach(function (d) { rows.push(d.parentNode); dots.appendChild(mk('span')); });
    pin.insertBefore(dots, pin.firstChild);
    track.classList.add('scrolly');
    q5.forEach(function (d) { d.open = true; });
    var idx = -1, ticking = false, STICKY = 64;
    var place = function () {
      STICKY = Math.max(64, Math.round((window.innerHeight - pin.offsetHeight) / 2));
      pin.style.top = STICKY + 'px';
    };
    var setIdx = function (n) {
      if (n === idx) return; idx = n;
      rows.forEach(function (li, i) { li.classList.toggle('active', i === n); });
      for (var m = 0; m < dots.children.length; m++) dots.children[m].className = m < n ? 'done' : (m === n ? 'cur' : '');
    };
    var span = function () { return Math.max(1, track.offsetHeight - pin.offsetHeight); };
    var update = function () {
      ticking = false;
      var p = (STICKY - track.getBoundingClientRect().top) / span();
      p = Math.max(0, Math.min(0.9999, p));
      setIdx(Math.floor(p * q5.length));
    };
    var onScroll = function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () { place(); onScroll(); });
    place();
    q5.forEach(function (d, i) {
      d.querySelector('summary').addEventListener('click', function (e) {
        e.preventDefault();
        var top = track.getBoundingClientRect().top + window.scrollY - STICKY;
        var y = top + (i + 0.5) / q5.length * span();
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
    update();
  }

  // The blueprint chain: one principle at a time, each leading to the next
  var chain = document.getElementById('chain');
  if (chain) {
    var links = chain.querySelectorAll('.bp'), bar = document.getElementById('chain-bar');
    var ctl = document.getElementById('chain-ctl'), nb = document.getElementById('chain-next'), bb = document.getElementById('chain-back');
    var cur = 0, reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    chain.classList.add('js');
    bar.hidden = false; ctl.hidden = false;
    for (var q = 0; q < links.length; q++) bar.appendChild(mk('span'));
    var show = function (n, dir) {
      cur = Math.max(0, Math.min(links.length - 1, n));
      for (var m = 0; m < links.length; m++) {
        links[m].classList.toggle('on', m === cur);
        links[m].classList.remove('from-r', 'from-l');
        bar.children[m].className = m < cur ? 'done' : (m === cur ? 'cur' : '');
      }
      if (!reduce && dir) links[cur].classList.add(dir > 0 ? 'from-r' : 'from-l');
      bb.disabled = cur === 0;
      nb.hidden = cur === links.length - 1;
      bb.hidden = cur === links.length - 1 && false;
      nb.textContent = cur === links.length - 2 ? 'Finish' : 'Next';
    };
    nb.addEventListener('click', function () { show(cur + 1, 1); });
    bb.addEventListener('click', function () { show(cur - 1, -1); });
    chain.addEventListener('keydown', function (e) {
      if (e.target && e.target.tagName === 'A') return;
      if (e.key === 'ArrowRight') { show(cur + 1, 1); e.preventDefault(); }
      else if (e.key === 'ArrowLeft') { show(cur - 1, -1); e.preventDefault(); }
    });
    var x0 = null;
    chain.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    chain.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
    }, { passive: true });
    show(0, 0);
  }

  // Scroll reveal
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  // Diagnosis
  var verdicts = [
    ['Suspiciously healthy.', 'Check again after lunch.'],
    ['Suspiciously healthy.', 'Check again after lunch.'],
    ['Early paperwork.', 'Still a company. Barely a committee. Act now while the fix is a memo and not a reorg.'],
    ['Early paperwork.', 'Still a company. Barely a committee. Act now while the fix is a memo and not a reorg.'],
    ['Committee fever.', 'Your best people are spending their best hours explaining things to people who will not decide. Pick one priority and cut one approval this week.'],
    ['Committee fever.', 'Your best people are spending their best hours explaining things to people who will not decide. Pick one priority and cut one approval this week.'],
    ['A bureaucracy with a logo.', 'Treat it like a turnaround. Start with question one, and do not form a task force to answer it.'],
    ['A bureaucracy with a logo.', 'Treat it like a turnaround. Start with question one, and do not form a task force to answer it.'],
    ['A bureaucracy with a logo.', 'Treat it like a turnaround. Start with question one, and do not form a task force to answer it.']
  ];
  var form = document.getElementById('diag');
  if (form) {
    var boxes = form.querySelectorAll('input[type=checkbox]');
    var score = document.getElementById('score');
    var title = document.getElementById('verdict-title');
    var text = document.getElementById('verdict-text');
    var update = function () {
      var n = 0;
      boxes.forEach(function (b) { if (b.checked) n++; });
      score.textContent = n;
      title.textContent = verdicts[n][0];
      text.textContent = verdicts[n][1];
      var nx = document.getElementById('verdict-next');
      if (nx) {
        var a = nx.querySelector('a');
        a.textContent = n <= 1 ? 'Protect it. Write down why you built the company, then play to find the leaks.'
          : n <= 3 ? 'Fix the first leak now. Play to find which one costs you most.'
          : n <= 5 ? 'Pick one priority and one approval to cut. Play to see where the rest hides.'
          : 'Start with question one. Play to see the specifics.';
      }
    };
    boxes.forEach(function (b) { b.addEventListener('change', update); });
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  }
})();
