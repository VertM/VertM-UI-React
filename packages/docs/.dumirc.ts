import { defineConfig } from 'dumi';
import path from 'node:path';

const pkg = (rel: string) => path.join(__dirname, rel);

export default defineConfig({
  base: '/VertM-UI-React/',
  publicPath: '/VertM-UI-React/',
  outputPath: 'dist',
  favicons: ['/logo.svg'],
  locales: [{ id: 'zh-CN', name: '中文' }],
  styles: [
    'https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap',
  ],
  alias: {
    '@vertm/react': pkg('../react/src'),
    '@vertm/core': pkg('../core/src'),
    '@vertm/tokens': pkg('../tokens/src'),
    '@vertm/icons': pkg('../icons/src'),
    '@vertm/styles': pkg('../styles/src'),
    '@vertm/styles/index.css': pkg('../styles/src/index.css'),
    '@vertm/styles/fonts.css': pkg('../styles/src/fonts.css'),
    VertMDemoFrame: pkg('src/components/VertMDemoFrame.tsx'),
    ThemeGallery: pkg('src/components/ThemeGallery.tsx'),
    ComponentsOverview: pkg('src/components/ComponentsOverview.tsx'),
  },
  monorepoRedirect: {},
  chainWebpack(memo: any) {
    memo.resolve.merge({
      extensionAlias: {
        '.js': ['.ts', '.tsx', '.js', '.jsx'],
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    });
    return memo;
  },
  resolve: {
    docDirs: ['docs'],
    atomDirs: [
      { type: 'component', dir: '../react/src' },
      { type: 'component', dir: '../react/src/_vertical' },
      { type: 'component', dir: '../icons/src' },
    ],
    entryFile: '../react/src/index.ts',
  },
  apiParser: {},
  themeConfig: {
    name: 'VertM UI',
    logo: false,
    footer: `VertM UI © ${new Date().getFullYear()} · Traditional Mongolian vertical React components`,
    socialLinks: {
      github: 'https://github.com/VertM/VertM-UI-React',
    },
    nav: [
      { title: '指南', link: '/guide/introduction' },
      { title: '组件', link: '/components' },
      { title: '核心能力', link: '/core/normalize' },
      { title: '主题', link: '/theme' },
      { title: '更新日志', link: '/changelog' },
      {
        title: 'GitHub',
        link: 'https://github.com/VertM/VertM-UI-React',
      },
    ],
    sidebar: {
      '/guide': [
        {
          title: '指南',
          children: [
            { title: '介绍', link: '/guide/introduction' },
            { title: '快速开始', link: '/guide/getting-started' },
            { title: '设计原则', link: '/guide/design-principles' },
            { title: '设计规范', link: '/guide/design-specs' },
            { title: '主题定制', link: '/guide/theming' },
            { title: '字体接入', link: '/guide/fonts' },
            { title: '国际化与书写模式', link: '/guide/i18n' },
            { title: '无障碍与键盘', link: '/guide/accessibility' },
            { title: '从 antd 迁移', link: '/guide/migrate-from-antd' },
            { title: '常见问题', link: '/guide/faq' },
            { title: '浏览器兼容', link: '/guide/browser-matrix' },
          ],
        },
      ],
      '/core': [
        {
          title: '核心能力',
          children: [
            { title: '文本规范化', link: '/core/normalize' },
            { title: '检索归一化', link: '/core/normalize-for-search' },
            { title: '元音和谐', link: '/core/vowel-harmony' },
            { title: '后缀与换行', link: '/core/suffix-linebreak' },
            { title: '光标映射与导航', link: '/core/caret' },
            { title: '字体与竖排检测', link: '/core/detect' },
          ],
        },
      ],
      '/theme': [
        {
          title: '主题',
          children: [
            { title: '主题画廊', link: '/theme' },
            { title: 'Design Tokens', link: '/theme/tokens' },
            { title: '竖排专属令牌', link: '/theme/vertical-tokens' },
            { title: 'Editorial 外观', link: '/theme/editorial' },
          ],
        },
      ],
      '/components': [
        {
          title: '通用',
          children: [
            { title: 'Button', link: '/components/button' },
            { title: 'Icon', link: '/components/icon' },
            { title: 'Typography', link: '/components/typography' },
            { title: 'ConfigProvider', link: '/components/config' },
          ],
        },
        {
          title: '布局',
          children: [
            { title: 'Layout', link: '/components/layout' },
            { title: 'Grid', link: '/components/grid' },
            { title: 'Flex', link: '/components/flex' },
            { title: 'Space', link: '/components/space' },
            { title: 'Divider', link: '/components/divider' },
            { title: 'Splitter', link: '/components/splitter' },
          ],
        },
        {
          title: '导航',
          children: [
            { title: 'Menu', link: '/components/menu' },
            { title: 'Tabs', link: '/components/tabs' },
            { title: 'Dropdown', link: '/components/dropdown' },
            { title: 'Breadcrumb', link: '/components/breadcrumb' },
            { title: 'Pagination', link: '/components/pagination' },
            { title: 'Steps', link: '/components/steps' },
            { title: 'Anchor', link: '/components/anchor' },
          ],
        },
        {
          title: '数据录入',
          children: [
            { title: 'Input', link: '/components/input' },
            { title: 'Select', link: '/components/select' },
            { title: 'Checkbox', link: '/components/checkbox' },
            { title: 'Radio', link: '/components/radio' },
            { title: 'Switch', link: '/components/switch' },
            { title: 'Form', link: '/components/form' },
            { title: 'Segmented', link: '/components/segmented' },
          ],
        },
        {
          title: '数据展示',
          children: [
            { title: 'Card', link: '/components/card' },
            { title: 'List', link: '/components/list' },
            { title: 'Descriptions', link: '/components/descriptions' },
            { title: 'Tag', link: '/components/tag' },
            { title: 'Avatar', link: '/components/avatar' },
            { title: 'Badge', link: '/components/badge' },
            { title: 'Collapse', link: '/components/collapse' },
            { title: 'Timeline', link: '/components/timeline' },
            { title: 'Statistic', link: '/components/statistic' },
            { title: 'Tooltip', link: '/components/overlay' },
            { title: 'Popover', link: '/components/popover' },
          ],
        },
        {
          title: '反馈',
          children: [
            { title: 'Alert', link: '/components/alert' },
            { title: 'Modal', link: '/components/modal' },
            { title: 'Drawer', link: '/components/drawer' },
            { title: 'Popconfirm', link: '/components/popconfirm' },
            { title: 'Progress', link: '/components/progress' },
            { title: 'Spin', link: '/components/spin' },
            { title: 'Skeleton', link: '/components/skeleton' },
            { title: 'Result', link: '/components/result' },
            { title: 'Empty', link: '/components/empty' },
            { title: 'Message', link: '/components/message' },
            { title: 'Notification', link: '/components/notification' },
            { title: 'App', link: '/components/app' },
          ],
        },
        {
          title: '竖排专属',
          children: [
            { title: 'VertMText', link: '/components/vertm-text' },
            { title: 'VertMTextField', link: '/components/vertm-text-field' },
          ],
        },
      ],
    },
  },
});
