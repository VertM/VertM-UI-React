const BASE = '/VertM-UI-React';

const PROVIDER = `import '@vertm/styles/index.css';
import { ConfigProvider } from '@vertm/react';

<ConfigProvider writingMode="vertical-lr">`;

const BUTTON = `<Button type="primary">ᠨᠡᠮᠡᠬᠦ</Button>`;

export function HomeBands() {
  return (
    <div className="vertm-home">
      <section className="band">
        <h2>
          <i />
          从这里开始
        </h2>
        <p className="lead">
          安装、写下第一列竖排文本，再按分组浏览组件与主题。顶栏可以实时切换主题和横竖书写。
        </p>
        <div className="cards">
          <a href={`${BASE}/guide/getting-started`}>
            <strong>快速开始</strong>
            <span>安装、配置，写下一列竖排文本</span>
            <em>5 分钟</em>
          </a>
          <a href={`${BASE}/components`}>
            <strong>组件总览</strong>
            <span>按分组看组件标本</span>
            <em>45+</em>
          </a>
          <a href={`${BASE}/theme`}>
            <strong>主题与外观</strong>
            <span>九套预设与自定义令牌</span>
            <em>presets</em>
          </a>
        </div>
      </section>

      <section className="band">
        <h2>
          <i />
          组件丰富，坚持自如
        </h2>
        <p className="lead">每一例都是竖排蒙古文的真实形态，不是旋转出来的插画。</p>
        <div className="stage">
          <a className="specimen" href={`${BASE}/components/select`}>
            <div className="cap">
              <b>Select</b>
              <span>选择器</span>
            </div>
            <div className="body">
              <span className="col field">ᠰᠣᠩᠭᠣᠬᠤ</span>
              <span className="col menu">
                <span>ᠨᠢᠭᠡ</span>
                <span className="on">ᠬᠣᠶᠠᠷ</span>
                <span>ᠡᠳᠦᠷ</span>
              </span>
            </div>
          </a>
          <a className="specimen" href={`${BASE}/components/menu`}>
            <div className="cap">
              <b>Menu</b>
              <span>菜单</span>
            </div>
            <div className="body">
              <span className="col menu">
                <span className="on">ᠴᠡᠰ</span>
                <span>ᠮᠡᠳᠡᠭᠡ</span>
              </span>
              <span className="col menu sub">
                <span>ᠨᠢᠭᠡ</span>
                <span>ᠬᠣᠶᠠᠷ</span>
              </span>
            </div>
          </a>
          <a className="specimen" href={`${BASE}/components/tabs`}>
            <div className="cap">
              <b>Tabs</b>
              <span>标签页</span>
            </div>
            <div className="body tabs">
              <span className="col tab on">ᠨᠢᠭᠡ</span>
              <span className="col tab">ᠬᠣᠶᠠᠷ</span>
            </div>
          </a>
        </div>
      </section>

      <section className="band">
        <h2>
          <i />
          快速开始 <span>Getting started</span>
        </h2>
        <p className="lead">三步：安装三个包，套上 ConfigProvider，写下一列蒙古文。</p>
        <ol className="steps">
          <li>
            <em>01</em>
            <strong>安装</strong>
            <pre>
              <code>npm i @vertm/react @vertm/styles @vertm/tokens</code>
            </pre>
          </li>
          <li>
            <em>02</em>
            <strong>套上 Provider</strong>
            <pre>
              <code>{PROVIDER}</code>
            </pre>
          </li>
          <li>
            <em>03</em>
            <strong>写一列</strong>
            <pre>
              <code>{BUTTON}</code>
            </pre>
          </li>
        </ol>
      </section>

      <section className="band">
        <h2>
          <i />
          设计语言与研发框架
        </h2>
        <div className="cards four">
          <a href={`${BASE}/guide/design-principles`}>
            <strong>设计原则</strong>
            <span>列式几何、逻辑轴、列缘状态</span>
          </a>
          <a href={`${BASE}/guide/design-specs`}>
            <strong>设计规范</strong>
            <span>键盘、浮层、焦点</span>
          </a>
          <a href={`${BASE}/core/normalize`}>
            <strong>核心能力</strong>
            <span>规范化、词缀、光标</span>
          </a>
          <a href={`${BASE}/changelog`}>
            <strong>更新日志</strong>
            <span>0.2.0 起逻辑下沉到 core</span>
          </a>
        </div>
      </section>
    </div>
  );
}

export default HomeBands;
