import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    projectId: 'ru03qs5h',
    dataset: 'portfolio',
  },
  deployment: { autoUpdates: true, appId: 'hpf2g3u9qm4ssu8namkwrmoa' },
});
