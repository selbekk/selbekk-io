import React from 'react';
import Figure from './Figure';
import { CodeBlock } from './CodeBlock';
import { CodeSandboxBlock } from './CodeSandboxBlock';
import { CodePenBlock } from './CodePenBlock';
import { YouTubeBlock } from './YouTubeBlock';

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    code: CodeBlock,
    codeSandbox: CodeSandboxBlock,
    codePen: CodePenBlock,
    youtube: YouTubeBlock,
  },
};

export default serializers;
