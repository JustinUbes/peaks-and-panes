# Changelog

## 2026-10-29

### Added
- "How Did You Hear About Us?" dropdown on the contact form (`contact.html`), with a "Please Specify" text field that appears when "Other" is selected. Responses are submitted alongside the existing fields to Formspree, where they appear in the notification email and can be exported as CSV from the Formspree dashboard.
- "Skip to main content" link at the top of every page (visible on keyboard focus) with a matching `id="main-content"` on each `<main>`.
- Accessibility Statement page (`accessibility.html`) describing our WCAG 2.1 AA commitment, known limitations, and how to report a barrier; linked from the footer and added to `sitemap.xml`.

### Changed (accessibility — WCAG 2.1 AA)
- Raised text contrast to at least 4.5:1 for footer copyright text, homepage numbered "kicker" badges, the About page eyebrow label, and "(optional)" form labels.
- Gallery images on the Windows and Doors pages are now wrapped in `<button>` elements so the lightbox can be opened by keyboard; the lightbox also keeps Tab focus on its close button while open.
- Added descriptive `title` attributes to the ProVia product catalog iframes.
- Hero banners and the homepage trust bar are now labelled landmark regions so screen-reader users navigating by landmark do not skip the page heading.
- Services dropdown: visibility is now driven by `aria-expanded` so the announced state always matches what is on screen; removed a double-toggle on Enter/Space; Escape from inside the menu returns focus to the Services button.

## 2026-10-19

### Added
- Window Replacement FAQ section on `services/windows.html`, below the ProVia product embed, with five expandable dropdowns (energy savings, insert vs. full-frame replacement, installation timeline, older/historic homes, window brands), plus `FAQPage` structured data.
- Subtle staggered fade-in on the homepage hero content (respects `prefers-reduced-motion`).

### Changed
- Rewrote the About page story copy with the owner's updated narrative (Telford roots, owner on every job, fair per-home pricing).
- Homepage hero: primary button now reads "Get Started"; larger headline, tighter tagline, and a lighter photo overlay so the banner shows through.
- Header navigation and hero headlines switched to Montserrat in pure white for improved readability; added the 800 weight to the Google Fonts request on all pages.
- Updated the Windows page meta description to reflect the new FAQ content.

## 2026-10-01

### Added
- Updated the homepage hero background to use the new fall banner artwork.
- Added a homepage customer reviews section featuring recent Google review feedback and a call-to-action to the Google listing.

## 2026-09-23

### Added
- Embedded ProVia door and window product galleries on the service pages for easier browsing and product comparison.

## 2026-08-26

### Added
- New Gutters service page (`services/gutters.html`) covering gutter cleaning and gutter installation.
- Gutters link added to the header Services dropdown, footer navigation, homepage services grid, and `sitemap.xml`.
