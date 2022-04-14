import { Code, ListItem, UnorderedList } from "@chakra-ui/react";
import { PortableText as BasePortableText } from "@portabletext/react";
import { TextLink } from "../design-system/TextLink";
import { BlockBlock } from "./blocks/BlockBlock";
import { CodeBlock } from "./blocks/CodeBlock";
import { CodePenBlock } from "./blocks/CodePenBlock";
import { CodeSandboxBlock } from "./blocks/CodeSandboxBlock";
import { ImageBlock } from "./blocks/ImageBlock";
import { TwitterBlock } from "./blocks/TwitterBlock";
import { UnfurledUrlBlock } from "./blocks/UnfurledUrlBlock";
import { YouTubeBlock } from "./blocks/YouTubeBlock";

const components = {
  types: {
    authorReference: ({ node }: any) => <span>{node.author.name}</span>,
    code: CodeBlock,
    codeSandbox: CodeSandboxBlock,
    codePen: CodePenBlock,
    youtube: YouTubeBlock,
    twitter: TwitterBlock,
    mainImage: ImageBlock,
    unfurledUrl: UnfurledUrlBlock,
  },
  block: {
    h1: BlockBlock,
    h2: BlockBlock,
    h3: BlockBlock,
    h4: BlockBlock,
    h5: BlockBlock,
    h6: BlockBlock,
    normal: BlockBlock,
  },
  marks: {
    code: (props: any) => {
      return <Code>{props.children}</Code>;
    },
    link: (props: any) => {
      return <TextLink href={props.value.href}>{props.children}</TextLink>;
    },
  },
  list: (props: any) => (
    <UnorderedList mt={6} maxWidth="xl" mx="auto" pl={6} fontSize="lg">
      {props.children}
    </UnorderedList>
  ),
  listItem: (props: any) => <ListItem mt={2}>{props.children}</ListItem>,
};

export const PortableText = ({ blocks }: any) => {
  return <BasePortableText value={blocks} components={components} />;
};
