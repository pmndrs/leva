// @ts-check
import { defineConfig } from 'astro/config'
import starlight from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: 'Leva',
      description: 'A GUI you are going to lava. Customizable, extensible and beautiful by default.',
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/pmndrs/leva' },
        { icon: 'discord', label: 'Discord', href: 'https://discord.gg/poimandres' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Introduction', slug: 'index' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Input Types', slug: 'guides/inputs' },
            { label: 'Configuration', slug: 'guides/configuration' },
            { label: 'Styling', slug: 'guides/styling' },
            { label: 'Plugins', slug: 'guides/plugins' },
          ],
        },
        {
          label: 'Examples',
          items: [
            { label: 'Minimal Setup', slug: 'examples/minimal' },
            { label: 'Advanced Panels', slug: 'examples/advanced-panels' },
            { label: 'Custom Theme', slug: 'examples/theme' },
            { label: 'Transient Updates', slug: 'examples/transient' },
            { label: 'Scroll Integration', slug: 'examples/scroll' },
            { label: 'UI Components', slug: 'examples/ui' },
          ],
        },
        {
          label: 'Plugins',
          items: [
            { label: 'Creating Plugins', slug: 'plugins/creating' },
            { label: 'Bezier Plugin', slug: 'plugins/bezier' },
            { label: 'Spring Plugin', slug: 'plugins/spring' },
            { label: 'Plot Plugin', slug: 'plugins/plot' },
            { label: 'Dates Plugin', slug: 'plugins/dates' },
          ],
        },
        {
          label: 'Advanced',
          items: [
            { label: 'Controlled Inputs', slug: 'advanced/controlled-inputs' },
            { label: 'TypeScript', slug: 'advanced/typescript' },
            { label: 'Custom Plugin Development', slug: 'advanced/custom-plugin' },
          ],
        },
      ],
    }),
  ],
})
