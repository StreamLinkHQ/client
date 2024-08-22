import toast, { Toaster } from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
// import { FaXTwitter, FaFacebook, FaTiktok } from "react-icons/fa6";
// import { AiFillInstagram } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import { Modal } from "./ui";

type ShareModalProps = {
  meetingId: string | undefined;
  setShowModal: () => void;
  userType?: string | null;
};

const ShareModal = ({ meetingId, setShowModal, userType }: ShareModalProps) => {
  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied");
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <>
      <Modal bgColor="bg-modal-black">
        <div className="bg-[#222] w-[78%] mx-auto rounded-xl p-5 text-black my-28 lg:w-[28%]">
          <div
            className="bg-black rounded-full ml-auto w-[25px] h-[25px] p-1 flex flex-col items-center cursor-pointer mb-4"
            onClick={setShowModal}
          >
            <IoMdClose className="text-yellow text-lg cursor-pointer" />
          </div>
          <div className="flex flex-row justify-between items-center mb-4">
            <p className="text-xl text-white font-semibold">Share</p>
          </div>
          {/* <div className="flex flex-row justify-between items-center my-3.5 w-full">
            <button className="bg-yellow rounded-full p-3">
              <FaXTwitter className="text-xl" />
            </button>
            <button className="bg-yellow rounded-full p-3">
              <FaFacebook className="text-xl" />
            </button>
            <button className="bg-yellow rounded-full p-3">
              <AiFillInstagram className="text-xl" />
            </button>
            <button className="bg-yellow rounded-full p-3">
              <FaTiktok className="text-xl" />
            </button>
          </div> */}
          <div className="flex flex-col">
            {userType === "host" && (
              <div className="my-2">
                <p className="capitalize font-semibold text-sm text-white">
                  for Co-host
                </p>
                <div className="bg-[#222] border border-yellow flex flex-row items-center rounded-md mt-3 p-2 justify-between">
                  <p className="text-sm truncate text-white">{`${window.location.hostname}/${meetingId}?mode=host`}</p>
                  <TbCopy
                    className="text-white text-3xl font-semibold"
                    onClick={() =>
                      copyText(
                        `${window.location.hostname}/${meetingId}?mode=host`
                      )
                    }
                  />
                </div>
              </div>
            )}
            <div className="mt-2">
              <p className="capitalize font-semibold text-sm text-white">
                for Audience
              </p>
              <div className="bg-[#222] border border-yellow flex flex-row items-center rounded-md mt-3 p-2 justify-between">
                <p className="text-sm truncate text-white">{`${window.location.hostname}/${meetingId}?mode=guest`}</p>
                <TbCopy
                  className="text-white text-3xl font-semibold"
                  onClick={() =>
                    copyText(
                      `${window.location.hostname}/${meetingId}?mode=guest`
                    )
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Toaster />
    </>
  );
};

export default ShareModal;

