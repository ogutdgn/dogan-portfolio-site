import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID ?? 'ru03qs5h',
  dataset: process.env.SANITY_DATASET ?? 'portfolio',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
});
