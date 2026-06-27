---
name: style-reference
description: 'Review code for style, security, performance, and maintainability issues. Reference websites to get an idea of the styles we are trying to accomplish. Use when : reviewing a file, auditing changes, checking a diff, code review, pre-merge review, finding issues in code, OWASP, security audit.'
---

When reviewing code or generating code, it is important to follow a consistent style and adhere to best practices. 

## Business Context

Peaks and Panes is a roofing, siding, windows, and doors company based in Montgomery County, Pennsylvania. The website targets homeowners seeking contractors for exterior home improvement projects. Tone should be professional, trustworthy, and locally focused. Content should emphasize quality craftsmanship, local expertise, and ease of contacting the company for quotes.

## Style Reference Sites

Here are two websites belonging to similar companies that can serve as references for the style and design we are trying to achieve:
https://fouldsroofing.com/
https://qekeystoneroofing.com/

## Project Design Tokens

These values are defined in `css/styles.css` and must be used consistently across all pages:

- **Cobalt blue** (primary brand): `#1a45b0` — logo, nav links, headings
- **Orange accent** (CTA / highlights): `#f5821e` — buttons, hover states, header border, footer link hover
- **Near-black** (body text): `#111827`
- **Background**: `#f8fafc`
- **Header background**: `#111827` (dark navy — use transparent logo `assets/icons/peakspanes-removebg-preview.png`)
- **Footer / hero dark**: `#111827`
- **Hero gradient**: `linear-gradient(135deg, #111827 0%, #1a45b0 100%)`
- **Font family (body)**: `'Open Sans', Arial, sans-serif`
- **Font family (headings / logo)**: `'Montserrat', Arial, sans-serif`
- **Container max-width**: `960px` (via `width: min(90%, 960px)`)
- **Border radius (buttons/cards)**: `6px`

Colors are derived directly from the brand logo at `assets/icons/logo.png`. Do not introduce new color values without updating this token list.

## File & Asset Conventions

- All CSS lives in `css/styles.css` — do not use inline styles or `<style>` blocks in HTML files.
- All JavaScript lives in `js/script.js` — do not embed `<script>` blocks in HTML files.
- Images go in `assets/images/`, icons in `assets/icons/`.
- The `<script>` tag must remain at the bottom of `<body>` (before `</body>`), not in `<head>`.
- Always include `alt` attributes on `<img>` elements; use descriptive text for content images and `alt=""` for decorative ones.

## HTML Standards

Reference the HTML spec to ensure code follows correct HTML standards:
https://html.spec.whatwg.org/multipage/

HTML best practices:
https://github.com/hail2u/html-best-practices
https://www.w3schools.com/html/html5_syntax.asp

- Every page must include `<!DOCTYPE html>`, `<html lang="en">`, `<meta charset="UTF-8">`, and `<meta name="viewport" content="width=device-width, initial-scale=1.0">`.
- Use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) rather than generic `<div>` wrappers.
- Headings must follow a logical hierarchy (one `<h1>` per page, then `<h2>`, `<h3>`, etc.).

## CSS Best Practices

- Use `box-sizing: border-box` (already set globally via `* { box-sizing: border-box; }`).
- Prefer CSS custom properties (`var(--name)`) for repeated values to keep styles maintainable.
- Use relative units (`rem`, `em`, `%`, `vw/vh`) over fixed `px` for font sizes and spacing where possible.
- Write mobile-first CSS: base styles apply to small screens and `@media (min-width: ...)` overrides apply to larger breakpoints.
- Reference: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting

## JavaScript Best Practices

- All DOM interaction must be wrapped in a `DOMContentLoaded` listener (already established in `js/script.js`).
- Use `const` and `let`; never use `var`.
- Always null-check element references before calling methods on them (e.g., `if (el) { ... }`).
- Do not use `eval()`, `innerHTML` with user-supplied data, or `document.write()`.
- Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide

## Accessibility (WCAG 2.1 AA)

All code must meet WCAG 2.1 Level AA. Key requirements:
- Color contrast ratio: at minimum 4.5:1 for normal text, 3:1 for large text.
- All interactive elements must be keyboard-accessible and have visible focus indicators.
- Use `aria-label` or `aria-labelledby` where the visible text label is insufficient.
- Forms must associate `<label>` elements with inputs using matching `for`/`id` attributes.
- Reference: https://www.w3.org/WAI/WCAG21/quickref/

## SEO Best Practices

Every page should include:
- A unique, descriptive `<title>` tag (50–60 characters).
- A `<meta name="description">` tag (150–160 characters).
- Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`) for social sharing.
- Structured data (JSON-LD) using `LocalBusiness` schema for the company's contact info, address, and service area.
- Reference: https://developers.google.com/search/docs/fundamentals/seo-starter-guide

## Security (OWASP Top 10)

Make sure that the code follows the OWASP Top 10 security guidelines:
https://owasp.org/www-project-top-ten/

Key rules for this static site:
- Never render user-supplied input directly into the DOM via `innerHTML`; use `textContent` instead.
- Sanitize and validate any form inputs on the client side before submission.
- Do not store sensitive data (API keys, credentials) in client-side JavaScript or HTML.
- Ensure any third-party scripts are loaded from trusted CDNs with Subresource Integrity (SRI) hashes.
- Use HTTPS-only resource URLs; never mix HTTP and HTTPS content.

## Performance

- Compress and serve images in modern formats (WebP preferred, with JPEG/PNG fallback via `<picture>`).
- Lazy-load below-the-fold images with `loading="lazy"`.
- Minimize render-blocking resources: CSS in `<head>`, scripts deferred at bottom of `<body>`.
- Aim for a Lighthouse performance score ≥ 90 on mobile.
- Reference: https://web.dev/performance/
