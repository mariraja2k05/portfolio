const githubUsername = "mariraja2k05";
const certificatesDriveLink = "https://drive.google.com/drive/folders/1V3wXmMfbzsiT52tthdCVF97KVhRgqehc?usp=sharing";
let revealObserver;
let motionEnhancementsBound = false;
let cinematicEffectsBound = false;

const certifications = [
  {
    title: "12300952_KVW3ZGBCertificate.pdf",
    issuer: "Google Drive",
    description: "Certificate document",
    link: "https://drive.google.com/file/d/1O5Cxu9HadhslQU-YyozYhGHLvrnA4AXh/view?usp=drivesdk"
  },
  {
    title: "Coursera KPM3O5YE3XDV.pdf",
    issuer: "Google Drive",
    description: "Certificate document",
    link: "https://drive.google.com/file/d/1svnJkl2NEWtEUHTLBFUYQxMdoedS4LRa/view?usp=drivesdk"
  },
  {
    title: "CP-20240203-PY214.pdf",
    issuer: "Google Drive",
    description: "Certificate document",
    link: "https://drive.google.com/file/d/180merl6j_YxHyjzrLJiO9POQQpiysaA9/view?usp=drivesdk"
  },
  {
    title: "Hackathon_Certificate.pdf",
    issuer: "Google Drive",
    description: "Certificate document",
    link: "https://drive.google.com/file/d/1IGbd2-hdwjOGBUgMwCjJGD3fXU6JgJk0/view?usp=drivesdk"
  },
  {
    title: "Profile _ freeCodeCamp.org.pdf",
    issuer: "Google Drive",
    description: "Certificate document",
    link: "https://drive.google.com/file/d/1qkmkceD3pejot0qPH4tCgMMMmSfV753_/view?usp=drivesdk"
  },
  {
    title: "summer training certificate.jpeg",
    issuer: "Google Drive",
    description: "Certificate document",
    link: "https://drive.google.com/file/d/1j4ECh2lh4CwNk_igI3H7iXB6JtQkXF7b/view?usp=drivesdk"
  }
];

function formatRepoDate(dateString) {
  const parsedDate = new Date(dateString);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Updated recently";
  }

  return `Updated ${parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  })}`;
}

function getProjectImageUrl(repo) {
  const searchableText = `${repo.name} ${repo.description || ""} ${repo.language || ""}`.toLowerCase();

  let tags = "technology,code";

  if (searchableText.includes("agri") || searchableText.includes("farm")) {
    tags = "agriculture,technology";
  } else if (searchableText.includes("network") || searchableText.includes("cisco") || searchableText.includes("internet")) {
    tags = "network,server";
  } else if (searchableText.includes("dashboard") || searchableText.includes("analysis") || searchableText.includes("data")) {
    tags = "data,analytics";
  } else if (searchableText.includes("calc") || searchableText.includes("math")) {
    tags = "calculator,math";
  } else if (searchableText.includes("python") || searchableText.includes("ml") || searchableText.includes("machine")) {
    tags = "python,ai";
  } else if (searchableText.includes("html") || searchableText.includes("web")) {
    tags = "website,design";
  }

  return `https://loremflickr.com/800/500/${tags}?lock=${repo.id}`;
}

function setupRevealObserver() {
  if (revealObserver) {
    return revealObserver;
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  return revealObserver;
}

function applyScrollReveal() {
  const observer = setupRevealObserver();
  const revealTargets = document.querySelectorAll(
    ".hero-main, .hero-photo-wrap, section h2, section > div > p, .card-hover, .skills-orbit, .project-card, .cert-card"
  );

  revealTargets.forEach((item, index) => {
    if (!item.classList.contains("reveal-on-scroll")) {
      item.classList.add("reveal-on-scroll");
    }

    item.style.transitionDelay = `${Math.min(index % 10, 9) * 38}ms`;

    observer.observe(item);
  });
}

function setupScrollProgress() {
  if (!document.querySelector(".scroll-progress")) {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    document.body.append(progressBar);
  }

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
    const scrollRange = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const ratio = Math.min(Math.max(scrollTop / scrollRange, 0), 1);
    document.documentElement.style.setProperty("--scroll-progress", ratio.toFixed(4));
  };

  updateProgress();

  if (document.body.dataset.scrollBound === "1") {
    return;
  }

  document.body.dataset.scrollBound = "1";
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress, { passive: true });
}

function setupTiltInteractions() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const targets = document.querySelectorAll(".card-hover, .hero-photo-wrap, .skills-orbit");

  targets.forEach((element) => {
    if (element.dataset.tiltBound === "1") {
      return;
    }

    element.dataset.tiltBound = "1";
    element.classList.add("tilt-surface", "tilt-glow");

    const setNeutral = () => {
      element.style.setProperty("--tilt-rx", "0deg");
      element.style.setProperty("--tilt-ry", "0deg");
      element.style.setProperty("--tilt-tx", "0px");
      element.style.setProperty("--tilt-ty", "0px");
      element.style.setProperty("--glow-x", "50%");
      element.style.setProperty("--glow-y", "45%");
    };

    setNeutral();

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const normalizedX = (event.clientX - rect.left) / rect.width;
      const normalizedY = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - normalizedY) * 9;
      const rotateY = (normalizedX - 0.5) * 10;
      const shiftX = (normalizedX - 0.5) * 4;
      const shiftY = (normalizedY - 0.5) * 4;

      element.style.setProperty("--tilt-rx", `${rotateX.toFixed(2)}deg`);
      element.style.setProperty("--tilt-ry", `${rotateY.toFixed(2)}deg`);
      element.style.setProperty("--tilt-tx", `${shiftX.toFixed(2)}px`);
      element.style.setProperty("--tilt-ty", `${shiftY.toFixed(2)}px`);
      element.style.setProperty("--glow-x", `${(normalizedX * 100).toFixed(2)}%`);
      element.style.setProperty("--glow-y", `${(normalizedY * 100).toFixed(2)}%`);
    });

    element.addEventListener("pointerleave", setNeutral);
    element.addEventListener("blur", setNeutral);
  });
}

function setupHeroParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const heroSection = document.querySelector(".hero-section");
  const heroShell = document.querySelector(".hero-shell");

  if (!heroSection || !heroShell) {
    return;
  }

  const updateParallax = (clientX, clientY) => {
    const rect = heroSection.getBoundingClientRect();
    const normalizedX = (clientX - rect.left) / rect.width;
    const normalizedY = (clientY - rect.top) / rect.height;
    const shiftX = (normalizedX - 0.5) * 14;
    const shiftY = (normalizedY - 0.5) * 9;

    heroShell.style.setProperty("--hero-shift-x", `${shiftX.toFixed(2)}px`);
    heroShell.style.setProperty("--hero-shift-y", `${shiftY.toFixed(2)}px`);
    heroSection.style.setProperty("--hero-glow-x", `${(normalizedX * 100).toFixed(2)}%`);
    heroSection.style.setProperty("--hero-glow-y", `${(normalizedY * 100).toFixed(2)}%`);
  };

  heroSection.addEventListener("pointermove", (event) => {
    updateParallax(event.clientX, event.clientY);
  });

  heroSection.addEventListener("pointerleave", () => {
    heroShell.style.setProperty("--hero-shift-x", "0px");
    heroShell.style.setProperty("--hero-shift-y", "0px");
    heroSection.style.setProperty("--hero-glow-x", "50%");
    heroSection.style.setProperty("--hero-glow-y", "35%");
  });
}

function setupBackgroundParticles() {
  const graphicsRoot = document.querySelector(".bg-graphics");

  if (!graphicsRoot || graphicsRoot.dataset.particlesReady === "1") {
    return;
  }

  graphicsRoot.dataset.particlesReady = "1";

  const particleCount = window.innerWidth < 700 ? 16 : 26;
  const fragment = document.createDocumentFragment();

  for (let index = 0; index < particleCount; index += 1) {
    const particle = document.createElement("span");
    const size = 2 + Math.random() * 5;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 9;
    const duration = 7 + Math.random() * 10;

    particle.className = "bg-particle";
    particle.style.setProperty("--p-size", `${size.toFixed(2)}px`);
    particle.style.setProperty("--p-x", `${x.toFixed(2)}%`);
    particle.style.setProperty("--p-y", `${y.toFixed(2)}%`);
    particle.style.setProperty("--p-delay", `${delay.toFixed(2)}s`);
    particle.style.setProperty("--p-duration", `${duration.toFixed(2)}s`);
    fragment.append(particle);
  }

  graphicsRoot.append(fragment);
}

function setupActiveNavHighlight() {
  const navLinks = Array.from(document.querySelectorAll('header .nav-link[href^="#"]'));

  if (!navLinks.length) {
    return;
  }

  const sectionById = new Map(
    navLinks
      .map((link) => {
        const sectionId = link.getAttribute("href")?.slice(1);
        const section = sectionId ? document.getElementById(sectionId) : null;
        return section ? [sectionId, section] : null;
      })
      .filter(Boolean)
  );

  const setActive = (activeId) => {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${activeId}`;
      link.classList.toggle("is-active", isActive);
    });
  };

  const updateActiveLink = () => {
    const trigger = window.scrollY + window.innerHeight * 0.35;
    let activeId = "";

    sectionById.forEach((section, id) => {
      if (trigger >= section.offsetTop) {
        activeId = id;
      }
    });

    if (activeId) {
      setActive(activeId);
    }
  };

  updateActiveLink();
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("resize", updateActiveLink, { passive: true });
}

function setupButtonPop() {
  const buttons = document.querySelectorAll(".hero-btn, #contact a.rounded-lg");

  buttons.forEach((button) => {
    if (button.dataset.popBound === "1") {
      return;
    }

    button.dataset.popBound = "1";
    button.addEventListener("click", () => {
      button.classList.remove("btn-pop");
      window.requestAnimationFrame(() => {
        button.classList.add("btn-pop");
        window.setTimeout(() => button.classList.remove("btn-pop"), 360);
      });
    });
  });
}

function setupCursorAura() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  if (!document.querySelector(".cursor-aura")) {
    const aura = document.createElement("div");
    aura.className = "cursor-aura";
    document.body.append(aura);
  }

  const aura = document.querySelector(".cursor-aura");

  if (!aura || aura.dataset.bound === "1") {
    return;
  }

  aura.dataset.bound = "1";
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;

  const animateAura = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    aura.style.setProperty("--aura-x", `${currentX.toFixed(2)}px`);
    aura.style.setProperty("--aura-y", `${currentY.toFixed(2)}px`);
    window.requestAnimationFrame(animateAura);
  };

  animateAura();

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      aura.classList.add("is-visible");
    },
    { passive: true }
  );

  window.addEventListener("pointerdown", () => aura.classList.add("is-pressed"), { passive: true });
  window.addEventListener("pointerup", () => aura.classList.remove("is-pressed"), { passive: true });
}

function setupPointerSheen() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const interactiveItems = document.querySelectorAll(".hero-btn, .theme-toggle, .project-card, .cert-card, .card-hover");

  interactiveItems.forEach((element) => {
    if (element.dataset.sheenBound === "1") {
      return;
    }

    element.dataset.sheenBound = "1";
    element.classList.add("sheen-surface");

    const resetSheen = () => {
      element.style.removeProperty("--sheen-x");
      element.style.removeProperty("--sheen-y");
      element.classList.remove("is-sheen-active");
    };

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;

      element.style.setProperty("--sheen-x", `${x.toFixed(2)}%`);
      element.style.setProperty("--sheen-y", `${y.toFixed(2)}%`);
      element.classList.add("is-sheen-active");
    });

    element.addEventListener("pointerleave", resetSheen);
    element.addEventListener("blur", resetSheen);
  });
}

function setupHeroReveal() {
  if (document.body.dataset.heroRevealBound === "1") {
    return;
  }

  document.body.dataset.heroRevealBound = "1";
  window.requestAnimationFrame(() => {
    window.setTimeout(() => {
      document.body.classList.add("hero-is-ready");
    }, 80);
  });
}

function setupSmoothSectionNavigation() {
  const links = Array.from(document.querySelectorAll('header .nav-link[href^="#"]'));

  if (!links.length || document.body.dataset.smoothNavBound === "1") {
    return;
  }

  document.body.dataset.smoothNavBound = "1";

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetSelector = link.getAttribute("href");
      if (!targetSelector) {
        return;
      }

      const targetSection = document.querySelector(targetSelector);
      if (!targetSection) {
        return;
      }

      event.preventDefault();
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });

      targetSection.classList.remove("section-focus");
      window.requestAnimationFrame(() => {
        targetSection.classList.add("section-focus");
        window.setTimeout(() => targetSection.classList.remove("section-focus"), 820);
      });
    });
  });
}

function setupSectionDepthMotion() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const sections = Array.from(document.querySelectorAll("main section"));

  if (!sections.length) {
    return;
  }

  const onScrollDepth = () => {
    const viewportCenter = window.scrollY + window.innerHeight * 0.52;

    sections.forEach((section) => {
      const sectionCenter = section.offsetTop + section.offsetHeight / 2;
      const distance = Math.min(Math.abs(sectionCenter - viewportCenter), window.innerHeight);
      const intensity = 1 - distance / window.innerHeight;
      section.style.setProperty("--section-depth", `${Math.max(intensity, 0).toFixed(3)}`);
    });
  };

  onScrollDepth();

  if (document.body.dataset.depthBound === "1") {
    return;
  }

  document.body.dataset.depthBound = "1";
  window.addEventListener("scroll", onScrollDepth, { passive: true });
  window.addEventListener("resize", onScrollDepth, { passive: true });
}

function setupCinematicEffects() {
  setupCursorAura();
  setupPointerSheen();
  setupHeroReveal();
  setupSmoothSectionNavigation();
  setupBackgroundParticles();

  if (cinematicEffectsBound) {
    return;
  }

  setupSectionDepthMotion();
  cinematicEffectsBound = true;
}

function setupMotionEnhancements() {
  setupTiltInteractions();

  if (motionEnhancementsBound) {
    return;
  }

  setupScrollProgress();
  setupHeroParallax();
  setupButtonPop();
  setupCinematicEffects();
  motionEnhancementsBound = true;
}

async function renderProjects() {
  const projectsGrid = document.getElementById("projectsGrid");

  projectsGrid.innerHTML = `
    <article class="card-hover rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800/70 p-5 md:col-span-2 xl:col-span-3">
      <p class="text-slate-300">Loading your GitHub projects...</p>
    </article>
  `;

  try {
    const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`);

    if (!response.ok) {
      throw new Error("Failed to fetch repositories");
    }

    const repositories = await response.json();
    const publicRepos = repositories
      .filter((repo) => !repo.fork)
      .sort((firstRepo, secondRepo) => new Date(secondRepo.pushed_at) - new Date(firstRepo.pushed_at));

    if (!publicRepos.length) {
      projectsGrid.innerHTML = `
        <article class="card-hover rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800/70 p-5 md:col-span-2 xl:col-span-3">
          <p class="text-slate-300">No public projects found yet on GitHub.</p>
        </article>
      `;
      applyScrollReveal();
      return;
    }

    projectsGrid.innerHTML = publicRepos
      .map(
        (repo) => `
        <article class="project-card card-hover rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800/70 p-5">
          <div class="project-image-wrap">
            <img class="project-image" src="${getProjectImageUrl(repo)}" alt="${repo.name} project image" loading="lazy" onerror="this.onerror=null;this.src='https://picsum.photos/seed/project-${repo.id}/800/500';" />
          </div>
          <h3 class="mt-2 text-2xl font-semibold text-slate-100">${repo.name}</h3>
          <p class="mt-2 text-slate-300">${repo.description || "Open this repository on GitHub to view full details."}</p>
          <div class="mt-4 flex items-center justify-between gap-2 text-sm text-slate-300">
            <span>★ ${repo.stargazers_count}</span>
            <span>${formatRepoDate(repo.pushed_at)}</span>
          </div>
          <a class="mt-4 inline-block font-semibold text-sky-300 transition hover:text-sky-200" href="${repo.html_url}" target="_blank" rel="noreferrer">View on GitHub ↗</a>
        </article>
      `
      )
      .join("");
    applyScrollReveal();
    setupMotionEnhancements();
  } catch (error) {
    projectsGrid.innerHTML = `
      <article class="card-hover rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800/70 p-5 md:col-span-2 xl:col-span-3">
        <p class="text-slate-300">Could not load GitHub projects right now. Please try again later.</p>
      </article>
    `;
    applyScrollReveal();
    setupMotionEnhancements();
  }
}

function renderCertificates() {
  const certGrid = document.getElementById("certGrid");

  const certCards = certifications
    .map(
      (cert) => `
        <a class="card-hover cert-card rounded-2xl border border-slate-700 bg-gradient-to-b from-slate-900 to-slate-800/70 p-5" href="${cert.link}" target="_blank" rel="noreferrer">
          <p class="text-xs font-semibold uppercase tracking-wider text-sky-300">Certification</p>
          <h3 class="mt-1 text-lg font-semibold text-slate-100">${cert.title}</h3>
          <p class="mt-2 text-slate-100 font-semibold">${cert.issuer}</p>
          <p class="mt-1 text-slate-300">${cert.description}</p>
          <span class="mt-3 inline-block font-semibold text-sky-300 transition hover:text-sky-200">Open in Drive ↗</span>
        </a>
      `
    )
    .join("");

  certGrid.className = "mt-5";
  certGrid.innerHTML = `
    <div class="cert-marquee" aria-label="Certificates train slider">
      <div class="cert-track">
        ${certCards}
        ${certCards}
      </div>
    </div>
  `;
  applyScrollReveal();
  setupMotionEnhancements();
}

function setYear() {
  document.getElementById("year").textContent = new Date().getFullYear();
}

function setupResumePlaceholder() {
  const resumeLink = document.getElementById("resumeLink");

  resumeLink.addEventListener("click", (event) => {
    event.preventDefault();
    alert("Add your CV URL in script.js by replacing the resume link.");
  });
}

function setupSkillOrbit() {
  const skillDots = Array.from(document.querySelectorAll(".skill-dot"));
  const activeSkillName = document.getElementById("activeSkillName");

  if (!skillDots.length || !activeSkillName) {
    return;
  }

  const setActiveSkill = (targetDot) => {
    skillDots.forEach((dot) => dot.classList.remove("is-active"));
    targetDot.classList.add("is-active");
    activeSkillName.textContent = targetDot.dataset.skill || "Skill";
  };

  skillDots.forEach((dot) => {
    dot.addEventListener("mouseenter", () => setActiveSkill(dot));
    dot.addEventListener("focus", () => setActiveSkill(dot));
    dot.addEventListener("click", () => setActiveSkill(dot));
    dot.addEventListener("touchstart", () => setActiveSkill(dot), { passive: true });
  });
}

function runEntryBlastRejoin() {
  const blastTargets = Array.from(
    document.querySelectorAll(
      "header, .hero-main, .hero-photo-wrap, #projects .mx-auto, #skills .mx-auto, #training .mx-auto, #education .mx-auto, #certifications .mx-auto, #contact .mx-auto, footer"
    )
  );

  if (!blastTargets.length) {
    return;
  }

  blastTargets.forEach((element, index) => {
    const angle = Math.random() * Math.PI * 2;
    const distance = 22 + Math.random() * (window.innerWidth < 760 ? 34 : 64);
    const rotate = Math.random() * 12 - 6;
    const scale = 0.9 + Math.random() * 0.08;

    element.classList.add("blast-item");
    element.style.setProperty("--blast-x", `${Math.cos(angle) * distance}px`);
    element.style.setProperty("--blast-y", `${Math.sin(angle) * distance}px`);
    element.style.setProperty("--blast-r", `${rotate}deg`);
    element.style.setProperty("--blast-s", `${scale}`);
    element.style.setProperty("--blast-delay", `${index * 45}ms`);
  });

  document.body.classList.add("intro-blast");

  window.setTimeout(() => {
    document.body.classList.remove("intro-blast");

    blastTargets.forEach((element) => {
      element.classList.remove("blast-item");
      element.style.removeProperty("--blast-x");
      element.style.removeProperty("--blast-y");
      element.style.removeProperty("--blast-r");
      element.style.removeProperty("--blast-s");
      element.style.removeProperty("--blast-delay");
    });
  }, 2500);
}

renderProjects();
renderCertificates();
setYear();
setupResumePlaceholder();
setupSkillOrbit();
applyScrollReveal();
runEntryBlastRejoin();
setupMotionEnhancements();
setupActiveNavHighlight();
setupCinematicEffects();
