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
    <div className="h-screen w-full">
      {videoStream && (
        <Video
          stream={videoStream}
          height={400}
          width={"100%"}
          className={`border-2 border-yellow ${
            screenVideoStream !== null ? "h-[56%]" : "h-full"
          } w-full`}
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
