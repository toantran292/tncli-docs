import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'tncli',
  description: 'Workspace + service manager for dev (tmux + Docker + Git worktrees)',
  base: '/tncli-docs/',
  cleanUrls: true,

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/install' },
      { text: 'Reference', link: '/reference/config' },
      { text: 'Skills', link: '/skills/' },
      { text: 'Releases', link: 'https://github.com/toantran292/tncli-releases/releases' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Getting Started',
          items: [
            { text: 'Install', link: '/guide/install' },
            { text: 'Quick Start', link: '/guide/quickstart' },
            { text: 'Concepts', link: '/guide/concepts' }
          ]
        },
        {
          text: 'Workflows',
          items: [
            { text: 'Workspace lifecycle', link: '/guide/workspace' },
            { text: 'Services', link: '/guide/services' },
            { text: 'Databases', link: '/guide/databases' },
            { text: 'TUI shortcuts', link: '/guide/tui' }
          ]
        }
      ],
      '/reference/': [
        {
          text: 'Reference',
          items: [
            { text: 'tncli.yml', link: '/reference/config' },
            { text: 'CLI commands', link: '/reference/cli' },
            { text: 'Templates', link: '/reference/templates' }
          ]
        }
      ],
      '/skills/': [
        {
          text: 'Skills',
          items: [
            { text: 'Overview', link: '/skills/' },
            { text: 'Writing skills', link: '/skills/writing' }
          ]
        }
      ]
    },

    search: { provider: 'local' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/toantran292/tncli-releases' }
    ],

    footer: {
      message: 'Released under MIT',
      copyright: 'Copyright © toantran292'
    }
  }
})
