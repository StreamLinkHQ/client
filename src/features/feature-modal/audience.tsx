import { useParams } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { Modal } from "../ui";
import { QuizResponse, useGetQuiz } from "../quiz";
// import { transferSplToken } from "../../utils";

export type FeatureModalProps = {
  setShowModal: Function;
};

const AudienceModal = ({ setShowModal }: FeatureModalProps) => {
  const { id } = useParams();
  // @ts-ignore comment
  // const { data } = useGetQuiz("dvkb-122e-iz33");
  const { data } = useGetQuiz(id);
  return (
    <Modal bgColor="bg-modal-black">
      <>
        <div className="bg-[#222] w-full absolute bottom-0 p-5 text-white rounded-t-3xl max-h-[85%] overflow-y-auto">
          <div
            className="bg-black rounded-full ml-auto w-[25px] h-[25px] p-1 flex flex-col items-center cursor-pointer mb-4"
            onClick={() => setShowModal(false)}
          >
            <IoMdClose className="text-yellow text-lg cursor-pointer" />
          </div>
          <div>
            {/* <p>Quiz</p> */}
            {/* <button onClick={transferSplToken}>Called!!!!</button> */}
            {data && data.quizDuration && <QuizResponse data={data} />}
          </div>
        </div>
      </>
    </Modal>
  );
};

export default AudienceModal;
