# VertM UI Design Lab

Independent, code-based design reference for VertM UI. This directory does not
modify or depend on the `VertM-UI-React` repository.

## Open

Open `index.html` directly in a browser. No build step or package installation is
required.

## Files

- `index.html`: semantic component specimens and interaction states
- `styles.css`: complete Vertical Editorial visual system and responsive rules
- `app.js`: Select, Menu, Tabs, counters, and Form interactions
- `DESIGN-SPEC.md`: implementation contract for reproducing the design in React
- `assets/NotoSansMongolian-400.woff2`: local Traditional Mongolian font

The prototype is intentionally framework-neutral. Cursor can translate each
specimen to the existing VertM React API while preserving the CSS tokens,
logical-axis behavior, and keyboard rules in `DESIGN-SPEC.md`.
