import { usePeerIds } from "@huddle01/react/hooks";
import Creator from "./creator";
import Audience from "./audience";
import Peer from "./peer";

type ContainerProps = {
  userType: string | null;
  setJoin: Function;
};

const Container = ({ userType, setJoin }: ContainerProps) => {
  const { peerIds } = usePeerIds({ roles: ["host", "co-host"] });
  return (
    <div className="relative h-screen w-full">
      <div className="absolute h-screen top-0 z-50 border border-red-600 w-full">
        {peerIds.map((peerId) => {
          return <Peer peerId={peerId} />;
        })}
      </div>
      {userType === "host" ? (
        <Creator userType={userType} setJoin={setJoin}/>
      ) : (
        <Audience userType={userType} setJoin={setJoin}/>
      )}
    </div>
  );
};

export default Container;
