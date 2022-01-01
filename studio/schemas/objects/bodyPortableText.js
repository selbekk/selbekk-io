import {
  FiCodepen,
  FiCodesandbox,
  FiLink2,
  FiTwitter,
  FiYoutube,
} from 'react-icons/fi';
export default {
  name: 'bodyPortableText',
  type: 'array',
  title: 'Post body',
  of: [
    {
      type: 'block',
      title: 'Block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Number', value: 'number' },
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          { title: 'Strike', value: 'strike-through' },
        ],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'URL',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
              },
            ],
          },
        ],
      },
      of: [{ type: 'authorReference' }],
    },
    {
      type: 'mainImage',
      options: { hotspot: true },
    },
    // Code blocks
    {
      type: 'code',
      options: {
        languageAlternatives: [
          { title: 'CSS', value: 'css' },
          { title: 'HTML', value: 'html' },
          { title: 'JSON', value: 'json' },
          { title: 'JSX', value: 'jsx' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Plain text', value: 'text' },
          { title: 'Elm', value: 'elm' },
        ],
      },
    },
    // Code Sandbox block
    { type: 'codeSandbox', icon: FiCodesandbox },
    // CodePen block
    { type: 'codePen', icon: FiCodepen },
    // Youtube embeds
    { type: 'youtube', icon: FiYoutube },
    // Twitter embeds
    { type: 'twitter', icon: FiTwitter },
    // Unfurled URL
    { type: 'unfurledUrl', icon: FiLink2 },
  ],
};
