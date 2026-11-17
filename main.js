/* ============================================================
   RevelleCare — Main JS
   ============================================================ */

// ── Dark Mode Toggle ───────────────────────────────────────
(function () {
  const root = document.documentElement;
  let theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);

  const toggles = document.querySelectorAll('[data-theme-toggle]');
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

  function setToggleIcon(t) {
    if (!t) return;
    t.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    t.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }

  toggles.forEach(t => {
    setToggleIcon(t);
    t.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggles.forEach(setToggleIcon);
    });
  });
})();

// ── Sticky Header ──────────────────────────────────────────
(function () {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Teal hero directly under the header: use light logo/text until scrolled
  const hero = document.querySelector('.page-hero--teal');
  if (hero && hero.getBoundingClientRect().top + window.scrollY < 260) {
    header.classList.add('on-dark');
  }

  const update = () => header.classList.toggle('scrolled', window.scrollY > 60);
  window.addEventListener('scroll', update, { passive: true });
  update();
})();

// ── Pre-launch banner: keep the fixed header just below it ──
(function () {
  const banner = document.querySelector('.prelaunch-banner');
  if (!banner) return;
  const sync = () => document.documentElement.style.setProperty('--banner-height', banner.offsetHeight + 'px');
  sync();
  window.addEventListener('resize', sync);
  window.addEventListener('load', sync);
})();

// ── Nav fit: overflow links into "More", or collapse to the drawer ──
(function () {
  const nav    = document.querySelector('.nav-menu');
  const header = nav && nav.closest('header');
  const inner  = header && header.querySelector('.nav-inner');
  if (!header || !inner || !nav) return;

  const more = document.createElement('li');
  more.className = 'nav-more';
  more.hidden = true;
  more.innerHTML = '<button type="button" class="nav-more-btn" aria-expanded="false" aria-haspopup="true">More<svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true"><path d="M1.5 3.5 5 7l3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.4"/></svg></button><ul class="nav-more-menu" role="list"></ul>';
  nav.appendChild(more);
  const moreBtn  = more.querySelector('.nav-more-btn');
  const moreList = more.querySelector('.nav-more-menu');

  const setMore = (open) => { more.classList.toggle('open', open); moreBtn.setAttribute('aria-expanded', open); };
  moreBtn.addEventListener('click', (e) => { e.stopPropagation(); setMore(!more.classList.contains('open')); });
  document.addEventListener('click', (e) => { if (!more.contains(e.target)) setMore(false); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMore(false); });

  const overflowing = () => inner.scrollWidth > inner.clientWidth + 1 || nav.scrollWidth > nav.clientWidth + 1;
  const restore = () => {
    while (moreList.firstElementChild) nav.insertBefore(moreList.firstElementChild, more);
    more.hidden = true;
    moreBtn.classList.remove('active');
    setMore(false);
  };

  const fit = () => {
    header.classList.remove('nav-compact');
    restore();
    let compact = window.innerWidth <= 900;
    if (!compact && overflowing()) {
      more.hidden = false;
      const items = () => Array.from(nav.children).filter(li => li !== more);
      while (overflowing() && items().length > 3) {
        const list = items();
        moreList.insertBefore(list[list.length - 1], moreList.firstElementChild);
      }
      if (overflowing()) { restore(); compact = true; }
      moreBtn.classList.toggle('active', !!moreList.querySelector('a.active'));
    }
    header.classList.toggle('nav-compact', compact);
    if (!compact && nav.classList.contains('open')) {
      nav.classList.remove('open');
      header.classList.remove('menu-open');
      document.body.style.overflow = '';
    }
  };
  fit();
  window.addEventListener('resize', fit);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);
  window.addEventListener('load', fit);
})();

// ── Mobile Menu ─────────────────────────────────────────────
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const header = toggle && toggle.closest('header');
  const nav    = document.querySelector('.nav-menu');
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    if (header) header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  };

  toggle.addEventListener('click', () => setOpen(!nav.classList.contains('open')));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
})();

// ── Scroll Reveal ──────────────────────────────────────────
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
})();

// ── Smooth Parallax Hero ──────────────────────────────────
(function () {
  const hero = document.querySelector('.hero-image-wrap');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    hero.style.transform = `translateY(${y * 0.25}px)`;
  }, { passive: true });
})();
