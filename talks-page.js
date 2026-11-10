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
    people: '<g fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="30" r="5"/><circle cx="22" cy="30" r="5"/><circle cx="34" cy="30" r="5"/></g><circle cx="22" cy="12" r="5" fill="#C47C55"/>',
    focus: '<g stroke="currentColor" fill="none"><line x1="6" y1="8" x2="38" y2="8" stroke-width="1.5" opacity=".35"/><line x1="6" y1="15" x2="38" y2="15" stroke-width="4"/><line x1="6" y1="22" x2="38" y2="22" stroke-width="1.5" opacity=".35"/><line x1="6" y1="29" x2="38" y2="29" stroke-width="4"/><line x1="6" y1="36" x2="38" y2="36" stroke-width="1.5" opacity=".35"/></g>',
    own: '<rect x="8" y="8" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="22" y1="22" x2="40" y2="4" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/><circle cx="22" cy="22" r="3.5" fill="#C47C55"/>'
  };
  var WORDS = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve'];
  var NUM = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var byYear = {};
  T.forEach(function (t) { byYear[t.year] = t; });

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
  if (count) count.textContent = word(T.length) + (T.length === 1 ? ' talk, ' : ' talks, ') + word(S.length).toLowerCase() + ' ideas so far. More as they turn up.';

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
    for (var k = 0; k < T.length; k++) X.push(T.length > 1 ? pad + k * (W - 2 * pad) / (T.length - 1) : W / 2);
    var parts = [];
    var s = sv('svg', { 'class': 'ys', viewBox: '0 0 300 52', role: 'img' });
    s.appendChild(sv('line', { x1: '2', y1: String(Y), x2: '298', y2: String(Y), stroke: COPPER, 'stroke-width': '2' }));
    s.appendChild(sv('circle', { cx: '2', cy: String(Y), r: '3', fill: COPPER }));
    T.forEach(function (t, i) {
      var n = (sh.counts && sh.counts[t.year]) || 0;
      parts.push(t.year + ' ' + (NUM[n] || n));
      if (n) {
        var z = Math.min(22, 6 + n * 3.2);
        s.appendChild(sv('rect', { x: String(X[i] - z / 2), y: String(Y - z / 2), width: String(z), height: String(z), fill: INK }));
      } else {
        s.appendChild(sv('rect', { 'class': 'ys-none', x: String(X[i] - 4), y: String(Y - 4), width: '8', height: '8', fill: '#F3EEE4', stroke: INK, 'stroke-width': '1', opacity: '.5' }));
      }
      var lab = sv('text', { 'class': 'ys-lab', x: String(X[i]), y: '49', 'text-anchor': 'middle' });
      lab.textContent = String(t.year);
      s.appendChild(lab);
    });
    s.setAttribute('aria-label', 'Clear moments on this idea, by year: ' + parts.join(', ') + '.');
    return s;
  }


  // The bicycle for the mind: a line sketch that rides in once when it comes into view
  function bicycle() {
    var f = mk('figure', 'tk-fig bike-anim');
    f.setAttribute('aria-hidden', 'true');
    f.innerHTML =
      '<svg viewBox="0 0 320 200" focusable="false">' +
        '<path class="bk-ground" pathLength="1" d="M10 172 H 310" fill="none" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>' +
        '<g class="bk-bike" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
          '<g class="bk-wheel"><circle cx="92" cy="142" r="30"/><g class="bk-spokes" opacity=".45"><line x1="62" y1="142" x2="122" y2="142"/><line x1="77" y1="116" x2="107" y2="168"/><line x1="77" y1="168" x2="107" y2="116"/></g><circle cx="92" cy="142" r="2.5" fill="currentColor" stroke="none"/></g>' +
          '<g class="bk-wheel"><circle cx="236" cy="142" r="30"/><g class="bk-spokes" opacity=".45"><line x1="206" y1="142" x2="266" y2="142"/><line x1="221" y1="116" x2="251" y2="168"/><line x1="221" y1="168" x2="251" y2="116"/></g></g>' +
          '<path d="M92 142 L150 148 L138 92 L206 96 L236 142 M150 148 L206 96 M92 142 L138 92"/>' +
          '<path d="M128 90 L148 90 M206 96 L197 87 L191 89"/>' +
          '<path d="M140 136 L160 160 M158 160 L166 160 M136 136 L142 136" opacity=".8"/>' +
          '<path class="bk-far" d="M140 90 L152 122 L140 136" opacity=".5"/>' +
          '<path d="M140 90 L166 118 L160 160"/>' +
          '<path d="M140 90 Q150 70 170 64 L176 60 M170 64 L199 89"/>' +
          '<circle cx="179" cy="50" r="10"/>' +
          '<circle class="bk-hub" cx="236" cy="142" r="4.5" fill="#C47C55" stroke="none"/>' +
        '</g>' +
      '</svg>';
    return f;
  }


  // Simple outside, hard inside: a watch with the works showing. Gears turn and settle, hands sweep to ten past ten.
  function gearPath(cx, cy, r, n) {
    var d = '', depth = Math.max(3.5, r * 0.13), steps = n * 4;
    for (var i = 0; i <= steps; i++) {
      var a = (i / steps) * Math.PI * 2 - Math.PI / 2;
      var k = i % 4, rr = (k === 1 || k === 2) ? r : r - depth;
      var x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d + ' Z';
  }
  function watch() {
    var f = mk('figure', 'tk-fig watch-anim');
    f.setAttribute('aria-hidden', 'true');
    f.innerHTML =
      '<svg viewBox="0 0 320 200" focusable="false">' +
        '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
          '<circle class="wt-case" pathLength="1" cx="160" cy="100" r="78"/>' +
          '<path class="wt-case wt-crown" pathLength="1" d="M238 94 h8 v12 h-8"/>' +
          '<g class="wt-ticks" opacity=".6"><path d="M160 30 v6 M160 164 v6 M90 100 h6 M224 100 h6"/></g>' +
          '<g class="wt-works" opacity=".5">' +
            '<path class="wt-gear wt-g1" d="' + gearPath(132, 112, 40, 16) + '"/><circle cx="132" cy="112" r="6"/>' +
            '<path class="wt-gear wt-g2" d="' + gearPath(190, 89, 22, 10) + '"/><circle cx="190" cy="89" r="4"/>' +
            '<path class="wt-gear wt-g3" d="' + gearPath(182, 134, 11, 6) + '"/><circle cx="182" cy="134" r="2.5"/>' +
          '</g>' +
          '<line class="wt-hand wt-hour" x1="160" y1="100" x2="160" y2="62" stroke-width="3"/>' +
          '<line class="wt-hand wt-min" x1="160" y1="100" x2="160" y2="42" stroke="#C47C55" stroke-width="2.5"/>' +
          '<circle class="wt-pin" cx="160" cy="100" r="4.5" fill="#C47C55" stroke="none"/>' +
        '</g>' +
      '</svg>';
    return f;
  }

  // One room per shape, alternating cream and sand
  S.forEach(function (sh, i) {
    var sec = mk('section', 'section rule-in tk' + (i % 2 ? ' sand' : ''));
    sec.id = 'shape-' + sh.id;
    sec.setAttribute('aria-labelledby', sec.id + '-h');
    var wrap = mk('div', 'wrap tk-grid');

    var head = mk('div', 'tk-head');
    var years = T.filter(function (t) { return sh.counts && sh.counts[t.year]; }).length;
    head.appendChild(mk('p', 'eyebrow', 'In ' + word(years).toLowerCase() + ' of ' + word(T.length).toLowerCase() + ' talks'));
    var h = mk('h2', null, sh.name);
    h.id = sec.id + '-h';
    head.appendChild(h);
    head.appendChild(mk('p', 'tk-why', sh.meaning));
    if (sh.figure === 'bicycle') head.appendChild(bicycle());
    if (sh.figure === 'watch') head.appendChild(watch());
    head.appendChild(strip(sh));
    wrap.appendChild(head);

    var list = mk('ol', 'tk-moments');
    sh.moments.forEach(function (m) {
      var talk = byYear[m.talk];
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
