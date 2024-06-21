import { IoMdClose } from "react-icons/io";
import { Modal } from "../ui";
import { usePayWinners } from "./use-leader-board";

type LeaderBoardProps = {
  setShowModal: Function;
};

const LeaderBoard = ({ setShowModal }: LeaderBoardProps) => {
  const payWinners = usePayWinners();
  
  const sendMoney = () => {
    const data = {
      recipients: [
        {
          amount: 1000000,
          wallet: "8sgmAo1YQqhxA6zykyUXwEMFzC9Yi5CRwSMKXLxApTVn",
        },
        {
          amount: 2000000,
          wallet: "GpoAm8GQ4PwNrGXRbfdwzyKZFijEmUHoQsvebnog5rsy",
        },
      ],
      tokenName: "abj",
    };
    payWinners.mutate(data);
  };
  return (
    <Modal bgColor="bg-modal-black">
      <div className="bg-[#222] w-full absolute bottom-0 p-5 text-white rounded-t-3xl">
        <div
          className="bg-black rounded-full ml-auto w-[25px] h-[25px] p-1 flex flex-col items-center cursor-pointer mb-4"
          onClick={() => setShowModal(false)}
        >
          <IoMdClose className="text-yellow text-lg cursor-pointer" />
        </div>
        <div className="">
          <button onClick={sendMoney}>Pay winners</button>
        </div>
      </div>
    </Modal>
  );
};

export default LeaderBoard;
