import { CallMeta, CallFeatures, CallControls } from "../call";

type AudienceProps = {
  userType: string | null;
  setJoin: Function;
  meetingId: string | undefined;
};

const Audience = ({ userType, setJoin, meetingId }: AudienceProps) => {
  return (
    <div className="relative h-screen w-full bg-[#222]">
      <CallMeta />
      <CallFeatures userType={userType} meetingId={meetingId}/>
      <CallControls userType={userType} setJoin={setJoin}/>
    </div>
  );
};

export default Audience;
