---
title: VertM UI
---

<div className="vertm-site-hero">
  <div className="say">
    <h1>竖排蒙古文,<br />一等公民的<br />React 组件库</h1>
    <p>
      CSS-native 竖排渲染,不靠旋转。列式几何、逻辑轴键盘、block-end 焦点标记,45+ 组件,API 贴近 Ant
      Design。让一列蒙古文,写得像一行英文一样自然。
    </p>
    <div className="cta">
      <a className="btn gilt" href="/VertM-UI-React/guide/getting-started">开始使用</a>
      <a className="btn ghost" href="/VertM-UI-React/components">浏览组件</a>
    </div>
    <div className="facts">
      <div className="fact"><div className="n">45+</div><div className="l">组件</div></div>
      <div className="fact"><div className="n">9</div><div className="l">套主题</div></div>
      <div className="fact"><div className="n">2</div><div className="l">种书写</div></div>
    </div>
  </div>
  <div className="forest" aria-hidden="true">
    <div className="col small s1">ᠮᠥᠷ</div>
    <div className="col title">ᠮᠣᠩᠭᠣᠯ ᠪᠢᠴᠢᠭ</div>
    <div className="col caret">ᠪᠢᠴᠢᠬᠦ<span className="c"></span></div>
    <div className="col small s2">ᠦᠰᠦᠭ</div>
  </div>
</div>

```tsx
/**
 * inline: true
 */
import HomeBands from '../src/components/HomeBands';

export default () => <HomeBands />;
```
