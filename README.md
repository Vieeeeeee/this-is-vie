# Wei (OS) | Solo Creator System

A high-density, minimalist personal site built for the "Solo Capitalist" era. 
It functions as a digital garden, portfolio, and operating system for one-person companies.

**Live Preview**: [http://localhost:3000](http://localhost:3000)

---

## 核心理念 (Philosophy)

- **Minimalist**: 剔除一切装饰。没有卡片，没有边框，没有阴影。只有文字和留白。
- **Systematic**: 内容即数据。文章、项目、简讯都通过结构化的 MDX 或 JSON 管理。
- **High Signal**: 为快速阅读而设计。清晰的排版层级，高对比度。

## 技术栈 (Tech Stack)

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Core**: [React 19 RC](https://react.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) + `@tailwindcss/typography`
- **Content**: MDX + `next-mdx-remote/rsc`
- **Type Safety**: TypeScript Strict Mode

## 功能模块 (Features)

### 1. Home (Dashboard)
- 极简的单页仪表盘。
- 聚合了:
  - "Now": 手动配置 (`content/content.json`)。
  - "Projects": 自动读取最新的 Work (`content/work/*.mdx`) 前 3 篇。
  - "Writing": 自动读取最新的 Posts (`content/posts/*.mdx`) 前 3 篇。
- 基础文案（Hero、Bio、Proof、Contact）位于 `content/content.json`。

### 2. Writing (Blog)
- 路径：`/posts`
- 数据源：`content/posts/*.mdx`
- 模板：复制 `content/posts/_template.mdx` 新建文章。

### 3. Work (Case Studies)
- 路径：`/work`
- 数据源：`content/work/*.mdx`
- 模板：复制 `content/work/_template.mdx` 新建案例。

### 4. Workflow (工作流)
这是一套基于 Git 的 "一人公司" 发布流：

1.  **写作 (Write)**:
    在 `content/posts` 或 `content/work` 创建 `.mdx` 文件。 VS Code 会提供最佳的编辑体验。
2.  **预览 (Preview)**:
    本地运行 `npm run dev`，访问 `localhost:3000` 实时查看效果。
3.  **发布 (Ship)**:
    ```bash
    git add .
    git commit -m "new post: title"
    git push
    ```
    GitHub Actions 会自动检查代码，Vercel 会自动部署上线。

### 5. Newsletter
- 位于主页底部的极简订阅框。
- 目前为 UI 演示组件 (`components/newsletter-form.tsx`)，可对接 ConvertKit / Substack API。

---

## 快速开始 (Quick Start)

### 1. 安装
```bash
npm install --force
# 注意：由于 Next.js 15 依赖 React 19 RC，可能需要 --force 解决 peer deps 警告
```

### 2. 开发
```bash
npm run dev
# 访问 http://localhost:3000
```

### 3. 构建
```bash
npm run build
npm run start
```

---

## 路线图 (Roadmap)

### Phase 1: Foundation (Completed) ✅
- [x] **Redesign**: 迁移至 Naval/Altman 极简风格。
- [x] **Architecture**: 升级至 Next.js 15 + React 19。
- [x] **Blog System**: 实现 MDX 博客系统。
- [x] **Project System**: 实现案例展示系统。

### Phase 2: Visibility (Upcoming) 🚧
- [ ] **SEO & Metadata**: 为每篇文章自动生成动态 OpenGraph 图片。
- [ ] **RSS Feed**: 生成 `/rss.xml` 供阅读器订阅。
- [ ] **Sitemap**: 生成 `/sitemap.xml` 提交给 Google/Bing。
- [ ] **Analytics**: 集成极简隐私统计 (如 Vercel Analytics 或 Umami)。

### Phase 3: Interaction (Future) 🔮
- [ ] **Newsletter API**: 对接真实的邮件服务提供商。
- [ ] **Search**: 增加 `cmd+k` 全局搜索。
- [ ] **Guestbook / Comments**: (可选) 增加极简留言板。

---

## 目录结构

```
.
├── app/
│   ├── page.tsx          # 首页
│   ├── layout.tsx        # 全局布局 (Fonts, Theme Script)
│   ├── posts/            # 博客路由
│   └── work/             # 项目案例路由
├── components/           # UI 组件 (Newsletter, ThemeToggle)
├── content/
│   ├── content.json      # 首页静态文案
│   ├── posts/            # 博客文章 (.mdx)
│   └── work/             # 项目案例 (.mdx)
├── lib/
│   └── mdx.ts            # MDX 读取与解析工具
└── public/               # 静态资源
```
