# Legant Wear

A responsive editorial website for a womenswear brand, showcasing style for the office, outings, beauty shows and parties. Warm campaign photography, oversized typography and restrained motion lead visitors into an occasion-based styling enquiry.

## Features

- Three-photo campaign cover with keyboard-accessible controls.
- Occasion selector updates campaign imagery, copy and the enquiry selection.
- Editorial lookbook with native modal photo viewers.
- Local enquiry preview, copy, text download and email draft.
- Responsive navigation, visible focus and reduced-motion support.
- Responsive WebP media and lazy loading below the hero.

## Technology

Vite, semantic HTML, CSS and vanilla JavaScript. GSAP/ScrollTrigger handle animation; Lenis is the sole smooth-scroll engine. Solar icons are selected locally through Iconify. Manrope, DM Sans and Italiana load through Google Fonts with fallback fonts.

## Local development

Use Node.js 22.12 or later and npm:

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. Build and preview the production output:

```sh
npm run build
npm run preview
```

## Project structure

```text
index.html                Semantic page, navigation, form and dialogs
src/main.js               Interactions, enquiry preparation and motion
src/style.css             Visual system and responsive layouts
src/icons.json            Selected Solar interface icons
public/media/             Campaign WebP assets in 800px/1600px sizes
public/favicon.svg        Original typographic brand mark
scripts/select-icons.mjs  Regenerates the selected icon subset
vercel.json               Deployment settings and security headers
SECURITY.md               Security review and maintenance guidance
```

## Enquiries

**hello@legantwear.example** is an intentionally non-deliverable sample address. The form prepares a request locally; it does not send email or store submissions. Visitors can copy or download the request, or open a draft in their email application.

Replace the address in `index.html` and `src/main.js` before real use. A live submission service needs server-side validation, abuse protection, privacy information and a CSP review. Never place delivery secrets in frontend code.

## Vercel deployment

Import this GitHub repository into Vercel. `vercel.json` selects Vite, runs `npm run build` and publishes `dist`. No environment variables are required. Section anchors need no SPA rewrite. Vercel's Git integration can automatically deploy pushes to the production branch.

## Assets and attribution

Campaign photography was supplied by the project owner and carries Kaymora credit. Original files and watermarks are preserved. These photos establish a campaign mood, not a catalogue of distinct garments. Confirm publishing rights with the photographer before reuse outside this project.

Source mapping: cover → KAY_0243; seated → KAY_0306; close → KAY_0186; profile → KAY_0325; smile → KAY_0316. Optimized assets are committed. Original archives and local design screenshots are ignored.

[Solar icons](https://github.com/480-Design/Solar-Icon-Set) are used under CC BY 4.0. Brand presentation, layout and copy are original; Playfolly informed high-level scale, contrast and pacing.

## Validation and limitations

Production build and dependency audit pass. Chrome and Edge checks covered campaign controls, occasions, required-field validation, dialog focus restoration and mobile navigation. The hero overlap was fixed and checked from 390px to 2560px widths.

The project is **not accessibility-certified**. Earlier findings about 320px enquiry-heading overflow, contrast, heading-label spacing and mobile-menu virtual-cursor isolation remain pending. Actual Narrator testing and Firefox/Safari coverage are also pending. Reduced-motion handling is implemented, but a full assistive-technology evaluation is outstanding.

Review [SECURITY.md](SECURITY.md) before adding integrations. Run `npm audit` periodically and verify the production build after dependency updates.

## Rights

No general redistribution licence is granted for brand content or campaign photography. Third-party libraries and assets retain their respective licences.
