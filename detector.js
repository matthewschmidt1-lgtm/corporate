(function () {
  var B = window.BSD;
  var N = B.cards.length;
  var $ = function (id) { return document.getElementById(id); };
  var LETTERS = ["A", "B", "C", "D", "E", "F"];
  var P = B.principles;
  var AXES = B.principleOrder.map(function (k) { return { k: k, label: P[k].short }; });
  var state = { edition: "staff", ctx: 1, mode: "game", deck: [], idx: 0, ans: [], perms: [], voice: {}, heard: {}, used: {}, t0: {}, times: {}, slots: {} };
  var fb = $("feedback");

  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function add(parent) {
    for (var i = 1; i < arguments.length; i++) if (arguments[i]) parent.appendChild(arguments[i]);
    return parent;
  }
  function show(id) {
    ["start", "play", "result"].forEach(function (s) { $(s).hidden = s !== id; });
    window.scrollTo(0, 0);
  }
  // Browser Back and Forward walk through cards and screens instead of leaving the site.
  function pushScreen(name, idx) {
    if (window.history && history.pushState) history.pushState({ s: name, i: idx == null ? 0 : idx }, "");
  }
  function go_start() { show("start"); pushScreen("start"); }
  function wtfFor(c, t) { return c["wtf" + t] || c.wtf; }
  function typeName(card, t) {
    if (card.nuance && t === "A") return B.nuanceA.name;
    return B.types[t].name;
  }
  function typeLine(card, t) {
    if (card.nuance && t === "A") return B.nuanceA.line;
    if (card.nuance && t === "B") return B.nuanceB.line;
    return B.types[t].line;
  }
  var VIS = { staff: {}, ceo: {} };
  ["staff", "ceo"].forEach(function (e) { B.lowVisibility[e].forEach(function (t) { VIS[e][t] = true; }); });
  function weightOf(card, edition) { return VIS[edition] && VIS[edition][card.title] ? 0.7 : 1; }
  function fit(card, t, ctx) {
    if (t === "N") return 50;
    var tier = (ctx === 3 && card.tierHeavy) ? card.tierHeavy : (card.tier || "L");
    if (tier === "M") return B.mediumByCtx[ctx || 2][t];
    return B.tiers[tier][t];
  }
  function optionText(card, t) { return t === "N" ? B.neutralText : (t === "U" ? B.unknownText : card.o[t]); }

  // ---------- scoring v2: fit to stakes, equal-weight principles, answer shares ----------
  var LEVEL = { A: 0, B: 1, C: 2, D: 3 };
  var LEVEL_NAMES = ["Direction only", "Low", "Moderate", "Higher"];
  var TWINS = B.twins.map(function (g) {
    return { p: g.p, titles: g.titles, idx: g.titles.map(function (t) { for (var i = 0; i < B.cards.length; i++) if (B.cards[i].title === t) return i; return -1; }) };
  });
  function sum(a) { return a.reduce(function (x, y) { return x + y; }, 0); }

  function analyze(types, ctx, edition, meta) {
    var items = [], pr = {}, wsum = 0, wh = 0, sh = { A: 0, B: 0, C: 0, D: 0, N: 0 }, cnt = { A: 0, B: 0, C: 0, D: 0, N: 0 }, unk = 0;
    types.forEach(function (t, i) {
      if (!t) return;
      if (t === "U") { unk++; return; }
      var c = B.cards[i], w = weightOf(c, edition), s = fit(c, t, ctx);
      items.push({ i: i, card: c, t: t, h: s, w: w });
      wsum += w; wh += w * s; sh[t] += w; cnt[t]++;
      c.p.forEach(function (k) { var o = pr[k] || (pr[k] = { s: 0, w: 0, n: 0, hs: [] }); o.s += w * s; o.w += w; o.n++; o.hs.push(s); });
    });
    var n = items.length;
    if (!n) return null;
    var r = Math.round, pAvg = {}, pN = {};
    B.principleOrder.forEach(function (k) { pN[k] = pr[k] ? pr[k].n : 0; pAvg[k] = pr[k] ? r(pr[k].s / pr[k].w) : null; });
    function overall(c2) {
      var tot = 0, m = 0;
      B.principleOrder.forEach(function (k) {
        if (!pr[k]) return;
        var s2 = 0, w2 = 0;
        items.forEach(function (x) { if (x.card.p.indexOf(k) < 0) return; s2 += x.w * fit(x.card, x.t, c2); w2 += x.w; });
        tot += s2 / w2; m++;
      });
      return tot / m;
    }
    var score = r(overall(ctx)), scoreNeutral = r(overall(2));
    var mean = wh / wsum, vv = 0;
    items.forEach(function (x) { vv += x.w * (x.h - mean) * (x.h - mean); });
    var sd = Math.sqrt(vv / wsum), half = 1.96 * sd / Math.sqrt(wsum);
    var lo = Math.max(0, r(score - half)), hi = Math.min(100, r(score + half));
    var pct = {}; Object.keys(sh).forEach(function (k) { pct[k] = sh[k] / wsum; });

    var wsds = [];
    B.principleOrder.forEach(function (k) {
      var o = pr[k]; if (!o || o.n < 3) return;
      var m = sum(o.hs) / o.n, v2 = 0; o.hs.forEach(function (x) { v2 += (x - m) * (x - m); });
      wsds.push(Math.sqrt(v2 / o.n));
    });
    var within = wsds.length ? sum(wsds) / wsds.length : 0;

    var contr = [];
    TWINS.forEach(function (g) {
      var an = g.idx.map(function (ix) { return ix >= 0 ? types[ix] : null; });
      for (var i = 0; i < an.length; i++) for (var j = i + 1; j < an.length; j++) {
        if (LEVEL[an[i]] !== undefined && LEVEL[an[j]] !== undefined && Math.abs(LEVEL[an[i]] - LEVEL[an[j]]) === 3)
          contr.push({ p: g.p, a: g.titles[i], ta: an[i], b: g.titles[j], tb: an[j] });
      }
    });

    var flags = [];
    var maxType = Math.max(cnt.A, cnt.B, cnt.C, cnt.D, cnt.N);
    if (n >= 20 && maxType / n >= 0.85) flags.push("uniform");
    var unkShare = unk / (n + unk);
    if (unkShare >= 0.25) flags.push("unknown");
    if (contr.length >= 2) flags.push("contradictions");
    if (meta && meta.times && meta.times.length >= 8) {
      var ts = meta.times.slice().sort(function (x, y) { return x - y; });
      if (ts[Math.floor(ts.length / 2)] < 1500) flags.push("speed");
    }
    if (meta && meta.slots && meta.slots.length >= 12) {
      var sc = {}; meta.slots.forEach(function (x) { sc[x] = (sc[x] || 0) + 1; });
      if (Math.max.apply(null, Object.keys(sc).map(function (k) { return sc[k]; })) / meta.slots.length >= 0.6) flags.push("position");
    }

    var minN = Math.min.apply(null, B.principleOrder.map(function (k) { return pN[k]; }));
    var level;
    if (n < 12 || minN === 0) level = 0;
    else if (n >= 48 && minN >= 4) level = 3;
    else if (n >= 24 && minN >= 3 && unkShare < 0.15) level = 2;
    else level = 1;
    if (flags.length && level > 1) level--;

    var humanD = items.filter(function (x) { return x.t === "D" && x.card.p.indexOf("human") >= 0; }).length;
    return {
      n: n, unk: unk, unkShare: unkShare, score: score, scoreNeutral: scoreNeutral, lo: lo, hi: hi, sd: sd,
      pct: pct, cnt: cnt, pAvg: pAvg, pN: pN, items: items, within: within, contr: contr, flags: flags,
      level: level, minN: minN, humanD: humanD, wsum: wsum, ctx: ctx || 1
    };
  }

  function classify(a) {
    var X = B.classExtra, C = B.classes;
    function pack(band, alt) { return { name: band.names[alt][0], text: band.names[alt][1], meaning: band.meaning, obs: band.obs, stamp: band.stamp, tone: band.tone }; }
    function copy(o) { return { name: o.name, text: o.text, meaning: o.meaning, obs: o.obs, stamp: o.stamp, tone: o.tone }; }
    if (a.n < 12) return copy(X.direction);
    var F = a.pct.C, T = a.pct.D, Nn = a.pct.N, scoredShare = 1 - Nn;
    var sA = scoredShare > 0 ? a.pct.A / scoredShare : 0, sB = scoredShare > 0 ? a.pct.B / scoredShare : 0;
    if (Nn >= 0.30 || a.within >= 32) return copy(X.inconsistent);
    var r;
    if (T >= 0.25) r = (F >= 0.25 || T >= 0.6) ? pack(C[4], a.score < 15 ? 1 : 0) : pack(C[3], T >= 0.4 ? 1 : 0);
    else if (F >= (a.ctx === 3 ? 0.40 : 0.30)) r = pack(C[2], F >= 0.45 ? 1 : 0);
    else if (F < (a.ctx === 3 ? 0.30 : 0.20) && T < 0.10) r = sA >= 0.5 ? pack(C[0], sA >= 0.7 ? 1 : 0) : pack(C[1], sB >= 0.6 ? 1 : 0);
    else r = a.score >= 60 ? copy(X.leaks) : copy(X.mixed);
    if ((r.stamp === "CLEARED" || r.stamp === "APPROVED WITH NOTES") && a.humanD >= 2) { r = copy(X.leaks); r.guard = true; }
    return r;
  }

  // Wipe everything on the page: answers, report, compare fields, and any code in the address bar.
  function clearAll() {
    state.deck = []; state.ans = []; state.perms = []; state.idx = 0; state.voice = {}; state.heard = {}; state.used = {};
    state.t0 = {}; state.times = {}; state.slots = {};
    $("report").textContent = "";
    if (window.history && history.replaceState) history.replaceState({ s: "start", i: 0 }, "", location.pathname);
    show("start");
  }

  // ---------- play ----------
  function poolFor(edition) {
    var out = [];
    B.cards.forEach(function (c, i) { var au = c.audience || "both"; if (au === "both" || au === edition) out.push(i); });
    return out;
  }
  function buildDeck(len, edition) {
    var all = poolFor(edition);
    if (len >= all.length) return shuffle(all);
    var per = len >= 22 ? 3 : 1, picked = [], counts = {};
    B.principleOrder.forEach(function (k) { counts[k] = 0; });
    // guarantee high-stakes control cards, so the control logic is always exercised
    var hNeed = len >= 22 ? 2 : 1;
    shuffle(all.filter(function (i) { return B.cards[i].tier === "H"; })).slice(0, hNeed).forEach(function (i) {
      picked.push(i);
      B.cards[i].p.forEach(function (q) { counts[q]++; });
    });
    for (var pass = 1; pass <= per; pass++) {
      shuffle(B.principleOrder).forEach(function (k) {
        if (counts[k] >= pass) return;
        var pool = shuffle(all.filter(function (i) { return picked.indexOf(i) < 0 && B.cards[i].p.indexOf(k) >= 0; }));
        // prefer a card that also helps a principle still short of its quota
        pool.sort(function (x, y) {
          function need(i) { return B.cards[i].p.filter(function (q) { return counts[q] < pass; }).length; }
          return need(y) - need(x);
        });
        if (!pool.length) return;
        picked.push(pool[0]);
        B.cards[pool[0]].p.forEach(function (q) { counts[q]++; });
      });
    }
    var rest = shuffle(all.filter(function (i) { return picked.indexOf(i) < 0; }));
    return shuffle(picked.concat(rest.slice(0, Math.max(0, len - picked.length))));
  }

  function start(edition, len, ctx, mode) {
    state.edition = edition; state.ctx = ctx; state.mode = mode; state.voice = {}; state.heard = {}; state.used = {}; state.t0 = {}; state.times = {}; state.slots = {};
    state.deck = buildDeck(len, edition);
    state.idx = 0;
    state.ans = [];
    state.perms = B.cards.map(function () { return shuffle(["A", "B", "C", "D"]).concat(["N", "U"]); });
    var segs = $("segs");
    segs.textContent = "";
    segs.style.gridTemplateColumns = "repeat(" + state.deck.length + ", 1fr)";
    for (var i = 0; i < state.deck.length; i++) segs.appendChild(h("span"));
    show("play");
    render();
    pushScreen("play", 0);
  }

  function cur() { return state.deck[state.idx]; }

  function render() {
    var ci = cur(), c = B.cards[ci];
    if (state.t0[ci] === undefined) state.t0[ci] = Date.now();
    var total = state.deck.length;
    var opts = $("options");
    opts.parentNode.insertBefore(fb, opts.nextSibling); // park feedback so clearing options does not detach it
    fb.hidden = true;
    opts.classList.remove("show-all");
    opts.classList.toggle("assess", state.mode === "assess");

    $("s-cat").textContent = B.principles[c.p[0]].name;
    $("s-num").textContent = "Exhibit " + (state.idx + 1);
    $("s-title").textContent = c.title;
    var text = $("s-text"); text.textContent = "";
    c.s.split("\n").forEach(function (p) { text.appendChild(h("p", null, p)); });

    $("count").textContent = (state.idx + 1) + " of " + total + ". " + c.title;
    var segs = $("segs").children;
    for (var i = 0; i < segs.length; i++) {
      segs[i].className = (state.ans[state.deck[i]] ? "done " : "") + (i === state.idx ? "cur" : "");
    }

    opts.textContent = "";
    state.perms[ci].forEach(function (t, pos) {
      var b = h("button", "obtn" + (t === "N" || t === "U" ? " neutral" : "")); b.type = "button"; b.dataset.t = t;
      add(b, h("span", "o-letter", LETTERS[pos]), h("span", "o-text", optionText(c, t)));
      b.addEventListener("click", function () { choose(t); });
      opts.appendChild(b);
    });
    paintFeedback(false);
    $("back").style.visibility = state.idx === 0 ? "hidden" : "visible";
    var pm = $("play-msg"); if (pm) pm.hidden = true;
    ["scard", "options"].forEach(function (id) { var e = $(id); e.classList.remove("enter"); void e.offsetWidth; e.classList.add("enter"); });
  }

  function paintFeedback(scroll) {
    var ci = cur(), c = B.cards[ci], t = state.ans[ci];
    var opts = $("options"), btns = opts.querySelectorAll(".obtn"), selBtn = null;
    var assess = state.mode === "assess";
    for (var i = 0; i < btns.length; i++) {
      var b = btns[i];
      var old = b.querySelector(".o-tag"); if (old) b.removeChild(old);
      b.classList.remove("sel", "revealed", "t-A", "t-B", "t-C", "t-D", "t-N", "t-U");
      if (t && assess) { if (b.dataset.t === t) b.classList.add("sel"); continue; }
      if (t) {
        var bt = b.dataset.t;
        b.classList.add("revealed", "t-" + bt);
        if (bt === t) { b.classList.add("sel"); selBtn = b; }
        b.appendChild(h("em", "o-tag", typeName(c, bt)));
      }
    }
    if (!t || assess) { fb.hidden = true; $("next").disabled = !t; setNextLabel(); return; }
    var weak = t === "C" || t === "D";
    fb.hidden = false;
    fb.className = "feedback t-" + t;
    $("f-type").textContent = typeName(c, t);
    $("f-tests").textContent = "Tests: " + c.p.map(function (k) { return P[k].name; }).join(", ");
    var vo = state.voice[ci];
    var main = vo || (weak ? wtfFor(c, t) : c.insight);
    $("f-main").textContent = main;
    $("f-line").textContent = typeLine(c, t);
    var extra = main === c.insight ? "" : c.insight;
    $("f-insight").textContent = extra;
    $("f-insight").hidden = !extra;
    var hd = state.heard[ci];
    $("f-heard").textContent = hd ? "Overheard: \u201C" + hd + "\u201D" : "";
    $("f-heard").hidden = !hd;
    $("f-more").hidden = true;
    $("f-toggle").setAttribute("aria-expanded", "false");
    $("f-toggle").textContent = "Why it scores this way";
    opts.classList.remove("show-all");
    // feedback sits directly under the chosen answer, so it never scrolls the choice away
    selBtn.parentNode.insertBefore(fb, selBtn.nextSibling);
    $("next").disabled = false;
    setNextLabel();
    if (scroll && fb.scrollIntoView) fb.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }
  function setNextLabel() {
    $("next").textContent = state.idx === state.deck.length - 1 ? "See my report" : "Next card";
  }

  function once(key, text) { if (state.used[key]) return null; state.used[key] = 1; return text; }
  function pickVoice(ci, t) {
    var V = B.voice, c = B.cards[ci], total = state.deck.length, n = 0, r = null;
    state.deck.forEach(function (x) { if (state.ans[x]) n++; });
    if (n === Math.ceil(total / 2)) r = once("half", V.halfway);
    if (!r && state.idx >= 2) {
      var w = [0, 1, 2].every(function (d) { var a2 = state.ans[state.deck[state.idx - d]]; return a2 === "C" || a2 === "D"; });
      if (w) r = once("streak", V.streak);
    }
    if (!r && c.cat === "decisions" && t === "C") r = once("dC", V.decisionsC);
    if (!r && c.cat === "safety" && t === "D") r = once("sD", V.safetyD);
    if (!r && c.cat === "leadership" && t === "D") r = once("lD", V.leadershipD);
    if (!r && t === "A") r = once("A", V.firstA);
    if (!r && t === "B" && state.ctx === 3) r = once("B3", V.regB);
    if (!r && t === "N") r = once("N", V.N);
    if (!r && t === "U") r = once("U", V.U);
    return r;
  }
  function pickHeard(ci, t) {
    var c = B.cards[ci];
    if (t !== "C" && t !== "D") return null;
    var list = B.heard[c.cat][t];
    return list[Math.floor(Math.random() * list.length)];
  }

  function choose(t) {
    var ci = cur();
    var pm = $("play-msg"); if (pm) pm.hidden = true;
    if (state.times[ci] === undefined) { state.times[ci] = Date.now() - (state.t0[ci] || Date.now()); state.slots[ci] = state.perms[ci].indexOf(t); }
    if (state.ans[ci] !== t || state.voice[ci] === undefined) { state.voice[ci] = pickVoice(ci, t) || null; state.heard[ci] = pickHeard(ci, t); }
    state.ans[ci] = t;
    var segs = $("segs").children; segs[state.idx].classList.add("done");
    paintFeedback(true);
    $("next").focus({ preventScroll: true }); // Enter now really does advance
  }

  function next() {
    if (!state.ans[cur()]) return;
    if (state.idx < state.deck.length - 1) { state.idx++; render(); window.scrollTo(0, 0); pushScreen("play", state.idx); return; }
    if (!analyze(state.ans, state.ctx, state.edition)) {
      var pm = $("play-msg"); pm.textContent = "Every answer was marked as not seen, so there is nothing to score. Change at least one answer."; pm.hidden = false; return;
    }
    report(state.edition, state.ans, state.ctx, { times: state.deck.map(function (x) { return state.times[x]; }).filter(function (x) { return x !== undefined; }), slots: state.deck.map(function (x) { return state.slots[x]; }).filter(function (x) { return x !== undefined; }) });
  }
  function back() { if (state.idx > 0) { if (window.history && history.state && history.state.s === "play") history.back(); else { state.idx--; render(); window.scrollTo(0, 0); } } }

  // ---------- report ----------
  function bar(label, value, bench) {
    var row = h("div", "dim-row");
    var top = h("div", "dim-top");
    add(top, h("span", "dim-label", label), h("span", "dim-val", String(value)));
    var track = h("div", "dim-track");
    var fill = h("span", "fill " + (value >= 60 ? "good" : (value >= 40 ? "mid" : "bad"))); fill.style.width = value + "%";
    var tick = h("i", "tick"); tick.style.left = bench + "%"; tick.title = "Where high-performing companies land";
    add(track, fill, tick);
    add(row, top, track);
    return row;
  }

  function section(title) { var s = h("section", "r-sec"); s.appendChild(h("h3", "sub", title)); return s; }

  var FLAG_TEXT = {
    uniform: "Nearly every answer was the same type. Real organizations are rarely that uniform, so treat this result with caution.",
    unknown: "A quarter or more of your answers were marked as not seen. The result rests on fewer situations than it looks.",
    contradictions: "Some answers about the same behavior pulled in opposite directions (listed below).",
    speed: "Answers came very fast. Quick clicks tell us little.",
    position: "Most answers used the same screen position. That pattern usually means clicking, not reading."
  };
  function bandOf(v) { return v >= 75 ? "Strong" : (v >= 50 ? "Mixed" : "Weak"); }
  function answerBar(label, p, cls) {
    var row = h("div", "dim-row");
    add(row, add(h("div", "dim-top"), h("span", "dim-label", label), h("span", "dim-val", Math.round(p * 100) + "%")));
    var track = h("div", "dim-track"), fill = h("span", "fill " + cls); fill.style.width = Math.round(p * 100) + "%";
    add(track, fill); row.appendChild(track);
    return row;
  }
  function axisGrid(F, T) {
    var g = h("div", "axis-grid");
    add(g, h("span", "ag-q ag-tl", "Political but fast"), h("span", "ag-q ag-tr", "Theater of work"), h("span", "ag-q ag-bl", "Healthy"), h("span", "ag-q ag-br", "Bureaucratic but safe"));
    var dot = h("i", "ag-dot");
    dot.style.left = Math.min(F / 0.6, 1) * 100 + "%"; dot.style.bottom = Math.min(T / 0.4, 1) * 100 + "%";
    g.appendChild(dot);
    var wrap = h("div", "ag-wrap");
    add(wrap, g, h("p", "ag-x", "Structural friction, from low to high"), h("p", "ag-y", "Toxicity"));
    return wrap;
  }

  function report(edition, ans, ctx, meta) {
    var a = analyze(ans, ctx, edition, meta);
    var cls = classify(a);
    var ed = B.editions[edition];
    var root = $("report"); root.textContent = "";
    var played = a.n, pc = a.pct;
    var who = edition === "ceo" ? "ceo" : "staff";

    // ----- work out everything first -----
    var ranked = B.principleOrder.filter(function (k) { return a.pN[k] >= 3; }).sort(function (x, y) { return a.pAvg[y] - a.pAvg[x]; });
    var solid = ranked.filter(function (k) { return a.pN[k] >= 4; });
    var sorted = a.items.slice().sort(function (x, y) { return x.h - y.h || (x.t === "D" ? -1 : 1); });
    var picks = [], seen = {};
    sorted.forEach(function (x) { if (picks.length < 3 && !seen[x.card.cat] && x.h < 72) { picks.push(x); seen[x.card.cat] = 1; } });
    sorted.forEach(function (x) { if (picks.length < 3 && picks.indexOf(x) < 0 && x.h < 72) picks.push(x); });
    var weakest = ranked.length >= 4 ? ranked.slice().reverse().slice(0, 3) : [];
    if (!weakest.length) picks.forEach(function (x) { if (weakest.indexOf(x.card.p[0]) < 0 && weakest.length < 3) weakest.push(x.card.p[0]); });
    var strongCats = ranked.length >= 4 ? ranked.slice(0, 2) : [];
    if (!strongCats.length) a.items.filter(function (x) { return x.h >= 72; }).forEach(function (x) { if (strongCats.indexOf(x.card.p[0]) < 0 && strongCats.length < 2) strongCats.push(x.card.p[0]); });
    var weakTags = weakest.map(function (k) { return P[k].weakTag; });
    var sentence;
    if (a.score >= 65) sentence = "A company where " + (strongCats.length ? P[strongCats[0]].strongTag + (strongCats[1] ? ", and " + P[strongCats[1]].strongTag : "") : "the basics work") + "." + (weakTags.length && a.score < 80 ? " Watch the places where " + weakTags[0] + "." : "");
    else if (a.score >= 45) sentence = "A company where " + weakTags.slice(0, 2).join(", and ") + (strongCats.length ? ", but " + P[strongCats[0]].strongTag + "." : ".");
    else sentence = "A company where " + weakTags.slice(0, 3).join(", ").replace(/, ([^,]*)$/, ", and $1") + ".";
    if (a.level === 0) sentence = "Too early to say. " + sentence;
    else if (a.level === 1) sentence = "Early read: " + sentence.charAt(0).toLowerCase() + sentence.slice(1);

    // ----- 1. the result card -----
    add(root, h("p", "eyebrow warn", "Your report. " + ed.name + ". " + played + " situations scored."));
    var card = h("div", "result-card");
    card.appendChild(h("span", "stamp " + cls.tone, cls.stamp));
    card.appendChild(h("h2", "verdict-big", (a.level <= 1 && a.level >= 0 && a.n >= 12 ? "Leaning: " : "") + cls.name));
    card.appendChild(h("p", "oneline", sentence));
    var big = h("div", "score-big");
    add(big, h("span", "score-num", String(a.score)), h("span", "score-of", "out of 100"));
    card.appendChild(big);
    card.appendChild(h("p", "range", "Likely range " + a.lo + " to " + a.hi + ". Confidence: " + LEVEL_NAMES[a.level] + "."));
    root.appendChild(card);
    if (cls.guard) root.appendChild(h("p", "pattern", "Held back by the Human leadership guard: two or more answers described cruelty or pressure that results were allowed to excuse. Speed and results cannot buy that off."));

    // ----- 2. the card is the result; only housekeeping actions below it -----
    var acts2 = h("div", "result-actions");
    var b4 = h("button", "link as-link small", "Play again"); b4.type = "button";
    var b8 = h("button", "link as-link small js-clear", "Clear everything"); b8.type = "button";
    add(acts2, b4, b8);
    root.appendChild(acts2);
    root.appendChild(h("p", "fine privacy-note", "Nothing on this page was sent anywhere. Clear everything wipes it from this device."));
    var claim = h("p", "fine claim", "A conversation tool, not a validated assessment. It shows how one person sees the company. ");
    var cl2 = h("a", null, "How scoring works"); cl2.href = "methodology.html"; claim.appendChild(cl2);
    root.appendChild(claim);
    root.appendChild(h("p", "lead", cls.text));

    // ----- 4. do this Monday -----
    var s7 = section("Do this Monday");
    s7.appendChild(h("p", "fine", "Three specific moves, tied to the situations that cost you most. Pick one, and say the line out loud."));
    var plan = h("ol", "monday-list");
    weakest.forEach(function (k) {
      var worst = a.items.filter(function (x) { return x.card.p.indexOf(k) >= 0 && x.h < 72; }).sort(function (x, y) { return x.h - y.h; })[0];
      var m = P[k].monday[who];
      var li = h("li");
      add(li, h("h4", null, P[k].name + (worst ? ": " + worst.card.title : "")));
      var dop = h("p"); add(dop, h("strong", null, "Do this: "), document.createTextNode(m.do)); li.appendChild(dop);
      var sayp = h("p", "say"); add(sayp, h("strong", null, "Say this: "), document.createTextNode("“" + m.say + "”")); li.appendChild(sayp);
      plan.appendChild(li);
    });
    if (!weakest.length) plan.appendChild(h("li", null, "Nothing scored badly. Keep doing what you are doing, and play more cards to check."));
    s7.appendChild(plan);
    root.appendChild(s7);

    // ----- 5. confidence (up front only when it matters) -----
    var cp = h("div", "conf-panel");
    cp.appendChild(h("p", "conf-level", "Confidence: " + LEVEL_NAMES[a.level]));
    var ctext = a.level === 0 ? "Too few situations to classify or give principle scores. Read this as a direction, not a verdict."
      : (a.level === 1 ? "A starting point. The range is wide because few situations were scored, and another set of cards could land in a neighboring band."
      : (a.level === 2 ? "Reasonable for a conversation. Every principle has at least 3 situations behind it."
      : "The fullest picture this game can give. Every principle has at least 4 situations behind it."));
    cp.appendChild(h("p", "fine", ctext + " The range reflects which cards were drawn, not whether the model measures the company correctly."));
    if (a.flags.length) {
      var fl = h("ul", "flag-list");
      a.flags.forEach(function (k) { fl.appendChild(h("li", null, FLAG_TEXT[k])); });
      cp.appendChild(fl);
    }
    if (a.contr.length) {
      var cl = h("ul", "flag-list");
      a.contr.slice(0, 3).forEach(function (x) {
        cl.appendChild(h("li", null, x.p + ": you chose " + typeName(B.cards[B.cards.findIndex(function (c) { return c.title === x.a; })], x.ta) + " on “" + x.a + "” and " + typeName(B.cards[B.cards.findIndex(function (c) { return c.title === x.b; })], x.tb) + " on “" + x.b + "”. Companies do vary by team, so both can be true. If one was a guess, it is worth replaying."));
      });
      cp.appendChild(cl);
    }
    var cautionUpFront = a.flags.length > 0 || a.contr.length > 0;
    if (cautionUpFront) root.appendChild(cp);

    // ----- 6. what you described -----
    var s3 = section("What you described");
    add(s3, h("p", "fine", "Percent of the situations you scored, weighted by how visible each was from where you sit."));
    var dims = h("div", "dims");
    dims.appendChild(answerBar("Entrepreneurial", pc.A, "a"));
    dims.appendChild(answerBar("Healthy corporate", pc.B, "b"));
    dims.appendChild(answerBar("Bureaucratic", pc.C, "c"));
    dims.appendChild(answerBar("Self-protective", pc.D, "d"));
    dims.appendChild(answerBar("It varies", pc.N, "n"));
    s3.appendChild(dims);
    var vShare = Math.round((pc.A + pc.B + pc.N * 0.5) * 100), pShare = 100 - vShare;
    var motive = (weakest.length && a.pN[weakest[0]] >= 4) ? P[weakest[0]].motive : "";
    if (pShare >= 25 && motive) s3.appendChild(h("p", "fine tendency", "Strongest protective tendency: " + motive + "."));
    add(s3, h("h3", "sub small-sub", "Structure and culture are different problems"), h("p", "fine", "Friction is slow structure: approvals, process, hierarchy. Toxicity is self-protection, blame and politics. A company can have either, both or neither."), axisGrid(pc.C, pc.D));
    if (pc.D >= 0.3 && a.cnt.D >= 3 && a.score < 45) s3.appendChild(h("p", "pattern", "Pattern: " + a.cnt.D + " of your " + played + " answers were Self-protective. That is not one bad experience. It repeats."));
    else if (pc.A >= 0.4 && a.cnt.A >= 3 && a.score >= 65) s3.appendChild(h("p", "pattern good", "Pattern: " + a.cnt.A + " of your " + played + " answers were Entrepreneurial. That is a habit of the place, not a lucky quarter."));
    if (a.pN.excellence >= 3 && a.pN.speed >= 3 && a.pN.courage >= 3 && a.pN.focus >= 3 && a.pN.human >= 3) {
      var drive = Math.round((a.pAvg.excellence + a.pAvg.speed + a.pAvg.courage + a.pAvg.focus) / 4), hum = a.pAvg.human;
      if (drive >= 65 && hum < 50) s3.appendChild(h("p", "pattern", "Balance check: ambition and standards are high, but human leadership is low. Pressure that people pay for is not excellence. Ask what the results are costing the people who produce them."));
      else if (hum >= 70 && drive < 50) s3.appendChild(h("p", "pattern", "Balance check: people are treated well, but standards and drive are soft. Respect without a high bar is comfort, not leadership. Raise the bar and keep the respect."));
    }
    root.appendChild(s3);

    // ----- 7. principles -----
    var enough = a.n >= 20 ? B.principleOrder.filter(function (k) { return a.pN[k] >= 2; }).length : 0;
    var sp = section("The eleven principles");
    if (enough < 8) {
      sp.appendChild(h("p", "fine", "Principle scores need the standard or deep dive. This read does not have enough situations behind each principle to show them fairly."));
    } else
    add(sp, h("p", "fine", "Each principle counts equally. A number appears only with 4 or more situations behind it. With 2 or 3 you get a band, and with fewer, nothing."));
    var pb = h("div", "dims");
    if (enough >= 8) B.principleOrder.forEach(function (k) {
      var n = a.pN[k];
      if (n >= 4) pb.appendChild(bar(P[k].name, a.pAvg[k], B.benchmark.axis));
      else if (n >= 2) { var row = h("div", "dim-row pband"); add(row, add(h("div", "dim-top"), h("span", "dim-label", P[k].name), h("span", "dim-val", bandOf(a.pAvg[k]))), h("p", "dim-hint", "Limited evidence: " + n + " situations")); pb.appendChild(row); }
      else { var row2 = h("div", "dim-row pband"); add(row2, add(h("div", "dim-top"), h("span", "dim-label", P[k].name), h("span", "dim-val mute", "Not enough")), h("p", "dim-hint", n + " situation" + (n === 1 ? "" : "s"))); pb.appendChild(row2); }
    });
    sp.appendChild(pb);
    root.appendChild(sp);

    var fin = h("div", "final-obs");
    add(fin, h("p", "eyebrow", "One last thing"), h("p", "pull", cls.obs), h("p", "philosophy", B.philosophy));
    root.appendChild(fin);

    // ----- 8. everything else lives under one fold -----
    var more = h("details", "more");
    more.appendChild(h("summary", null, "Go deeper: strengths and costs, how the score was built, what it can tell you"));
    more.appendChild(h("p", "lens", ed.lens));
    more.appendChild(h("p", "fine meaning", "In plain terms: " + cls.meaning + " Classified from your answer pattern, not from the score alone."));
    if (a.score !== a.scoreNeutral) more.appendChild(h("p", "fine", "Your industry setting moved the score by " + Math.abs(a.score - a.scoreNeutral) + " points. Without that adjustment it would be " + a.scoreNeutral + "."));
    if (!cautionUpFront) more.appendChild(cp);

    var top2 = solid.slice(0, 2), low2 = solid.slice(-2).reverse();
    if (solid.length >= 4) {
      var two = h("div", "two-col");
      var cs = h("div"); cs.appendChild(h("h3", "sub", "Greatest strengths"));
      top2.forEach(function (k) {
        var it = h("div", "pt");
        add(it, h("h4", null, P[k].name + ", " + bandOf(a.pAvg[k])), h("p", null, a.pAvg[k] >= 60 ? P[k].strength : "This is your relatively best area, but not yet a strength. " + P[k].strength));
        cs.appendChild(it);
      });
      var cd = h("div"); cd.appendChild(h("h3", "sub", "Biggest dysfunctions"));
      low2.forEach(function (k) {
        var it = h("div", "pt bad");
        add(it, h("h4", null, P[k].name + ", " + bandOf(a.pAvg[k])), h("p", null, P[k].flaw));
        cd.appendChild(it);
      });
      add(two, cs, cd);
      more.appendChild(two);
    } else {
      var early = B.principleOrder.filter(function (k) { return a.pN[k] >= 2 && a.pAvg[k] != null && a.pAvg[k] < 60; })
        .sort(function (x, y) { return a.pAvg[x] - a.pAvg[y]; }).slice(0, 2);
      if (early.length) {
        more.appendChild(h("h3", "sub", "Early signals"));
        more.appendChild(h("p", "fine", "Too few situations to call these strengths or dysfunctions. They are places worth a closer look."));
        early.forEach(function (k) {
          var it = h("div", "pt");
          add(it, h("h4", null, P[k].name + ": possibly weak (" + a.pN[k] + " situations)"), h("p", "mute", "Hint: " + P[k].flaw));
          more.appendChild(it);
        });
      }
    }

    more.appendChild(h("h3", "sub", "The three situations that cost you most"));
    if (!picks.length) more.appendChild(h("p", "fine", "Nothing you described is seriously damaging. Take that seriously and protect it."));
    picks.forEach(function (x) {
      var d = h("div", "pt bad");
      add(d, h("h4", null, x.card.title + ": " + typeName(x.card, x.t)), h("p", null, "You said: " + optionText(x.card, x.t)), h("p", "mute", x.card.insight));
      more.appendChild(d);
    });

    more.appendChild(h("h3", "sub", "How this score was built"));
    var tbl = h("table", "count-table");
    var thead = h("thead"), trh = h("tr");
    ["Answer type", "Situations", "Percent"].forEach(function (x) { trh.appendChild(h("th", null, x)); });
    thead.appendChild(trh); tbl.appendChild(thead);
    var tb = h("tbody");
    [["Entrepreneurial", "A"], ["Healthy corporate", "B"], ["Bureaucratic", "C"], ["Self-protective", "D"], ["It varies", "N"]].forEach(function (r) {
      var tr = h("tr"); add(tr, h("th", null, r[0]), h("td", null, String(a.cnt[r[1]])), h("td", "mute", Math.round(pc[r[1]] * 100) + "%")); tb.appendChild(tr);
    });
    tbl.appendChild(tb);
    add(more, tbl,
      h("p", "fine", "Each answer is scored by how well it fits the stakes of the situation. Low stakes: Entrepreneurial 100, Healthy corporate 75, Bureaucratic 40, Self-protective 5. High stakes (money, safety, privacy, law): Healthy corporate 100, Entrepreneurial 50, Bureaucratic 55, Self-protective 5. Medium stakes: both fast and proportionate answers score about 95, nudged slightly by the industry setting. In heavily regulated industries, seven named situations are treated as higher stakes. It varies scores 50, and not seen is left out. Every principle counts equally in the overall score. Situations you could not see from where you sit count 0.7."),
      h("p", "fine", "The classification comes from the pattern: how much of what you described was slow structure, how much was toxic behavior, and how consistent it was. It is not read off the score alone."));
    more.appendChild(h("h3", "sub", "What this can and cannot tell you"));
    var can = h("ul", "flag-list plain");
    ["It describes how one person perceives recurring patterns at their workplace.", "It separates slow structure from toxic behavior.", "It shows relative strengths and weaknesses across the eleven principles for the same respondent.", "When two people in one company play it, the gap between them is informative."].forEach(function (t) { can.appendChild(h("li", null, t)); });
    var cannot = h("ul", "flag-list plain");
    ["It does not measure the company's real performance, or predict results.", "It cannot say one company is better than another. There are no norms.", "It is not an HR, legal or hiring tool, and says nothing about any individual.", "The eleven principles are one interpretation of a biography, not proven causes of success.", "The score is a range. At typical lengths that range is 10 to 35 points wide. This is a conversation tool, not a validated assessment."].forEach(function (t) { cannot.appendChild(h("li", null, t)); });
    add(more, h("p", "fine", "Reasonable to conclude:"), can, h("p", "fine", "Not reasonable to conclude:"), cannot);
    more.appendChild(h("h3", "sub", "Questions for leadership"));
    more.appendChild(h("p", "lead small", edition === "ceo" ? B.ceoLead : B.staffLead));
    var ol2 = h("ol", "plan");
    var qcats = (ranked.length >= 4 ? ranked.slice().reverse() : weakest).slice(0, 5);
    B.principleOrder.forEach(function (k) { if (qcats.length < 5 && qcats.indexOf(k) < 0) qcats.push(k); });
    qcats.forEach(function (k) { ol2.appendChild(h("li", null, P[k].ceoq)); });
    more.appendChild(ol2);
    if (state.mode === "assess") {
      more.appendChild(h("h3", "sub", "Your answers, card by card"));
      state.deck.forEach(function (ci) {
        var t = ans[ci]; if (!t) return;
        var c = B.cards[ci], d = h("div", "pt" + (t === "C" || t === "D" ? " bad" : ""));
        add(d, h("h4", null, c.title + ": " + typeName(c, t)), h("p", null, "You said: " + optionText(c, t)),
          h("p", "mute", (t === "C" || t === "D") ? wtfFor(c, t) + " " + c.insight : c.insight));
        more.appendChild(d);
      });
    }
    root.appendChild(more);

    // ----- wiring -----
    b4.addEventListener("click", function () { go_start(); });
    pushScreen("result");
    show("result");
  }

  // ---------- wiring ----------
  var q = new URLSearchParams(location.search).get("edition");
  if (q === "ceo") { $("go-ceo").classList.remove("ghost"); $("go-staff").classList.add("ghost"); }
  var bp = $("blueprint");
  if (bp) B.principleOrder.forEach(function (k) {
    var li = h("li"); add(li, h("strong", null, P[k].name + ". "), document.createTextNode(P[k].question)); bp.appendChild(li);
  });
  if ($("philosophy-line")) $("philosophy-line").textContent = B.philosophy;
  var hook = $("hook");
  if (hook) hook.textContent = B.taglines[Math.floor(Math.random() * B.taglines.length)];
  $("start-form").addEventListener("submit", function (e) { e.preventDefault(); });
  function go(edition) { start(edition, parseInt($("len").value, 10), parseInt($("ctx").value, 10), $("fmode").value); }
  $("go-staff").addEventListener("click", function () { go("staff"); });
  $("go-ceo").addEventListener("click", function () { go("ceo"); });
  document.addEventListener("click", function (e) {
    var t = e.target;
    if (t && t.classList && t.classList.contains("js-clear")) { e.preventDefault(); clearAll(); }
  });
  $("next").addEventListener("click", next);
  $("back").addEventListener("click", back);
  $("restart").addEventListener("click", function () { $("restart").hidden = true; $("restart-confirm").hidden = false; });
  $("restart-no").addEventListener("click", function () { $("restart-confirm").hidden = true; $("restart").hidden = false; });
  $("restart-yes").addEventListener("click", function () { $("restart-confirm").hidden = true; $("restart").hidden = false; go_start(); });
  if (window.history && history.replaceState) history.replaceState({ s: "start", i: 0 }, "");
  window.addEventListener("popstate", function (e) {
    var st = e.state || { s: "start", i: 0 };
    if (st.s === "play") {
      if (!state.deck.length) { show("start"); return; }
      state.idx = Math.max(0, Math.min(st.i || 0, state.deck.length - 1));
      show("play"); render();
    } else if (st.s === "result") {
      if ($("report").textContent) show("result"); else show("start");
    } else { show("start"); }
  });
  $("f-toggle").addEventListener("click", function () {
    var open = $("f-more").hidden;
    $("f-more").hidden = !open;
    $("options").classList.toggle("show-all", open);
    this.setAttribute("aria-expanded", open ? "true" : "false");
    this.textContent = open ? "Hide" : "Why it scores this way";
  });
  document.addEventListener("keydown", function (e) {
    if ($("play").hidden) return;
    if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= 6) {
      choose(state.perms[cur()][n - 1]);
    } else if (e.key === "Enter") {
      var ae = document.activeElement;
      if (ae && ae.id === "next") return; // native click handles it
      if (ae && ae.tagName === "BUTTON" && ae.id !== "next" && !ae.classList.contains("obtn")) return;
      e.preventDefault();
      next();
    }
  });
})();
