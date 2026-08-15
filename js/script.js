const setDropdownExpanded = (toggle, expanded) => {
  toggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
};

const normalizePath = (path) => {
  if (!path || path === '/') return '/index.html';
  return path.endsWith('/') ? `${path}index.html` : path;
};

const initActiveNavState = () => {
  const currentPath = normalizePath(window.location.pathname);

  document.querySelectorAll('.site-nav a[aria-current="page"]').forEach((link) => {
    link.removeAttribute('aria-current');
  });

  const navLinks = document.querySelectorAll('.site-nav a[href]');
  navLinks.forEach((link) => {
    const linkPath = normalizePath(new URL(link.href, window.location.origin).pathname);
    if (linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
};

const initNavInteractions = () => {
  const dropdowns = document.querySelectorAll('.nav-dropdown');
  if (!dropdowns.length) return;

  dropdowns.forEach((dropdown) => {
    if (dropdown.dataset.navReady === 'true') return;

    const toggle = dropdown.querySelector('.nav-dropdown-toggle');
    if (!toggle) return;

    dropdown.dataset.navReady = 'true';
    setDropdownExpanded(toggle, false);

    dropdown.addEventListener('mouseenter', () => setDropdownExpanded(toggle, true));
    dropdown.addEventListener('mouseleave', () => setDropdownExpanded(toggle, false));
    dropdown.addEventListener('focusin', () => setDropdownExpanded(toggle, true));
    dropdown.addEventListener('focusout', (event) => {
      if (!dropdown.contains(event.relatedTarget)) {
        setDropdownExpanded(toggle, false);
      }
    });

    toggle.addEventListener('click', (event) => {
      event.preventDefault();
      const nextState = toggle.getAttribute('aria-expanded') !== 'true';
      setDropdownExpanded(toggle, nextState);
    });

    toggle.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        const nextState = toggle.getAttribute('aria-expanded') !== 'true';
        setDropdownExpanded(toggle, nextState);
      }

      if (event.key === 'Escape') {
        setDropdownExpanded(toggle, false);
        toggle.blur();
      }
    });
  });

  if (document.body.dataset.navGlobalReady === 'true') return;
  document.body.dataset.navGlobalReady = 'true';

  document.addEventListener('click', (event) => {
    document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        if (toggle) setDropdownExpanded(toggle, false);
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;

    document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
      setDropdownExpanded(toggle, false);
    });
  });
};

// Inject shared header component
fetch('/components/header.html')
  .then((res) => {
    if (!res.ok) throw new Error(`Failed to load header: ${res.status}`);
    return res.text();
  })
  .then((html) => {
    const placeholder = document.getElementById('site-header');
    if (placeholder) {
      placeholder.outerHTML = html;
      initNavInteractions();
      initActiveNavState();
    }
  })
  .catch((err) => console.error(err));

// Inject shared footer component
fetch('/components/footer.html')
  .then((res) => {
    if (!res.ok) throw new Error(`Failed to load footer: ${res.status}`);
    return res.text();
  })
  .then((html) => {
    const placeholder = document.getElementById('site-footer');
    if (placeholder) {
      placeholder.outerHTML = html;
      const yearEl = document.getElementById('footer-year');
      if (yearEl) yearEl.textContent = new Date().getFullYear();
    }
  })
  .catch((err) => console.error(err));

const initLightbox = () => {
  const images = document.querySelectorAll('.gallery-item img');
  if (!images.length) return;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.setAttribute('role', 'dialog');
  lightbox.setAttribute('aria-modal', 'true');
  lightbox.setAttribute('aria-label', 'Image viewer');
  lightbox.hidden = true;

  const img = document.createElement('img');
  img.className = 'lightbox-img';
  img.alt = '';

  const closeBtn = document.createElement('button');
  closeBtn.className = 'lightbox-close';
  closeBtn.setAttribute('aria-label', 'Close image viewer');
  closeBtn.textContent = '\u00d7';

  lightbox.appendChild(img);
  lightbox.appendChild(closeBtn);
  document.body.appendChild(lightbox);

  let triggerEl = null;

  const openLightbox = (source, alt, trigger) => {
    img.src = source;
    img.alt = alt;
    triggerEl = trigger;
    lightbox.hidden = false;
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeLightbox = () => {
    lightbox.hidden = true;
    img.src = '';
    document.body.style.overflow = '';
    if (triggerEl) triggerEl.focus();
    triggerEl = null;
  };

  images.forEach((image) => {
    image.addEventListener('click', () => openLightbox(image.src, image.alt, image));
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initNavInteractions();
  initActiveNavState();
  initLightbox();
});
