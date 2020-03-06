import React from 'react';
import Figure from './Figure';
import { CodeBlock } from './CodeBlock';
import { CodeSandboxBlock } from './CodeSandboxBlock';
import { CodePenBlock } from './CodePenBlock';
import { YouTubeBlock } from './YouTubeBlock';
import { TwitterBlock } from './TwitterBlock';

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    code: CodeBlock,
    codeSandbox: CodeSandboxBlock,
    codePen: CodePenBlock,
    youtube: YouTubeBlock,
    twitter: TwitterBlock,
  },
};

export default serializers;
