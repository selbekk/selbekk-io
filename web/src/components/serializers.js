import React from 'react';
import Figure from './Figure';
import { CodeBlock } from './CodeBlock';
import { CodeSandboxBlock } from './CodeSandboxBlock';

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    code: CodeBlock,
    codeSandbox: CodeSandboxBlock,
  },
};

export default serializers;
