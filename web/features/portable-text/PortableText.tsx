import { Box, Container, Stack } from "@chakra-ui/react";
import React from "react";
import { BasePortableText } from "../../lib/sanity";
import { TextLink } from "../design-system/TextLink";
import { BlockBlock } from "./blocks/BlockBlock";
import { CodeBlock } from "./blocks/CodeBlock";
import { CodePenBlock } from "./blocks/CodePenBlock";
import { CodeSandboxBlock } from "./blocks/CodeSandboxBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { TwitterBlock } from "./blocks/TwitterBlock";
import { YouTubeBlock } from "./blocks/YouTubeBlock";

const defaultSerializers = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: BlockBlock,
    code: CodeBlock,
    codeSandbox: CodeSandboxBlock,
    codePen: CodePenBlock,
    youtube: YouTubeBlock,
    twitter: TwitterBlock,
    mainImage: ImageBlock,
  },
  marks: {
    link: (props: any) => (
      <TextLink href={props.mark.href}>{props.children}</TextLink>
    ),
  },
  container: (props: any) => <Stack {...props} spacing={6} />,
};

export const PortableText = ({ blocks }: any) => {
  return <BasePortableText blocks={blocks} serializers={defaultSerializers} />;
};

const withWrap = (maxWidth: "wide" | "default" = "default") => (
  Component: React.ComponentType
) => (props: any) => (
  <Box>
    <Container maxWidth={maxWidth === "wide" ? "90ch" : "60ch"}>
      <Component {...props} />
    </Container>
  </Box>
);

const blogPostSerializers = {
  ...defaultSerializers,
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    block: withWrap()(BlockBlock),
    code: withWrap("wide")(CodeBlock),
    codeSandbox: withWrap("wide")(CodeSandboxBlock),
    codePen: withWrap("wide")(CodePenBlock),
    youtube: withWrap("wide")(YouTubeBlock),
    twitter: withWrap("wide")(TwitterBlock),
    mainImage: withWrap("wide")(ImageBlock),
  },
};

export const BlogPostPortableText = ({ blocks }: any) => {
  return <BasePortableText blocks={blocks} serializers={blogPostSerializers} />;
};
