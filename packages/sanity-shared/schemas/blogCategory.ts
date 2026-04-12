import { defineField, defineType } from 'sanity';
import { orderRankField, orderRankOrdering } from '@sanity/orderable-document-list';

export const blogCategory = defineType({
  name: 'blogCategory',
  title: 'Blog Category',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: 'blogCategory' }),
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
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
    },
  },
});
