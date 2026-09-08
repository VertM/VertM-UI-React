# VertM UI Vertical Editorial Design Specification

## 1. Purpose

This is a behavioral and visual reference, not a replacement implementation.
Ant Design may be used as a checklist for component coverage, state completeness,
accessibility, and API quality. Its component silhouettes and visual styling are
not the design source.

The source of truth for VertM interaction is Traditional Mongolian writing:

- writing mode: `vertical-lr`
- inline progression: top to bottom
- block progression: left to right
- new content columns appear at block-end, physically to the right

Every directional decision must be expressed through logical axes first and
mapped to physical directions second.

## 2. Design Principles

### Native vertical geometry

Components are designed as columns. Do not rotate a horizontal component shell.
Use narrow block size, deliberate inline depth, and stable column gaps.

### Column-edge state

Selected and focused states use a 3px marker on the block-end edge. Large tinted
background fills are secondary feedback only. The marker connects selection to
the direction in which content advances.

### Progressive reveal

Menus, Select popovers, Cascader levels, nested panels, validation help, and
additional content reveal at block-end. Under `vertical-lr`, this means opening
to the right whenever space permits.

### Mixed-content integrity

Traditional Mongolian uses `text-orientation: mixed`. Latin text, numbers,
shortcuts, and code must remain readable. Do not rotate the entire application.
Apply writing mode to text-bearing component layers only.

### Cultural identity through structure

The product identity comes from column rhythm, writing flow, typography, and
interaction. Avoid decorative cultural motifs, imitation paper textures, and
ornament inside general-purpose controls.

## 3. Foundation Tokens

```css
:root {
  --vm-paper: #f3f1ea;
  --vm-surface: #fbfaf6;
  --vm-ink: #171a18;
  --vm-muted: #686b66;
  --vm-line: #c8c6bd;
  --vm-line-soft: #dedcd4;
  --vm-cobalt: #2155d6;
  --vm-cobalt-soft: #e8edfb;
  --vm-vermilion: #d84a32;
  --vm-green: #247a55;
  --vm-disabled: #a9aaa5;
  --vm-column: 40px;
  --vm-column-gap: 12px;
  --vm-radius: 3px;
}
```

The base column is 40px. Interactive shells may use 48px or 56px where icons,
selection controls, or touch targets require more space. Keep the text column
centered within that shell.

## 4. Direction Contract

| Semantic action | Physical mapping in `vertical-lr` |
| --- | --- |
| inline-start | top |
| inline-end | bottom |
| block-start | left |
| block-end | right |
| previous character/item | ArrowUp |
| next character/item | ArrowDown |
| previous column/level | ArrowLeft |
| next column/level | ArrowRight |

Use CSS logical properties in production: `padding-inline`, `padding-block`,
`border-block-end`, `inset-block-end`, and logical placement helpers. Physical
properties in the prototype make the fixed `vertical-lr` reference easier to
inspect, but production components must not hardcode them internally.

## 5. Components

### Button

- Default shell: 48px wide, minimum 160px inline depth in the reference scale.
- Text reads top to bottom.
- Leading icon sits at inline-start; loading and completion state may sit at
  inline-end.
- Hover/focus reveals a short block-end edge marker.
- Primary is ink-filled, not brand-blue filled. Cobalt is reserved for active
  direction and focus.
- Never rotate horizontal button text or put a flex layout on the same element
  that owns `writing-mode`.

### Input and TextArea

- Single-column input begins at 56px wide.
- Multicolumn input expands toward block-end until `maxColumns`, then scrolls on
  the block axis.
- Caret progression follows ArrowUp/ArrowDown within a column.
- `Enter` creates or advances content according to the field's multiline model.
- Focus is border reinforcement plus a 3px block-end edge marker.
- Label is located at block-start. Counter, help, and error are at block-end or
  below the logical field group without covering text.
- Resize, when enabled, is horizontal in the default writing mode.

### Select

- Trigger is a vertical field column.
- Popover opens at block-end (`rightTop` in fixed placement terminology).
- Options are adjacent vertical columns in one horizontal list.
- ArrowUp/ArrowDown navigates the current reading sequence.
- ArrowRight may commit and advance when Select participates in a form workflow.
- Selected option uses a block-end marker and optional low-contrast cobalt tint.

### Radio and Checkbox

- Native control is placed at inline-start, physically above the label.
- The label remains vertical.
- Option groups progress on the block axis from left to right.
- Maintain a minimum 40px interactive column even when the visible control is
  16-18px.

### Menu

- Root items are vertical columns arranged from left to right.
- Current item uses a block-end marker rather than a full filled background.
- Submenu reveals to the right and remains visually connected to its parent edge.
- ArrowDown/ArrowUp moves within a level. ArrowRight enters a submenu. ArrowLeft
  returns to the parent level.

### Tabs

- Tab labels are columns arranged from left to right.
- Active marker is placed at the tab's block-end edge.
- Content appears at block-end of the tab list.
- ArrowRight/ArrowLeft changes tabs because tabs represent peer columns.
- Do not use ArrowDown merely because the glyphs themselves read downward.

### Form

- A form is a block-axis sequence of field columns.
- Label precedes the field at block-start.
- Help and validation occupy block-end.
- The primary action follows the last field at form block-end.
- On narrow viewports, contain horizontal progression in the form viewport; do
  not rotate the complete page or shrink text below the readable size.

## 6. State Language

- default: neutral line and surface
- hover: stronger neutral line
- focus/selected: cobalt block-end marker plus strong neutral border
- error: vermilion border and block-end message
- success: green textual confirmation; do not fill the whole component
- disabled: neutral disabled tone, no shadow, no movement

Color is never the only state signal. Marker position, border strength, native
control state, labels, and ARIA state accompany color.

## 7. Motion

- Edge-marker reveal: 140-160ms
- Popover: 160-200ms, entering from block-start toward block-end
- No looping animation in controls
- Respect `prefers-reduced-motion`
- Motion must reinforce column direction, not imitate generic vertical dropdowns

## 8. Accessibility

- Use native `button`, `textarea`, `input`, radio, and checkbox elements.
- Keep focus outlines visible in addition to the editorial edge marker.
- Apply `aria-expanded`, `aria-selected`, `aria-invalid`, `role=listbox`, and
  tab roles as demonstrated in `index.html`.
- Preserve DOM order as the visual left-to-right column order.
- Validate screen reader output with mixed Traditional Mongolian and Latin text.
- Test at 200% zoom and at a 320px viewport without overlapping controls.

## 9. Cursor Reproduction Checklist

1. Read this file and inspect `index.html`, `styles.css`, and `app.js` together.
2. Map prototype tokens into `@vertm/tokens` without renaming component APIs.
3. Port one family at a time: Button, Field, Select, Menu, Tabs, Form.
4. Keep text-bearing layers separate from flex/grid shells.
5. Replace physical placements with logical-property helpers.
6. Implement keyboard tests for both inline and block axes.
7. Add visual regression fixtures for default, hover, focus, selected, disabled,
   and error states.
8. Compare the running React implementation against this prototype at desktop
   and mobile widths.

## 10. Non-Goals

- Matching Ant Design visual appearance
- Treating vertical writing as a CSS rotation
- Adding cultural ornament to every component
- Forcing all Latin-heavy data tables and developer tools into vertical text
- Replacing existing VertM component APIs solely for visual reasons
