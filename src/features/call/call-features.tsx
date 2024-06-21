import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosShareAlt, IoMdWallet } from "react-icons/io";
import { BsAppIndicator } from "react-icons/bs";
import { MdLeaderboard } from "react-icons/md";
import { Wallet } from "../auth";
import { CreatorModal, AudienceModal } from "../feature-modal";
import { LeaderBoard } from "../leader-board";

type CallFeatureProps = {
  userType: string | null;
};

const CallFeatures = ({ userType }: CallFeatureProps) => {
  const [showWallet, setShowWallet] = useState(false);
  const [showFeature, setShowFeature] = useState(false);
  const [showWinners, setShowWinners] = useState(false);

  return (
    <>
      <div className="absolute right-5 bottom-1/4 flex flex-col items-center z-50 text-yellow">
        {userType === "host" && (
          <div
            className="flex flex-col items-center"
            onClick={() => setShowFeature(true)}
          >
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <FaPlus className="text-xl" />
            </button>
            <p className="text-sm">Add</p>
          </div>
        )}
        <div className="flex flex-col items-center my-2.5">
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoIosShareAlt className="text-xl" />
          </button>
          <p className="text-sm">Share</p>
        </div>
        <div
          className="flex flex-col items-center mb-2.5"
          onClick={() => setShowWallet(true)}
        >
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoMdWallet className="text-xl" />
          </button>
          <p className="text-sm">Wallet</p>
        </div>

        {userType === "guest" && (
          <div
            className="flex flex-col items-center mb-2.5"
            onClick={() => setShowFeature(true)}
          >
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <BsAppIndicator className="text-xl" />
            </button>
            <p className="text-sm">Addon</p>
          </div>
        )}
        {userType === "host" && (
          <div
            className="flex flex-col items-center"
            onClick={() => setShowWinners(true)}
          >
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <MdLeaderboard className="text-xl" />
            </button>
            <p className="text-sm">Leaderboard</p>
          </div>
        )}
      </div>
      {showWallet && <Wallet setShowModal={setShowWallet} />}
      {showFeature && userType === "host" && (
        <CreatorModal setShowModal={setShowFeature} />
      )}
      {showFeature && userType === "guest" && (
        <AudienceModal setShowModal={setShowFeature} />
      )}
      {showWinners && <LeaderBoard setShowModal={setShowWinners} />}
    </>
  );
};

export default CallFeatures;
