import { useContext, useEffect } from "react";
import { useLocalVideo, useLocalAudio, useRoom } from "@huddle01/react/hooks";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Audio, Video } from "@huddle01/react/components";
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsMic,
  BsMicMute,
} from "react-icons/bs";
import { AuthContext } from "../../context";
import { HomeLayout } from "../ui";

type WaitRoomProps = {
  showButton: boolean;
  token: string;
  roomId: string | undefined;
  setJoin: Function;
};

const WaitRoom = ({ showButton, token, roomId, setJoin }: WaitRoomProps) => {
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
  const { user } = useContext(AuthContext);
  const { setShowAuthFlow } = useDynamicContext();

  const { joinRoom } = useRoom({
    onJoin: () => {
      setJoin(true);
    },
  });

  const joinCall = async () => {
    if (!roomId) {
      return;
    }
    if (Object.values(user).length === 0) {
      setShowAuthFlow(true);
      return;
    }
    await joinRoom({
      roomId,
      token,
    });
  };

  useEffect(() => {
    if (Object.values(user).length !== 0) {
      joinCall();
      return;
    }
  }, [user]);

  return (
    <HomeLayout>
      <>
        <div className="flex flex-col lg:flex-row text-yellow items-center w-[94%] lg:w-[80%] mx-auto py-5">
          <div className="mb-3 relative bg-[#222] h-[200px] lg:h-[450px] border border-yellow w-full lg:w-[70%] rounded-lg">
            {videoStream && (
              <Video
                stream={videoStream}
                height={"100%"}
                width={"100%"}
                className="h-full rounded-lg"
              />
            )}
            <div className="flex flex-row absolute bottom-3">
              <div
                className="mx-2"
                onClick={() => {
                  isVideoOn ? disableVideo() : enableVideo();
                }}
              >
                {!isVideoOn ? (
                  <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                    <BsCameraVideoOff />
                  </div>
                ) : (
                  <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                    <BsCameraVideo />
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
                    <BsMicMute />
                  </div>
                ) : (
                  <div className="text-2xl border border-yellow rounded-full p-2.5 bg-[#222]">
                    <BsMic />
                  </div>
                )}
              </div>
              {audioStream && <Audio stream={audioStream} />}
            </div>
          </div>
          <div className="lg:ml-3">
            {showButton && (
              <button
                className="text-black bg-yellow rounded-md py-1.5 px-5 font-bold"
                onClick={joinCall}
              >
                Join Stream
              </button>
            )}
          </div>
        </div>
      </>
    </HomeLayout>
  );
};

export default WaitRoom;
