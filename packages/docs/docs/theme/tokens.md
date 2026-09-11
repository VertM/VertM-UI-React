---
title: Design Tokens
order: 1
---

# Design Tokens

通过 `@vertm/tokens` 的 `createTheme` / `themeToCssVars` 生成 CSS 变量，由 `ConfigProvider` 注入。

## 色板预览

```tsx
import { createTheme, darkTheme, editorialTheme } from '@vertm/tokens';

const swatches = (theme: ReturnType<typeof createTheme>, name: string) => (
  <div key={name} style={{ marginBottom: 24, fontFamily: 'system-ui, sans-serif' }}>
    <h3 style={{ margin: '0 0 8px' }}>{name}</h3>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {[
        ['primary', theme.colorPrimary],
        ['info', theme.colorInfo],
        ['bgLayout', theme.colorBgLayout],
        ['bgContainer', theme.colorBgContainer],
        ['text', theme.colorText],
        ['border', theme.colorBorder],
      ].map(([label, color]) => (
        <div key={label} style={{ width: 88, textAlign: 'center', fontSize: 12 }}>
          <div
            style={{
              height: 40,
              borderRadius: 4,
              background: color,
              border: '1px solid #d6d3d1',
            }}
          />
          <div>{label}</div>
          <code>{color}</code>
        </div>
      ))}
    </div>
  </div>
);

export default () => (
  <div>
    {swatches(createTheme(), 'default')}
    {swatches(darkTheme, 'dark')}
    {swatches(editorialTheme, 'editorial')}
  </div>
);
```

## 常用 Token

| Token | 作用 |
|---|---|
| `colorPrimary` | 主色（Editorial 下为墨色 `#171a18`） |
| `colorInfo` | 信息/链接/caret（Editorial 下为钴蓝 `#2155d6`） |
| `colorBgLayout` / `colorBgContainer` | 布局与表面 |
| `borderRadius` | 圆角 |
| `columnSize` / `columnGap` | 竖排列宽与列距 |
