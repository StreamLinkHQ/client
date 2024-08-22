import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { ChatContextProvider } from "../../context";
import { useGenerateStreamToken } from "./use-livestream";
import WaitRoom from "./wait-room";
import { Loader, ErrorScreen } from "../ui";
import { Container } from "../user-view";

const JoinLivestream = () => {
  const { id } = useParams();
  // @ts-ignore
  const [searchParams, setSearchParams] = useSearchParams();
  const generateToken = useGenerateStreamToken();
  const mode = searchParams.get("mode");
  const [joinedCall, setJoinedCall] = useState(false);

  const joinCall = () => {
    const data = {
      roomId: id,
      userType: mode,
    };
    generateToken.mutate(data);
  };

  useEffect(() => {
    joinCall();
  }, []);

  return (
    <>
      <div className="bg-[#222] h-screen w-full">
        {joinedCall ? (
          <ChatContextProvider>
            <Container userType={mode} setJoin={setJoinedCall} meetingId={id} />
          </ChatContextProvider>
        ) : (
          <WaitRoom
            showButton={generateToken.isSuccess}
            token={generateToken.data}
            roomId={id}
            setJoin={setJoinedCall}
          />
        )}
      </div>
      {generateToken.isPending && <Loader />}
      {generateToken.isError && (
        <ErrorScreen message={generateToken.error.message} />
      )}
    </>
  );
};

export default JoinLivestream;
