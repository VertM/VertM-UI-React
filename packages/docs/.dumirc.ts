import { defineConfig } from 'dumi';
import path from 'node:path';

const pkg = (rel: string) => path.join(__dirname, rel);

export default defineConfig({
  // GitHub Pages project site
  base: '/VertM-UI-React/',
  publicPath: '/VertM-UI-React/',
  outputPath: 'dist',
  favicons: ['/logo.svg'],
  locales: [{ id: 'zh-CN', name: '中文' }],
  alias: {
    '@vertm/react': pkg('../react/src'),
    '@vertm/core': pkg('../core/src'),
    '@vertm/tokens': pkg('../tokens/src'),
    '@vertm/icons': pkg('../icons/src'),
    '@vertm/styles': pkg('../styles/src'),
    '@vertm/styles/index.css': pkg('../styles/src/index.css'),
    // Demo codeblocks import this by bare name.
    VertMDemoFrame: pkg('src/components/VertMDemoFrame.tsx'),
  },
  monorepoRedirect: {},
  // Workspace packages use ESM `.js` import specifiers that map to `.ts` sources.
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
    logo: '/logo.svg',
    footer: `VertM UI © ${new Date().getFullYear()} · Traditional Mongolian vertical React components`,
    socialLinks: {
      github: 'https://github.com/VertM/VertM-UI-React',
    },
    nav: [
      { title: '指南', link: '/guide/introduction' },
      { title: '组件', link: '/components/button' },
      { title: '核心能力', link: '/core/normalize' },
      { title: '主题', link: '/theme/tokens' },
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
            { title: '主题定制', link: '/guide/theming' },
            { title: '字体接入', link: '/guide/fonts' },
            { title: '国际化与书写模式', link: '/guide/i18n' },
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
            { title: 'Design Tokens', link: '/theme/tokens' },
            { title: '竖排专属令牌', link: '/theme/vertical-tokens' },
            { title: 'Editorial 外观', link: '/theme/editorial' },
          ],
        },
      ],
      '/components': [
        {
          title: '通用',
          children: [{ title: 'Button', link: '/components/button' }],
        },
        {
          title: '数据录入',
          children: [
            { title: 'Input', link: '/components/input' },
            { title: 'Form', link: '/components/form' },
          ],
        },
        {
          title: '导航',
          children: [
            { title: 'Menu', link: '/components/menu' },
            { title: 'Tabs', link: '/components/tabs' },
          ],
        },
        {
          title: '竖排专属',
          children: [{ title: 'VertMText', link: '/components/vertm-text' }],
        },
      ],
    },
  },
});
