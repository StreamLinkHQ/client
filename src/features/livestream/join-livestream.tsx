import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useGenerateStreamToken } from "./use-livestream";
import WaitRoom from "./wait-room";
import { Container } from "../user-view";

const JoinLivestream = () => {
  const { id } = useParams();
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

  console.log(generateToken.data)

  return (
    <>
      <div className="bg-[#222] h-screen w-full">
        {joinedCall ? (
          <Container userType={mode} setJoin={setJoinedCall} />
        ) : (
          <WaitRoom
            showButton={generateToken.isSuccess}
            token={generateToken.data}
            roomId={id}
            setJoin={setJoinedCall}
          />
        )}
      </div>
    </>
  );
};

export default JoinLivestream;
