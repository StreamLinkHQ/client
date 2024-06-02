import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";
import { IoMdWallet } from "react-icons/io";
import { Wallet } from "../auth";
import  FeatureModal from "../feature-modal"

type CallFeatureProps = {
  userType: string | null;
};

const CallFeatures = ({ userType }: CallFeatureProps) => {
  const [showWallet, setShowWallet] = useState(false);
  const [showFeature, setShowFeature] = useState(false);
  return (
    <>
      <div className="absolute right-5 bottom-1/4 flex flex-col items-center z-50 text-yellow">
        {userType === "host" && (
          <div className="flex flex-col items-center" onClick={() => setShowFeature(true)}>
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <FaPlus className="text-xl" />
            </button>
            Add
          </div>
        )}
        <div className="flex flex-col items-center my-2.5">
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoIosShareAlt className="text-xl" />
          </button>
          Share
        </div>
        <div className="flex flex-col items-center mb-2.5" onClick={() => setShowWallet(true)}>
          <button className="bg-[#FFFFFF1A] rounded-full p-3">
            <IoMdWallet className="text-xl" />
          </button>
          Wallet
        </div>
      </div>
      {showWallet && <Wallet setShowModal={setShowWallet} />}
      {
        showFeature && (
          <FeatureModal setShowModal={setShowFeature}/>
        )
      }
    </>
  );
};

export default CallFeatures;
