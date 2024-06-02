import { CallMeta, CallFeatures, CallControls } from "../call";

type AudienceProps = {
  userType: string | null;
};

const Audience = ({ userType }: AudienceProps) => {
  return (
    <div className="relative h-screen w-full bg-[#222]">
      <CallMeta />
      <CallFeatures userType={userType} />
      <CallControls userType={userType} />
    </div>
  );
};

export default Audience;
