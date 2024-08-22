import Modal from "./modal";

const Loader = () => {
  return (
    <Modal bgColor="bg-modal-black">
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow" />
      </div>
    </Modal>
  );
};

export default Loader;
