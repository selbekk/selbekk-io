export default {
  name: 'talk',
  type: 'document',
  title: 'Talk',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Create a special slug, or generate one',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'when',
      type: 'datetime',
      title: 'When was the talk recorded?',
    },
    {
      name: 'where',
      type: 'string',
      title: 'Where was the talk recorded?',
    },
    {
      name: 'videoUrl',
      type: 'url',
      title: 'Video URL',
    },
    {
      name: 'description',
      type: 'bioPortableText',
      title: 'Talk description',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
      media: 'image',
    },
  },
};
