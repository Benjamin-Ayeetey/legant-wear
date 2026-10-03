# Security

This static site has no accounts, database, payment flow or server-side form endpoint. Enquiries are prepared in memory and exported only when visitors choose copy, download or email draft. The sample address does not receive mail.

## Review — 3 October 2026

- npm audit returned zero known vulnerabilities. This point-in-time check is not a guarantee against undisclosed issues.
- Visitor input is rendered with `textContent` and encoded in email draft URLs; it is not inserted into HTML or executed. SVG and heading `innerHTML` uses are confined to repository-owned content.
- Enquiry controls remain disabled until their handler is installed. The form uses `method="dialog"` to prevent a native GET submission without JavaScript. Vercel also denies form navigation through `form-action 'none'`.
- Vercel headers restrict script sources, embedding, object content, permissions and referrers. Inline styles remain allowed for GSAP animation; inline scripts are prohibited.
- No credentials were found in reviewed project source. Environment files, deployment metadata, screenshots and original image archives are ignored by Git.
- Google Fonts is the only intended third-party runtime request. No analytics or tracking scripts are included.

## Live submissions

Before adding delivery, implement server-side validation, request-size limits, abuse protection and privacy information. Keep credentials server-side: `VITE_` variables are public in the browser bundle. Review CSP when adding an endpoint.

## Reporting

Report suspected issues privately to the repository owner through GitHub. Do not include visitor data or credentials in public issues. This review is source/dependency hardening, not an independent penetration test or accessibility certification.
