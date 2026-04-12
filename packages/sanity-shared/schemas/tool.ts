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
      description: 'Short description (max 300 chars)',
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
      description: 'Optional — mainly for external tools',
      options: { hotspot: true },
    }),
    defineField({
      name: 'screenshots',
      title: 'Screenshots',
      type: 'array',
      description: 'Optional — for external tools',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [{ name: 'caption', title: 'Caption', type: 'string' }],
        },
      ],
    }),
    defineField({
      name: 'demoVideoUrl',
      title: 'Demo Video URL',
      type: 'url',
      description: 'Optional — YouTube / Loom etc.',
    }),

    // ─── Classification ───────────────────────────────────────────────────────
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'toolCategory' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hostType',
      title: 'Host Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal (runs on this site)', value: 'internal' },
          { title: 'External (link to another site)', value: 'external' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'toolType',
      title: 'Tool Type',
      type: 'string',
      options: {
        list: [
          { title: 'Web App', value: 'web-app' },
          { title: 'Chrome Extension', value: 'chrome-extension' },
          { title: 'VS Code Extension', value: 'vscode-extension' },
          { title: 'OS Extension', value: 'os-extension' },
          { title: 'CLI / npm Package', value: 'cli-npm' },
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
          { title: 'Coming Soon', value: 'coming-soon' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'active',
      validation: (Rule) => Rule.required(),
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
      title: 'Live Link',
      type: 'url',
      description: 'Required for external tools',
    }),
    defineField({
      name: 'githubLink',
      title: 'GitHub Link',
      type: 'url',
    }),

    // ─── Technical ───────────────────────────────────────────────────────────
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),

    // ─── Rich Content (external tools) ───────────────────────────────────────
    defineField({
      name: 'content',
      title: 'Full Description',
      type: 'array',
      description: 'Optional — for external tools detail page',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
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
        { type: 'image', options: { hotspot: true } },
        { type: 'code' },
      ],
    }),

    // ─── Dates ───────────────────────────────────────────────────────────────
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
      initialValue: () => new Date().toISOString().split('T')[0],
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
