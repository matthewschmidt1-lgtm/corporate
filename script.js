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


  // Sample card on the home page. Nothing is stored or sent.
  var demo = document.getElementById('demo');
  if (demo) {
    var R = {
      A: ['Entrepreneurial', 'The decision took exactly as long as the decision.'],
      B: ['Healthy corporate', 'A week for $2,000 is fine. Nobody is hurt.'],
      C: ['Bureaucratic', 'A two minute decision, now scheduled for next month.'],
      D: ['Self-protective', 'Nobody decides. Everybody watches.']
    };
    var out = document.getElementById('demo-out'), cta = document.getElementById('demo-cta');
    var opts = demo.querySelectorAll('.d-opt');
    opts.forEach(function (b) {
      b.addEventListener('click', function () {
        opts.forEach(function (o) { o.classList.remove('sel'); o.setAttribute('aria-pressed', 'false'); });
        b.classList.add('sel'); b.setAttribute('aria-pressed', 'true');
        var r = R[b.getAttribute('data-k')];
        out.textContent = r[0] + '. ' + r[1];
        out.className = 'demo-out t-' + b.getAttribute('data-k');
        out.hidden = false; cta.hidden = false;
        if (out.scrollIntoView) out.scrollIntoView({ block: 'center', behavior: 'smooth' });
      });
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
