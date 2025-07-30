import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ru03qs5h',
  dataset: 'portfolio',
  apiVersion: '2023-05-03',
  useCdn: false, // `false` if you want to ensure fresh data
});
