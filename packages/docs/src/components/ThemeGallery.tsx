import { useMemo, useState, type CSSProperties } from 'react';
import {
  amberTheme,
  cinnabarTheme,
  createTheme,
  darkTheme,
  editorialTheme,
  frostTheme,
  slateTheme,
  steppeTheme,
  cobaltTheme,
  type VertMTheme,
} from '@vertm/tokens';
import { useSiteControls, type SiteThemeId } from './SiteContext';

type GalleryItem = {
  id: SiteThemeId;
  name: string;
  latin: string;
  theme: VertMTheme;
  meta: string[];
};

const GALLERY: GalleryItem[] = [
  {
    id: 'cobalt',
    name: '钴蓝',
    latin: 'Cobalt',
    theme: cobaltTheme,
    meta: ['radius 6', 'column 32', 'gap 16'],
  },
  {
    id: 'editorial',
    name: '墨',
    latin: 'Editorial',
    theme: editorialTheme,
    meta: ['radius 3', 'column 40', 'shadow none'],
  },
  {
    id: 'dark',
    name: '夜',
    latin: 'Nocturne',
    theme: darkTheme,
    meta: ['radius 6', 'dark surface', 'column 32'],
  },
  {
    id: 'cinnabar',
    name: '朱砂',
    latin: 'Cinnabar · 新',
    theme: cinnabarTheme,
    meta: ['radius 4', 'warm paper', 'column 36'],
  },
  {
    id: 'steppe',
    name: '草原',
    latin: 'Steppe · 新',
    theme: steppeTheme,
    meta: ['radius 6', 'column 32', 'gap 16'],
  },
  {
    id: 'amber',
    name: '鎏金',
    latin: 'Amber · 新',
    theme: amberTheme,
    meta: ['radius 6', 'column 32', 'gap 16'],
  },
  {
    id: 'slate',
    name: '黛青',
    latin: 'Slate · 新',
    theme: slateTheme,
    meta: ['radius 6', 'column 32', 'gap 16'],
  },
  {
    id: 'frost',
    name: '霜',
    latin: 'Frost · 新',
    theme: frostTheme,
    meta: ['radius 8', 'column 32', 'gap 16'],
  },
  {
    id: 'default',
    name: 'Default',
    latin: 'createTheme()',
    theme: createTheme(),
    meta: ['radius 6', 'legacy blue', 'column 32'],
  },
];

const PRIMARIES = ['#0e2f74', '#b23b2e', '#2e6b4f', '#a26a1f', '#2f5b66', '#2155d6', '#171a18'];

function cardVars(theme: VertMTheme): CSSProperties {
  return {
    ['--p' as string]: theme.colorPrimary,
    ['--bg' as string]: theme.colorBgContainer,
    ['--layout' as string]: theme.colorBgLayout,
    ['--sub' as string]: theme.colorTextSecondary,
    ['--rad' as string]: `${theme.borderRadius}px`,
  };
}

/** Theme gallery — class names match design/mockups/theme-page.html under .vertm-theme-page */
export function ThemeGallery() {
  const { themeId, setThemeId } = useSiteControls();
  const [primary, setPrimary] = useState('#0e2f74');
  const [columnSize, setColumnSize] = useState(32);
  const [columnGap, setColumnGap] = useState(16);
  const [borderRadius, setBorderRadius] = useState(6);

  const roles = useMemo(() => {
    const t = cobaltTheme;
    return [
      { name: 'Primary 主色', hex: t.colorPrimary },
      { name: 'Success 成功', hex: t.colorSuccess },
      { name: 'Warning 警告', hex: t.colorWarning },
      { name: 'Error 错误', hex: t.colorError },
      { name: 'Info 信息', hex: t.colorInfo },
    ];
  }, []);

  const code = `import { VertMConfigProvider, createTheme } from '@vertm/react';

const theme = createTheme({
  colorPrimary: '${primary}',
  borderRadius: ${borderRadius},
  vertical: {
    columnSize: ${columnSize},
    columnGap: ${columnGap},
  },
});

<VertMConfigProvider theme={theme}>
  {/* … */}
</VertMConfigProvider>`;

  return (
    <div className="vertm-theme-page">
      <div className="phead">
        <h1>主题</h1>
        <span className="mn" lang="mn-Mong">
          ᠥᠩᠭᠡ
        </span>
      </div>
      <p className="pdesc">
        语义化 token，一处切换全站。API 对齐 antd ConfigProvider，并扩展竖排专属 vertical.* 字段。预设见
        docs/theme-presets.md。
      </p>

      <h2 className="sec">
        <i />
        语义色角色 <span>Semantic roles · 钴蓝</span>
        <span className="rule" />
      </h2>
      <div className="roles">
        {roles.map((r) => (
          <div key={r.name} className="role">
            <div className="bar" style={{ background: r.hex }} />
            <div className="b">
              <div className="rn">{r.name}</div>
              <div className="hx">{r.hex}</div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="sec">
        <i />
        内置主题 <span>presets</span>
        <span className="rule" />
      </h2>
      <div className="gal">
        {GALLERY.map((item) => {
          const cur = themeId === item.id;
          const t = item.theme;
          return (
            <button
              key={item.id}
              type="button"
              className={cur ? 'tcard cur' : 'tcard'}
              style={cardVars(t)}
              onClick={() => setThemeId(item.id)}
              aria-pressed={cur}
            >
              <div className="h">
                <span className="dot" />
                <span className="nm">{item.name}</span>
                <span className="lt">{item.latin}</span>
                {cur && <span className="cur-tag">当前</span>}
              </div>
              <div className="tstage" aria-hidden>
                <span className="tb">ᠲᠣᠪᠴᠢ</span>
                <span className="tf">ᠪᠢᠴᠢᠭ</span>
                <span className="tt">ᠰᠢᠨᠡ</span>
              </div>
              <div className="tsw">
                <span className="s" style={{ background: t.colorPrimary }} />
                <span className="s" style={{ background: t.colorSuccess }} />
                <span className="s" style={{ background: t.colorWarning }} />
                <span className="s" style={{ background: t.colorError }} />
                <span className="s" style={{ background: t.colorInfo }} />
                <span className="hx">{t.colorPrimary}</span>
              </div>
              <div className="tmeta">
                {item.meta.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      <h2 className="sec">
        <i />
        自定义 <span>ConfigProvider</span>
        <span className="rule" />
      </h2>
      <div className="custom">
        <div className="knobs">
          <div className="kl">colorPrimary</div>
          <div className="primset">
            {PRIMARIES.map((c) => (
              <button
                key={c}
                type="button"
                className={primary === c ? 'pd on' : 'pd'}
                style={{ background: c }}
                aria-label={c}
                onClick={() => setPrimary(c)}
              />
            ))}
          </div>
          <label className="kl">
            columnSize
            <div className="slider">
              <input
                type="range"
                min={24}
                max={48}
                value={columnSize}
                onChange={(e) => setColumnSize(Number(e.target.value))}
              />
              <span className="kv">{columnSize}</span>
            </div>
          </label>
          <label className="kl">
            columnGap
            <div className="slider">
              <input
                type="range"
                min={8}
                max={28}
                value={columnGap}
                onChange={(e) => setColumnGap(Number(e.target.value))}
              />
              <span className="kv">{columnGap}</span>
            </div>
          </label>
          <label className="kl">
            borderRadius
            <div className="slider">
              <input
                type="range"
                min={0}
                max={12}
                value={borderRadius}
                onChange={(e) => setBorderRadius(Number(e.target.value))}
              />
              <span className="kv">{borderRadius}</span>
            </div>
          </label>
        </div>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default ThemeGallery;
