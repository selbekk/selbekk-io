import React from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import js from 'react-syntax-highlighter/dist/esm/languages/prism/javascript';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import elm from 'react-syntax-highlighter/dist/esm/languages/prism/elm';
import prism from 'react-syntax-highlighter/dist/esm/styles/prism/prism';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('tsx', tsx);
SyntaxHighlighter.registerLanguage('elm', js);

export const CodeBlock = ({ node }) => {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>;
};
