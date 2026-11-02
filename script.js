(function () {
  "use strict";
  /* ===== CUSTOMIZE =====
     Easiest: add to the end of the page link  #HerName  or  #HerName--YourName
     (use - or _ for a space, e.g. #Sara-Khan--Ali). Or change the defaults below. */
  var DEFAULT_NAME = "Palak", DEFAULT_FROM = "your friend", DEFAULT_NICK = "Artist", NICK = "Artist";

  var BIRTH_DATE = new Date("2010-11-03T00:00:00+05:30");

  var $ = function (s) { return document.querySelector(s) };
  var nameEl = $("#name"), fromEl = $("#from");
  function clean(s) { return (s || "").replace(/[-_]+/g, " ").trim().slice(0, 24) }
  function applyName() {
    var h = "";

    try {
      h = decodeURIComponent(location.hash.slice(1));
    } catch (e) { }

    var p = h.split("--"),
      n = clean(p[0]) || DEFAULT_NAME,
      f = clean(p[1]) || DEFAULT_FROM;

    NICK = clean(p[2]) || DEFAULT_NICK;

    nameEl.textContent = n;
    fromEl.textContent = f;
    $("#from2").textContent = f;

    updateBirthdayCounter();

    nameEl.style.setProperty("--k", Math.min(1, 11 / n.length).toFixed(2));
    document.title = "Happy Birthday " + n + "!";
  }
  applyName(); addEventListener("hashchange", applyName);
  // Birthday counter
  updateBirthdayCounter();
  setInterval(updateBirthdayCounter, 1000);

  /* ===== LIVE BIRTHDAY AGE COUNTER ===== */


  function updateBirthdayCounter() {
    var now = new Date();

    var years = now.getFullYear() - BIRTH_DATE.getFullYear();

    var anniversary = new Date(BIRTH_DATE);
    anniversary.setFullYear(BIRTH_DATE.getFullYear() + years);

    if (now < anniversary) {
      years--;
      anniversary.setFullYear(BIRTH_DATE.getFullYear() + years);
    }

    var diff = Math.floor((now - anniversary) / 1000);

    var days = Math.floor(diff / 86400);
    var hours = Math.floor((diff % 86400) / 3600);
    var minutes = Math.floor((diff % 3600) / 60);
    var seconds = diff % 60;

    var time =
      String(hours).padStart(2, "0") + ":" +
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");

    $("#date").textContent =
      "🎨 " + years + " Years, " +
      days + " Days, " + time;
  }


  // Start live counter
  updateBirthdayCounter();
  setInterval(updateBirthdayCounter, 1000);
  /* title letters */
  var LC = ["#ff6fa5", "#ff9b54", "#e6b800", "#2fbf80", "#2aa9e0", "#7c5cff"], idx = 0, t = $("#title");
  "Happy Birthday!".split(" ").forEach(function (w) {
    var s = document.createElement("span"); s.className = "w"; s.setAttribute("aria-hidden", "true");
    w.split("").forEach(function (c) { var l = document.createElement("span"); l.className = "l"; l.textContent = c; l.style.setProperty("--i", idx); l.style.color = LC[idx % LC.length]; idx++; s.appendChild(l) });
    t.appendChild(s);
  });

  /* floating drawn doodles */
  var SH = [
    '<path pathLength="1" d="M12 2l3 7 7 .8-5.3 4.8 1.6 7.4L12 18l-6.3 4 1.6-7.4L2 9.8 9 9z"/>',
    '<path pathLength="1" d="M6 10Q12 6 18 10L12 28Z"/><path pathLength="1" d="M12 7L9 2M12 7V1M12 7l3-5"/>',
    '<circle pathLength="1" cx="12" cy="5" r="4"/><circle pathLength="1" cx="19" cy="10" r="4"/><circle pathLength="1" cx="16" cy="19" r="4"/><circle pathLength="1" cx="8" cy="19" r="4"/><circle pathLength="1" cx="5" cy="10" r="4"/><circle pathLength="1" cx="12" cy="13" r="3"/>',
    '<path pathLength="1" d="M4 20L6 14 18 2l4 4L10 18zM6 14l4 4M16 4l4 4"/>',
    '<path pathLength="1" d="M12 3C6 3 2 7 2 12s4 9 9 9c2 0 2-2 1-3s0-3 2-3h4c2 0 4-2 4-5 0-4-4-7-10-7z"/><circle pathLength="1" cx="8" cy="10" r="1.3"/><circle pathLength="1" cx="13" cy="7" r="1.3"/><circle pathLength="1" cx="17" cy="10" r="1.3"/>',
    '<path pathLength="1" d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z"/>'
  ];
  var DC = ["#ff6fa5", "#e6a400", "#2aa9e0", "#7c5cff", "#2fbf80", "#ff9b54"];
  var POS = [[4, 8], [84, 6], [10, 30], [86, 32], [3, 56], [88, 58], [12, 82], [80, 84], [44, 2], [50, 90], [24, 92], [68, 4]];
  POS.forEach(function (p, i) {
    var d = document.createElement("div"); d.className = "dd"; d.setAttribute("aria-hidden", "true");
    d.style.left = p[0] + "%"; d.style.top = p[1] + "%"; d.style.color = DC[i % DC.length];
    d.style.setProperty("--d", (4 + Math.random() * 4).toFixed(1) + "s"); d.style.setProperty("--w", (0.4 + i * 0.18).toFixed(2) + "s");
    d.innerHTML = '<svg viewBox="0 0 24 30">' + SH[i % SH.length] + '</svg>';
    document.body.appendChild(d);
  });

  /* rotating messages */
  var M = ["Wishing you a super fun day!", "Keep drawing, keep dreaming ✏️", "Hop into a new year full of smiles 🐰", "May your day be as bright as your colours 🎨", "So glad to have you as a friend!", "Today is all about you. Enjoy it!"], mi = 0, msg = $("#msg");
  setInterval(function () {
    msg.classList.add("out");
    setTimeout(function () { mi = (mi + 1) % (M.length + 2); msg.textContent = mi < M.length ? M[mi] : (mi === M.length ? "Happy Birthday, " + NICK + "! 🎨" : "Chocolate delivery every morning, please! 🍫"); msg.classList.remove("out") }, 450);
  }, 3800);

  /* confetti + sparkle trail */
  var cv = $("#fx"), cx = cv.getContext("2d"), W, H, P = [];
  var CL = ["#ff6fa5", "#ffd34e", "#5ad1ff", "#7c5cff", "#6be3a1", "#ff9b54"];
  function size() { var d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; cx.setTransform(d, 0, 0, d, 0, 0) }
  size(); addEventListener("resize", size);
  function add(x, y, o) { var p = { x: x, y: y, vx: 0, vy: 0, g: .15, l: 0, m: 80, s: 6, c: CL[Math.random() * CL.length | 0], t: 0, r: Math.random() * 6, vr: (Math.random() - .5) * .3 }; for (var k in o) p[k] = o[k]; P.push(p) }
  function burst(x, y, n) { for (var i = 0; i < n; i++) { var a = Math.random() * 6.283, v = 3 + Math.random() * 7; add(x, y, { vx: Math.cos(a) * v, vy: Math.sin(a) * v - 4, m: 70 + Math.random() * 50, s: 5 + Math.random() * 6, t: Math.random() * 3 | 0 }) } }
  function rain(n) { for (var i = 0; i < n; i++)add(Math.random() * W, -10 - Math.random() * H * .4, { vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 3, g: .02, m: 260, s: 6 + Math.random() * 5, t: Math.random() * 3 | 0 }) }
  function star(r) { cx.beginPath(); for (var i = 0; i < 8; i++) { var rr = i % 2 ? r * .35 : r, a = i * Math.PI / 4; cx.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) } cx.closePath(); cx.fill() }
  var ink = [], down = false;
  function drawInk() {
    var n = performance.now();
    while (ink.length && n - ink[0].t > 2600) ink.shift();
    cx.lineCap = "round"; cx.lineJoin = "round"; cx.lineWidth = 7;
    for (var i = 1; i < ink.length; i++) {
      var a = ink[i - 1], b = ink[i]; if (b.s) continue;
      cx.globalAlpha = Math.max(0, 1 - (n - b.t) / 2600); cx.strokeStyle = "hsl(" + b.h + ",90%,60%)";
      cx.beginPath(); cx.moveTo(a.x, a.y); cx.lineTo(b.x, b.y); cx.stroke();
    }
    cx.globalAlpha = 1;
  }
  function loop() {
    cx.clearRect(0, 0, W, H); drawInk();
    P = P.filter(function (p) { return p.l < p.m });
    for (var i = 0; i < P.length; i++) {
      var p = P[i];
      p.l++; p.vy += p.g; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr;
      cx.globalAlpha = Math.max(1 - p.l / p.m, 0); cx.fillStyle = p.c;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      if (p.t === 0) cx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      else if (p.t === 1) { cx.beginPath(); cx.arc(0, 0, p.s / 2, 0, 7); cx.fill() }
      else if (p.t === 3) { cx.font = p.s * 3 + "px serif"; cx.textAlign = "center"; cx.fillText(p.e, 0, 0) }
      else star(p.s);
      cx.restore();
    }
    cx.globalAlpha = 1; requestAnimationFrame(loop);
  }
  loop();
  var last = 0;
  addEventListener("pointermove", function (e) {
    var n = performance.now(); look(e); if (e.buttons) { ink.push({ x: e.clientX, y: e.clientY, t: n, h: (n / 7) % 360, s: !down }); down = true; return } down = false; if (n - last < 28) return; last = n;
    add(e.clientX, e.clientY, { vx: (Math.random() - .5) * 1.6, vy: (Math.random() - .5) * 1.6, g: .03, m: 42, s: 4 + Math.random() * 5, t: 2 });
  });
  addEventListener("pointerdown", function (e) { burst(e.clientX, e.clientY, 10); down = false });
  addEventListener("pointerup", function () { down = false });
  addEventListener("pointercancel", function () { down = false });
  var pp = document.querySelectorAll(".pp"), hd = document.querySelector(".bunny");
  function look(e) {
    var r = hd.getBoundingClientRect(), dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height * .47), d = Math.hypot(dx, dy) || 1, k = Math.min(d, 200) / 200 * 3.5;
    for (var i = 0; i < pp.length; i++)pp[i].setAttribute("transform", "translate(" + (dx / d * k).toFixed(2) + " " + (dy / d * k).toFixed(2) + ")")
  }
  t.addEventListener("click", function (e) { var l = e.target; if (l.classList && l.classList.contains("l")) l.animate([{ translate: "0 0" }, { translate: "0 -34px" }, { translate: "0 0" }], { duration: 520, easing: "ease-out" }) });

  /* bunny hop + surprise */
  var bw = $("#bw");
  function hop() { bw.classList.remove("hop"); void bw.offsetWidth; bw.classList.add("hop") }
  var SAY = ["Hop hop! 🐰", "Boing!", "Happy birthday!", "Wheee!", "Draw me! ✏️", "Carrot time 🥕", "You rock!"], hops = 0, say = $("#say"), sayT;
  function talk(s) { say.textContent = s; say.classList.add("on"); clearTimeout(sayT); sayT = setTimeout(function () { say.classList.remove("on") }, 1800) }
  function eRain(a, n) { for (var i = 0; i < n; i++)add(Math.random() * W, -20 - Math.random() * H * .5, { vx: (Math.random() - .5) * 2, vy: 2 + Math.random() * 2.5, g: .02, m: 300, s: 9 + Math.random() * 7, t: 3, e: a[i % a.length], vr: (Math.random() - .5) * .1 }) }
  function bunnyBurst() {
    var r = bw.getBoundingClientRect(); hop(); burst(r.left + r.width / 2, r.top + r.height * .3, 40); hops++;
    if (hops % 10 === 0) { talk("Secret found! 🥕🥕🥕"); eRain(["🥕"], 26) } else talk(hops % 5 === 0 ? "Hey " + NICK + "! 🎨" : hops % 7 === 0 ? "Chocolate? 🍫" : SAY[hops % SAY.length])
  }
  bw.addEventListener("click", bunnyBurst);
  bw.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); bunnyBurst() } });
  function balloons() {
    var bc = ["#ff6fa5", "#ffd34e", "#5ad1ff", "#7c5cff", "#6be3a1", "#ff9b54"];
    for (var i = 0; i < 10; i++) {
      var b = document.createElement("div"); b.className = "bn";
      b.style.left = (4 + Math.random() * 88) + "%";
      b.style.setProperty("--c", bc[i % bc.length]);
      b.style.setProperty("--d", (5 + Math.random() * 3).toFixed(1) + "s");
      b.style.setProperty("--x", ((Math.random() - .5) * 80).toFixed(0) + "px");
      b.style.animationDelay = (i * .15) + "s";
      document.body.appendChild(b);
      (function (el) { setTimeout(function () { el.remove() }, 9500) })(b);
    }
  }
  var btn = $("#btn");
  btn.addEventListener("click", function () {
    balloons(); hop(); rain(90); burst(W / 2, H * .35, 90); eRain(["🐰", "🎨", "✏️", "⭐", "🥕"], 20); talk("Happy Birthday! 🎉");
    btn.textContent = "More! 🎉";
  });

  /* music box: Happy Birthday tune made with Web Audio */
  var mb = $("#mus"), ac = null, mg = null, mt = null, playing = false;
  var MEL = [[392, .75], [392, .25], [440, 1], [392, 1], [523.25, 1], [493.88, 2], [392, .75], [392, .25], [440, 1], [392, 1], [587.33, 1], [523.25, 2], [392, .75], [392, .25], [783.99, 1], [659.25, 1], [523.25, 1], [493.88, 1], [440, 1], [698.46, .75], [698.46, .25], [659.25, 1], [523.25, 1], [587.33, 1], [523.25, 2]];
  function tone(f, t, d) {
    [[1, .22], [2, .07]].forEach(function (h) {
      var o = ac.createOscillator(), g = ac.createGain(); o.type = h[0] === 1 ? "triangle" : "sine"; o.frequency.value = f * h[0];
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(h[1], t + .015); g.gain.exponentialRampToValueAtTime(.0001, t + d + .5);
      o.connect(g); g.connect(mg); o.start(t); o.stop(t + d + .6);
    })
  }
  function cycle() {
    var t = ac.currentTime + .05, B = .44;
    MEL.forEach(function (n) { tone(n[0], t, n[1] * B); t += n[1] * B });
    mt = setTimeout(cycle, (t - ac.currentTime + .6) * 1000);
  }
  function music(on) {
    playing = on; mb.classList.toggle("on", on); mb.textContent = on ? "🎵" : "🔇"; mb.setAttribute("aria-pressed", on ? "true" : "false");
    if (on) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); ac.resume(); mg = ac.createGain(); mg.gain.value = .8; mg.connect(ac.destination); cycle() } catch (e) { playing = false; mb.classList.remove("on"); mb.textContent = "🔇" } }
    else { clearTimeout(mt); if (mg) { var g = mg; g.gain.setTargetAtTime(0, ac.currentTime, .05); setTimeout(function () { try { g.disconnect() } catch (e) { } }, 500) } }
  }
  mb.addEventListener("click", function () { music(!playing) });

  /* cake + wishes */
  var ov = $("#ov"), pc = $("#pc"), pw = $("#pw"), cs = $("#cs"), fls = document.querySelectorAll(".fl"), lit = 3;
  var WS = ["Happy Birthday! May your day be full of laughter, cake and good vibes.", "Wishing you a whole year of beautiful drawings and big smiles ✏️", "You make every day more fun. Thank you for being such a great friend!", "May all your wishes come true, and may every carrot be extra crunchy 🥕", "Keep creating, keep shining. The world needs your colours 🎨", "Have the happiest birthday ever! Hop, hop, hooray! 🐰"], wi = 0, wt = $("#wt"), wc = $("#wc");
  function wishesFor() { var N = NICK; return ["Happy Birthday, " + N + "! May your day be full of laughter, cake and good vibes. 🎂", "Wishing you a whole year of beautiful drawings, perfect pencils and big smiles ✏️", "Breaking news: " + N + " just levelled up to a new age. Please stay calm and add extra sparkles ✨", "Dear " + N + ", your morning chocolates are officially my favourite habit 🍫 Request: please keep them coming every morning, forever. No returns, bunny approved!", "May all your wishes come true, and may every carrot be extra crunchy 🥕", "Keep creating, keep shining. The world needs your colours 🎨 Thanks for being a great friend!"] }
  function showWish(i) { WS = wishesFor(); wi = (i + WS.length) % WS.length; wt.classList.add("out"); setTimeout(function () { wt.textContent = WS[wi]; wt.classList.toggle("lg", WS[wi].length > 100); wc.textContent = (wi + 1) + " / " + WS.length; wt.classList.remove("out") }, 200) }
  var ck = document.querySelector(".cake");
  function celebrate() { ck.classList.remove("cel"); void ck.offsetWidth; ck.classList.add("cel") }
  function relight() { ck.classList.remove("cel"); fls.forEach(function (f) { f.classList.remove("off") }); lit = 3; cs.textContent = "Close your eyes, make a wish, then tap each candle to blow it out."; $("#rl").style.display = "none" }
  function openP(p) { pc.classList.toggle("show", p === pc); pw.classList.toggle("show", p === pw); ov.classList.add("on"); if (p === pc) relight(); else showWish(0) }
  function closeP() { ov.classList.remove("on") }
  ov.addEventListener("click", function (e) { if (e.target === ov) closeP() });
  document.querySelectorAll(".x").forEach(function (b) { b.addEventListener("click", closeP) });
  addEventListener("keydown", function (e) { if (e.key === "Escape") closeP() });
  $("#bcake").addEventListener("click", function () { openP(pc) });
  $("#bwish").addEventListener("click", function () { openP(pw) });
  $("#wn").addEventListener("click", function () { showWish(wi + 1) });
  $("#wp").addEventListener("click", function () { showWish(wi - 1) });
  $("#rl").addEventListener("click", relight);
  function blow(c) {
    var f = c.querySelector(".fl"); if (f.classList.contains("off")) return;
    var r = f.getBoundingClientRect(); f.classList.add("off"); lit--;
    for (var i = 0; i < 8; i++)add(r.left + r.width / 2, r.top + r.height / 2, { vx: (Math.random() - .5) * 1.5, vy: -1 - Math.random() * 1.5, g: -.01, m: 100, s: 6 + Math.random() * 5, t: 1, c: "#c9bfd6" });
    if (lit === 0) { cs.textContent = "Wish granted! Happy Birthday! 🎉"; $("#rl").style.display = "inline-block"; celebrate(); burst(W / 2, H * .4, 110); balloons(); eRain(["🎂", "🎉", "⭐", "🐰"], 18) }
    else cs.textContent = lit + (lit === 1 ? " candle" : " candles") + " left. Keep going!";
  }
  document.querySelectorAll(".cd").forEach(function (c) { c.addEventListener("click", function () { blow(c) }); c.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blow(c) } }) });

  /* opening moment */
  setTimeout(function () { burst(W / 2, H * .3, 80); rain(50) }, 1000);
  setTimeout(function () { talk("Hi there! 👋") }, 1700);
})();
