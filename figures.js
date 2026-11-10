(function () {
  // The Garage's animated sketches, shared by the talks page and the promos that point to it:
  // the rider (bicycle, horse, computer) and the watch (gears, digital, words) that keeps Mountain Standard Time.
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  // The bicycle for the mind: three sketches of a tool that makes a person bigger, each arriving once
  function bikeSvg() {
    return '<svg class="fg-bike" viewBox="0 0 320 200" focusable="false">' +
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
  }
  // A rider on a horse at a trot: diagonal leg pairs swing from shoulder and hip, then come to rest
  function horseSvg() {
    return '<svg class="fg-horse" viewBox="0 0 320 200" focusable="false" hidden>' +
        '<path class="bk-ground" pathLength="1" d="M10 172 H 310" fill="none" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>' +
        '<g class="hr-horse" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
          '<g class="hr-leg hr-ff" opacity=".5"><path d="M204 124 L199 147 L192 169 M187 171 H 196"/></g>' +
          '<g class="hr-leg hr-fh" opacity=".5"><path d="M130 126 L137 148 L140 169 M136 171 H 145"/></g>' +
          '<path d="M118 92 C 140 99, 176 99, 200 90 C 214 84, 226 66, 236 52"/>' +
          '<path d="M236 52 L234 41 L241 49 M236 52 L261 78 Q 266 84 260 88 L252 89 Q 246 83 244 74"/>' +
          '<path d="M244 74 C 236 88, 224 98, 220 110 Q 216 124 212 132"/>' +
          '<path d="M207 86 L203 80 M215 78 L211 72 M223 68 L219 62" opacity=".45"/>' +
          '<path d="M128 134 C 150 141, 182 141, 206 132"/>' +
          '<path d="M118 92 C 104 94, 100 110, 105 124 Q 110 133 120 134"/>' +
          '<path d="M108 96 C 94 104, 90 124, 96 146 M110 99 C 100 112, 100 128, 104 142" opacity=".7"/>' +
          '<g class="hr-leg hr-nh"><path d="M118 126 Q 124 138 116 148 L110 169 M105 171 H 114"/></g>' +
          '<g class="hr-leg hr-nf"><path d="M214 124 L221 147 L226 169 M222 171 H 231"/></g>' +
          '<path d="M154 96 Q 158 92 164 94 L182 94 Q 188 93 190 90" stroke-width="2"/>' +
          '<path d="M168 93 L172 60"/>' +
          '<circle cx="174" cy="46" r="10"/>' +
          '<path d="M170 93 L191 106 L187 127 M182 129 H 193"/>' +
          '<path d="M172 64 L182 82 L198 81"/>' +
          '<path d="M198 81 Q 230 89 256 86" opacity=".7"/>' +
          '<circle class="hr-eye" cx="246" cy="62" r="3" fill="#C47C55" stroke="none"/>' +
        '</g>' +
      '</svg>';
  }
  // A person at an early personal computer: the scene draws, three lines of text type out, the cursor blinks
  function pcSvg() {
    var d = function (cls, path, extra) { return '<path class="pc-draw ' + cls + '" pathLength="1" d="' + path + '"' + (extra || '') + '/>'; };
    return '<svg class="fg-pc" viewBox="0 0 320 200" focusable="false" hidden>' +
        '<path class="bk-ground" pathLength="1" d="M10 172 H 310" fill="none" stroke="#C47C55" stroke-width="2.5" stroke-linecap="round"/>' +
        '<g class="pc-scene" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
          d('pc-desk', 'M146 118 H 302 V 124 H 146 Z M156 124 V 172 M292 124 V 172') +
          d('pc-desk', 'M168 124 V 166 M280 124 V 166', ' opacity=".45"') +
          d('pc-box', 'M214 118 L218 110 H 262 L266 118 M204 52 H 276 Q 280 52 280 56 V 106 Q 280 110 276 110 H 204 Q 200 110 200 106 V 56 Q 200 52 204 52 Z') +
          d('pc-box', 'M216 60 H 258 Q 266 60 266 68 V 94 Q 266 102 258 102 H 216 Q 208 102 208 94 V 68 Q 208 60 216 60 Z') +
          d('pc-box', 'M272 92 V 102 M248 114 H 256', ' opacity=".55"') +
          d('pc-box', 'M166 118 L170 111 H 202 L205 118 Z') +
          d('pc-box', 'M174 115 H 200', ' opacity=".45"') +
          d('pc-chair', 'M74 128 H 112 M80 128 L74 90 M84 128 L80 172 M108 128 L112 172', ' opacity=".6"') +
          d('pc-man', 'M92 124 L104 76 M92 124 L134 124 L134 168 L146 170') +
          d('pc-man', 'M104 80 L126 102 L168 111') +
          '<circle class="pc-draw pc-man" pathLength="1" cx="112" cy="62" r="10"/>' +
          '<path class="pc-t pc-t1" pathLength="1" d="M216 72 H 242"/>' +
          '<path class="pc-t pc-t2" pathLength="1" d="M216 81 H 254"/>' +
          '<path class="pc-t pc-t3" pathLength="1" d="M216 90 H 232"/>' +
        '</g>' +
        '<circle class="pc-cursor" cx="238" cy="90" r="3" fill="#C47C55"/>' +
      '</svg>';
  }
  function bicycle() {
    var f = mk('figure', 'tk-fig bike-anim');
    f.setAttribute('aria-hidden', 'true');
    f.innerHTML = bikeSvg() + horseSvg() + pcSvg();
    return f;
  }


  // Simple outside, hard inside: a watch with the works showing.
  // The three gears share one tooth module so they mesh: 24, 13 and 6 teeth, each pair turning in
  // opposite directions at speeds inverse to tooth count. The hands keep Mountain Standard Time.
  function gearPath(cx, cy, pitchR, n, toothAtDeg) {
    var depth = 2.25, steps = n * 4, d = '';
    var start = (toothAtDeg * Math.PI / 180) - (1.5 / steps) * Math.PI * 2; // a tooth sits centred on toothAtDeg
    for (var i = 0; i <= steps; i++) {
      var a = start + (i / steps) * Math.PI * 2;
      var k = i % 4, rr = (k === 1 || k === 2) ? pitchR + depth : pitchR - depth;
      var x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
      d += (i ? ' L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
    }
    return d + ' Z';
  }
  // Mountain Standard Time, read once per tick
  var MST_FMT = null;
  try { MST_FMT = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Phoenix', hour12: false, hour: 'numeric', minute: 'numeric', second: 'numeric' }); } catch (e) { MST_FMT = null; }
  function mstNow() {
    var d = new Date(), h, m, s;
    if (MST_FMT) {
      var parts = {};
      MST_FMT.formatToParts(d).forEach(function (p) { parts[p.type] = p.value; });
      h = parseInt(parts.hour, 10) % 24; m = parseInt(parts.minute, 10); s = parseInt(parts.second, 10);
    } else {
      var u = new Date(d.getTime() - 7 * 3600 * 1000);
      h = u.getUTCHours(); m = u.getUTCMinutes(); s = u.getUTCSeconds();
    }
    return { h: h, m: m, s: s, ms: d.getMilliseconds() };
  }

  // The mechanical watch: the works showing, hands on top
  function mechSvg() {
    return '<svg class="wt-mech" viewBox="0 0 320 200" focusable="false">' +
      '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<circle class="wt-case" pathLength="1" cx="160" cy="100" r="78"/>' +
        '<path class="wt-case wt-crown" pathLength="1" d="M238 94 h8 v12 h-8"/>' +
        '<g class="wt-ticks" opacity=".6"><path d="M160 30 v6 M160 164 v6 M90 100 h6 M224 100 h6"/></g>' +
        '<g class="wt-works" opacity=".5">' +
          '<path class="wt-gear wt-g1" d="' + gearPath(132, 112, 37.2, 24, -21.3) + '"/><circle cx="132" cy="112" r="6"/>' +
          '<path class="wt-gear wt-g2" d="' + gearPath(186, 91, 20.2, 13, 172.5) + '"/><circle cx="186" cy="91" r="4"/>' +
          '<path class="wt-gear wt-g3" d="' + gearPath(174, 131, 9.3, 6, 234.3) + '"/><circle cx="174" cy="131" r="2.5"/>' +
        '</g>' +
        '<line class="wt-hand wt-hour" x1="160" y1="100" x2="160" y2="62" stroke-width="3"/>' +
        '<line class="wt-hand wt-min" x1="160" y1="100" x2="160" y2="42" stroke="#C47C55" stroke-width="2.5"/>' +
        '<line class="wt-hand wt-sec" x1="160" y1="110" x2="160" y2="38" stroke-width="1" opacity=".75"/>' +
        '<circle class="wt-pin" cx="160" cy="100" r="4.5" fill="#C47C55" stroke="none"/>' +
      '</g></svg>';
  }

  // The digital watch: seven-segment digits over a faint circuit, the colon in copper
  var SEG = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
  function segLines(id, x, y, w, h, sw) {
    var m = y + h / 2, out = '';
    var L = {
      a: [x + 2, y, x + w - 2, y], b: [x + w, y + 2, x + w, m - 2], c: [x + w, m + 2, x + w, y + h - 2],
      d: [x + 2, y + h, x + w - 2, y + h], e: [x, m + 2, x, y + h - 2], f: [x, y + 2, x, m - 2], g: [x + 2, m, x + w - 2, m]
    };
    'abcdefg'.split('').forEach(function (k) {
      var c = L[k];
      out += '<line class="sg sg-' + id + '-' + k + '" x1="' + c[0] + '" y1="' + c[1] + '" x2="' + c[2] + '" y2="' + c[3] + '" stroke-width="' + sw + '"/>';
    });
    return out;
  }
  function digiSvg() {
    return '<svg class="wt-digi" viewBox="0 0 320 200" focusable="false" hidden>' +
      '<g fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="52" y="44" width="216" height="112" rx="20"/>' +
        '<path d="M44 72 h8 M44 76 v-8 M44 128 h8 M44 132 v-8 M268 72 h8 M276 68 v8 M268 128 h8 M276 124 v8" opacity=".8"/>' +
        '<rect x="74" y="64" width="172" height="72" rx="4"/>' +
        '<g class="wt-circuit" opacity=".16"><rect x="150" y="90" width="26" height="18"/><path d="M150 94 h-10 M150 100 h-10 M150 106 h-10 M176 94 h10 M176 100 h10 M176 106 h10 M140 94 v-16 h-40 M140 106 v18 h-30 M186 94 v-18 h30 M186 106 v20 h26 M156 90 v-12 M170 108 v14"/></g>' +
        '<g class="wt-segs" stroke-linecap="round">' +
          segLines('h1', 86, 78, 18, 34, 3.5) + segLines('h2', 111, 78, 18, 34, 3.5) +
          '<circle class="wt-colon" cx="141" cy="87" r="2.6" fill="#C47C55" stroke="none"/><circle class="wt-colon" cx="141" cy="103" r="2.6" fill="#C47C55" stroke="none"/>' +
          segLines('m1', 150, 78, 18, 34, 3.5) + segLines('m2', 175, 78, 18, 34, 3.5) +
          segLines('s1', 206, 96, 9, 16, 2) + segLines('s2', 222, 96, 9, 16, 2) +
        '</g>' +
        '<text class="wt-lab wt-ampm" x="206" y="84">PM</text><text class="wt-lab" x="222" y="84">MST</text>' +
      '</g></svg>';
  }

  // The word clock: a grid of letters, the right ones lit; four copper dots count the odd minutes
  var GRID = ['ITRISNAHALF', 'QUARTERTENE', 'TWENTYFIVEX', 'PASTBRIDGTO', 'ONETWOTHREE', 'FOURFIVESIX', 'SEVENEIGHTZ', 'NINEELEVENX', 'TENTWELVEOX', 'OCLOCKTODAY'];
  var W = {
    IT: [0, 0, 2], IS: [0, 3, 2], HALF: [0, 7, 4], QUARTER: [1, 0, 7], TEN_M: [1, 7, 3], TWENTY: [2, 0, 6], FIVE_M: [2, 6, 4],
    PAST: [3, 0, 4], TO: [3, 9, 2], ONE: [4, 0, 3], TWO: [4, 3, 3], THREE: [4, 6, 5], FOUR: [5, 0, 4], FIVE: [5, 4, 4], SIX: [5, 8, 3],
    SEVEN: [6, 0, 5], EIGHT: [6, 5, 5], NINE: [7, 0, 4], ELEVEN: [7, 4, 6], TEN: [8, 0, 3], TWELVE: [8, 3, 6], OCLOCK: [9, 0, 6]
  };
  var HOURW = ['TWELVE', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN'];
  function wordSvg() {
    var out = '<svg class="wt-word" viewBox="0 0 320 200" focusable="false" hidden>' +
      '<rect x="60" y="8" width="200" height="184" rx="6" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
      '<g class="wt-letters">';
    for (var r = 0; r < 10; r++) for (var c = 0; c < 11; c++) {
      out += '<text class="wl" data-r="' + r + '" data-c="' + c + '" x="' + (80 + c * 16) + '" y="' + (31 + r * 16) + '" text-anchor="middle">' + GRID[r][c] + '</text>';
    }
    out += '</g><g class="wt-dots">' +
      '<circle class="wd" cx="68" cy="16" r="2.6"/><circle class="wd" cx="252" cy="16" r="2.6"/><circle class="wd" cx="252" cy="184" r="2.6"/><circle class="wd" cx="68" cy="184" r="2.6"/>' +
      '</g></svg>';
    return out;
  }

  function watch() {
    var f = mk('figure', 'tk-fig watch-anim');
    f.setAttribute('aria-hidden', 'true');
    f.innerHTML = mechSvg() + digiSvg() + wordSvg();
    liveClock(f);
    return f;
  }
  // Little buttons under a figure pick which sketch shows; each kind is [svg class, label]
  function picker(f, kinds, label) {
    var g = mk('div', 'tk-pick');
    g.setAttribute('role', 'group');
    g.setAttribute('aria-label', label);
    kinds.forEach(function (k, i) {
      var b = mk('button', 'tk-pick-b', k[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
      b.addEventListener('click', function () {
        g.querySelectorAll('.tk-pick-b').forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        kinds.forEach(function (kk) { var el = f.querySelector('.' + kk[0]); if (kk[0] === k[0]) el.removeAttribute('hidden'); else el.setAttribute('hidden', ''); });
        f.setAttribute('data-kind', k[0]);
      });
      g.appendChild(b);
    });
    return g;
  }
  function watchPicker(f) {
    return picker(f, [['wt-mech', 'Gears'], ['wt-digi', 'Digital'], ['wt-word', 'Words']], 'Watch style');
  }
  function bikePicker(f) {
    var g = picker(f, [['fg-bike', 'Bicycle'], ['fg-horse', 'Horse'], ['fg-pc', 'Computer']], 'Figure');
    g.classList.add('tk-pick-snug');
    return g;
  }
  // All three keep Mountain Standard Time. The mechanical hands sweep in when the figure first plays.
  function liveClock(f) {
    var hour = f.querySelector('.wt-hour'), min = f.querySelector('.wt-min'), sec = f.querySelector('.wt-sec');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var lastSec = -1;
    function setHands(t) {
      var s = t.s + t.ms / 1000;
      hour.style.transform = 'rotate(' + ((t.h % 12) * 30 + t.m * 0.5 + s / 120).toFixed(2) + 'deg)';
      min.style.transform = 'rotate(' + (t.m * 6 + s * 0.1).toFixed(2) + 'deg)';
      sec.style.transform = 'rotate(' + (s * 6).toFixed(2) + 'deg)';
    }
    function setDigit(id, n) {
      var on = n === null ? '' : SEG[n];
      'abcdefg'.split('').forEach(function (k) {
        var el = f.querySelector('.sg-' + id + '-' + k);
        if (el) el.setAttribute('class', 'sg sg-' + id + '-' + k + (on.indexOf(k) >= 0 ? ' on' : ''));
      });
    }
    function setDigital(t) {
      var h12 = t.h % 12 || 12;
      setDigit('h1', h12 >= 10 ? 1 : null); setDigit('h2', h12 % 10);
      setDigit('m1', Math.floor(t.m / 10)); setDigit('m2', t.m % 10);
      setDigit('s1', Math.floor(t.s / 10)); setDigit('s2', t.s % 10);
      var ap = f.querySelector('.wt-ampm'); if (ap) ap.textContent = t.h >= 12 ? 'PM' : 'AM';
      f.querySelectorAll('.wt-colon').forEach(function (c) { c.setAttribute('opacity', t.s % 2 ? '.25' : '1'); });
    }
    function light(name, lit) {
      var w = W[name]; if (!w) return;
      for (var i = 0; i < w[2]; i++) {
        var el = f.querySelector('.wl[data-r="' + w[0] + '"][data-c="' + (w[1] + i) + '"]');
        if (el) el.setAttribute('class', 'wl' + (lit ? ' on' : ''));
      }
    }
    function setWords(t) {
      f.querySelectorAll('.wl.on').forEach(function (el) { el.setAttribute('class', 'wl'); });
      var m5 = Math.floor(t.m / 5) * 5, h = t.h;
      if (m5 >= 35) h += 1;
      light('IT', true); light('IS', true);
      var minute = { 5: 'FIVE_M', 10: 'TEN_M', 15: 'QUARTER', 20: 'TWENTY', 30: 'HALF', 40: 'TWENTY', 45: 'QUARTER', 50: 'TEN_M', 55: 'FIVE_M' }[m5];
      if (m5 === 25 || m5 === 35) { light('TWENTY', true); light('FIVE_M', true); } else if (minute) light(minute, true);
      if (m5 === 0) light('OCLOCK', true); else light(m5 <= 30 ? 'PAST' : 'TO', true);
      light(HOURW[h % 12], true);
      var rem = t.m % 5;
      f.querySelectorAll('.wd').forEach(function (d, i) { d.setAttribute('class', 'wd' + (i < rem ? ' on' : '')); });
    }
    function tick() {
      var t = mstNow();
      setHands(t);
      if (t.s !== lastSec) { lastSec = t.s; setDigital(t); setWords(t); }
    }
    function start() {
      tick();
      if (reduce) { setInterval(tick, 1000); return; }
      setTimeout(function () { f.classList.add('wt-live'); setInterval(tick, 100); }, 1800);
    }
    if (reduce) { start(); return; }
    if ('MutationObserver' in window) {
      var mo = new MutationObserver(function () { if (f.classList.contains('play')) { mo.disconnect(); start(); } });
      mo.observe(f, { attributes: true, attributeFilter: ['class'] });
    } else { start(); }
  }

  window.GarageFigures = { bicycle: bicycle, watch: watch, picker: picker, bikePicker: bikePicker, watchPicker: watchPicker };

  // The promo for the talks page: the rider and the watch side by side, each with its picker
  var promo = document.getElementById('own-words-promo');
  if (promo) {
    var bf = bicycle(), wf = watch();
    var left = mk('div', 'ow-fig'), right = mk('div', 'ow-fig');
    left.appendChild(bf); left.appendChild(bikePicker(bf));
    right.appendChild(wf); right.appendChild(watchPicker(wf));
    promo.appendChild(left); promo.appendChild(right);
  }
})();
