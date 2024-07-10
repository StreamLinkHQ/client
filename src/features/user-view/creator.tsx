import { CreatorContextProvider } from "../../context";
import { CallMeta, CallFeatures, CallControls } from "../call";

type CreatorProps = {
  userType: string | null;
  setJoin: Function;
  meetingId: string | undefined;
};

const Creator = ({ userType, setJoin, meetingId }: CreatorProps) => {
  return (
    <CreatorContextProvider>
      <div className="relative h-screen w-full bg-[#222]">
        <CallMeta />
        <CallFeatures userType={userType} meetingId={meetingId}/>
        <CallControls userType={userType} setJoin={setJoin} />
      </div>
    </CreatorContextProvider>
  );
};

export default Creator;
