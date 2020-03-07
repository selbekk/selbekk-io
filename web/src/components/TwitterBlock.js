import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const getTweetId = (url) => {
  if (!url) {
    return '';
  }
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split('/').pop();
};

export const TwitterBlock = ({ node } = {}) => {
  const id = getTweetId(node ? node.url : null);
  if (!id) return null;
  return (
    <div style={{ margin: '0 auto' }}>
      <TwitterTweetEmbed tweetId={id} />
    </div>
  );
};
