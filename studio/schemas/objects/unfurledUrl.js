import { PreviewLink } from "@opengraphninja/react";
import "@opengraphninja/react/styles.css?raw";

export default {
  type: "object",
  name: "unfurledUrl",
  title: "Unfurled URL",
  fields: [
    {
      name: "url",
      type: "url",
      description: "The URL to unfurl",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      href: "url",
    },
    component: (props) => (
      <PreviewLink href={props.value.href} />
    ),
  },
};
