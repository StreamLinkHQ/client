import { useContext, useState } from "react";
import { BsSendFill } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../context";
import { socket } from "../../config";
import { Modal } from "../ui";

type CallChatProps = {
  setShowModal: Function;
};

const CallChat = ({ setShowModal }: CallChatProps) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState<string>("");

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("message", { text, sender: user?.name });
      setText("");
      setShowModal("");
    }
  };

  return (
    <Modal bgColor="bg-modal-black">
      <div className="w-full bg-[#222] absolute bottom-0 flex flex-row items-center justify-between p-3.5 ">
        <div
          className="bg-black rounded-full w-[28px] h-[28px] p-1 flex flex-col items-center cursor-pointer absolute top-1 left-0"
          onClick={() => setShowModal("")}
        >
          <IoMdClose className="text-yellow text-xl cursor-pointer" />
        </div>
        <input
          type="text"
          className="p-2 rounded-md focus:outline-none text-white bg-[#222] w-[85%] border border-yellow"
          placeholder="Type Message..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <div
          className="border border-yellow p-2.5 rounded-full"
          onClick={() => sendMessage()}
        >
          <BsSendFill className="text-yellow text-xl" />
        </div>
      </div>
    </Modal>
  );
};

export default CallChat;
