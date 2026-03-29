import { defineField, defineType } from 'sanity';

export const tool = defineType({
  name: 'tool',
  title: 'Tool',
  type: 'document',
  fields: [
    // ─── Core ────────────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'One-liner shown on the card (max 100 chars)',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'overview',
      title: 'Overview',
      type: 'text',
      description: 'Short description used in meta / previews (max 300 chars)',
      validation: (Rule) => Rule.max(300),
    }),

    // ─── Visuals ─────────────────────────────────────────────────────────────
    defineField({
      name: 'icon',
      title: 'Icon / Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Caption',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'demoVideoUrl',
      title: 'Demo Video URL',
      type: 'url',
      description: 'YouTube / Loom / etc. embed URL',
    }),

    // ─── Classification ───────────────────────────────────────────────────────
    defineField({
      name: 'toolType',
      title: 'Tool Type',
      type: 'string',
      options: {
        list: [
          // AI
          { title: 'AI Tool', value: 'ai-tool' },
          { title: 'AI Agent', value: 'ai-agent' },
          { title: 'AI Chatbot', value: 'ai-chatbot' },
          { title: 'AI API Wrapper', value: 'ai-api-wrapper' },
          // Browser
          { title: 'Chrome Extension', value: 'chrome-extension' },
          { title: 'Firefox Extension', value: 'firefox-extension' },
          { title: 'Safari Extension', value: 'safari-extension' },
          { title: 'Edge Extension', value: 'edge-extension' },
          // OS / Desktop
          { title: 'macOS App', value: 'macos-app' },
          { title: 'Windows App', value: 'windows-app' },
          { title: 'Linux App', value: 'linux-app' },
          { title: 'Cross-platform App', value: 'cross-platform-app' },
          // OS Extensions / Launchers
          { title: 'Raycast Extension', value: 'raycast-extension' },
          { title: 'Alfred Workflow', value: 'alfred-workflow' },
          { title: 'Spotlight Plugin', value: 'spotlight-plugin' },
          { title: 'PowerToys Plugin', value: 'powertoys-plugin' },
          // CLI
          { title: 'CLI Tool', value: 'cli-tool' },
          { title: 'Shell Script', value: 'shell-script' },
          // Editor / IDE
          { title: 'VS Code Extension', value: 'vscode-extension' },
          { title: 'JetBrains Plugin', value: 'jetbrains-plugin' },
          { title: 'Neovim Plugin', value: 'neovim-plugin' },
          { title: 'Vim Plugin', value: 'vim-plugin' },
          // Design
          { title: 'Figma Plugin', value: 'figma-plugin' },
          { title: 'Sketch Plugin', value: 'sketch-plugin' },
          // Package / Library
          { title: 'npm Package', value: 'npm-package' },
          { title: 'Python Package (PyPI)', value: 'pypi-package' },
          { title: 'Homebrew Formula', value: 'homebrew-formula' },
          { title: 'Docker Image', value: 'docker-image' },
          // Web
          { title: 'Web App', value: 'web-app' },
          { title: 'API', value: 'api' },
          { title: 'Bookmarklet', value: 'bookmarklet' },
          // Testing
          { title: 'Testing Tool', value: 'testing-tool' },
          { title: 'Linter / Formatter', value: 'linter-formatter' },
          { title: 'Debugging Tool', value: 'debugging-tool' },
          // Productivity
          { title: 'Automation Tool', value: 'automation-tool' },
          { title: 'Productivity Tool', value: 'productivity-tool' },
          { title: 'Utility', value: 'utility' },
          // Other
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Beta', value: 'beta' },
          { title: 'Alpha', value: 'alpha' },
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Deprecated', value: 'deprecated' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pricing',
      title: 'Pricing',
      type: 'string',
      options: {
        list: [
          { title: 'Free', value: 'free' },
          { title: 'Open Source', value: 'open-source' },
          { title: 'Freemium', value: 'freemium' },
          { title: 'Paid', value: 'paid' },
          { title: 'One-time Purchase', value: 'one-time' },
          { title: 'Subscription', value: 'subscription' },
        ],
      },
      initialValue: 'free',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin to top of tools list',
      initialValue: false,
    }),

    // ─── Links ───────────────────────────────────────────────────────────────
    defineField({
      name: 'liveLink',
      title: 'Live / Try It Link',
      type: 'url',
      description: 'Direct link to use the tool',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    }),
    defineField({
      name: 'chromeStoreLink',
      title: 'Chrome Web Store Link',
      type: 'url',
    }),
    defineField({
      name: 'firefoxAddonLink',
      title: 'Firefox Add-ons Link',
      type: 'url',
    }),
    defineField({
      name: 'npmLink',
      title: 'npm Package Link',
      type: 'url',
    }),
    defineField({
      name: 'pypiLink',
      title: 'PyPI Link',
      type: 'url',
    }),
    defineField({
      name: 'vscodeMarketplaceLink',
      title: 'VS Code Marketplace Link',
      type: 'url',
    }),
    defineField({
      name: 'raycastLink',
      title: 'Raycast Store Link',
      type: 'url',
    }),
    defineField({
      name: 'productHuntLink',
      title: 'Product Hunt Link',
      type: 'url',
    }),
    defineField({
      name: 'dockerHubLink',
      title: 'Docker Hub Link',
      type: 'url',
    }),
    defineField({
      name: 'documentationLink',
      title: 'Documentation Link',
      type: 'url',
    }),

    // ─── Technical Details ────────────────────────────────────────────────────
    defineField({
      name: 'version',
      title: 'Current Version',
      type: 'string',
      description: 'e.g. 1.0.0',
    }),
    defineField({
      name: 'installCommand',
      title: 'Install Command',
      type: 'string',
      description: 'e.g. npm install mytool  |  brew install mytool  |  pip install mytool',
    }),
    defineField({
      name: 'compatibility',
      title: 'Compatibility',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Windows', value: 'windows' },
          { title: 'macOS', value: 'macos' },
          { title: 'Linux', value: 'linux' },
          { title: 'Chrome', value: 'chrome' },
          { title: 'Firefox', value: 'firefox' },
          { title: 'Safari', value: 'safari' },
          { title: 'Edge', value: 'edge' },
          { title: 'Web (Any Browser)', value: 'web' },
          { title: 'iOS', value: 'ios' },
          { title: 'Android', value: 'android' },
          { title: 'Node.js', value: 'nodejs' },
          { title: 'Python', value: 'python' },
          { title: 'Docker', value: 'docker' },
        ],
      },
    }),
    defineField({
      name: 'permissions',
      title: 'Permissions Required',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'For extensions: list of permissions it needs (e.g. "Read browsing history")',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),

    // ─── Stats (manually updated or via API) ─────────────────────────────────
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'object',
      fields: [
        {
          name: 'downloads',
          title: 'Downloads / Installs',
          type: 'number',
        },
        {
          name: 'stars',
          title: 'GitHub Stars',
          type: 'number',
        },
        {
          name: 'users',
          title: 'Active Users',
          type: 'number',
        },
        {
          name: 'rating',
          title: 'Rating (out of 5)',
          type: 'number',
          validation: (Rule) => Rule.min(0).max(5),
        },
      ],
    }),

    // ─── Rich Content ─────────────────────────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Full Description / Docs',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [{ name: 'href', type: 'url' }],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
        {
          type: 'code',
        },
      ],
    }),

    // ─── Changelog ───────────────────────────────────────────────────────────
    defineField({
      name: 'changelog',
      title: 'Changelog',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'version', title: 'Version', type: 'string' },
            { name: 'date', title: 'Date', type: 'date' },
            { name: 'notes', title: 'Notes', type: 'text' },
          ],
          preview: {
            select: { title: 'version', subtitle: 'date' },
          },
        },
      ],
    }),

    // ─── Dates ───────────────────────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'updatedAt',
      title: 'Last Updated',
      type: 'date',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'toolType',
      media: 'icon',
    },
  },
});
