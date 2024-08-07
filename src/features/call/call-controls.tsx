import { useState } from "react";
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
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdCallEnd } from "react-icons/md";
import  CallChat from "./call-chat";

type CallControlsProps = {
  userType: string | null;
  setJoin: Function;
};

const CallControls = ({ userType, setJoin }: CallControlsProps) => {
  const [showChatInput, setShowChatInput] = useState<boolean>(false);
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
          {audioStream && <Audio stream={audioStream} />}
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
      {showChatInput && <CallChat setShowModal={setShowChatInput}/>}
      </>
  );
};

export default CallControls;
