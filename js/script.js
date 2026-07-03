// Inject shared header component
fetch('/components/header.html')
  .then((res) => {
    if (!res.ok) throw new Error(`Failed to load header: ${res.status}`);
    return res.text();
  })
  .then((html) => {
    const placeholder = document.getElementById('site-header');
    if (placeholder) placeholder.outerHTML = html;
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

document.addEventListener('DOMContentLoaded', () => {
  // Dropdown keyboard accessibility: close on Escape
  document.querySelectorAll('.nav-dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        toggle.setAttribute('aria-expanded', 'false');
        toggle.blur();
      }
    });
  });
});
