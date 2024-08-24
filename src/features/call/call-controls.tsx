import { useState } from "react";
import {
  useLocalVideo,
  useLocalAudio,
  useLocalScreenShare,
  useRoom,
  useDevices,
  useLocalMedia,
} from "@huddle01/react/hooks";
import { Video } from "@huddle01/react/components";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
} from "react-icons/bs";
import { LuScreenShare, LuScreenShareOff } from "react-icons/lu";
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdCallEnd, MdFlipCameraIos } from "react-icons/md";
import CallChat from "./call-chat";

type CallControlsProps = {
  userType: string | null;
  // eslint-disable-next-line @typescript-eslint/ban-types
  setJoin: Function;
};

const CallControls = ({ userType, setJoin }: CallControlsProps) => {
  const [showChatInput, setShowChatInput] = useState<boolean>(false);
  const [showBackCamera, setShowBackCamera] = useState<boolean>(false);
  const {
    stream: videoStream,
    enableVideo,
    disableVideo,
    isVideoOn,
  } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();
  const { startScreenShare, stopScreenShare, shareStream } =
    useLocalScreenShare();

  const { replaceStream } = useLocalMedia();
  const { setPreferredDevice } = useDevices({ type: "cam" });

  const { leaveRoom } = useRoom({
    onLeave: () => {
      setJoin(false);
    },
  });

  const switchToEnvironment = async (facingMode: "environment" | "user") => {
    if (!isVideoOn) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: facingMode,
      },
    });
    const deviceId = stream?.getVideoTracks()[0]?.getSettings().deviceId;
    if (!deviceId) {
      throw new Error("This must never happen, a bug in browser");
    }
    setPreferredDevice(deviceId);
    setShowBackCamera(!showBackCamera);
    replaceStream("video", stream).catch(console.error);
  };
  return (
    <>
      {videoStream && <Video stream={videoStream} />}
      <div className="absolute inset-x-5 bottom-5 flex flex-row items-center z-50 text-yellow">
        <p>Current Camera: {showBackCamera ? "Back" : "Front"}</p>
        <div className="flex flex-row items-center">
          {videoStream && (
            <div
              className="block text-2xl border border-yellow rounded-full p-2.5 bg-[#222] md:block lg:block"
              onClick={() => {
                showBackCamera
                  ? switchToEnvironment("environment")
                  : switchToEnvironment("user");
              }}
            >
              <MdFlipCameraIos />
            </div>
          )}
          <div
            className="mx-1"
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
            className="mx-1"
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
          {userType === "host" && (
            <div
              onClick={() => {
                shareStream ? stopScreenShare() : startScreenShare();
              }}
              className="mx-1"
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

        <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
          <IoChatbubblesOutline onClick={() => setShowChatInput(true)} />
        </div>
        <div className="ml-8">
          <button
            onClick={() => leaveRoom()}
            className="text-white bg-red-600 mx-auto p-3 rounded-full flex flex-col items-center "
          >
            <MdCallEnd className="text-3xl text-white" />
          </button>
        </div>
      </div>
      {showChatInput && <CallChat setShowModal={setShowChatInput} />}
    </>
  );
};

export default CallControls;
