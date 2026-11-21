const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

/* ---------- Nav: a glass lens slides to the current section ---------- */
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

/* ---------- Lens: a specular highlight that trails the pointer on a spring ----------
   Decorative only, so it is gated to fine pointers and switched off for reduced motion.
   A critically damped spring per axis (no overshoot) gives the light a sense of mass
   instead of snapping to the cursor. The transform is written straight to the sheen
   element, not through an inherited CSS variable, so only that one layer restyles. */
(function lens() {
  if (!finePointer.matches || reduceMotion.matches) return;
  const STIFFNESS = 180;
  const DAMPING = 2 * Math.sqrt(STIFFNESS); // critical damping

  document.querySelectorAll(".lens").forEach((el) => {
    const sheen = document.createElement("span");
    sheen.className = "sheen";
    sheen.setAttribute("aria-hidden", "true");
    el.prepend(sheen);

    const pos = { x: 0, y: 0 }, vel = { x: 0, y: 0 }, target = { x: 0, y: 0 };
    let raf = 0, last = 0;

    function step(now) {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;
      for (const k of ["x", "y"]) {
        const force = STIFFNESS * (target[k] - pos[k]) - DAMPING * vel[k];
        vel[k] += force * dt;
        pos[k] += vel[k] * dt;
      }
      sheen.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      const settled = Math.abs(target.x - pos.x) < 0.3 && Math.abs(target.y - pos.y) < 0.3 && Math.abs(vel.x) + Math.abs(vel.y) < 0.5;
      raf = settled ? 0 : requestAnimationFrame(step);
    }

    function aim(e) {
      const box = el.getBoundingClientRect();
      target.x = e.clientX - box.left;
      target.y = e.clientY - box.top;
      if (!raf) { last = performance.now(); raf = requestAnimationFrame(step); }
    }

    el.addEventListener("pointerenter", (e) => {
      // start the light where the pointer came in, so it never flies in from a corner
      const box = el.getBoundingClientRect();
      pos.x = target.x = e.clientX - box.left;
      pos.y = target.y = e.clientY - box.top;
      vel.x = vel.y = 0;
      sheen.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      el.classList.add("lit");
    });
    el.addEventListener("pointermove", aim);
    el.addEventListener("pointerleave", () => el.classList.remove("lit"));
  });
})();

/* ---------- Sections materialize once as they scroll into view ---------- */
/* Content must never depend on this firing, so it checks positions directly (no observer
   timing to miss), reveals anything already on screen or scrolled past (deep links, back
   navigation). If the script never runs, .reveal is never added and nothing is hidden. */
(function reveal() {
  let pending = [...document.querySelectorAll("main .section")];
  pending.forEach((s) => s.classList.add("reveal"));

  function check() {
    const edge = window.innerHeight * 0.92;
    pending = pending.filter((s) => {
      if (s.getBoundingClientRect().top < edge) { s.classList.add("in"); return false; }
      return true;
    });
    if (!pending.length) window.removeEventListener("scroll", onScroll);
  }
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { check(); ticking = false; });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("hashchange", check);
  window.addEventListener("load", check);
  check();
})();

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
  const ink = {
    box: "rgb(255, 122, 92)",           // coral
    tag: "rgb(255, 122, 92)",
    tagText: "rgb(12, 15, 20)",         // ink
    obj: "rgba(231, 236, 242, 0.32)",   // mist
    grid: "rgba(231, 236, 242, 0.06)",
    text: "rgba(231, 236, 242, 0.85)",
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

  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = ink.grid;
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) { ctx.beginPath(); ctx.moveTo(x + 0.5, 0); ctx.lineTo(x + 0.5, H); ctx.stroke(); }
    for (let y = 40; y < H; y += 40) { ctx.beginPath(); ctx.moveTo(0, y + 0.5); ctx.lineTo(W, y + 0.5); ctx.stroke(); }

    ctx.font = "700 12px 'Neuton', Georgia, serif";
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
      roundRect(x, y, o.w, o.h, 6);
      ctx.stroke();
      const label = `ID ${o.id}`;
      const lw = ctx.measureText(label).width + 12;
      ctx.fillStyle = ink.tag;
      roundRect(x - 1, y - 20, lw, 17, 8.5);
      ctx.fill();
      ctx.fillStyle = ink.tagText;
      ctx.fillText(label, x + 5, y - 11);
    });

    ctx.fillStyle = ink.text;
    ctx.font = "700 13px 'Neuton', Georgia, serif";
    ctx.fillText(`objects counted: ${objects.length}`, 16, H - 18);
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
