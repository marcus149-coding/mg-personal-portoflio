const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ---------- Nav: a royal-blue indicator slides to the current section ---------- */
(function nav() {
  const navEl = document.querySelector(".nav");
  const list = document.querySelector(".nav-links");
  const pill = document.querySelector(".nav-pill");
  const links = [...list.querySelectorAll("a")];
  const sections = links.map((a) => document.getElementById(a.dataset.target));
  let current = -2;

  function placePill() {
    const link = links[current];
    if (!link) { navEl.classList.remove("has-current"); return; }
    const navBox = navEl.getBoundingClientRect();
    const box = link.getBoundingClientRect();
    pill.style.width = `${box.width}px`;
    pill.style.transform = `translateX(${box.left - navBox.left}px)`;
    navEl.classList.add("has-current");
  }

  function setCurrent(index) {
    if (index === current) return;
    current = index;
    links.forEach((link, i) => {
      if (i === index) link.setAttribute("aria-current", "true");
      else link.removeAttribute("aria-current");
    });
    const link = links[index];
    if (link && list.scrollWidth > list.clientWidth) {
      // keep the active link visible when the nav scrolls sideways on phones
      const target = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
      list.scrollTo({ left: target, behavior: reduceMotion.matches ? "auto" : "smooth" });
    }
    placePill();
  }

  function update() {
    const line = window.innerHeight * 0.4;
    let index = -1;
    sections.forEach((section, i) => {
      if (section && section.getBoundingClientRect().top <= line) index = i;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) index = sections.length - 1;
    setCurrent(index);
  }

  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { update(); ticking = false; });
  }, { passive: true });
  window.addEventListener("resize", () => { update(); placePill(); });
  // fade the edge of the nav when more links are hidden off to that side (phones)
  function edgeCues() {
    const max = list.scrollWidth - list.clientWidth;
    list.classList.toggle("more-right", max > 2 && list.scrollLeft < max - 2);
    list.classList.toggle("more-left", max > 2 && list.scrollLeft > 2);
  }
  list.addEventListener("scroll", () => { placePill(); edgeCues(); }, { passive: true });
  window.addEventListener("resize", edgeCues);
  edgeCues();
  if (document.fonts) document.fonts.ready.then(placePill);
  update();
})();

/* ---------- Mist: soft bands on canvas, drifting slowly in parallax layers ---------- */
function seeded(seed) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

// one band of mist, pre-rendered once to its own canvas: a wide, flat, soft-edged ellipse
function makeCloud(width, rand, tint) {
  const height = width * 0.3;
  const c = document.createElement("canvas");
  c.width = Math.ceil(width); c.height = Math.ceil(height);
  const g = c.getContext("2d");
  g.translate(width / 2, height / 2);
  g.scale(1, 0.3 * (0.85 + rand() * 0.3));
  const r = width / 2;
  const grad = g.createRadialGradient(0, 0, 0, 0, 0, r);
  grad.addColorStop(0, tint);
  grad.addColorStop(0.45, tint.replace(/[\d.]+\)$/, "0.55)"));
  grad.addColorStop(1, tint.replace(/[\d.]+\)$/, "0)"));
  g.fillStyle = grad;
  g.beginPath(); g.arc(0, 0, r, 0, Math.PI * 2); g.fill();
  return c;
}

const CLOUD_SCENES = {
  // low mist drifting across the bottom of the navy header
  day: {
    tint: "rgba(236,223,210,1)",
    layers: [
      { y: [0.76, 0.86], size: 0.55, alpha: 0.07, speed: 3, density: 0.45 },
      { y: [0.9, 1.02], size: 0.75, alpha: 0.11, speed: 5, density: 0.42 },
    ],
  },
  // a single low band under the contact card, leaving the sky behind it calm
  dusk: {
    tint: "rgba(236,223,210,1)",
    layers: [
      { y: [0.94, 1.06], size: 0.75, alpha: 0.09, speed: 3, density: 0.42 },
    ],
  },
};

document.querySelectorAll("canvas[data-clouds]").forEach((canvas, n) => {
  const scene = CLOUD_SCENES[canvas.dataset.clouds];
  if (!scene) return;
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, clouds = [], raf = 0, visible = false;
  const t0 = performance.now();

  function build() {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    W = canvas.clientWidth; H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const rand = seeded(7 + n * 31);
    const ref = Math.max(Math.min(W, 1600), 360);
    clouds = [];
    scene.layers.forEach((layer) => {
      const cw = ref * layer.size * (W < 600 ? 1.6 : 1);
      const count = Math.ceil((W + cw) / (cw * layer.density));
      for (let i = 0; i < count; i++) {
        const w = cw * (0.8 + rand() * 0.45);
        clouds.push({
          img: makeCloud(w, rand, scene.tint),
          w, h: w * 0.3,
          x0: (i / count) * (W + cw) + rand() * cw * 0.3,
          y: H * (layer.y[0] + rand() * (layer.y[1] - layer.y[0])) - w * 0.15, // the band is centred on this line
          alpha: layer.alpha * (0.85 + rand() * 0.15),
          speed: layer.speed,
          span: W + cw * 1.3,
        });
      }
    });
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    for (const c of clouds) {
      const x = ((c.x0 + c.speed * t) % c.span) - c.w * 1.1;
      ctx.globalAlpha = c.alpha;
      ctx.drawImage(c.img, x, c.y, c.w, c.h);
    }
    ctx.globalAlpha = 1;
  }

  function loop(now) {
    draw((now - t0) / 1000);
    if (visible && !reduceMotion.matches) raf = requestAnimationFrame(loop);
  }

  build(); draw(0);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible && !reduceMotion.matches) raf = requestAnimationFrame(loop);
  }).observe(canvas);

  let resizeTimer;
  new ResizeObserver(() => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { build(); draw((performance.now() - t0) / 1000); }, 120);
  }).observe(canvas);
});

/* ---------- Experience timeline: months ruled like a measurement, with "now" lit ---------- */
(function buildTimeline() {
  const rule = document.getElementById("rule");
  if (!rule) return;
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const start = { y: 2026, m: 5 }; // Jun 2026
  const today = new Date();
  const end = { y: today.getFullYear(), m: today.getMonth() };
  const toIndex = (d) => (d.y - start.y) * 12 + (d.m - start.m);
  const span = Math.min(Math.max(toIndex(end), 4), 17) + 1;

  for (let i = 0; i < span; i++) {
    const m = (start.m + i) % 12;
    const y = start.y + Math.floor((start.m + i) / 12);
    const tick = document.createElement("div");
    tick.className = "m";
    const label = document.createElement("span");
    label.textContent = m === 0 || i === 0 ? `${MONTHS[m]} ’${String(y).slice(2)}` : MONTHS[m];
    tick.appendChild(label);
    rule.appendChild(tick);
  }

  const pct = (months) => `${(months / span) * 100}%`;
  const nowAt = Math.min(toIndex(end) + today.getDate() / 31, span);
  const add = (cls, styles, text) => {
    const el = document.createElement(text ? "span" : "div");
    el.className = cls;
    Object.assign(el.style, styles);
    if (text) el.textContent = text;
    rule.appendChild(el);
  };
  add("seg past", { left: pct(0), width: `calc(${pct(3)} - 4px)` });
  add("seg-label", { left: pct(0) }, "Summer intern · ʻAiea");
  add("seg", { left: pct(3), width: pct(Math.max(nowAt - 3, 0.3)) });
  add("now", { left: pct(nowAt) });
  add(nowAt / span > 0.75 ? "now-label end" : "now-label", { left: pct(nowAt) }, "Now · San Jose");
})();

/* ---------- Object tracker illustration ---------- */
(function tracker() {
  const canvas = document.getElementById("tracker");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const css = getComputedStyle(document.documentElement);
  const ink = {
    box: css.getPropertyValue("--cream").trim() || "#ecdfd2",
    tag: css.getPropertyValue("--magenta").trim() || "#893172",
    obj: css.getPropertyValue("--gray").trim() || "#cccacc",
  };
  const W = 480, H = 360;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = W * dpr; canvas.height = H * dpr;
  ctx.scale(dpr, dpr);

  const objects = [
    { id: 1, w: 80, h: 116, ax: 110, ay: 60, fx: 0.31, fy: 0.47, px: 0, py: 1.2, cx: 140, cy: 180 },
    { id: 2, w: 68, h: 68, ax: 110, ay: 80, fx: 0.23, fy: 0.37, px: 2.1, py: 0.4, cx: 300, cy: 150 },
    { id: 3, w: 58, h: 88, ax: 90, ay: 70, fx: 0.41, fy: 0.29, px: 4.0, py: 2.6, cx: 330, cy: 230 },
  ];

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(236, 223, 210, 0.08)";
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
    for (let y = 40; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }

    ctx.font = "700 12px 'Figtree', sans-serif";
    ctx.textBaseline = "middle";
    objects.forEach((o) => {
      const x = o.cx + Math.sin(t * o.fx + o.px) * o.ax - o.w / 2;
      const y = o.cy + Math.sin(t * o.fy + o.py) * o.ay * 0.6 - o.h / 2;
      ctx.fillStyle = ink.obj;
      ctx.beginPath();
      ctx.ellipse(x + o.w / 2, y + o.h / 2, o.w * 0.32, o.h * 0.34, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = ink.box;
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, o.w, o.h);
      const label = `ID ${o.id}`;
      const lw = ctx.measureText(label).width + 10;
      ctx.fillStyle = ink.tag;
      ctx.fillRect(x - 1, y - 18, lw, 17);
      ctx.fillStyle = ink.box;
      ctx.fillText(label, x + 4, y - 9);
    });

    ctx.fillStyle = ink.box;
    ctx.font = "700 13px 'Figtree', sans-serif";
    ctx.fillText(`objects counted: ${objects.length}`, 14, H - 16);
  }

  let visible = false, raf = 0;
  const startTime = performance.now();
  function loop(now) {
    draw((now - startTime) / 1000);
    if (visible && !reduceMotion.matches) raf = requestAnimationFrame(loop);
  }
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    cancelAnimationFrame(raf);
    if (visible && !reduceMotion.matches) raf = requestAnimationFrame(loop);
  }).observe(canvas);
  draw(0);
  if (document.fonts) document.fonts.ready.then(() => draw(0));
})();

/* ---------- Copy email ---------- */
document.querySelectorAll(".copy").forEach((button) => {
  const label = button.querySelector(".copy-label");
  let timer;
  const swap = (text, done) => {
    button.classList.add("swapping");
    setTimeout(() => {
      label.textContent = text;
      button.classList.toggle("done", done);
      button.classList.remove("swapping");
    }, 120);
  };
  button.addEventListener("click", async () => {
    clearTimeout(timer);
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      swap("Copied", true);
    } catch {
      // clipboard blocked: select the address so it can be copied by hand
      const link = button.parentElement.querySelector("a");
      const range = document.createRange();
      range.selectNodeContents(link);
      const sel = window.getSelection();
      sel.removeAllRanges(); sel.addRange(range);
      swap("Selected", false);
    }
    timer = setTimeout(() => swap("Copy", false), 1800);
  });
});

/* ---------- Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
