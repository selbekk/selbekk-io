import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

export const YouTubeBlock = ({ value } = {}) => {
  if (!value) {
    return null;
  }
  const id = getYouTubeId(value.url); // shivvers..
  return <YouTube videoId={id} />;
};
