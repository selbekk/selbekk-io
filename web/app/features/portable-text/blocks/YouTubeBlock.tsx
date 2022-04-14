import { Box, useBreakpointValue } from "@chakra-ui/react";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";

export const YouTubeBlock = (props: any) => {
  const height = useBreakpointValue({ base: "300px", md: "500px" });
  if (!props.value.url) {
    return null;
  }
  const id = getYouTubeId(props.value.url);
  return (
    <Box boxShadow="lg">
      <YouTube videoId={id as string} opts={{ width: "100%", height }} />
    </Box>
  );
};
