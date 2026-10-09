# Fieldbook verification · 9 October 2026

Release: `fieldbook-20261009-1`.

## Actual browser pixels

Six positions per major homepage scene, plus reverse scrolling, were captured at 320×568, 360×640, 390×844, 430×932, 768×1024, 1024×768, 1384×698, 1440×900, 1920×1080 and 844×390 landscape. All ten contact sheets were inspected. Portrait-phone notebook and collection scenes produced six distinct rendered states; the cover, question, career and close each visibly changed and resolved. Landscape uses moving flow instead of an overflowing pin. No horizontal overflow, failed requests or browser errors were recorded in the matrix.

The supplied ScrollCraft harness also captured desktop, phone and reduced-motion runs, finding no dead scroll. The full FFmpeg build produced the final desktop and phone contact sheets. The vendor engine JS and CSS match the supplied originals byte for byte. No video assets were needed.

## Interaction and accessibility

Passed checks: category arithmetic, Details / Connections / Insight replay, resume, saved project selection/removal, persistence after reload, notebook text download, selected-project conversation download, print PDF, chapter jumps, mobile chapter menu, Escape and focus return, focus on offscreen project controls, orientation changes, stable geometry after a small toolbar-height change, shared motion choice on case-study navigation, system reduced-motion emulation, no-JavaScript reading, corrupted or blocked local storage, and device-diagnostic rendered-state reporting.

Native touch emulation advanced the notebook 653 px and changed its rendered state. This is simulated touch input, not a physical device result.

All three case studies were inspected at 320, 390 and 1440 px widths. Each page mounts one engine; its six section beats respond to scrolling, while body paragraphs stay stable. Their categorization, validation/deduplication and human-review diagrams are explanatory sketches.

Automated WCAG 2 A/AA and 2.1 AA audits passed in twelve page/device combinations, with no sub-44 px controls in the audited layouts. A later matrix pass found a missing role on the transaction group's ARIA label; it was corrected. A subsequent seven-state notebook / collection / closing audit found no violations. Print's small width was enlarged to 44 px. Automated checks are supplemented by composited screenshot inspection; the generic ScrollCraft cue-contrast report has no cue samples for these bespoke DOM scenes, so it is not claimed as a contrast proof.

Five HTML pages, 76 local references, anchors and release-coordinator references pass the portable static check. The final archive is checked separately before publication.

## Observed feel

Designer observation: curiosity → anticipation → clarity/delight → confidence → recognition → warmth. The notebook has the largest visual transformation and longest span. The quiet question creates contrast, and the ending holds the complete card. This is a design assessment, not a user-study finding.

## Remaining device limit

No physical iPhone or Android device was available. Real Safari/Chrome touch behavior, device accessibility settings and browser toolbar behavior remain to be confirmed on those devices. The deployed diagnostic can supply that evidence; no physical-device resolution is claimed from headless results.
