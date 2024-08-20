
import {
  useRemoteVideo,
  useRemoteAudio,
  useRemoteScreenShare,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import { useEffect, useState } from "react";

type PeerProps = {
  peerId: string;
  userType: string | null;
};
const Peer = ({ peerId, userType }: PeerProps) => {
  const [isUserHost, setIsUserHost] = useState(false)
  const { stream: videoStream } = useRemoteVideo({ peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId });
  // const { videoStream: screenVideoStream, audioStream: screenAudioStream } =
  //   useRemoteScreenShare({ peerId });

    useEffect(
      () => {
        if(userType === "host"){
          setIsUserHost(true)
        }
        else {
          setIsUserHost(false)
        }
      },
      [userType],
    )
    
  return (
    <div className="h-screen w-full absolute top-0 border border-red-500 overflow-hidden">
      {videoStream && (
        <Video
          stream={videoStream}
          className={` w-full aspect-w-16 aspect-h-9 rounded-lg shadow-lg border-4 border-green-700`}
        />
      )}
      {audioStream && <Audio stream={audioStream} />}
      {/* {screenVideoStream && (
        <Video
          stream={screenVideoStream}
          className={`border-2 border-yellow h-[40%] w-full`}
        />
      )}
      {screenAudioStream && <Audio stream={screenAudioStream} />} */}
    </div>
  );
};

export default Peer;
