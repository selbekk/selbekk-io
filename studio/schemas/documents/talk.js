import { FaMicrophoneAlt } from 'react-icons/fa';
export default {
  name: 'talk',
  type: 'document',
  title: 'Talk',
  icon: FaMicrophoneAlt,
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
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image',
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
      name: 'excerpt',
      type: 'bioPortableText',
      title: 'Short summary',
    },
    {
      name: 'description',
      type: 'bioPortableText',
      title: 'Talk description',
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        {
          type: 'reference',
          to: {
            type: 'category',
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'where',
    },
  },
};
