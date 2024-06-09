import { usePeerIds } from "@huddle01/react/hooks";
import { FaCircle } from "react-icons/fa";

const CallMeta = () => {
  const { peerIds } = usePeerIds({ roles: ["host", "co-host", "guest"] });
  console.log(peerIds)
  return (
    <div className="absolute z-50 top-0 flex flex-row justify-between items-center w-full p-3.5 box-border bg-call-meta">
      <button className="border border-[#E85F5F] text-2xl px-4 py-1.5 rounded-lg">
        00:00
      </button>
      <button className="border border-[#E85F5F] px-4 py-0.5 rounded-lg flex flex-row justify-between items-center">
        <FaCircle className="text-xs text-[#E85F5F] mr-1" />
        {peerIds.length}
      </button>
    </div>
  );
};

export default CallMeta;
