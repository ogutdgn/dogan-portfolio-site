import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'default',
  title: 'Dogan Portfolio',
  projectId: 'ru03qs5h',
  dataset: 'portfolio',
  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Projects')
              .child(
                S.list()
                  .title('Projects')
                  .items([
                    S.listItem()
                      .title('All Projects')
                      .schemaType('project')
                      .child(S.documentTypeList('project').title('All Projects')),
                    orderableDocumentListDeskItem({
                      type: 'projectCategory',
                      title: 'Categories',
                      S,
                      context,
                    }),
                  ])
              ),
            S.listItem()
              .title('Blogs')
              .child(
                S.list()
                  .title('Blogs')
                  .items([
                    S.listItem()
                      .title('All Blogs')
                      .schemaType('blog')
                      .child(S.documentTypeList('blog').title('All Blogs')),
                    orderableDocumentListDeskItem({
                      type: 'blogCategory',
                      title: 'Categories',
                      S,
                      context,
                    }),
                  ])
              ),
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
