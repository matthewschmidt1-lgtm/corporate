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

  // The whole site in one line: hover a term on desktop, tap and step through on phones
  var eq = document.getElementById('eq');
  if (eq) {
    var POP = {
      focus: { k: 'Focus', t: 'Fifteen priorities is a hiding place.', s: 'Pick three and say no to the rest out loud. Your no is what makes your yes worth anything.', href: 'lessons.html#lesson-focus', label: 'Watch the lesson' },
      customer: { k: 'Customer', t: 'The customer is not in the room until someone brings them in.', s: 'At the next decision, name who speaks for them. If nobody can, congratulations, you just found the first fix.', href: 'lessons.html#lesson-customer', label: 'Watch the lesson' },
      simplicity: { k: 'Simplicity', t: 'Easy is cheap. Simple is expensive.', s: 'Which is why most companies skip it. Seven layers, one carries the value. Remove the rest on purpose, then guard the door so they do not sneak back in.', href: 'lessons.html#lesson-simplicity', label: 'Watch the lesson' },
      excellence: { k: 'Excellence', t: 'Finish the back of the cabinet.', s: 'Nobody will check. That is exactly why it matters. Care that only shows up when someone is watching is not care, it is theater.', href: 'lessons.html#lesson-excellence', label: 'Watch the lesson' },
      innovation: { k: 'Innovation', t: 'Most limits are old habits with good posture.', s: 'Pick one thing your industry calls a law. Ask it a rude question: real limit, or just the way it has always been done?', href: 'lessons.html#lesson-innovation', label: 'Watch the lesson' },
      monday: { k: 'Times Monday', t: 'Five lessons times zero action is zero.', s: 'This is the multiplier. One move a week, said out loud, beats a strategy deck nobody opens. Startup Speed has eight moves to pick from.', href: 'startup-speed.html', label: 'Pick a move' },
      company: { k: 'Equals', t: 'A company that works for the customer, not a bureaucracy that works for itself.', s: 'That is the whole site in one line. The game tells you how close yours is. Twelve cards, no account, nothing saved.', href: 'play.html?go=staff', label: 'Play the game' }
    };
    var terms = Array.prototype.slice.call(eq.querySelectorAll('.term'));
    var order = terms.map(function (b) { return b.getAttribute('data-k'); });
    var pop = document.getElementById('eq-pop'), cur = -1, pinned = false, hideTimer = null;
    var hidePop = function () {
      pop.hidden = true; cur = -1; pinned = false;
      terms.forEach(function (b) { b.classList.remove('on'); b.setAttribute('aria-expanded', 'false'); });
    };
    var cancelHide = function () { if (hideTimer) { clearTimeout(hideTimer); hideTimer = null; } };
    var scheduleHide = function () { cancelHide(); if (!pinned) hideTimer = setTimeout(function () { if (!pinned) hidePop(); }, 260); };
    var showPop = function (k, scroll) {
      var d = POP[k]; if (!d) return;
      cur = order.indexOf(k);
      terms.forEach(function (b) { var on = b.getAttribute('data-k') === k; b.classList.toggle('on', on); b.setAttribute('aria-expanded', on ? 'true' : 'false'); });
      document.getElementById('eqp-k').textContent = d.k;
      document.getElementById('eqp-t').textContent = d.t;
      document.getElementById('eqp-next').textContent = cur === order.length - 1 ? 'Start over' : 'Next';
      if (pop.hidden) { pop.hidden = false; } else { pop.classList.remove('eq-pop'); void pop.offsetWidth; pop.classList.add('eq-pop'); }
      if (scroll && pop.scrollIntoView) pop.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    };
    var fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    terms.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-k');
        if (pinned && order[cur] === k) { hidePop(); return; }
        showPop(k, true); pinned = true; cancelHide();
      });
      if (fine) b.addEventListener('mouseenter', function () { cancelHide(); if (!pinned) showPop(b.getAttribute('data-k'), false); });
    });
    if (fine) {
      [eq, pop].forEach(function (el) {
        el.addEventListener('mouseleave', scheduleHide);
        el.addEventListener('mouseenter', cancelHide);
      });
    }
    document.getElementById('eqp-next').addEventListener('click', function () { showPop(order[(cur + 1) % order.length], true); pinned = true; });
    document.addEventListener('click', function (e) {
      if (pop.hidden) return;
      if (eq.contains(e.target) || pop.contains(e.target)) return;
      hidePop();
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !pop.hidden) hidePop(); });
  }

  // The lessons, in motion: each panel plays once when it is well in view, and again on Replay
  var mls = document.querySelectorAll('.ml, .seed-anim, .river-anim');
  if (mls.length) {
    var playPanel = function (el) { el.classList.remove('play'); void el.offsetWidth; el.classList.add('play'); };
    if ('IntersectionObserver' in window) {
      var mio = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('play'); mio.unobserve(e.target); }
        });
      }, { threshold: 0.35 });
      mls.forEach(function (el) { mio.observe(el); });
    } else {
      mls.forEach(function (el) { el.classList.add('play'); });
    }
    var replays = document.querySelectorAll('.ml-replay');
    for (var ri = 0; ri < replays.length; ri++) {
      replays[ri].addEventListener('click', function () {
        var li = this; while (li && !(li.classList && li.classList.contains('ml'))) li = li.parentNode;
        if (li) playPanel(li);
      });
    }
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
