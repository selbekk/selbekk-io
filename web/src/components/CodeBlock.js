import React from 'react';

const SyntaxHighlighter = React.lazy(() => import('react-syntax-highlighter'));

// This looks similar enough to work as a decoy while we download the big bad
// syntax highlighting bundle
const PlaceholderCodeBlock = ({ children }) => (
  <pre style={{ padding: '0.5em', backgroundColor: 'rgb(240, 240, 240)' }}>
    <code>{children}</code>
  </pre>
);

export const CodeBlock = ({ node }) => {
  if (!node || !node.code) {
    return null;
  }
  const { language, code } = node;
  return (
    <React.Suspense
      fallback={<PlaceholderCodeBlock>{code}</PlaceholderCodeBlock>}
    >
      <SyntaxHighlighter language={language}>{code}</SyntaxHighlighter>
    </React.Suspense>
  );
};
