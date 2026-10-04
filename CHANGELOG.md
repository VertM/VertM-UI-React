# Changelog

All notable changes to VertM UI are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-10-04

### Added

- `@vertm/core/dom` subpath for browser-dependent helpers (`caret-mapper`, font detect, vertical support, viewport, menu focus, focus trap, `registerFont`).
- `@vertm/icons/definitions` subpath with framework-agnostic SVG path data and `shouldRotateIcon`.
- `@vertm/core` shared logic exports: overlay placement (`computeOverlayPosition`, `resolveDefaultPlacement`), list navigation (`stepEnabledIndex`), keyboard contract (`resolveSelectKey` / Menu / Tabs / Field), field math, Select selection helpers, `createFormStore` (with configurable validate messages), toast queue, and utils (`buildPageList`, `formatCountdown` / `formatFixed`, grid gutter/span, splitter ratio, breakpoints, `stripNonPrintableAscii`).
- Docs iteration 1: global sticky theme/writing-mode switcher with localStorage persistence; `VertMDemoFrame` forceTheme/forceWritingMode overrides.
- Full documentation site component coverage (guides, core demos, theme swatches, all major `@vertm/react` / `@vertm/icons` pages, imperative App/message/notification/Modal docs).
- Documentation site scaffold (`@vertm/docs`, dumi 2) with guide / core / theme pages and component sample docs.
- `appearance="editorial"` preset theme and structural skin.
- `WritingMode` now includes `horizontal-tb` for docs / preview toggles.

### Changed

- Logic previously embedded in `@vertm/react` (overlay defaults, keyboard handling, TextField column/scroll/selection math, Form store, Message/Notification queues, assorted utils) now binds thinly to `@vertm/core`; public React APIs unchanged.
- `message` / `notification`：手动 `destroy` 现在会清除自动关闭计时器，`onClose` 只在自动到时关闭时触发（此前手动关闭后，计时器到期仍会触发一次 `onClose`）。
- Docs iteration 1 continued: thickened every component page (≥8 demos, 何时使用, theme vars), added components overview, design-specs/FAQ/antd-migration/a11y guides; global sticky theme/writing-mode switcher with localStorage; Chinese JSDoc for API tables.
- Component doc pages aligned to a locked template (基本用法 → 能力小节 → 竖排提示 → API); Chinese JSDoc on exported Props for API table descriptions.

## [0.1.0] - 2026-07-12

### Added

- Initial public packages: `@vertm/react`, `@vertm/core`, `@vertm/tokens`, `@vertm/styles`, `@vertm/icons`, `@vertm/wasm`.
