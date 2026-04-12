import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ru03qs5h',
    dataset: 'portfolio',
  },
  deployment: { autoUpdates: true },
});
