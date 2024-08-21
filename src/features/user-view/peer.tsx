import {
  useRemoteVideo,
  useRemoteAudio,
  useRemoteScreenShare,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";

type PeerProps = {
  peerId: string;
};
const Peer = ({ peerId }: PeerProps) => {
  const { stream: videoStream } = useRemoteVideo({ peerId });
  const { stream: audioStream } = useRemoteAudio({ peerId });
  const { videoStream: screenVideoStream, audioStream: screenAudioStream } =
    useRemoteScreenShare({ peerId });
    
  return (
    <div className="h-screen w-full absolute top-0 overflow-hidden">
      {videoStream && (
        <Video
          stream={videoStream}
          className={` w-full aspect-w-16 aspect-h-9 rounded-lg shadow-lg`}
        />
      )}
      {audioStream && <Audio stream={audioStream} />}
      {screenVideoStream && (
        <Video
          stream={screenVideoStream}
          className={`border-2 border-yellow h-[40%] w-full`}
        />
      )}
      {screenAudioStream && <Audio stream={screenAudioStream} />}
    </div>
  );
};

export default Peer;
