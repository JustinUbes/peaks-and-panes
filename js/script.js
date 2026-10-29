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
      // With a hover-capable pointer the menu is already open from mouseenter,
      // so a mouse click should keep it open rather than collapse it.
      // Keyboard-triggered clicks (detail === 0) and touch taps toggle normally.
      const isMouseClick = event.detail > 0 && window.matchMedia('(hover: hover)').matches;
      const nextState = isMouseClick || toggle.getAttribute('aria-expanded') !== 'true';
      setDropdownExpanded(toggle, nextState);
    });

    // Enter/Space already trigger a native click on <button>, so only Escape needs handling here
    toggle.addEventListener('keydown', (event) => {
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

    document.querySelectorAll('.nav-dropdown').forEach((dropdown) => {
      const toggle = dropdown.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;
      // Return focus to the toggle if it was inside the menu, so it isn't lost on a hidden link.
      // focus() synchronously fires focusin (which re-opens), so collapse again afterwards.
      const focusWasInMenu = dropdown.contains(document.activeElement) && document.activeElement !== toggle;
      if (focusWasInMenu) toggle.focus();
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
  const triggers = document.querySelectorAll('.gallery-item .gallery-button');
  if (!triggers.length) return;

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

  triggers.forEach((trigger) => {
    const image = trigger.querySelector('img');
    if (!image) return;
    trigger.addEventListener('click', () => openLightbox(image.src, image.alt, trigger));
  });

  closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  // The close button is the only focusable element, so keep Tab from escaping the dialog
  lightbox.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      closeBtn.focus();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
};

const initFaqAccordion = () => {
  document.querySelectorAll('.faq-list').forEach((list) => {
    const items = list.querySelectorAll('details.faq-item');
    items.forEach((item) => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        items.forEach((other) => {
          if (other !== item) other.open = false;
        });
      });
    });
  });
};

const initReferralSource = () => {
  const select = document.getElementById('referral-source');
  const otherGroup = document.getElementById('referral-other-group');
  const otherInput = document.getElementById('referral-other');
  if (!select || !otherGroup || !otherInput) return;

  const syncOtherField = () => {
    const isOther = select.value === 'Other';
    otherGroup.hidden = !isOther;
    otherInput.required = isOther;
    if (!isOther) otherInput.value = '';
  };

  select.addEventListener('change', syncOtherField);
  syncOtherField();
};

document.addEventListener('DOMContentLoaded', () => {
  initNavInteractions();
  initActiveNavState();
  initLightbox();
  initFaqAccordion();
  initReferralSource();
});
