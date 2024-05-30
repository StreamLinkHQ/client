import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdQuiz, MdSell } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { Modal } from "./ui";
import { QuizModal } from "./quiz";

type FeatureModalProps = {
  setShowModal: Function;
};

type FeatureCardProps = {
  featureName: string;
  featureIcon: any;
  setFeature: any;
};

const FeatureCard = (props: FeatureCardProps) => {
  const { featureIcon, featureName, setFeature } = props;
  return (
    <button
      className="border text-yellow border-yellow text-lg w-full rounded-md my-1 p-1.5 flex flex-row items-center"
      onClick={() => setFeature(featureName)}
    >
      {featureIcon}
      <span className="text-lg ml-2">{featureName}</span>
    </button>
  );
};

const FeatureModal = ({ setShowModal }: FeatureModalProps) => {
  const featureList = [
    {
      featureIcon: <MdQuiz className="text-yellow text-3xl cursor-pointer" />,
      featureName: "Quiz",
    },
    {
      featureIcon: (
        <RiAuctionFill className="text-yellow text-3xl cursor-pointer" />
      ),
      featureName: "Auction",
    },
    {
      featureIcon: <MdSell className="text-yellow text-3xl cursor-pointer" />,
      featureName: "Sale",
    },
  ];
  const [feature, setFeature] = useState("");
  return (
    <>
      <Modal bgColor="bg-modal-black">
        <div className="bg-[#222] w-full absolute bottom-0 p-5 text-white rounded-t-3xl">
          <div
            className="bg-black rounded-full ml-auto w-[25px] h-[25px] p-1 flex flex-col items-center cursor-pointer mb-4"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose className="text-yellow text-lg cursor-pointer" />
          </div>
          <div className="flex flex-col items-center">
            {featureList.map((feature, i) => (
              <FeatureCard
                key={i}
                featureName={feature.featureName}
                featureIcon={feature.featureIcon}
                setFeature={setFeature}
              />
            ))}
          </div>
        </div>
      </Modal>
      {feature === "Quiz" && <QuizModal setShowModal={setFeature}/>}
    </>
  );
};

export default FeatureModal;
