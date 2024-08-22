import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IoIosShareAlt, IoMdWallet } from "react-icons/io";
// import { VscDebugStart } from "react-icons/vsc";
// import { BsAppIndicator } from "react-icons/bs";
// import { MdLeaderboard } from "react-icons/md";
import { socket } from "../../config";
// import { CreatorContext } from "../../context";
// import { getWinners } from "../../utils";
import { Wallet } from "../auth";
import { CreatorModal, AudienceModal } from "../feature-modal";
import { LeaderBoard } from "../leader-board";
import { useGetQuizScores } from "../quiz";
import ShareModal from "../share-modal";
// import { usePayParticipants } from "../payment";

type CallFeatureProps = {
  userType: string | null;
  meetingId: string | undefined;
};

const CallFeatures = ({ userType, meetingId }: CallFeatureProps) => {
  const [showWallet, setShowWallet] = useState<boolean>(false);
  const [showFeature, setShowFeature] = useState<boolean>(false);
  const [allFeatures, setAllFeatures] = useState<string[]>([]);
  const [startAddon, setStartAddon] = useState<boolean>(false);
  const [showWinners, setShowWinners] = useState<boolean>(false);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  // const { featuresAdded } = useContext(CreatorContext);
  // @ts-ignore comment
  const { data, refetch } = useGetQuizScores(meetingId);
  // const payParticipants = usePayParticipants();

  // const start = () => {
  //   socket.emit("startAddon", { start: true, addOn: ["quiz"] });
  //   console.log("heyyy");
  // };

  // const stopQuiz = () => {
  //   refetch();
  //   const winners = getWinners(data);
  //   console.log(winners);
  //   const participantsData = {
  //     recipients: winners,
  //     tokenName: "abj"
  //   }
  //   payParticipants.mutate(participantsData);
  // };

  // console.log(data);

  useEffect(() => {
    const updateState = (data: any) => {
      console.log(data);
      setStartAddon(data.start);
      setAllFeatures(data.addOn);
    };
    socket.on("responseEvent", updateState);
    return () => {
      socket.off("responseEvent", updateState);
    };
  }, []);

  const closeShareModal = () => {
    setShowShareModal(false);
  };
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
        <div
          className="flex flex-col items-center my-2.5"
          onClick={() => setShowShareModal(true)}
        >
          <button className="bg-[#222] rounded-full p-3">
            <IoIosShareAlt className="text-xl" />
          </button>
          <p className="text-sm">Share</p>
        </div>
        <div
          className="flex flex-col items-center mb-2.5"
          onClick={() => setShowWallet(true)}
        >
          <button className="bg-[#222] rounded-full p-3">
            <IoMdWallet className="text-xl" />
          </button>
          <p className="text-sm">Wallet</p>
        </div>

        {/* {userType === "guest" && (
          <div
            className="flex flex-col items-center mb-2.5"
            onClick={() => setShowFeature(true)}
          >
            <button className="bg-[#222] rounded-full p-3">
              <BsAppIndicator className="text-xl" />
            </button>
            <p className="text-sm">Addon</p>
          </div>
        )} */}
        {/* {userType === "host" && featuresAdded && (
          <div className="flex flex-col items-center mb-2.5" onClick={start}>
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <VscDebugStart className="text-xl" />
            </button>
            <p className="text-sm">Start</p>
          </div>
        )}
        {userType === "host" && (
          <div className="flex flex-col items-center mb-2.5" onClick={stopQuiz}>
            <button className="bg-[#FFFFFF1A] rounded-full p-3">
              <BsStopCircle className="text-xl" />
            </button>
            <p className="text-sm">Stop Quiz</p>
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
        )} */}
      </div>
      {showWallet && <Wallet setShowModal={setShowWallet} />}
      {showFeature && userType === "host" && (
        <CreatorModal setShowModal={setShowFeature} />
      )}
      {showFeature && userType === "guest" && (
        <AudienceModal
          setShowModal={setShowFeature}
          started={startAddon}
          allFeatures={allFeatures}
        />
      )}
      {showWinners && <LeaderBoard setShowModal={setShowWinners} />}
      {showShareModal && (
        <ShareModal
          userType={userType}
          meetingId={meetingId}
          setShowModal={closeShareModal}
        />
      )}
    </>
  );
};

export default CallFeatures;
