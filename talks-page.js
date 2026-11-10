(function () {
  // In his own words: draws the shapes river, one room per shape, and the sources list from talks.js
  var T = window.TALKS, S = window.SHAPES;
  var river = document.getElementById('tk-river');
  var host = document.getElementById('talks');
  var srcList = document.getElementById('tk-talks');
  if (!T || !T.length || !S || !S.length || !host) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var COPPER = '#C47C55', INK = '#2A2621';
  var GLYPH = {
    tools: '<circle cx="12" cy="28" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="32" cy="28" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="28" x2="32" y2="14" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>',
    simplicity: '<rect x="6" y="16" width="32" height="12" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="22" y1="4" x2="22" y2="40" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>',
    customer: '<circle cx="22" cy="22" r="16" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="22" cy="22" r="4.5" fill="#C47C55"/>',
    excellence: '<rect x="6" y="6" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="13" width="18" height="18" fill="none" stroke="#C47C55" stroke-width="2"/>',
    people: '<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="21" r="5.5"/><circle cx="22" cy="21" r="5.5"/><circle cx="33" cy="21" r="5.5"/></g><line x1="6" y1="33" x2="38" y2="33" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>',
    focus: '<path d="M6 14V6h8M30 6h8v8M38 30v8h-8M14 38H6v-8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="22" x2="30" y2="22" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>',
    own: '<path d="M6 8L29 22M6 22H29M6 36L29 22" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="33.5" cy="22" r="4.5" fill="#C47C55"/>'
  };
  var WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
  var NUM = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  // A talk is keyed by its id when it has one, else by its year, so two talks can share a year
  var keyOf = function (t) { return String(t.id || t.year); };
  var byKey = {};
  T.forEach(function (t) { byKey[keyOf(t)] = t; });
  var YEARS = [];
  T.forEach(function (t) { if (YEARS.indexOf(t.year) < 0) YEARS.push(t.year); });
  function countFor(sh, t) { return (sh.counts && sh.counts[keyOf(t)]) || 0; }
  function countYear(sh, y) { var n = 0; T.forEach(function (t) { if (t.year === y) n += countFor(sh, t); }); return n; }

  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function sv(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function word(n) { return WORDS[n] || String(n); }
  function clock(s) {
    var h = Math.floor(s / 3600), m = Math.floor((s % 3600) / 60), x = s % 60;
    var mm = h ? (m < 10 ? '0' : '') + m : String(m);
    return (h ? h + ':' : '') + mm + ':' + (x < 10 ? '0' : '') + x;
  }
  function out(a) { a.target = '_blank'; a.rel = 'noopener'; return a; }
  function xs(n) {
    var pad = 60, step = n > 1 ? (600 - 2 * pad) / (n - 1) : 0;
    var r = [];
    for (var i = 0; i < n; i++) r.push(n > 1 ? pad + i * step : 300);
    return r;
  }

  // The count line reads as growing
  var count = document.getElementById('tk-count');
  if (count) count.textContent = 'More talks as they turn up.';

  // The river: one copper line, a station per shape
  if (river) {
    var X = xs(S.length), Y = 60, step = X.length > 1 ? X[1] - X[0] : 80;
    var d = 'M8 ' + Y + ' L ' + X[0] + ' ' + Y;
    for (var i = 0; i < X.length - 1; i++) {
      var a = X[i], b = X[i + 1], q = (b - a) / 2, dy = i % 2 ? Y - 12 : Y + 12;
      d += ' C ' + (a + q * 0.62) + ' ' + Y + ', ' + (a + q * 0.62) + ' ' + dy + ', ' + (a + q) + ' ' + dy +
        ' S ' + (b - q * 0.62) + ' ' + Y + ', ' + b + ' ' + Y;
    }
    var last = X[X.length - 1];
    d += ' C ' + (last + 26) + ' ' + Y + ', ' + (last + 32) + ' ' + (Y + 8) + ', 594 ' + (Y + 6);
    var svg = sv('svg', { 'class': 'river river-talks river-7', viewBox: '0 0 600 120', role: 'navigation', 'aria-label': 'The ideas' });
    svg.appendChild(sv('path', { 'class': 'rv-line', pathLength: '1', d: d, fill: 'none', stroke: COPPER, 'stroke-width': '2.5', 'stroke-linecap': 'round' }));
    svg.appendChild(sv('circle', { 'class': 'rv-dot', cx: '8', cy: String(Y), r: '5', fill: COPPER }));
    S.forEach(function (sh, i) {
      var x = X[i];
      var st = sv('a', { 'class': 'rv-st st' + (i + 1), href: '#shape-' + sh.id, 'aria-label': sh.name });
      st.appendChild(sv('rect', { 'class': 'rv-hit', x: String(x - step / 2), y: '0', width: String(step || 80), height: '120', fill: 'transparent' }));
      st.appendChild(sv('rect', { 'class': 'rv-tile', x: String(x - 24), y: String(Y - 24), width: '48', height: '48', fill: INK }));
      var g = sv('svg', { x: String(x - 18), y: String(Y - 18), width: '36', height: '36', viewBox: '0 0 44 44' });
      g.innerHTML = GLYPH[sh.glyph] || GLYPH.customer;
      st.appendChild(g);
      var lab = sv('text', { 'class': 'rv-lab', x: String(x), y: String(Y + 46), 'text-anchor': 'middle' });
      lab.textContent = sh.label;
      st.appendChild(lab);
      svg.appendChild(st);
    });
    river.appendChild(svg);
  }

  // A small year strip per shape: squares sized by how often he came back to it that year
  function strip(sh) {
    var W = 300, pad = 18, Y = 20, X = [];
    for (var k = 0; k < YEARS.length; k++) X.push(YEARS.length > 1 ? pad + k * (W - 2 * pad) / (YEARS.length - 1) : W / 2);
    var parts = [];
    var s = sv('svg', { 'class': 'ys', viewBox: '0 0 300 52', role: 'img' });
    s.appendChild(sv('line', { x1: '2', y1: String(Y), x2: '298', y2: String(Y), stroke: COPPER, 'stroke-width': '2' }));
    s.appendChild(sv('circle', { cx: '2', cy: String(Y), r: '3', fill: COPPER }));
    YEARS.forEach(function (y, i) {
      var n = countYear(sh, y);
      parts.push(y + ' ' + (NUM[n] || n));
      if (n) {
        var z = Math.min(22, 6 + n * 3.2);
        s.appendChild(sv('rect', { x: String(X[i] - z / 2), y: String(Y - z / 2), width: String(z), height: String(z), fill: INK }));
      } else {
        s.appendChild(sv('rect', { 'class': 'ys-none', x: String(X[i] - 4), y: String(Y - 4), width: '8', height: '8', fill: '#F3EEE4', stroke: INK, 'stroke-width': '1', opacity: '.5' }));
      }
      var lab = sv('text', { 'class': 'ys-lab', x: String(X[i]), y: '49', 'text-anchor': 'middle' });
      lab.textContent = String(y);
      s.appendChild(lab);
    });
    s.setAttribute('aria-label', 'Clear moments on this idea, by year: ' + parts.join(', ') + '.');
    return s;
  }

  // The rider and the watch live in figures.js, shared with the promos on other pages
  var FG = window.GarageFigures || null;

  // One room per shape, alternating cream and sand
  S.forEach(function (sh, i) {
    var sec = mk('section', 'section rule-in tk' + (i % 2 ? ' sand' : ''));
    sec.id = 'shape-' + sh.id;
    sec.setAttribute('aria-labelledby', sec.id + '-h');
    var wrap = mk('div', 'wrap tk-grid');

    var head = mk('div', 'tk-head');
    var years = T.filter(function (t) { return countFor(sh, t); }).length;
    head.appendChild(mk('p', 'eyebrow', 'In ' + word(years).toLowerCase() + ' of ' + word(T.length).toLowerCase() + ' talks'));
    var h = mk('h2', null, sh.name);
    h.id = sec.id + '-h';
    head.appendChild(h);
    head.appendChild(mk('p', 'tk-why', sh.meaning));
    if (FG && sh.figure === 'bicycle') { var bf = FG.bicycle(); head.appendChild(bf); head.appendChild(FG.bikePicker(bf)); }
    if (FG && sh.figure === 'watch') { var wf = FG.watch(); head.appendChild(wf); head.appendChild(FG.watchPicker(wf)); }
    head.appendChild(strip(sh));
    wrap.appendChild(head);

    var list = mk('ol', 'tk-moments');
    sh.moments.forEach(function (m) {
      var talk = byKey[String(m.talk)];
      if (!talk) return;
      var li = mk('li', 'tk-m reveal');
      li.appendChild(mk('p', 'tk-src', talk.year + ', ' + talk.venue));
      if (m.setup) li.appendChild(mk('p', 'tk-setup', m.setup));
      var bq = mk('blockquote', 'tk-q');
      bq.appendChild(mk('p', null, '“' + m.quote + '”'));
      li.appendChild(bq);
      var foot = mk('p', 'tk-foot');
      var a = out(mk('a', 'tk-t', clock(m.t)));
      a.href = 'https://www.youtube.com/watch?v=' + talk.videoId + '&t=' + m.t + 's';
      a.setAttribute('aria-label', clock(m.t) + ', watch from here on YouTube');
      foot.appendChild(a);
      if (m.note) foot.appendChild(mk('span', 'tk-note', m.note));
      li.appendChild(foot);
      list.appendChild(li);
    });
    wrap.appendChild(list);

    var mon = mk('p', 'monday tk-monday');
    mon.appendChild(mk('strong', null, 'Monday.'));
    mon.appendChild(document.createTextNode(' ' + sh.monday));
    wrap.appendChild(mon);
    sec.appendChild(wrap);
    host.appendChild(sec);
  });

  // The sources: one row per talk
  if (srcList) {
    srcList.textContent = '';
    T.forEach(function (t) {
      var li = mk('li');
      li.appendChild(mk('span', 'tl-y', String(t.year)));
      li.appendChild(mk('span', 'tl-v', t.venue));
      li.appendChild(mk('span', 'tl-c', (t.captionType === 'auto' ? 'Auto captions' : 'Channel captions') + ', ' + t.runtime));
      var a = out(mk('a', 'tl-w', 'Watch'));
      a.href = t.url;
      a.setAttribute('aria-label', 'Watch the ' + t.year + ' talk on YouTube');
      li.appendChild(a);
      srcList.appendChild(li);
    });
  }

  // One line about sources, at the foot of the page
  var src = document.getElementById('tk-sources');
  if (src) {
    var auto = T.filter(function (t) { return t.captionType === 'auto'; }).length;
    src.textContent = 'Passages are copied from each video’s captions. ' + word(auto) +
      (auto === 1 ? ' talk uses' : ' talks use') + ' YouTube’s automatic captions, tidied only for punctuation and capitals. The counts are our reading of the transcripts.';
  }
})();
