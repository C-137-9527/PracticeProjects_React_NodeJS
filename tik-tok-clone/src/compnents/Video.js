import React, { useRef, useState } from "react";
import VideoFooter from "./VideoFooter";
import VideoSidebar from "./VideoSidebar";

function Video() {
  const [play, setPlay] = useState(false);
  const videoRef = useRef();

  const handleVideoPlay = () => {
    if (play) {
      videoRef.current.pause();
      setPlay(false);
    } else {
      videoRef.current.play();
      setPlay(true);
    }
  };

  return (
    <div className="video">
      <video
        ref={videoRef}
        className="video__player"
        src="https://v16-webapp.tiktok.com/dd4d1154014988ecc86d8c22ae7a566a/61da5964/video/tos/useast2a/tos-useast2a-ve-0068c003/4bf0d4cdb04d419291faa15d20e2cc4e/?a=1988&br=3494&bt=1747&cd=0%7C0%7C1&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=Yu12_FFnkag3-I&l=2022010821411201019106002411F24E22&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=M2U6cDk6ZmZ1OTMzNzczM0ApOGk7Z2c0ZjtnNzQ0Omk1PGdhY2pecjRnMWhgLS1kMTZzc2FhLy9hM2BeNTUzLTEtLS86Yw%3D%3D&vl=&vr="
        loop
        onClick={handleVideoPlay}
      ></video>
      <VideoFooter
        channel={"alvin"}
        description={"lorem ipsum"}
        song={"song"}
      />
      <VideoSidebar likes={300} messages={"messages"} shares={100} />
    </div>
  );
}

export default Video;
