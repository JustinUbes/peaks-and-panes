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

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('ctaButton');

  if (button) {
    button.addEventListener('click', () => {
      alert('Thanks for checking out the starter site!');
    });
  }
});
