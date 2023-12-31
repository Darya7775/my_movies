import React from "react";
import { YouTubeProps } from "react-youtube";
import { StyleYoutube } from "./styles";

interface Props {
  videoId: string | undefined
}

const MyYouTube: React.FC<Props> = (props: Props) => {

  const opts: YouTubeProps["opts"] = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      loop: 1,
      title: "Trailer movie",
    },
  };

  return <StyleYoutube videoId={props.videoId} opts={opts} />;
};

export default MyYouTube;
