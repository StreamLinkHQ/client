import { CallMeta, CallFeatures, CallControls } from "../call";

type AudienceProps = {
  userType: string | null;
  setJoin: Function;
};

const Audience = ({ userType, setJoin }: AudienceProps) => {
  return (
    <div className="relative h-screen w-full bg-[#222]">
      <CallMeta />
      <CallFeatures userType={userType} />
      <CallControls userType={userType} setJoin={setJoin}/>
    </div>
  );
};

export default Audience;
