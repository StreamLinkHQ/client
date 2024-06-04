import {
  useLocalVideo,
  useLocalAudio,
  useLocalScreenShare,
  useRoom,
} from "@huddle01/react/hooks";
import { Audio, Video } from "@huddle01/react/components";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
} from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { MdCallEnd } from "react-icons/md";

type CallControlsProps = {
  userType: string | null;
  setJoin: Function;
};

const CallControls = ({ userType, setJoin }: CallControlsProps) => {
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

  const { leaveRoom } = useRoom({
    onLeave: () => {
      setJoin(false);
    },
  });

  return (
    <>
      {videoStream && <Video stream={videoStream} />}
      <div className="absolute left-5 bottom-5 flex flex-row items-center z-50 text-yellow">
        <div className="flex flex-row items-center">
          <div
            className="mx-2"
            onClick={() => {
              isVideoOn ? disableVideo() : enableVideo();
            }}
          >
            {isVideoOn ? (
              <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                <BsCameraVideo />
              </div>
            ) : (
              <button className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                <BsCameraVideoOff />
              </button>
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
                <BsMicMute />
              </div>
            ) : (
              <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                <BsMic />
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

        <div className="ml-10">
          <button
            onClick={() => leaveRoom()}
            className="text-white bg-red-600 mx-auto p-3 rounded-full flex flex-col items-center "
          >
            <MdCallEnd className="text-3xl text-white" />
          </button>
        </div>
      </div>
    </>
  );
};

export default CallControls;
