import { CallMeta, Controls } from "../call";

type AudienceProps = {
  userType: string | null;
};

const Audience = ({ userType }: AudienceProps) => {
  return (
    <div className="relative h-screen w-full">
      <CallMeta />
      <Controls userType={userType} />
    </div>
  );
};

export default Audience;
