import Modal from "./modal";

type ErrorScreenProps = {
  message?: string;
};

const ErrorScreen = ({ message }: ErrorScreenProps) => {
  return (
    <Modal bgColor="bg-modal-black">
    <div className="flex flex-col items-center justify-center h-screen bg-[#222]">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-xl text-red-700 mb-6">
          {message ?? "Something went wrong."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
        >
          Retry
        </button>
      </div>
    </div>
    </Modal>
  );
};

export default ErrorScreen;
