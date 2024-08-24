import { useState } from "react";
import {
  useLocalVideo,
  useLocalAudio,
  useLocalScreenShare,
  useRoom,
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
    changeVideoSource,
  } = useLocalVideo();
  const { enableAudio, disableAudio, isAudioOn } = useLocalAudio();
  const { startScreenShare, stopScreenShare, shareStream } =
    useLocalScreenShare();

  const { leaveRoom } = useRoom({
    onLeave: () => {
      setJoin(false);
    },
  });

  // const switchCamera = async() => {
  //   console.log("bbbbb");
  //  await changeVideoSource("environment");
  //   setShowBackCamera(true);
  // };
  // const switchCameraBack = async() => {
  //   console.log("ddddd");
  //   await changeVideoSource("front");
  //   setShowBackCamera(false);
  // };

  const switchCamera = async () => {
    try {
      console.log("Switching to back camera...");
      await changeVideoSource("environment");
      console.log("Back camera active");
      setShowBackCamera(true);
    } catch (error) {
      console.error("Error switching to back camera:", error);
    }
  };

  const switchCameraBack = async () => {
    try {
      console.log("Switching to front camera...");
      await changeVideoSource("front");
      console.log("Front camera active");
      setShowBackCamera(false);
    } catch (error) {
      console.error("Error switching to front camera:", error);
    }
  };

  return (
    <>
      {videoStream && <Video stream={videoStream} />}
      <div className="absolute inset-x-5 bottom-5 flex flex-row items-center z-50 text-yellow">
      <p>Current Camera: {showBackCamera ? "Back" : "Front"}</p>
        <div className="flex flex-row items-center">
          {videoStream && (
            <div
              className="block text-2xl border border-yellow rounded-full p-2.5 bg-[#222] md:block lg:hidden"
              onClick={() => {
                showBackCamera ? switchCameraBack() : switchCamera();
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
