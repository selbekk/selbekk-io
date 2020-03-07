import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

export const YouTubeBlock = ({ node } = {}) => {
  if (!node) {
    return null;
  }
  const id = getYouTubeId(node.url); // shivvers..
  return <YouTube videoId={id} />;
};
