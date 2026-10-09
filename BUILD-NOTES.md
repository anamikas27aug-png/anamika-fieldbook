# Anamika Singh · analyst fieldbook

The portfolio is a soft rose, lilac, sage and berry fieldbook built around a complete scroll narrative on phones, tablets and desktops. It uses Anamika's real portrait and the established evidence-based copy.

## Experience and editing

A layered cover opens into a short practical question. The clarity notebook transforms six scattered notes into category connections, folding paper strips and a computed insight. The notebook spans 4.4 viewport heights on desktop and 4.6 on phones. Three project specimens pan laterally over 3.4 / 3.2 viewport heights. Career connections draw a path through real experience; the ending assembles the visitor's saved project notes and chosen sample insight into a conversation starter.

Edit `dist/index.html`, `dist/work/*/index.html`, `dist/assets/fieldbook.css` and `dist/assets/fieldbook.js`. The vendor engine in `dist/assets/vendor/` is unchanged and mounts once per page. No build or dependency installation is required to serve `dist/`. Font files and licenses are bundled. `node scripts/check-static.mjs` checks local destinations and release references; `node --check dist/assets/fieldbook.js` checks syntax.

## Responsive motion and preferences

Width changes the composition without disabling motion. Below 520 px viewport height, authored moving flow replaces the pins. Stable pixel spans prevent a phone toolbar change from shortening a scene. Orientation, meaningful resizing, fonts and images trigger geometry updates. Offscreen custom painting pauses. Native scrolling and keyboard focus remain available.

New visitors start with motion on unless their device requests reduced motion. The existing `anamika-motion` choice is honored across the homepage and all three case studies. Reading mode resolves the content and removes unused pin space; no-JavaScript mode exposes all three projects, transactions and the chart.

## Fieldnotes and useful actions

“Save to my fieldnotes” stores only supported project identifiers and a sample category in `anamika-fieldnotes` on the visitor's device. The closing card contains selected project descriptions and a computed sample insight. Visitors can remove selections, download a text conversation starter, print the card, or download the full notebook note. There is no backend or contact form. Contact goes to the existing LinkedIn profile.

## Content limits

The repositories are private and were not inspected. Project diagrams are explicitly explanatory sketches, and the notebook contains six synthetic transactions totaling ₹12,000. Essentials ₹7,200 / 60%; Lifestyle ₹3,000 / 25%; Subscriptions ₹1,800 / 15%. No project recordings, invented performance metrics, testimonials, proficiency scores, email address or résumé download are claimed.

## Device evidence

`device-diag.html` is a no-index page that reports the loaded release, saved and system motion preferences, scrolling, animation-frame activity, scene geometry and actual rendered state changes. Reports stay on the device. Physical iPhone Safari and Android Chrome testing was unavailable; the diagnostic is supplied for that evidence and does not transmit telemetry.

See `SCROLL-DIRECTION.md` for the brief, feeling curve and score, `FINGERPRINT-COMPARISON.md` for the structural comparison, and `VERIFICATION.md` for checked behavior and limitations.
