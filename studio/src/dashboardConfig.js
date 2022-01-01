export default {
  widgets: [
    { name: 'structure-menu' },
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
