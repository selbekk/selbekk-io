import getYoutubeId from "get-youtube-id";
import YouTube from "react-youtube";

type VideoViewerProps = {
  src: string;
};

export const VideoViewer = ({ src }: VideoViewerProps) => {
  if (src.includes("youtube.com")) {
    const id = getYoutubeId(src) || undefined;
    return <YouTube videoId={id} opts={{ width: "100%", height: "600px" }} />;
  }
  if (src.includes("vimeo.com")) {
    const id = src.split("/").pop();
    return (
      <iframe
        title={id}
        src={`https://player.vimeo.com/video/${id}`}
        width="100%"
        height="400px"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture"
      />
    );
  }
  return null;
};
