import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { MdQuiz } from "react-icons/md";
import { RiAuctionFill } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import { Modal } from "../ui";
import { QuizModal } from "../quiz";

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
    <div className="flex flex-col items-center text-yellow">
      <div
        className="border border-yellow rounded-full my-1 p-2"
        onClick={() => setFeature(featureName)}
      >
        {featureIcon}
      </div>
      <span className="">{featureName}</span>
    </div>
  );
};

const FeatureModal = ({ setShowModal }: FeatureModalProps) => {
  const featureList = [
    {
      featureIcon: <MdQuiz className="text-yellow text-2xl cursor-pointer" />,
      featureName: "Quiz",
      comingSoon: false
    },
    {
      featureIcon: (
        <RiAuctionFill className="text-yellow text-2xl cursor-pointer" />
      ),
      featureName: "Auction",
      comingSoon: true
    },
    {
      featureIcon: <BsCart3 className="text-yellow text-2xl cursor-pointer" />,
      featureName: "Sell",
      comingSoon: true
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
          <div className="flex flex-row items-center justify-between w-[70%]">
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
      {feature === "Quiz" && <QuizModal setShowModal={setFeature} />}
    </>
  );
};

export default FeatureModal;
