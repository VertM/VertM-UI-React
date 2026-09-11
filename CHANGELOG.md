# Changelog

All notable changes to VertM UI are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Docs iteration 1: global sticky theme/writing-mode switcher with localStorage persistence; `VertMDemoFrame` forceTheme/forceWritingMode overrides.
- Full documentation site component coverage (guides, core demos, theme swatches, all major `@vertm/react` / `@vertm/icons` pages, imperative App/message/notification/Modal docs).
- Documentation site scaffold (`@vertm/docs`, dumi 2) with guide / core / theme pages and component sample docs.
- `appearance="editorial"` preset theme and structural skin.
- `WritingMode` now includes `horizontal-tb` for docs / preview toggles.

### Changed

- Component doc pages aligned to a locked template (基本用法 → 能力小节 → 竖排提示 → API); Chinese JSDoc on exported Props for API table descriptions.

## [0.1.0] - 2026-07-12

### Added

- Initial public packages: `@vertm/react`, `@vertm/core`, `@vertm/tokens`, `@vertm/styles`, `@vertm/icons`, `@vertm/wasm`.
