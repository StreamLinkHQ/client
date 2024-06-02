import {
  useLocalVideo,
  useLocalAudio,
  useLocalScreenShare,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
} from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";

type CallControlsProps = {
  userType: string | null;
};

const CallControls = ({ userType }: CallControlsProps) => {
  const {
    stream: videoStream,
    enableVideo,
    disableVideo,
    isVideoOn,
  } = useLocalVideo();
  const {
    stream: audioStream,
    enableAudio,
    disableAudio,
    isAudioOn,
  } = useLocalAudio();
  const { startScreenShare, stopScreenShare, shareStream } =
    useLocalScreenShare();
  return (
    <>
      {videoStream && <Video stream={videoStream} />}
      <div className="absolute left-5 bottom-5 flex flex-row items-center z-30 text-yellow">
        <div
          onClick={() => {
            isVideoOn ? disableVideo() : enableVideo();
          }}
          className="mx-2"
        >
          {!isVideoOn ? (
            <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
              <BsCameraVideo />
            </div>
          ) : (
            <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
              <BsCameraVideoOff />
            </div>
          )}
        </div>

        <div
          onClick={() => {
            isAudioOn ? disableAudio() : enableAudio();
          }}
          className="mx-2"
        >
          {!isAudioOn ? (
            <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
              <BsMic />
            </div>
          ) : (
            <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
              <BsMicMute />
            </div>
          )}
        </div>
        {audioStream && <Audio stream={audioStream} />}
        {userType === "host" && (
          <div
            onClick={() => {
              shareStream ? stopScreenShare() : startScreenShare();
            }}
            className="mx-2"
          >
            {!shareStream ? (
              <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                <LuScreenShare />
              </div>
            ) : (
              <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                <LuScreenShareOff />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default CallControls;
