# Leva Documentation Site

This is the official documentation site for Leva, built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build).

## 🚀 Development

From the root of the repository:

```bash
# Start development server
pnpm docs:dev

# Or from this directory
pnpm dev
```

The site will be available at `http://localhost:4321`

## 📦 Building

```bash
# Build the site
pnpm docs:build

# Preview the build
pnpm docs:preview
```

## 📝 Content Structure

```
src/content/docs/
├── index.mdx                 # Homepage
├── getting-started/
│   ├── installation.md
│   └── quick-start.md
├── guides/
│   ├── inputs.md
│   ├── configuration.md
│   ├── styling.md
│   └── plugins.md
├── examples/
│   ├── minimal.md
│   ├── advanced-panels.md
│   ├── theme.md
│   ├── transient.md
│   ├── scroll.md
│   └── ui.md
├── plugins/
│   ├── creating.md
│   ├── bezier.md
│   ├── spring.md
│   ├── plot.md
│   └── dates.md
└── advanced/
    ├── controlled-inputs.md
    ├── typescript.md
    └── custom-plugin.md
```

## ✏️ Writing Documentation

All documentation is written in Markdown (`.md`) or MDX (`.mdx`).

### Adding a New Page

1. Create a new `.md` file in the appropriate directory
2. Add frontmatter:

```md
---
title: Page Title
description: Page description for SEO and preview
---

Your content here...
```

3. Update `astro.config.mjs` to add the page to the sidebar navigation

### Components

Starlight provides built-in components:

```mdx
import { Card, CardGrid, Tabs, TabItem } from '@astrojs/starlight/components'

<CardGrid>
  <Card title="Feature" icon="star">
    Feature description
  </Card>
</CardGrid>
```

See [Starlight Components](https://starlight.astro.build/guides/components/) for more.

## 🎨 Styling

The site uses Starlight's default theme, which can be customized in `astro.config.mjs`:

```js
starlight({
  customCss: ['./src/styles/custom.css'],
  // ...
})
```

## 🔍 Search

Starlight includes built-in search powered by Pagefind. No configuration needed!

## 📱 Responsive Design

The site is fully responsive and optimized for mobile, tablet, and desktop viewing.

## 🌐 Deployment

The site can be deployed to any static hosting provider:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

Build output is in `dist/` after running `pnpm build`.

## 📄 License

Same as the main Leva project - MIT
