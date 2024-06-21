import { CreatorContextProvider } from "../../context";
import { CallMeta, CallFeatures, CallControls } from "../call";

type CreatorProps = {
  userType: string | null;
  setJoin: Function;
};

const Creator = ({ userType, setJoin }: CreatorProps) => {
  return (
    <CreatorContextProvider>
      <div className="relative h-screen w-full bg-[#222]">
        <CallMeta />
        <CallFeatures userType={userType} />
        <CallControls userType={userType} setJoin={setJoin} />
      </div>
    </CreatorContextProvider>
  );
};

export default Creator;
