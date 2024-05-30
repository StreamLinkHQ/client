import { CallMeta, Controls } from "../call";

type CreatorProps = {
  userType: string | null;
};

const Creator = ({ userType }: CreatorProps) => {
  return (
    <div className="relative h-screen w-full">
      <CallMeta />
      <Controls userType={userType} />
    </div>
  );
};

export default Creator;
