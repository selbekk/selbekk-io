export default {
  widgets: [
    { name: 'structure-menu' },
    {
      name: 'netlify',
      options: {
        title: 'My Netlify deploys',
        sites: [
          {
            buildHookId: '5e56c0c7ea21a2018ddd812f',
            title: 'Sanity Studio',
            name: 'selbekk-io-studio',
            apiId: 'f66f404a-f7c2-4987-91e2-dfd46295fae6',
          },
          {
            buildHookId: '5e56c0c78049b901c2a759d9',
            title: 'Blog Website',
            name: 'selbekk-io',
            apiId: '3218f88b-8098-4201-8891-b77fa55f429b',
          },
        ],
      },
    },
    { name: 'project-users', layout: { height: 'auto' } },
    {
      name: 'document-list',
      options: {
        title: 'Recent blog posts',
        order: '_createdAt desc',
        types: ['post'],
      },
      layout: { width: 'medium' },
    },
  ],
};
