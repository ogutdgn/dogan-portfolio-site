import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: 'ru03qs5h',
  dataset: 'portfolio',
  apiVersion: '2023-05-03',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
