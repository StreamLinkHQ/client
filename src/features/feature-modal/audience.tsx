import { IoMdClose } from "react-icons/io";
import { Modal } from "../ui";
import { QuizResponse } from "../quiz";

type FeatureModalProps = {
  setShowModal: Function;
};

const AudienceModal = ({ setShowModal }: FeatureModalProps) => {
  return (
    <>
      <Modal bgColor="bg-modal-black">
        <>
          <div className="bg-[#222] w-full absolute bottom-0 p-5 text-white rounded-t-3xl max-h-[85%] overflow-y-auto">
            <div
              className="bg-black rounded-full ml-auto w-[25px] h-[25px] p-1 flex flex-col items-center cursor-pointer mb-4"
              onClick={() => setShowModal("")}
            >
              <IoMdClose className="text-yellow text-lg cursor-pointer" />
            </div>
            <div>
                <p>Quiz</p>
                <QuizResponse />
            </div>
          </div>
        </>
      </Modal>
    </>
  );
};

export default AudienceModal;
