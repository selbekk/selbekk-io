import React from 'react';
import { TwitterTweetEmbed } from 'react-twitter-embed';

const getTweetId = (url) => {
  if (!url) {
    throw Error('no url given to Twitter embed');
  }
  const parsedUrl = new URL(url);
  return parsedUrl.pathname.split('/').pop();
};

const Preview = ({ value }) => {
  const { url } = value;
  const id = getTweetId(url); // shivvers..
  return <TwitterTweetEmbed tweetId={id} />;
};

export default {
  name: 'twitter',
  type: 'object',
  title: 'Twitter Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Tweet URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
    component: Preview,
  },
};
