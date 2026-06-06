/* ============================================================
   Kanji-Duell — eingebettetes Minispiel für Nihongo Explorer
   Rundenbasiertes Samurai-Duell: Antworte mit der Bedeutung des
   Kanji, um zuzuschlagen. Reines Canvas + DOM, keine Abhängigkeiten.

   Portiert aus dem eigenständigen "Kanji Duel"-Projekt und an die
   Tab-/Modulstruktur von Nihongo Explorer angepasst:
     - Alle DOM-IDs/Klassen mit "kd-" gekapselt (im Container erzeugt).
     - Datenquelle: window.KANJI_DATA (JLPT N5–N1, deutsche Bedeutungen).
     - Lebenszyklus: onTabActivate / onTabDeactivate steuern Render-
       Schleife und Audio, damit nichts im Hintergrund weiterläuft.
   ============================================================ */
(function () {
  "use strict";

  /* ---------------- Modul-Zustand ---------------- */
  var root = null;            // Container (#kanjiduel-tab)
  var stage = null;           // Bühne (#kd-stage)
  var canvas = null, ctx = null;
  var W = 0, H = 0, DPR = 1;
  var inited = false, running = false, rafId = null, last = 0;

  /* ---------------- Utilities ---------------- */
  var rand = function (a, b) { return a + Math.random() * (b - a); };
  var choice = function (arr) { return arr[(Math.random() * arr.length) | 0]; };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };
  var easeInOut = function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; };
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = (Math.random() * (i + 1)) | 0; var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  /* ---------------- Audio (WebAudio-Synth) ---------------- */
  var Audio0 = {
    ctx: null, muted: false,
    init: function () { if (!this.ctx) { try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); },
    tone: function (freq, dur, type, gain, glide, delay) {
      type = type || "sine"; gain = gain == null ? 0.2 : gain; glide = glide || null; delay = delay || 0;
      if (!this.ctx || this.muted) return;
      var t0 = this.ctx.currentTime + delay;
      var o = this.ctx.createOscillator();
      var g = this.ctx.createGain();
      o.type = type; o.frequency.setValueAtTime(freq, t0);
      if (glide) o.frequency.exponentialRampToValueAtTime(glide, t0 + dur);
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(gain, t0 + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g).connect(this.ctx.destination);
      o.start(t0); o.stop(t0 + dur + 0.05);
    },
    noise: function (dur, gain, delay) {
      gain = gain == null ? 0.25 : gain; delay = delay || 0;
      if (!this.ctx || this.muted) return;
      var t0 = this.ctx.currentTime + delay;
      var n = Math.floor(this.ctx.sampleRate * dur);
      var buf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
      var d = buf.getChannelData(0);
      for (var i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / n);
      var src = this.ctx.createBufferSource(); src.buffer = buf;
      var g = this.ctx.createGain(); g.gain.setValueAtTime(gain, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      var f = this.ctx.createBiquadFilter(); f.type = "highpass"; f.frequency.value = 1200;
      src.connect(f).connect(g).connect(this.ctx.destination); src.start(t0);
    },
    select: function () { this.tone(520, 0.08, "triangle", 0.12); },
    slash: function () { this.noise(0.18, 0.3); this.tone(900, 0.16, "sawtooth", 0.08, 200); },
    hit: function () { this.noise(0.12, 0.35); this.tone(140, 0.22, "square", 0.18, 60); },
    correct: function () { var n = [523, 659, 784]; var self = this; n.forEach(function (f, i) { self.tone(f, 0.25, "triangle", 0.14, null, i * 0.06); }); },
    wrong: function () { this.tone(220, 0.35, "sawtooth", 0.16, 110); },
    win: function () { var n = [523, 659, 784, 1046]; var self = this; n.forEach(function (f, i) { self.tone(f, 0.4, "triangle", 0.15, null, i * 0.12); }); },
    lose: function () { var n = [392, 330, 262, 196]; var self = this; n.forEach(function (f, i) { self.tone(f, 0.45, "sine", 0.16, null, i * 0.16); }); },
    gong: function () { this.tone(98, 1.4, "sine", 0.22, 70); this.tone(196, 1.0, "sine", 0.1); },

    /* ---- Hintergrundmusik (Endlosschleife): Hirajoshi-Koto + Taiko ---- */
    music: {
      on: false, gain: null, timer: null, ahead: 0.14,
      step: 0, nextTime: 0, intensity: 0,
      root: 146.83,                                   // D3
      mel: [0, null, 7, 8, null, 7, 3, null, 12, null, 8, 7, 3, null, 2, 0],
      bass: [1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0],
      tempo: function () { return 82 + this.intensity * 9; },
      start: function () {
        var ac = Audio0.ctx; if (!ac || this.on) return;
        if (!this.gain) { this.gain = ac.createGain(); this.gain.gain.value = Audio0.muted ? 0 : 0.85; this.gain.connect(ac.destination); }
        this.on = true; this.step = 0; this.nextTime = ac.currentTime + 0.12;
        var self = this; this.timer = setInterval(function () { self.tick(); }, 25);
      },
      stop: function () { if (this.timer) clearInterval(this.timer); this.timer = null; this.on = false; },
      setIntensity: function (n) { this.intensity = n; },
      setMuted: function (m) { if (this.gain && Audio0.ctx) this.gain.gain.setTargetAtTime(m ? 0 : 0.85, Audio0.ctx.currentTime, 0.05); },
      tick: function () {
        var ac = Audio0.ctx; if (!ac || !this.on) return;
        while (this.nextTime < ac.currentTime + this.ahead) {
          this.schedule(this.step, this.nextTime);
          this.nextTime += (60 / this.tempo()) / 2;
          this.step = (this.step + 1) % 16;
        }
      },
      schedule: function (i, t) {
        if (Audio0.muted) { return; }
        if (i === 0) this.drone(t);
        var n = this.mel[i];
        if (n !== null) this.pluck(this.root * Math.pow(2, n / 12), t, 0.55, 0.14);
        if (this.bass[i]) this.taiko(t, 0.55);
        if (this.intensity >= 1 && i % 2 === 1) this.taiko(t, 0.18);
        if (this.intensity >= 2 && n !== null) this.pluck(this.root * 2 * Math.pow(2, n / 12), t, 0.22, 0.05, "sawtooth");
      },
      pluck: function (freq, t, dur, gain, type) {
        type = type || "triangle";
        var ac = Audio0.ctx;
        var o = ac.createOscillator(), o2 = ac.createOscillator(), g = ac.createGain(), f = ac.createBiquadFilter();
        o.type = type; o2.type = type; o.frequency.value = freq; o2.frequency.value = freq * 1.006;
        f.type = "lowpass"; f.frequency.value = Math.min(freq * 5, 5200);
        g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(gain, t + 0.012);
        g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
        o.connect(g); o2.connect(g); g.connect(f); f.connect(this.gain);
        o.start(t); o2.start(t); o.stop(t + dur + 0.05); o2.stop(t + dur + 0.05);
      },
      taiko: function (t, gain) {
        var ac = Audio0.ctx;
        var o = ac.createOscillator(), g = ac.createGain();
        o.type = "sine"; o.frequency.setValueAtTime(124, t); o.frequency.exponentialRampToValueAtTime(46, t + 0.18);
        g.gain.setValueAtTime(gain, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
        o.connect(g).connect(this.gain); o.start(t); o.stop(t + 0.3);
        var len = (ac.sampleRate * 0.05) | 0, buf = ac.createBuffer(1, len, ac.sampleRate), d = buf.getChannelData(0);
        for (var k = 0; k < len; k++) d[k] = (Math.random() * 2 - 1) * (1 - k / len);
        var src = ac.createBufferSource(); src.buffer = buf;
        var ng = ac.createGain(); ng.gain.value = gain * 0.45;
        src.connect(ng).connect(this.gain); src.start(t);
      },
      drone: function (t) {
        var ac = Audio0.ctx, len = (60 / this.tempo()) * 4;
        var self = this;
        [this.root / 2, (this.root / 2) * Math.pow(2, 7 / 12)].forEach(function (fr) {
          var o = ac.createOscillator(), g = ac.createGain();
          o.type = "sine"; o.frequency.value = fr;
          g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(0.045, t + 0.5);
          g.gain.linearRampToValueAtTime(0.0001, t + len);
          o.connect(g).connect(self.gain); o.start(t); o.stop(t + len + 0.1);
        });
      }
    }
  };

  /* ---------------- Sakura-Blütenblätter ---------------- */
  var petals = [];
  function initPetals() {
    petals.length = 0;
    var n = 26;
    for (var i = 0; i < n; i++) petals.push({
      x: rand(0, W), y: rand(0, H), s: rand(6, 13),
      vy: rand(18, 42), drift: rand(12, 30), phase: rand(0, Math.PI * 2),
      spin: rand(-1.2, 1.2), rot: rand(0, Math.PI * 2)
    });
  }
  function updatePetals(dt) {
    for (var i = 0; i < petals.length; i++) {
      var p = petals[i];
      p.y += p.vy * dt;
      p.x += Math.sin(p.phase + p.y * 0.02) * p.drift * dt;
      p.rot += p.spin * dt;
      if (p.y > H + 20) { p.y = -20; p.x = rand(0, W); }
    }
  }
  function drawPetal(p) {
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    ctx.fillStyle = "rgba(255,210,225,0.85)";
    ctx.beginPath();
    ctx.moveTo(0, -p.s * 0.5);
    ctx.quadraticCurveTo(p.s * 0.5, -p.s * 0.2, p.s * 0.18, p.s * 0.5);
    ctx.quadraticCurveTo(0, p.s * 0.3, -p.s * 0.18, p.s * 0.5);
    ctx.quadraticCurveTo(-p.s * 0.5, -p.s * 0.2, 0, -p.s * 0.5);
    ctx.fill();
    ctx.restore();
  }

  /* ---------------- Hintergrund ---------------- */
  var shake = 0;
  function drawBackground(time) {
    var sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#1b2548");
    sky.addColorStop(0.42, "#3d3163");
    sky.addColorStop(0.7, "#9c3b54");
    sky.addColorStop(1, "#d9774f");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    var sunY = H * 0.40, sunX = W * 0.5, sunR = Math.min(W, H) * 0.20;
    var sg = ctx.createRadialGradient(sunX, sunY, sunR * 0.2, sunX, sunY, sunR);
    sg.addColorStop(0, "rgba(255,238,210,0.98)");
    sg.addColorStop(0.6, "rgba(243,178,90,0.95)");
    sg.addColorStop(1, "rgba(211,80,60,0.0)");
    ctx.fillStyle = sg;
    ctx.beginPath(); ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2); ctx.fill();

    ctx.save();
    ctx.translate(sunX, sunY);
    ctx.rotate(time * 0.02);
    ctx.fillStyle = "rgba(255,225,180,0.06)";
    for (var i = 0; i < 12; i++) {
      ctx.rotate((Math.PI * 2) / 12);
      ctx.beginPath(); ctx.moveTo(0, 0);
      ctx.lineTo(-W * 0.04, -H); ctx.lineTo(W * 0.04, -H); ctx.closePath(); ctx.fill();
    }
    ctx.restore();

    var ground = H * 0.82;

    ctx.fillStyle = "rgba(58,52,86,0.85)";
    ctx.beginPath();
    ctx.moveTo(W * 0.16, ground);
    ctx.lineTo(W * 0.40, H * 0.40);
    ctx.quadraticCurveTo(W * 0.50, H * 0.33, W * 0.60, H * 0.40);
    ctx.lineTo(W * 0.84, ground);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = "rgba(243,233,210,0.9)";
    ctx.beginPath();
    ctx.moveTo(W * 0.455, H * 0.405);
    ctx.quadraticCurveTo(W * 0.50, H * 0.345, W * 0.545, H * 0.405);
    ctx.lineTo(W * 0.525, H * 0.43);
    ctx.quadraticCurveTo(W * 0.50, H * 0.40, W * 0.475, H * 0.43);
    ctx.closePath(); ctx.fill();

    drawTorii(W * 0.12, ground, H * 0.30);

    var gg = ctx.createLinearGradient(0, ground, 0, H);
    gg.addColorStop(0, "#3a2a22");
    gg.addColorStop(1, "#1a110d");
    ctx.fillStyle = gg;
    ctx.fillRect(0, ground, W, H - ground);
    ctx.fillStyle = "rgba(217,178,90,0.18)";
    ctx.fillRect(0, ground, W, 3);
    ctx.strokeStyle = "rgba(0,0,0,0.25)"; ctx.lineWidth = 2;
    for (var x = 0; x < W; x += 90) { ctx.beginPath(); ctx.moveTo(x, ground); ctx.lineTo(x - 30, H); ctx.stroke(); }
  }

  function drawTorii(x, base, h) {
    var w = h * 0.62, post = h * 0.06;
    ctx.fillStyle = "rgba(140,30,34,0.92)";
    ctx.fillRect(x - w / 2, base - h, post, h);
    ctx.fillRect(x + w / 2 - post, base - h, post, h);
    ctx.beginPath();
    ctx.moveTo(x - w / 2 - post * 1.4, base - h);
    ctx.quadraticCurveTo(x, base - h - post * 1.6, x + w / 2 + post * 1.4, base - h);
    ctx.lineTo(x + w / 2 + post * 1.4, base - h + post * 0.9);
    ctx.quadraticCurveTo(x, base - h - post * 0.4, x - w / 2 - post * 1.4, base - h + post * 0.9);
    ctx.closePath(); ctx.fill();
    ctx.fillRect(x - w / 2 - post * 0.5, base - h + post * 2.2, w + post, post * 0.9);
  }

  /* ---------------- Kämpfer ---------------- */
  function Fighter(side) {
    this.side = side;
    this.facing = side === "L" ? 1 : -1;
    this.scale = 1;
    this.palette = { robe: "#2a3f6e", trim: "#dcc9a0", skin: "#e8c39a", helm: "#1a2440", crest: "#d9b25a" };
    this.ornament = "none";
    this.body = "samurai";
    this.headgear = "kabuto";
    this.state = "idle";
    this.t = 0; this.dur = 1;
    this.flash = 0;
    this.alpha = 1;
    this.defeated = false;
    this.bobPhase = rand(0, Math.PI * 2);
  }
  Fighter.prototype.trigger = function (state, dur) {
    this.state = state; this.t = 0;
    this.dur = dur || ({ attack: 0.55, hit: 0.5, win: 1.2, defeat: 1.1, idle: 1 }[state] || 0.6);
    if (state === "hit") this.flash = 1;
  };
  Fighter.prototype.update = function (dt) {
    this.t += dt;
    if (this.flash > 0) this.flash = Math.max(0, this.flash - dt * 2.2);
    if (this.state === "attack" && this.t >= this.dur) this.trigger("idle");
    if (this.state === "hit" && this.t >= this.dur) this.trigger("idle");
    if (this.state === "defeat") this.defeated = true;
  };
  Fighter.prototype.rig = function () {
    var p = clamp(this.t / this.dur, 0, 1);
    var lean = 0, sword = -0.5, lift = 0, tilt = 0, alpha = 1, sink = 0;
    var bob = Math.sin(this.bobPhase + performance.now() * 0.004) * 4;
    if (this.state === "idle") { lift = bob; }
    else if (this.state === "attack") {
      var e = p < 0.35 ? easeOut(p / 0.35) : easeOut(1 - (p - 0.35) / 0.65);
      var wind = p < 0.35 ? -0.6 * (p / 0.35) : 0;
      lean = e * 26 * (p < 0.5 ? 1 : 0.7);
      sword = -0.5 + wind + easeOut(clamp((p - 0.3) / 0.4, 0, 1)) * 2.4;
      lift = bob * 0.4;
    } else if (this.state === "hit") {
      var e2 = easeOut(p);
      lean = -18 * (1 - e2);
      tilt = -0.18 * (1 - e2);
      lift = bob * 0.4;
    } else if (this.state === "win") {
      sword = -1.2 - Math.abs(Math.sin(this.t * 4)) * 0.3;
      lift = Math.sin(this.t * 5) * 6 - 4;
    } else if (this.state === "defeat") {
      var e3 = easeInOut(clamp(p, 0, 1));
      tilt = -1.35 * e3 * this.facing;
      sink = e3 * 30;
      alpha = 1 - e3 * 0.35;
    }
    return { lean: lean, sword: sword, lift: lift, tilt: tilt, alpha: alpha, sink: sink };
  };
  Fighter.prototype.draw = function (ctx, x, groundY) {
    var r = this.rig();
    var s = this.scale;
    ctx.save();
    ctx.globalAlpha = this.alpha * r.alpha;
    ctx.translate(x + r.lean * this.facing, groundY + r.sink + r.lift);
    ctx.scale(this.facing * s, s);
    ctx.rotate(r.tilt);

    var P = this.palette;
    var U = 150;

    ctx.save();
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.translate(x, groundY + 4);
    ctx.fillStyle = "rgba(0,0,0,0.30)";
    ctx.beginPath(); ctx.ellipse(0, 0, 46 * s, 12 * s, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    if (this.body === "oni") this.drawOni(ctx, P, U, r);
    else if (this.body === "dragon") this.drawDragon(ctx, P, U, r);
    else this.drawSamurai(ctx, P, U, r);

    if (this.flash > 0) {
      ctx.globalCompositeOperation = "source-atop";
      ctx.globalAlpha = this.flash * 0.85;
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-90, -U * 1.25, 180, U * 1.35);
      ctx.globalCompositeOperation = "source-over";
    }
    ctx.restore();
  };
  Fighter.prototype.drawKatana = function (ctx, P, r, shx, shy, c1, c2, glow) {
    ctx.save();
    ctx.translate(shx, shy);
    ctx.rotate(r.sword);
    ctx.strokeStyle = P.skin; ctx.lineWidth = 11; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(20, 6); ctx.stroke();
    ctx.translate(20, 6);
    ctx.fillStyle = "#1a1410"; ctx.fillRect(-3, -4, 16, 8);
    ctx.fillStyle = P.crest; ctx.beginPath(); ctx.arc(13, 0, 5, 0, Math.PI * 2); ctx.fill();
    if (glow) { ctx.shadowColor = glow; ctx.shadowBlur = 14; }
    var bg = ctx.createLinearGradient(13, -3, 95, 3);
    bg.addColorStop(0, c1); bg.addColorStop(1, c2);
    ctx.fillStyle = bg;
    ctx.beginPath();
    ctx.moveTo(15, -3.4); ctx.quadraticCurveTo(60, -7, 96, -2);
    ctx.lineTo(98, 1); ctx.quadraticCurveTo(60, 0, 15, 3.4); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = "rgba(255,255,255,0.7)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(18, -1.6); ctx.quadraticCurveTo(60, -4.5, 94, -1); ctx.stroke();
    ctx.restore();
  };
  Fighter.prototype.drawSamurai = function (ctx, P, U, r) {
    var ronin = this.headgear === "amigasa";

    ctx.fillStyle = P.robe;
    ctx.beginPath();
    ctx.moveTo(-26, 0); ctx.lineTo(-16, -U * 0.42);
    ctx.lineTo(16, -U * 0.42); ctx.lineTo(26, 0);
    ctx.lineTo(8, 0); ctx.lineTo(0, -U * 0.16); ctx.lineTo(-8, 0);
    ctx.closePath(); ctx.fill();
    if (ronin) {
      for (var i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 9 - 4, 0); ctx.lineTo(i * 9, 9); ctx.lineTo(i * 9 + 4, 0); ctx.closePath(); ctx.fill(); }
    }
    ctx.strokeStyle = "rgba(0,0,0,0.22)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-9, -U * 0.40); ctx.lineTo(-12, 0); ctx.moveTo(9, -U * 0.40); ctx.lineTo(12, 0); ctx.stroke();

    ctx.fillStyle = P.robe;
    ctx.beginPath();
    ctx.moveTo(-18, -U * 0.40); ctx.lineTo(-22, -U * 0.74);
    ctx.lineTo(22, -U * 0.74); ctx.lineTo(18, -U * 0.40); ctx.closePath(); ctx.fill();
    ctx.fillStyle = P.trim;
    ctx.beginPath();
    ctx.moveTo(-22, -U * 0.74); ctx.lineTo(0, -U * 0.60);
    ctx.lineTo(22, -U * 0.74); ctx.lineTo(16, -U * 0.66);
    ctx.lineTo(0, -U * 0.55); ctx.lineTo(-16, -U * 0.66); ctx.closePath(); ctx.fill();
    ctx.fillStyle = P.crest; ctx.fillRect(-19, -U * 0.46, 38, 8);
    if (ronin) {
      ctx.save(); ctx.translate(-18, -U * 0.45); ctx.rotate(-0.4);
      ctx.fillStyle = "#202d40"; ctx.fillRect(-2, -2, 30, 5);
      ctx.fillStyle = P.crest; ctx.fillRect(26, -3, 3, 7); ctx.restore();
    }

    ctx.strokeStyle = P.robe; ctx.lineCap = "round"; ctx.lineWidth = 13;
    ctx.beginPath(); ctx.moveTo(-6, -U * 0.70); ctx.lineTo(-20, -U * 0.50); ctx.stroke();

    ctx.save();
    ctx.translate(2, -U * 0.84);
    ctx.fillStyle = P.skin; ctx.fillRect(-6, -2, 12, 12);
    ctx.beginPath(); ctx.arc(0, -8, 15, 0, Math.PI * 2); ctx.fill();
    if (ronin) {
      ctx.fillStyle = "#241a14"; ctx.beginPath(); ctx.arc(-3, -17, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = P.trim;
      ctx.beginPath(); ctx.moveTo(0, -32); ctx.lineTo(26, -5); ctx.quadraticCurveTo(0, 0, -26, -5); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = "rgba(60,40,20,0.5)"; ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.moveTo(0, -32); ctx.lineTo(-15, -7); ctx.moveTo(0, -32); ctx.lineTo(15, -7); ctx.moveTo(0, -32); ctx.lineTo(0, -3); ctx.stroke();
      ctx.fillStyle = "rgba(0,0,0,0.4)"; ctx.fillRect(-11, -9, 22, 7);
      ctx.fillStyle = "rgba(210,60,50,0.95)"; ctx.fillRect(3, -8, 5, 2.4);
    } else {
      ctx.fillStyle = P.helm;
      ctx.beginPath(); ctx.arc(0, -10, 17, Math.PI * 1.02, Math.PI * 2.0, false);
      ctx.lineTo(17, -6); ctx.lineTo(-17, -6); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(-17, -6); ctx.quadraticCurveTo(-22, 4, -14, 8); ctx.lineTo(-10, -2); ctx.closePath(); ctx.fill();
      ctx.fillStyle = P.crest;
      ctx.beginPath(); ctx.arc(0, -30, 11, Math.PI * 0.15, Math.PI * 0.85, false);
      ctx.arc(2, -30, 8, Math.PI * 0.9, Math.PI * 0.1, true); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "rgba(20,10,8,0.9)"; ctx.fillRect(4, -12, 6, 3);
    }
    ctx.restore();

    this.drawKatana(ctx, P, r, 10, -U * 0.70, "#e9eef5", "#aab6c6", null);
  };
  Fighter.prototype.drawOni = function (ctx, P, U, r) {
    var skin = P.skin, dark = "rgba(0,0,0,0.18)";
    ctx.strokeStyle = skin; ctx.lineCap = "round"; ctx.lineWidth = 22;
    ctx.beginPath(); ctx.moveTo(-10, -U * 0.40); ctx.lineTo(-24, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(10, -U * 0.40); ctx.lineTo(24, 0); ctx.stroke();
    ctx.fillStyle = P.trim;
    ctx.beginPath();
    ctx.moveTo(-24, -U * 0.46); ctx.lineTo(24, -U * 0.46);
    ctx.lineTo(20, -U * 0.18); ctx.lineTo(0, -U * 0.30); ctx.lineTo(-20, -U * 0.18); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "rgba(40,25,10,0.7)"; ctx.lineWidth = 3;
    for (var i = -2; i <= 2; i++) { ctx.beginPath(); ctx.moveTo(i * 9, -U * 0.45); ctx.lineTo(i * 9 + 3, -U * 0.24); ctx.stroke(); }

    ctx.fillStyle = skin;
    ctx.beginPath();
    ctx.moveTo(-26, -U * 0.44);
    ctx.quadraticCurveTo(-40, -U * 0.66, -30, -U * 0.82);
    ctx.quadraticCurveTo(0, -U * 0.94, 30, -U * 0.82);
    ctx.quadraticCurveTo(40, -U * 0.66, 26, -U * 0.44);
    ctx.quadraticCurveTo(0, -U * 0.36, -26, -U * 0.44); ctx.closePath(); ctx.fill();
    ctx.fillStyle = dark;
    ctx.beginPath(); ctx.ellipse(-11, -U * 0.62, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(11, -U * 0.62, 9, 7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillRect(-2, -U * 0.58, 4, U * 0.16);

    ctx.strokeStyle = skin; ctx.lineWidth = 18; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-18, -U * 0.78); ctx.lineTo(-34, -U * 0.52); ctx.stroke();

    ctx.save();
    ctx.translate(3, -U * 0.86);
    ctx.fillStyle = "#160d08";
    ctx.beginPath(); ctx.arc(0, -10, 23, Math.PI, Math.PI * 2.05, false);
    for (var a = 0; a <= 10; a++) { var ang = Math.PI + (a / 10) * Math.PI; ctx.lineTo(Math.cos(ang) * 27, Math.sin(ang) * 27 - 10 + (a % 2 ? 6 : 0)); }
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = skin; ctx.beginPath(); ctx.arc(0, -6, 19, 0, Math.PI * 2); ctx.fill();
    var horn = ctx.createLinearGradient(0, -45, 0, -20); horn.addColorStop(0, "#fff7e2"); horn.addColorStop(1, "#c9a86a");
    ctx.fillStyle = horn;
    ctx.beginPath(); ctx.moveTo(-12, -20); ctx.quadraticCurveTo(-26, -42, -16, -50); ctx.quadraticCurveTo(-11, -38, -5, -23); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(12, -20); ctx.quadraticCurveTo(26, -42, 16, -50); ctx.quadraticCurveTo(11, -38, 5, -23); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = "#160d08"; ctx.lineWidth = 4; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(-14, -12); ctx.lineTo(-3, -8); ctx.moveTo(14, -12); ctx.lineTo(3, -8); ctx.stroke();
    ctx.fillStyle = "#f5d33a";
    ctx.beginPath(); ctx.arc(-7, -6, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(8, -6, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#160d08";
    ctx.beginPath(); ctx.arc(-6, -6, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(9, -6, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#3a0f0c"; ctx.beginPath(); ctx.moveTo(-9, 4); ctx.quadraticCurveTo(2, 12, 11, 3); ctx.quadraticCurveTo(2, 7, -9, 4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#fff7e2";
    ctx.beginPath(); ctx.moveTo(-7, 4); ctx.lineTo(-5, -3); ctx.lineTo(-3, 4); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(7, 3); ctx.lineTo(5, -4); ctx.lineTo(3, 3); ctx.closePath(); ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.translate(16, -U * 0.78);
    ctx.rotate(r.sword * 0.85 - 0.15);
    ctx.strokeStyle = skin; ctx.lineWidth = 17; ctx.lineCap = "round";
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(20, 8); ctx.stroke();
    ctx.translate(20, 8);
    var iron = ctx.createLinearGradient(0, -14, 0, 14); iron.addColorStop(0, "#5a5a66"); iron.addColorStop(0.5, "#33333c"); iron.addColorStop(1, "#1c1c22");
    ctx.fillStyle = iron;
    ctx.beginPath();
    ctx.moveTo(0, -6); ctx.lineTo(78, -15);
    ctx.quadraticCurveTo(92, 0, 78, 15); ctx.lineTo(0, 6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = P.crest;
    for (var ii = 0; ii < 4; ii++) for (var j = -1; j <= 1; j++) {
      ctx.beginPath(); ctx.arc(20 + ii * 18, j * 7, 2.6, 0, Math.PI * 2); ctx.fill();
    }
    ctx.restore();
  };
  Fighter.prototype.drawDragon = function (ctx, P, U, r) {
    var plate = P.robe, gold = P.crest;

    ctx.fillStyle = "rgba(20,14,30,0.92)";
    ctx.beginPath();
    ctx.moveTo(-14, -U * 0.78);
    ctx.quadraticCurveTo(-46, -U * 0.5, -38 + Math.sin(performance.now() * 0.003) * 6, -2);
    ctx.lineTo(-6, -U * 0.2); ctx.lineTo(-6, -U * 0.78); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = gold; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-14, -U * 0.78); ctx.quadraticCurveTo(-46, -U * 0.5, -38, -2); ctx.stroke();

    ctx.fillStyle = plate;
    ctx.beginPath();
    ctx.moveTo(-24, 0); ctx.lineTo(-15, -U * 0.44); ctx.lineTo(15, -U * 0.44);
    ctx.lineTo(24, 0); ctx.lineTo(7, 0); ctx.lineTo(0, -U * 0.16); ctx.lineTo(-7, 0); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = gold; ctx.lineWidth = 1.6;
    for (var i = 1; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(-18, -U * 0.10 * i - U * 0.05); ctx.lineTo(18, -U * 0.10 * i - U * 0.05); ctx.stroke(); }

    ctx.fillStyle = plate;
    ctx.beginPath();
    ctx.moveTo(-20, -U * 0.42); ctx.lineTo(-24, -U * 0.76);
    ctx.lineTo(24, -U * 0.76); ctx.lineTo(20, -U * 0.42); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = gold; ctx.lineWidth = 1.6;
    for (var k = 0; k < 4; k++) { var y = -U * 0.48 - k * U * 0.07; ctx.beginPath(); ctx.moveTo(-22 + k, y); ctx.lineTo(22 - k, y); ctx.stroke(); }
    ctx.fillStyle = gold;
    ctx.beginPath(); ctx.moveTo(0, -U * 0.74); ctx.lineTo(7, -U * 0.6); ctx.lineTo(0, -U * 0.46); ctx.lineTo(-7, -U * 0.6); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#1a1322"; ctx.fillRect(-20, -U * 0.46, 40, 7);

    ctx.fillStyle = plate; ctx.strokeStyle = gold; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(-12, -U * 0.78); ctx.lineTo(-30, -U * 0.74); ctx.lineTo(-28, -U * 0.6); ctx.lineTo(-12, -U * 0.64); ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = plate; ctx.lineCap = "round"; ctx.lineWidth = 14;
    ctx.beginPath(); ctx.moveTo(-8, -U * 0.72); ctx.lineTo(-22, -U * 0.5); ctx.stroke();

    ctx.save();
    ctx.translate(2, -U * 0.86);
    ctx.fillStyle = P.helm;
    ctx.beginPath(); ctx.arc(0, -8, 17, Math.PI * 0.98, Math.PI * 2.02, false); ctx.lineTo(16, -2); ctx.lineTo(-16, -2); ctx.closePath(); ctx.fill();
    ctx.fillStyle = gold;
    ctx.beginPath(); ctx.moveTo(-14, -4); ctx.quadraticCurveTo(0, 4, 14, -4); ctx.quadraticCurveTo(10, 12, 0, 13); ctx.quadraticCurveTo(-10, 12, -14, -4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = "#1a1322";
    ctx.beginPath(); ctx.moveTo(-7, 6); ctx.lineTo(-5, 11); ctx.lineTo(-3, 6); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(7, 6); ctx.lineTo(5, 11); ctx.lineTo(3, 6); ctx.closePath(); ctx.fill();
    ctx.shadowColor = "#ffcf4d"; ctx.shadowBlur = 12; ctx.fillStyle = "#ffe9a8";
    ctx.beginPath(); ctx.moveTo(-11, -6); ctx.lineTo(-3, -4); ctx.lineTo(-10, -2); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(11, -6); ctx.lineTo(3, -4); ctx.lineTo(10, -2); ctx.closePath(); ctx.fill();
    ctx.shadowBlur = 0;
    var hg = ctx.createLinearGradient(0, -52, 0, -14); hg.addColorStop(0, "#f3d27a"); hg.addColorStop(1, gold);
    ctx.fillStyle = hg;
    ctx.beginPath(); ctx.moveTo(-10, -18); ctx.quadraticCurveTo(-34, -30, -40, -54); ctx.quadraticCurveTo(-22, -40, -4, -22); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(10, -18); ctx.quadraticCurveTo(34, -30, 40, -54); ctx.quadraticCurveTo(22, -40, 4, -22); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(-6, -22); ctx.lineTo(-12, -40); ctx.lineTo(-2, -26); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(6, -22); ctx.lineTo(12, -40); ctx.lineTo(2, -26); ctx.closePath(); ctx.fill();
    ctx.restore();

    this.drawKatana(ctx, P, r, 8, -U * 0.72, "#fff3d6", "#e0a93a", "rgba(255,200,80,0.9)");
  };

  /* ---------------- Gegner ---------------- */
  var ENEMIES = [
    {
      name: "鬼", sub: "ONI · DER OGER", stamp: "第一の敵",
      hits: 3, dmg: 18, timer: 9.0, levels: ["n5"], body: "oni",
      palette: { robe: "#5a3a1a", trim: "#d6a838", skin: "#c0392b", helm: "#160d08", crest: "#d9b25a" },
      intro: "Ein rothäutiger Oger versperrt den Bergpass und schwingt eine eiserne Keule. Seine Kanji sind einfach — doch er verzeiht kein Zögern."
    },
    {
      name: "牢人", sub: "RŌNIN · DER WANDERER", stamp: "第二の敵",
      hits: 4, dmg: 24, timer: 7.5, levels: ["n5", "n4"], body: "samurai", headgear: "amigasa",
      palette: { robe: "#27406b", trim: "#cdbb93", skin: "#e8c39a", helm: "#16233f", crest: "#cfd6e0" },
      intro: "Ein herrenloser Schwertkämpfer sperrt die Brücke, das Gesicht unter einem zerschlissenen Strohhut verborgen. Schneller, schärfer — seine Hiebe mischen Vertrautes mit Neuem."
    },
    {
      name: "龍王", sub: "RYŪ-Ō · DER DRACHENKÖNIG", stamp: "最後の敵",
      hits: 5, dmg: 32, timer: 6.0, levels: ["n4"], body: "dragon",
      palette: { robe: "#241a33", trim: "#d9b25a", skin: "#cf9a6a", helm: "#0d0a16", crest: "#e0a93a" },
      intro: "Auf dem Gipfel wartet der Drachenkönig in schwarz-goldener Rüstung unter einem drachengehörnten Helm. Nur die schwersten Kanji fallen von seiner glühenden Klinge. Triff genau, oder falle."
    }
  ];

  /* ---------------- Spielzustand ---------------- */
  var G = {
    scene: "title",
    playerMaxHp: 100,
    playerHp: 100,
    enemyIndex: 0,
    enemy: null,
    enemyHits: 0,
    enemyMaxHits: 0,
    used: {},
    streak: 0,
    best: parseInt(localStorage.getItem("kanjiDuelBest") || "0", 10) || 0,
    current: null,
    answered: false,
    timeLeft: 0,
    timeMax: 0,
    timerActive: false
  };

  var player = new Fighter("L");
  var enemy = new Fighter("R");

  /* ---------------- Datenquelle: window.KANJI_DATA ---------------- */
  // Wandelt den Nihongo-Explorer-Datensatz in das schlanke Format des
  // Spiels um: { k: Kanji, m: Bedeutung, r: Lesung, lvl: "n5".."n1" }.
  var KANJI = [];
  function buildKanjiPool() {
    var src = (window.KANJI_DATA && window.KANJI_DATA.length) ? window.KANJI_DATA : [];
    KANJI = [];
    for (var i = 0; i < src.length; i++) {
      var e = src[i];
      if (!e || !e.kanji || !e.jlpt) continue;
      var lvl = String(e.jlpt).toLowerCase();
      var m = (e.meanings && e.meanings.length) ? e.meanings[0] : "";
      if (!m) continue;
      var kun = (e.kun && e.kun[0] && e.kun[0].kana) ? e.kun[0].kana : "";
      var on = (e.on && e.on[0] && e.on[0].kana) ? e.on[0].kana : "";
      var reading = [kun, on].filter(Boolean).join("・");
      KANJI.push({ k: e.kanji, m: m, r: reading, lvl: lvl });
    }
    // Notfall-Fallback, falls der Datensatz fehlt.
    if (!KANJI.length) {
      KANJI = [
        { k: "日", m: "Tag / Sonne", r: "ひ・にち", lvl: "n5" },
        { k: "月", m: "Monat / Mond", r: "つき・げつ", lvl: "n5" },
        { k: "火", m: "Feuer", r: "ひ・か", lvl: "n5" },
        { k: "水", m: "Wasser", r: "みず・すい", lvl: "n5" },
        { k: "木", m: "Baum / Holz", r: "き・もく", lvl: "n5" }
      ];
    }
  }

  /* ---------------- DOM-Referenzen ---------------- */
  var D = {};
  var RING_C = 2 * Math.PI * 46;

  function showFlash(text, color) {
    D.flash.textContent = text;
    D.flash.style.color = color;
    D.flash.classList.remove("kd-show");
    void D.flash.offsetWidth;
    D.flash.classList.add("kd-show");
  }
  function updateHpBars() {
    D.playerHp.style.width = clamp((G.playerHp / G.playerMaxHp) * 100, 0, 100) + "%";
    D.enemyHp.style.width = clamp((G.enemyHits / G.enemyMaxHits) * 100, 0, 100) + "%";
  }

  /* ---------------- Frage zusammenstellen ---------------- */
  function pickKanji(levels) {
    var pool = KANJI.filter(function (k) { return levels.indexOf(k.lvl) !== -1 && !G.used[k.k]; });
    var usable = pool.length ? pool : KANJI.filter(function (k) { return levels.indexOf(k.lvl) !== -1; });
    if (!usable.length) usable = KANJI;
    var pick = choice(usable);
    G.used[pick.k] = true;
    return pick;
  }
  function buildAnswers(target) {
    var opts = [target.m];
    var meanings = shuffle(KANJI.filter(function (k) { return k.m !== target.m; }).map(function (k) { return k.m; }));
    for (var i = 0; i < meanings.length; i++) {
      if (opts.length >= 3) break;
      if (opts.indexOf(meanings[i]) === -1) opts.push(meanings[i]);
    }
    return shuffle(opts);
  }

  /* ---------------- Spielablauf ---------------- */
  function startGame() {
    Audio0.init();
    Audio0.music.start();
    G.playerHp = G.playerMaxHp;
    G.enemyIndex = 0;
    G.streak = 0;
    player.alpha = 1; player.defeated = false; player.trigger("idle");
    D.title.classList.add("kd-hidden");
    beginEnemy(0);
  }

  function beginEnemy(i) {
    G.enemyIndex = i;
    var cfg = ENEMIES[i];
    G.enemy = cfg;
    G.enemyMaxHits = cfg.hits;
    G.enemyHits = cfg.hits;
    G.used = {};
    enemy = new Fighter("R");
    enemy.palette = cfg.palette;
    enemy.body = cfg.body || "samurai";
    enemy.headgear = cfg.headgear || "kabuto";
    enemy.scale = [0.98, 1.06, 1.2][i];
    Audio0.music.setIntensity(i);
    D.enemyLabel.innerHTML = cfg.name + " · " + cfg.sub.split(" · ")[0];
    updateHpBars();
    D.roundBanner.innerHTML = "<div>" + ["其ノ一", "其ノ二", "其ノ三"][i] + "</div><div class=\"kd-big\">" + cfg.name + "</div>";
    G.scene = "intro";
    D.msgStamp.textContent = cfg.stamp;
    D.msgTitle.textContent = cfg.name;
    D.msgSub.textContent = cfg.sub;
    D.msgBody.style.display = "block";
    D.msgBody.textContent = cfg.intro;
    D.msgBtn.textContent = "参 · STELLE DICH";
    D.msg.classList.remove("kd-hidden");
    Audio0.gong();
  }

  function startRound() {
    G.scene = "duel";
    G.answered = false;
    D.msg.classList.add("kd-hidden");
    var cfg = G.enemy;
    var target = pickKanji(cfg.levels);
    G.current = target;
    D.kanjiChar.textContent = target.k;
    D.reading.textContent = "";
    var opts = buildAnswers(target);
    D.answers.innerHTML = "";
    opts.forEach(function (m) {
      var b = document.createElement("button");
      b.className = "kd-answer";
      b.textContent = m;
      b.addEventListener("click", function () { onAnswer(b, m, target); }, { passive: true });
      D.answers.appendChild(b);
    });
    D.quiz.classList.remove("kd-hidden");
    G.timeMax = cfg.timer;
    G.timeLeft = cfg.timer;
    G.timerActive = true;
    player.trigger("idle");
    enemy.trigger("idle");
  }

  function onAnswer(btn, meaning, target) {
    if (G.answered) return;
    G.answered = true;
    G.timerActive = false;
    Audio0.select();
    var correct = meaning === target.m;
    D.reading.textContent = target.k + "  「" + target.r + "」  " + target.m;
    Array.prototype.slice.call(D.answers.children).forEach(function (b) {
      b.classList.add("kd-locked");
      if (b.textContent === target.m) b.classList.add("kd-correct");
      else if (b === btn) b.classList.add("kd-wrong");
    });
    if (correct) resolveCorrect();
    else resolveWrong(btn ? "wrong" : "timeout");
  }

  function timeout() {
    if (G.answered) return;
    G.answered = true;
    G.timerActive = false;
    D.reading.textContent = G.current.k + "  「" + G.current.r + "」  " + G.current.m;
    Array.prototype.slice.call(D.answers.children).forEach(function (b) {
      b.classList.add("kd-locked");
      if (b.textContent === G.current.m) b.classList.add("kd-correct");
    });
    resolveWrong("timeout");
  }

  function resolveCorrect() {
    G.scene = "resolving";
    G.streak++;
    Audio0.correct();
    player.trigger("attack");
    setTimeout(function () {
      enemy.trigger("hit");
      Audio0.slash(); Audio0.hit();
      shake = 10;
      G.enemyHits = Math.max(0, G.enemyHits - 1);
      updateHpBars();
      showFlash(G.enemyHits <= 0 ? "撃破！" : "命中！", "#7fe3a3");
    }, 230);
    setTimeout(function () {
      D.quiz.classList.add("kd-hidden");
      if (G.enemyHits <= 0) enemyDefeated();
      else startRound();
    }, 1300);
  }

  function resolveWrong(kind) {
    G.scene = "resolving";
    G.streak = 0;
    Audio0.wrong();
    enemy.trigger("attack");
    setTimeout(function () {
      player.trigger("hit");
      Audio0.slash(); Audio0.hit();
      shake = 12;
      G.playerHp = Math.max(0, G.playerHp - G.enemy.dmg);
      updateHpBars();
      showFlash(kind === "timeout" ? "時間切れ" : "被弾！", "#ff8a8a");
    }, 230);
    setTimeout(function () {
      D.quiz.classList.add("kd-hidden");
      if (G.playerHp <= 0) gameOver();
      else startRound();
    }, 1300);
  }

  function enemyDefeated() {
    enemy.trigger("defeat");
    Audio0.win();
    var next = G.enemyIndex + 1;
    setTimeout(function () {
      if (next >= ENEMIES.length) victory();
      else {
        G.playerHp = clamp(G.playerHp + 20, 0, G.playerMaxHp);
        updateHpBars();
        player.trigger("win");
        setTimeout(function () { beginEnemy(next); }, 700);
      }
    }, 1400);
  }

  function victory() {
    G.scene = "victory";
    if (G.streak > G.best) { G.best = G.streak; localStorage.setItem("kanjiDuelBest", String(G.best)); }
    player.trigger("win");
    Audio0.win();
    D.msgStamp.textContent = "勝利";
    D.msgTitle.textContent = "天下無双";
    D.msgSub.textContent = "SIEG · UNBESIEGT";
    D.msgBody.style.display = "block";
    D.msgBody.innerHTML = "Alle drei Krieger sind gefallen. Der Pass gehört dir, Samurai.<br/><br/>" +
      "<b>Verbleibende Kraft:</b> " + G.playerHp + " / " + G.playerMaxHp + "<br/>" +
      "<b>Beste Serie:</b> " + G.best;
    D.msgBtn.textContent = "再 · NOCHMAL";
    D.msg.classList.remove("kd-hidden");
  }

  function gameOver() {
    G.scene = "gameover";
    if (G.streak > G.best) { G.best = G.streak; localStorage.setItem("kanjiDuelBest", String(G.best)); }
    player.trigger("defeat");
    Audio0.lose();
    D.msgStamp.textContent = "敗北";
    D.msgTitle.textContent = "無念";
    D.msgSub.textContent = "NIEDERLAGE";
    D.msgBody.style.display = "block";
    D.msgBody.innerHTML = "Du bist <b>" + G.enemy.name + "</b> unterlegen. Ruhe dich aus, übe deine Kanji und kehre zurück.<br/><br/>" +
      "<b>Beste Serie:</b> " + G.best;
    D.msgBtn.textContent = "再挑戦 · ERNEUT";
    D.msg.classList.remove("kd-hidden");
  }

  /* ---------------- Stummschalt-Button ---------------- */
  function syncMuteBtn() {
    if (!D.muteBtn) return;
    D.muteBtn.textContent = Audio0.muted ? "♪̸" : "♪";
    D.muteBtn.style.opacity = Audio0.muted ? 0.5 : 1;
  }

  /* ---------------- Hauptschleife ---------------- */
  function loop(now) {
    if (!running) return;
    var dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (G.timerActive) {
      G.timeLeft -= dt;
      var frac = clamp(G.timeLeft / G.timeMax, 0, 1);
      D.timerArc.style.strokeDashoffset = RING_C * (1 - frac);
      D.timerArc.style.stroke = frac > 0.5 ? "#3a9d6a" : frac > 0.25 ? "#d9b25a" : "#b3242b";
      if (G.timeLeft <= 0) { G.timerActive = false; timeout(); }
    }

    updatePetals(dt);
    player.update(dt);
    enemy.update(dt);
    if (shake > 0) shake = Math.max(0, shake - dt * 40);

    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var sx = shake ? rand(-shake, shake) : 0;
    var sy = shake ? rand(-shake, shake) * 0.5 : 0;
    ctx.save();
    ctx.translate(sx, sy);

    drawBackground(now / 1000);
    var groundY = H * 0.82;
    player.draw(ctx, W * 0.27, groundY);
    enemy.draw(ctx, W * 0.73, groundY);

    for (var i = 0; i < petals.length; i++) drawPetal(petals[i]);

    ctx.restore();
    rafId = requestAnimationFrame(loop);
  }

  /* ---------------- Größe / Layout ---------------- */
  function resize() {
    if (!canvas || !stage) return;
    DPR = Math.min(window.devicePixelRatio || 1, 2.5);
    var rect = stage.getBoundingClientRect();
    W = Math.max(1, Math.round(rect.width));
    H = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  /* ---------------- Markup ---------------- */
  function buildMarkup() {
    return '' +
      '<div class="kd-stage" id="kd-stage">' +
        '<canvas class="kd-canvas" id="kd-scene"></canvas>' +
        '<div class="kd-hud" id="kd-hud">' +
          '<div class="kd-nameTag" id="kd-playerTag">' +
            '<span class="kd-label">武者 · DU</span>' +
            '<div class="kd-hpbar"><div class="kd-hpfill" id="kd-playerHp"></div></div>' +
          '</div>' +
          '<div class="kd-nameTag" id="kd-enemyTag">' +
            '<span class="kd-label" id="kd-enemyLabel">敵 · GEGNER</span>' +
            '<div class="kd-hpbar"><div class="kd-hpfill" id="kd-enemyHp"></div></div>' +
          '</div>' +
          '<div id="kd-roundBanner"></div>' +
        '</div>' +
        '<div id="kd-flash"></div>' +
        '<div class="kd-quiz kd-hidden" id="kd-quiz">' +
          '<div id="kd-kanjiCard">' +
            '<svg id="kd-timerRing" viewBox="0 0 100 100">' +
              '<circle cx="50" cy="50" r="46" fill="none" stroke="rgba(0,0,0,.25)" stroke-width="4"/>' +
              '<circle id="kd-timerArc" cx="50" cy="50" r="46" fill="none" stroke="#b3242b" stroke-width="5" stroke-linecap="round" transform="rotate(-90 50 50)"/>' +
            '</svg>' +
            '<span id="kd-kanjiChar">日</span>' +
          '</div>' +
          '<div class="kd-reading" id="kd-reading"></div>' +
          '<div class="kd-answers" id="kd-answers"></div>' +
        '</div>' +
        '<button id="kd-muteBtn" class="kd-muteBtn" aria-label="Ton an/aus">♪</button>' +
        '<div class="kd-overlay" id="kd-titleScreen">' +
          '<h1 class="kd-title">漢字決闘</h1>' +
          '<div class="kd-subtitle">Kanji-Duell</div>' +
          '<div class="kd-scroll">' +
            'Drei Krieger versperren dir den Weg. Jeder greift an, indem er ein <b>Kanji</b> schleudert. ' +
            'Wähle die richtige Bedeutung aus dreien, um zuzuschlagen — antworte falsch oder zu langsam, ' +
            'und die Klinge trifft <b>dich</b>.<br/>' +
            'Die Kanji stammen aus deiner Sammlung (JLPT N5 &amp; N4). Schärfe deinen Geist, Samurai.' +
          '</div>' +
          '<button class="kd-btn" id="kd-startBtn">始 · START</button>' +
          '<div class="kd-credit">Tippe eine Antwort an, um zuzuschlagen · ♪ unten rechts zum Stummschalten</div>' +
        '</div>' +
        '<div class="kd-overlay kd-hidden" id="kd-msgScreen">' +
          '<div id="kd-msgStamp" class="kd-stamp">第一の敵</div>' +
          '<h1 class="kd-title" id="kd-msgTitle" style="font-size:min(11vw,96px);margin-top:3vh;">鬼</h1>' +
          '<div class="kd-subtitle" id="kd-msgSub">DER OGER</div>' +
          '<div class="kd-scroll" id="kd-msgBody" style="display:none;"></div>' +
          '<button class="kd-btn" id="kd-msgBtn">続 · WEITER</button>' +
        '</div>' +
      '</div>';
  }

  /* ---------------- Initialisierung ---------------- */
  function init() {
    if (inited) return;
    root = document.getElementById("kanjiduel-tab");
    if (!root) return;
    root.innerHTML = buildMarkup();

    stage = root.querySelector("#kd-stage");
    canvas = root.querySelector("#kd-scene");
    ctx = canvas.getContext("2d");

    var q = function (id) { return root.querySelector(id); };
    D = {
      title: q("#kd-titleScreen"),
      msg: q("#kd-msgScreen"),
      msgStamp: q("#kd-msgStamp"),
      msgTitle: q("#kd-msgTitle"),
      msgSub: q("#kd-msgSub"),
      msgBody: q("#kd-msgBody"),
      msgBtn: q("#kd-msgBtn"),
      quiz: q("#kd-quiz"),
      kanjiChar: q("#kd-kanjiChar"),
      reading: q("#kd-reading"),
      answers: q("#kd-answers"),
      playerHp: q("#kd-playerHp"),
      enemyHp: q("#kd-enemyHp"),
      enemyLabel: q("#kd-enemyLabel"),
      roundBanner: q("#kd-roundBanner"),
      flash: q("#kd-flash"),
      timerArc: q("#kd-timerArc"),
      muteBtn: q("#kd-muteBtn"),
      startBtn: q("#kd-startBtn")
    };
    D.timerArc.style.strokeDasharray = RING_C;

    buildKanjiPool();

    D.startBtn.addEventListener("click", startGame);
    D.msgBtn.addEventListener("click", function () {
      Audio0.init();
      Audio0.music.start();
      if (G.scene === "intro") startRound();
      else { D.msg.classList.add("kd-hidden"); startGame(); }
    });
    D.muteBtn.addEventListener("click", function () {
      Audio0.muted = !Audio0.muted;
      Audio0.music.setMuted(Audio0.muted);
      syncMuteBtn();
    });

    window.addEventListener("resize", function () { if (inited) resize(); });

    // Standfigur für den Titelbildschirm (der Oger).
    enemy.palette = ENEMIES[0].palette;
    enemy.body = ENEMIES[0].body;
    enemy.headgear = ENEMIES[0].headgear || "kabuto";
    enemy.scale = 0.98;

    inited = true;
    resize();
    initPetals();
  }

  /* ---------------- Lebenszyklus (vom Tab-System aufgerufen) ---------------- */
  function onTabActivate() {
    if (!inited) init();
    if (!inited) return;                 // Container noch nicht im DOM
    buildKanjiPool();                    // mit aktuell geladenen Daten (neu) aufbauen
    // Ton-Einstellung von Nihongo Explorer übernehmen.
    Audio0.muted = localStorage.getItem("kanji-sound") === "off";
    Audio0.music.setMuted(Audio0.muted);
    syncMuteBtn();
    resize();
    if (!petals.length) initPetals();
    if (!running) {
      running = true;
      last = performance.now();
      rafId = requestAnimationFrame(loop);
    }
  }

  function onTabDeactivate() {
    running = false;
    if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
    Audio0.music.stop();
  }

  window.KanjiDuelModule = {
    onTabActivate: onTabActivate,
    onTabDeactivate: onTabDeactivate,
    refreshData: buildKanjiPool   // erneut aufrufen, wenn KANJI_DATA nachgeladen wurde
  };
})();
