import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

export const YouTubeBlock = ({ value } = {}) => {
  const { url } = value;
  const id = getYouTubeId(url); // shivvers..
  return <YouTube videoId={id} />;
};
