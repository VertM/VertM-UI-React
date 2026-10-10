import type { ReactNode } from 'react';

type Tile = {
  href: string;
  name: string;
  zh: string;
  specimen: ReactNode;
};

type Category = {
  title: string;
  en: string;
  tiles: Tile[];
};

const BASE = '/VertM-UI-React';

const CATEGORIES: Category[] = [
  {
    title: '通用',
    en: 'General',
    tiles: [
      {
        href: `${BASE}/components/button`,
        name: 'Button',
        zh: '按钮',
        specimen: <span className="m primary">ᠲᠣᠪᠴᠢ</span>,
      },
      {
        href: `${BASE}/components/icon`,
        name: 'Icon',
        zh: '图标',
        specimen: (
          <span className="m-rows">
            <span className="m plain">ᠳᠦᠷᠰᠦ</span>
            <span className="m muted">ᠲᠡᠮᠳᠡᠭ</span>
          </span>
        ),
      },
      {
        href: `${BASE}/components/typography`,
        name: 'Typography',
        zh: '排版',
        specimen: <span className="m plain" style={{ fontSize: 22 }}>ᠭᠠᠷᠴᠠᠭ</span>,
      },
      {
        href: `${BASE}/components/config`,
        name: 'ConfigProvider',
        zh: '全局配置',
        specimen: <span className="m def">ᠲᠣᠬᠢᠷᠠᠭᠤᠯᠭ᠎ᠠ</span>,
      },
      {
        href: `${BASE}/components/tag`,
        name: 'Tag',
        zh: '标签',
        specimen: <span className="m tag">ᠰᠢᠨ᠎ᠡ</span>,
      },
    ],
  },
  {
    title: '数据录入',
    en: 'Data Entry',
    tiles: [
      {
        href: `${BASE}/components/input`,
        name: 'Input',
        zh: '输入框',
        specimen: <span className="m field">ᠪᠢᠴᠢᠭ</span>,
      },
      {
        href: `${BASE}/components/select`,
        name: 'Select',
        zh: '选择器',
        specimen: <span className="m def">ᠰᠣᠩᠭᠣᠬᠤ</span>,
      },
      {
        href: `${BASE}/components/form`,
        name: 'Form',
        zh: '表单',
        specimen: (
          <span className="m-rows">
            <span className="m s">ᠨᠡᠷ᠎ᠡ</span>
            <span className="m muted">ᠤᠲᠠᠰᠤ</span>
          </span>
        ),
      },
      {
        href: `${BASE}/components/checkbox`,
        name: 'Checkbox',
        zh: '多选框',
        specimen: (
          <span className="m-rows">
            <span className="m s">ᠨᠢᠭᠡ</span>
            <span className="m plain">ᠬᠣᠶᠠᠷ</span>
          </span>
        ),
      },
      {
        href: `${BASE}/components/segmented`,
        name: 'Segmented',
        zh: '分段控制',
        specimen: <span className="m def">ᠡᠳᠦᠷ</span>,
      },
    ],
  },
  {
    title: '导航',
    en: 'Navigation',
    tiles: [
      {
        href: `${BASE}/components/menu`,
        name: 'Menu',
        zh: '导航菜单',
        specimen: (
          <span className="m-rows">
            <span className="m s">ᠴᠡᠰ</span>
            <span className="m muted">ᠮᠡᠳᠡᠭᠡ</span>
          </span>
        ),
      },
      {
        href: `${BASE}/components/tabs`,
        name: 'Tabs',
        zh: '标签页',
        specimen: (
          <span className="m-rows">
            <span className="m s">ᠨᠢᠭᠡ</span>
            <span className="m muted">ᠬᠣᠶᠠᠷ</span>
          </span>
        ),
      },
      {
        href: `${BASE}/components/dropdown`,
        name: 'Dropdown',
        zh: '下拉菜单',
        specimen: <span className="m def">ᠲᠣᠪᠴᠢ</span>,
      },
      {
        href: `${BASE}/components/steps`,
        name: 'Steps',
        zh: '步骤条',
        specimen: (
          <span className="m-rows">
            <span className="m muted">ᠨᠢᠭᠡ</span>
            <span className="m s">ᠬᠣᠶᠠᠷ</span>
          </span>
        ),
      },
      {
        href: `${BASE}/components/pagination`,
        name: 'Pagination',
        zh: '分页',
        specimen: (
          <span className="m-rows">
            <span className="m plain">᠑</span>
            <span className="m s">᠒</span>
            <span className="m plain">᠓</span>
          </span>
        ),
      },
    ],
  },
  {
    title: '反馈',
    en: 'Feedback',
    tiles: [
      {
        href: `${BASE}/components/modal`,
        name: 'Modal',
        zh: '对话框',
        specimen: <span className="m def">ᠴᠣᠩᠬ᠎ᠠ</span>,
      },
      {
        href: `${BASE}/components/alert`,
        name: 'Alert',
        zh: '警告提示',
        specimen: <span className="m tag">ᠠᠩᠬᠠᠷ</span>,
      },
      {
        href: `${BASE}/components/message`,
        name: 'Message',
        zh: '全局提示',
        specimen: <span className="m plain">ᠮᠡᠳᠡᠭᠡ</span>,
      },
      {
        href: `${BASE}/components/spin`,
        name: 'Spin',
        zh: '加载中',
        specimen: <span className="m muted">…</span>,
      },
      {
        href: `${BASE}/components/drawer`,
        name: 'Drawer',
        zh: '抽屉',
        specimen: <span className="m def">ᠲᠠᠲᠠᠭᠤᠷ</span>,
      },
    ],
  },
];

/** Overview tiles — class names match design/mockups/overview.html under .vertm-overview */
export function ComponentsOverview() {
  return (
    <div className="vertm-overview">
      <div className="phead">
        <h1>组件总览</h1>
        <span className="mn" lang="mn-Mong">
          ᠪᠦᠷᠢᠯᠳᠡᠬᠦᠨ
        </span>
        <span className="count">45+ components · vertical-lr</span>
      </div>
      <p className="pdesc">
        全部竖排组件按 Ant Design 习惯分组。每个标本展示该组件在竖排下的最小形态。点击进入详情、示例与
        API。
      </p>

      {CATEGORIES.map((cat) => (
        <section key={cat.en} className="cat">
          <div className="cat-h">
            <i />
            <b>{cat.title}</b>
            <span>{cat.en}</span>
            <span className="rule" />
          </div>
          <div className="grid">
            {cat.tiles.map((tile) => (
              <a key={tile.name} className="tile" href={tile.href}>
                <div className="mini">{tile.specimen}</div>
                <div className="foot">
                  <div className="nm">{tile.name}</div>
                  <div className="zh">{tile.zh}</div>
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export default ComponentsOverview;
