import { useContext, useRef, useEffect } from "react";
import { usePeerIds } from "@huddle01/react/hooks";
import { ChatContext } from "../../context";
import Creator from "./creator";
import Audience from "./audience";
import Peer from "./peer";

type ContainerProps = {
  userType: string | null;
  setJoin: Function;
  meetingId: string | undefined;
};

const Container = ({ userType, setJoin, meetingId }: ContainerProps) => {
  const { peerIds } = usePeerIds({ roles: ["host", "co-host", "guest"] });
  const { messages } = useContext(ChatContext);
  const containerRef = useRef<HTMLInputElement>(null);
  console.log(messages);

  useEffect(() => {
    if (containerRef && containerRef.current) {
      const element = containerRef.current;
      element.scroll({
        top: element.scrollHeight,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [containerRef, messages]);

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="relative z-50 border border-green-600 w-full">
        {peerIds.map((peerId) => {
          return <Peer peerId={peerId} key={peerId} userType={userType}/>;
        })}
      </div>
      <div
        className="absolute bottom-20 left-5 z-[80] text-white max-h-[180px] overflow-hidden p-2.5"
        ref={containerRef}
      >
        {messages.map((message, i) => (
          <div key={i} className="flex flex-row items-center text-sm">
            <p>{message.sender}:</p>
            <p className="ml-1">{message.text}</p>
          </div>
        ))}
      </div>
      {userType === "host" ? (
        <Creator userType={userType} setJoin={setJoin} meetingId={meetingId}/>
      ) : (
        <Audience userType={userType} setJoin={setJoin} meetingId={meetingId}/>
      )}
    </div>
  );
};

export default Container;
