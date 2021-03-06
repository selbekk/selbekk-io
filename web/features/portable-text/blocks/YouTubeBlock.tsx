import { Box, useBreakpointValue } from "@chakra-ui/react";
import getYouTubeId from "get-youtube-id";
import React from "react";
import YouTube from "react-youtube";

export const YouTubeBlock = ({ node }: any) => {
  if (!node) {
    return null;
  }
  const id = getYouTubeId(node?.url); // shivvers..
  const height = useBreakpointValue({ base: "300px", md: "500px" });
  return (
    <Box boxShadow="lg">
      <YouTube videoId={id as string} opts={{ width: "100%", height }} />
    </Box>
  );
};
