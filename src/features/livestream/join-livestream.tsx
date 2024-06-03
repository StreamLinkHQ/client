import { useState, useEffect, useContext } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { AuthContext } from "../../context";
import { useGenerateStreamToken } from "./use-livestream";
import WaitRoom from "./wait-room";
import { Container } from "../user-view";

const JoinLivestream = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const generateToken = useGenerateStreamToken();
  const mode = searchParams.get("mode");
  const [joinedCall, setJoinedCall] = useState(false);
  const { user } = useContext(AuthContext)
  const { setShowAuthFlow } = useDynamicContext();

  const joinCall = () => {
    console.log("hyyy");
    const data = {
      roomId: id,
      userType: mode,
    };
    generateToken.mutate(data);
  };

  console.log(joinedCall);
  console.log(generateToken.data);
  console.log(generateToken.isPending);

  const isSignedIn = () => {
    if (Object.values(user).length === 0) {
      setShowAuthFlow(true)
      return;
    }
  }

  useEffect(() => {
    joinCall();
    isSignedIn()
  }, []);

  return (
    <div className="bg-[#222] h-screen w-full">
      {joinedCall ? (
        <Container userType={mode} />
      ) : (
        <WaitRoom
          showButton={generateToken.isSuccess}
          token={generateToken.data}
          roomId={id}
          setJoin={setJoinedCall}
        />
      )}
    </div>
  );
};

export default JoinLivestream;
