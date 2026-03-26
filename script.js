/* ════════════════════════════════════════════════════════════
   MARIRAJA PORTFOLIO — script.js
   ════════════════════════════════════════════════════════════ */

const GITHUB_USERNAME = "mariraja2k05";
const CERTS_DRIVE_FOLDER = "https://drive.google.com/drive/folders/1V3wXmMfbzsiT52tthdCVF97KVhRgqehc?usp=sharing";
const CV_DRIVE_FOLDER = "https://drive.google.com/drive/folders/1pENcQkeSOidlWVar3G3-yLyL5VEjexOv?usp=sharing";
const GENERAL_CV_LINK = "https://drive.google.com/file/d/1-uH1I1-YhZnRndZkuXa2JTYEtR--5KCz/view?usp=sharing";
const SPECIAL_CV_LINK = "https://drive.google.com/file/d/1oXtabaqtaX1b5f568OhZy_efEOjC2h_L/view?usp=sharing";

const certifications = [
  { title: "Google Certificate", issuer: "Google / Coursera", link: "https://drive.google.com/file/d/1O5Cxu9HadhslQU-YyozYhGHLvrnA4AXh/view?usp=drivesdk" },
  { title: "Coursera KPM3O5YE3XDV", issuer: "Coursera", link: "https://drive.google.com/file/d/1svnJkl2NEWtEUHTLBFUYQxMdoedS4LRa/view?usp=drivesdk" },
  { title: "Python Programming", issuer: "CP — Certified", link: "https://drive.google.com/file/d/180merl6j_YxHyjzrLJiO9POQQpiysaA9/view?usp=drivesdk" },
  { title: "Hackathon Certificate", issuer: "Hackathon", link: "https://drive.google.com/file/d/1IGbd2-hdwjOGBUgMwCjJGD3fXU6JgJk0/view?usp=drivesdk" },
  { title: "freeCodeCamp Profile", issuer: "freeCodeCamp", link: "https://drive.google.com/file/d/1qkmkceD3pejot0qPH4tCgMMMmSfV753_/view?usp=drivesdk" },
  { title: "Summer Training", issuer: "Internship Program", link: "https://drive.google.com/file/d/1j4ECh2lh4CwNk_igI3H7iXB6JtQkXF7b/view?usp=drivesdk" },
];

/* ══ CANVAS PARTICLE BACKGROUND ══════════════════════════════ */
function initCanvas() {
  const canvas = document.getElementById("bgCanvas");
  const ctx = canvas.getContext("2d");
  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.size = Math.random() * 1.5 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.35;
      this.speedY = (Math.random() - 0.5) * 0.35;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() > 0.7 ? 185 : (Math.random() > 0.5 ? 267 : 157);
    }
    update() {
      const dx = mouse.x - this.x, dy = mouse.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120;
        this.x -= (dx / dist) * force * 1.2;
        this.y -= (dy / dist) * force * 1.2;
      }
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < 0) this.x = W;
      if (this.x > W) this.x = 0;
      if (this.y < 0) this.y = H;
      if (this.y > H) this.y = 0;
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = `hsl(${this.hue}, 100%, 70%)`;
      ctx.shadowColor = `hsl(${this.hue}, 100%, 70%)`;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  const COUNT = Math.min(120, Math.floor(W * H / 12000));
  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 90) {
          ctx.save();
          ctx.globalAlpha = (1 - dist / 90) * 0.12;
          ctx.strokeStyle = `rgba(0, 229, 255, 1)`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    drawConnections();
    requestAnimationFrame(animate);
  }
  animate();
}

/* ══ CUSTOM CURSOR ════════════════════════════════════════════ */
function initCursor() {
  if (window.matchMedia("(hover:none)").matches) return;
  const cursor = document.getElementById("cursor");
  const dot = document.getElementById("cursorDot");
  let cx = 0, cy = 0, tx = 0, ty = 0;

  document.addEventListener("mousemove", (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.left = tx + "px";
    dot.style.top  = ty + "px";
  }, { passive: true });

  function lerp(a, b, n) { return a + (b - a) * n; }

  function tick() {
    cx = lerp(cx, tx, 0.12);
    cy = lerp(cy, ty, 0.12);
    cursor.style.left = cx + "px";
    cursor.style.top  = cy + "px";
    requestAnimationFrame(tick);
  }
  tick();

  const hoverEls = document.querySelectorAll("a, button, .skill-tag, .orbit-dot, .cert-card, .project-card, .contact-btn");
  hoverEls.forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("is-hovering"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("is-hovering"));
  });
}

/* ══ SCROLL PROGRESS ══════════════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById("scrollBar");
  const update = () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (scrolled / maxScroll * 100).toFixed(2) + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

/* ══ HEADER SCROLL ════════════════════════════════════════════ */
function initHeader() {
  const header = document.getElementById("header");
  const update = () => {
    header.classList.toggle("scrolled", window.scrollY > 40);
  };
  window.addEventListener("scroll", update, { passive: true });
}

/* ══ MOBILE MENU ══════════════════════════════════════════════ */
function initMobileMenu() {
  const btn = document.getElementById("menuBtn");
  const nav = document.getElementById("mobileNav");
  btn.addEventListener("click", () => {
    btn.classList.toggle("open");
    nav.classList.toggle("open");
  });
  nav.querySelectorAll(".mobile-nav-link").forEach(link => {
    link.addEventListener("click", () => {
      btn.classList.remove("open");
      nav.classList.remove("open");
    });
  });
}

/* ══ REVEAL ON SCROLL ═════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" });
  els.forEach(el => observer.observe(el));
}

/* ══ COUNTER ANIMATION ════════════════════════════════════════ */
function initCounters() {
  const els = document.querySelectorAll(".stat-num[data-target]");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      let start = 0;
      const step = () => {
        start++;
        el.textContent = start;
        if (start < target) setTimeout(step, 80);
      };
      step();
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  els.forEach(el => observer.observe(el));
}

/* ══ ACTIVE NAV ═══════════════════════════════════════════════ */
function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-link");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove("active"));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
}

/* ══ SKILLS ═══════════════════════════════════════════════════ */
function initSkills() {
  const tags = document.querySelectorAll(".skill-tag");
  const nameEl = document.getElementById("activeSkillName");
  const barEl = document.getElementById("activeSkillBar");
  const iconEl = document.getElementById("orbitCenterIcon");

  const iconMap = {
    "Python": "https://cdn.simpleicons.org/python/3776AB",
    "Machine Learning": "https://cdn.simpleicons.org/pytorch/EE4C2C",
    "Data Analysis": "https://cdn.simpleicons.org/googleanalytics/E37400",
    "Pandas": "https://cdn.simpleicons.org/pandas/150458",
    "NumPy": "https://cdn.simpleicons.org/numpy/4DABCF",
    "Matplotlib": "https://cdn.simpleicons.org/plotly/3F4F75",
    "SQL": "https://cdn.simpleicons.org/mysql/4479A1",
    "Git & GitHub": "https://cdn.simpleicons.org/github/ffffff",
    "Deep Learning": "https://cdn.simpleicons.org/tensorflow/FF6F00",
    "Scikit-Learn": "https://cdn.simpleicons.org/scikitlearn/F7931E",
  };

  tags.forEach(tag => {
    tag.addEventListener("click", () => {
      tags.forEach(t => t.classList.remove("is-active"));
      tag.classList.add("is-active");
      const skill = tag.dataset.skill;
      const level = tag.dataset.level;
      nameEl.textContent = skill;
      barEl.style.width = level + "%";
      const icon = iconMap[skill];
      if (iconEl) {
        if (icon) { iconEl.src = icon; iconEl.style.display = ""; }
        else { iconEl.style.display = "none"; }
      }
    });
  });

  // Force clean orbital ordering so skill planets stay aligned on inner/outer rings.
  const orbitDots = [...document.querySelectorAll(".orbit-dot")];
  const total = orbitDots.length;
  orbitDots.forEach((dot, i) => {
    const angle = (360 / total) * i;
    const isOuter = i % 2 === 1;
    dot.style.setProperty("--angle", `${angle}deg`);
    dot.style.setProperty("--radius", isOuter ? "130px" : "82px");
    dot.style.setProperty("--orbit-duration", isOuter ? `${22 + i * 0.5}s` : `${14 + i * 0.4}s`);
    dot.classList.toggle("reverse", i % 3 === 1);
  });

  // Orbit dot hover
  document.querySelectorAll(".orbit-dot").forEach(dot => {
    const activateFromDot = () => {
      const skill = dot.dataset.skill;
      const match = [...tags].find(t => t.dataset.skill === skill);
      if (match) match.click();
    };
    dot.addEventListener("mouseenter", activateFromDot);
    dot.addEventListener("click", activateFromDot);
  });
}

/* ══ PROJECTS ═════════════════════════════════════════════════ */
const LANG_COLORS = {
  Python: "#3776AB", JavaScript: "#f7df1e", TypeScript: "#3178c6",
  HTML: "#e34c26", CSS: "#563d7c", Jupyter: "#DA5B0B",
  R: "#276DC3", Java: "#b07219", default: "#00e5ff"
};

const PROJECT_CACHE_KEY = "portfolio_project_cache_v1";
const PROJECT_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function langColor(lang) { return LANG_COLORS[lang] || LANG_COLORS.default; }

function projectImageUrl(repo) {
  const lang = repo?.language || "Code";
  const color = langColor(lang);
  const dark = "#0a0f18";
  const name = String(repo?.name || "Project").slice(0, 28);
  const desc = String(repo?.description || "GitHub repository").slice(0, 54);
  const safeName = name.replace(/[&<>"']/g, "");
  const safeDesc = desc.replace(/[&<>"']/g, "");
  const safeLang = String(lang).replace(/[&<>"']/g, "");
  const svg = `
<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
  <defs>
    <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='${dark}'/>
      <stop offset='100%' stop-color='${color}'/>
    </linearGradient>
  </defs>
  <rect width='800' height='500' fill='url(#g)'/>
  <circle cx='110' cy='95' r='140' fill='rgba(255,255,255,0.06)'/>
  <circle cx='720' cy='430' r='190' fill='rgba(255,255,255,0.04)'/>
  <rect x='48' y='60' width='704' height='380' rx='22' fill='rgba(0,0,0,0.22)' stroke='rgba(255,255,255,0.18)'/>
  <text x='84' y='170' fill='white' font-size='52' font-weight='700' font-family='Segoe UI,Arial,sans-serif'>${safeName}</text>
  <text x='84' y='228' fill='rgba(255,255,255,0.9)' font-size='26' font-family='Segoe UI,Arial,sans-serif'>${safeDesc}</text>
  <text x='84' y='392' fill='${color}' font-size='24' font-weight='700' font-family='Segoe UI,Arial,sans-serif'>${safeLang}</text>
</svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function fmtDate(d) {
  const p = new Date(d);
  if (isNaN(p)) return "Recently updated";
  return `Updated ${p.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}`;
}

function readProjectCache() {
  try {
    const raw = localStorage.getItem(PROJECT_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.savedAt || !Array.isArray(parsed?.repos)) return null;
    if (Date.now() - parsed.savedAt > PROJECT_CACHE_MAX_AGE_MS) return null;
    return parsed.repos;
  } catch {
    return null;
  }
}

function writeProjectCache(repos) {
  try {
    localStorage.setItem(PROJECT_CACHE_KEY, JSON.stringify({ savedAt: Date.now(), repos }));
  } catch {
    // Ignore storage failures (private mode / quota exceeded).
  }
}

function bindProjectCardEffects(grid) {
  const newCards = grid.querySelectorAll(".reveal");
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
  }, { threshold: 0.1 });
  newCards.forEach(c => obs.observe(c));

  grid.querySelectorAll(".project-card, .project-link").forEach(el => {
    el.addEventListener("mouseenter", () => document.getElementById("cursor")?.classList.add("is-hovering"));
    el.addEventListener("mouseleave", () => document.getElementById("cursor")?.classList.remove("is-hovering"));
  });
}

function buildProjectCards(repos, opts = {}) {
  const cachedTag = opts.cached ? `<span class="project-stars">Cached</span>` : "";
  return repos.map(repo => `
    <article class="project-card glass-card reveal">
      <div style="overflow:hidden;border-radius:16px 16px 0 0;">
        <img class="project-card-img"
             src="${projectImageUrl(repo)}"
             alt="${repo.name}"
             loading="lazy"
             onerror="this.onerror=null;this.src='https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png';" />
      </div>
      <div class="project-card-body">
        <div class="project-card-meta">
          <span>
            ${repo.language ? `<span class="project-lang-dot" style="background:${langColor(repo.language)}"></span>${repo.language}` : "—"}
          </span>
          <span>${fmtDate(repo.pushed_at)}</span>
        </div>
        <h3 class="project-title">${repo.name}</h3>
        <p class="project-desc">${repo.description || "Open this repository to view details."}</p>
        <div class="project-footer">
          ${cachedTag}
          <span class="project-stars">★ ${repo.stargazers_count ?? 0}</span>
          <a class="project-link" href="${repo.html_url}" target="_blank" rel="noreferrer">VIEW ON GITHUB →</a>
        </div>
      </div>
    </article>
  `).join("");
}

async function fetchReposWithRetry(url, maxAttempts = 2) {
  let lastError;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    try {
      const res = await fetch(url, {
        signal: controller.signal,
        headers: { Accept: "application/vnd.github+json" }
      });
      clearTimeout(timeout);

      if (!res.ok) {
        const remaining = Number(res.headers.get("x-ratelimit-remaining"));
        if (res.status === 403 && remaining === 0) {
          const resetEpoch = Number(res.headers.get("x-ratelimit-reset")) * 1000;
          const minutes = Number.isFinite(resetEpoch)
            ? Math.max(1, Math.ceil((resetEpoch - Date.now()) / 60000))
            : null;
          throw new Error(minutes ? `GitHub rate limit reached. Try again in ~${minutes} min.` : "GitHub rate limit reached.");
        }
        throw new Error(`GitHub API error (${res.status})`);
      }

      return await res.json();
    } catch (err) {
      clearTimeout(timeout);
      lastError = err;
      if (attempt < maxAttempts) {
        await new Promise(r => setTimeout(r, 600 * attempt));
      }
    }
  }
  throw lastError || new Error("Unable to load repositories.");
}

async function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  try {
    const data = await fetchReposWithRetry(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    const repos = data
      .filter(r => !r.fork)
      .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));

    if (!repos.length) {
      grid.innerHTML = `<div class="loader-card"><p>No public projects yet.</p></div>`;
      return;
    }

    writeProjectCache(repos);
    grid.innerHTML = buildProjectCards(repos);

    bindProjectCardEffects(grid);
  } catch (err) {
    const cachedRepos = readProjectCache();
    if (cachedRepos?.length) {
      grid.innerHTML = buildProjectCards(cachedRepos, { cached: true });
      bindProjectCardEffects(grid);
      return;
    }
    const reason = err?.message ? `<br><small>${err.message}</small>` : "";
    grid.innerHTML = `<div class="loader-card"><p>Could not load projects right now.${reason}</p></div>`;
  }
}

/* ══ CERTIFICATES ═════════════════════════════════════════════ */
function renderCerts() {
  const track = document.getElementById("certTrack");
  const cards = certifications.map(c => `
    <a class="cert-card glass-card" href="${c.link}" target="_blank" rel="noreferrer">
      <span class="cert-card-tag">Certificate</span>
      <h3>${c.title}</h3>
      <p>${c.issuer}</p>
      <span class="cert-link">OPEN IN DRIVE →</span>
    </a>
  `).join("");
  track.innerHTML = cards + cards; // duplicate for infinite scroll
}

/* ══ RESUME CHOOSER ═══════════════════════════════════════════ */
function initResume() {
  const link = document.getElementById("resumeLink");
  const modal = document.getElementById("resumeModal");
  const closeBtn = document.getElementById("resumeModalClose");
  const overlayClose = modal?.querySelector("[data-close-resume]");
  const generalCvLink = document.getElementById("generalCvLink");
  const specialCvLink = document.getElementById("specialCvLink");

  if (generalCvLink) generalCvLink.href = GENERAL_CV_LINK;
  if (specialCvLink) specialCvLink.href = SPECIAL_CV_LINK;

  const openModal = () => {
    if (!modal) return;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  link?.addEventListener("click", e => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener("click", closeModal);
  overlayClose?.addEventListener("click", closeModal);
  generalCvLink?.addEventListener("click", closeModal);
  specialCvLink?.addEventListener("click", closeModal);

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closeModal();
  });
}

/* ══ YEAR ═════════════════════════════════════════════════════ */
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

/* ══ MAGNETIC EFFECT ══════════════════════════════════════════ */
function initMagnetic() {
  document.querySelectorAll(".magnetic").forEach(el => {
    el.addEventListener("mousemove", e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });
}

/* ══ SMOOTH SCROLL ════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

/* ══ BOOT ═════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", () => {
  initCanvas();
  initCursor();
  initScrollProgress();
  initHeader();
  initMobileMenu();
  initReveal();
  initCounters();
  initActiveNav();
  initSkills();
  initResume();
  initSmoothScroll();
  setYear();
  renderProjects();
  renderCerts();

  // Defer magnetic until idle
  if ("requestIdleCallback" in window) {
    requestIdleCallback(initMagnetic);
  } else {
    setTimeout(initMagnetic, 300);
  }
});