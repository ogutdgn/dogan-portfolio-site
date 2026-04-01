import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'default',
  title: 'Dogan Portfolio',

  projectId: 'ru03qs5h',
  dataset: 'portfolio',

  basePath: '/studio',

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .schemaType('project')
              .child(S.documentTypeList('project').title('Projects')),

            S.listItem()
              .title('Blogs')
              .schemaType('blog')
              .child(S.documentTypeList('blog').title('Blogs')),

            S.divider(),

            S.listItem()
              .title('Tools')
              .child(
                S.list()
                  .title('Tools')
                  .items([
                    S.listItem()
                      .title('All Tools')
                      .schemaType('tool')
                      .child(S.documentTypeList('tool').title('All Tools')),
                    orderableDocumentListDeskItem({
                      type: 'toolCategory',
                      title: 'Categories',
                      S,
                      context,
                    }),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
});
