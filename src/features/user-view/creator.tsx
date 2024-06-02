import { CallMeta, CallFeatures, CallControls } from "../call";

type CreatorProps = {
  userType: string | null;
};

const Creator = ({ userType }: CreatorProps) => {
  return (
    <div className="relative h-screen w-full bg-[#222]">
      <CallMeta />
      <CallFeatures userType={userType} />
      <CallControls userType={userType} />
    </div>
  );
};

export default Creator;
