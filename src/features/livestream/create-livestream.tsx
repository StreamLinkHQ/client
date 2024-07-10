import { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import toast, { Toaster } from "react-hot-toast";
import { HomeLayout } from "../ui";
import { AuthContext } from "../../context";
import { useCreateLivestream } from "./use-livestream";
import ShareModal from "../share-modal";

type FormData = {
  streamName: string;
  streamTime: string;
};

const CreateLivestream = () => {
  const [streamTime, setStreamTime] = useState("");
  const [streamDetails, setStreamDetails] = useState<FormData | null>(null);
  const [showShareModal, setShowShareModal] = useState<boolean>(true);
  const createLiveStream = useCreateLivestream();
  // const navigate = useNavigate();
  const { setShowAuthFlow } = useDynamicContext();
  const { user } = useContext(AuthContext);

  const validation = yup.object().shape({
    streamName: yup.string().required("Please, name your stream"),
    streamTime: yup.string().required("Please, pick stream time"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const onSubmit = (values: FormData) => {
    setStreamDetails(values);
    if (Object.values(user).length === 0) {
      setShowAuthFlow(true);
      return;
    }
    const { streamName } = values;
    const data = {
      streamName,
      userId: user?.id,
    };
    createLiveStream.mutate(data);
  };

  console.log(createLiveStream.data);
  console.log(createLiveStream.error);

  useEffect(() => {
    if (Object.values(user).length !== 0 && streamDetails !== null) {
      toast.success("Logged in successfully");
      onSubmit(streamDetails);
      return;
    }
  }, [user]);

  const closeShareModal = () => {
    reset();
    setStreamTime("")
    setShowShareModal(false);
  };

  return (
    <HomeLayout>
      <>
        <div className="text-white mt-12 w-full">
          <p className="text-center text-xl mb-3.5">Create Stream</p>
          <form
            className="w-[88%] mx-auto p-5 flex flex-col lg:w-[35%] border border-yellow rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-2.5">
              <p className="mb-1">Enter stream name</p>
              <input
                type="text"
                className="border w-full p-1.5 rounded-md focus:outline-none text-white my-1 bg-[#222] border-border-ash"
                {...register("streamName")}
              />
              <p className="text-red-500 text-xs">
                {errors.streamName?.message}
              </p>
            </div>
            <div className="my-2.5">
              <p className="mb-1">Choose stream time</p>
              <div className="flex flex-row items-center justify-between w-[60%] lg:w-[38%] mb-3">
                <label
                  htmlFor="instant"
                  className="my-1 flex flex-row cursor-pointer"
                  onClick={() => setStreamTime("instant")}
                >
                  <input
                    type="radio"
                    value="instant"
                    className="mr-1"
                    {...register("streamTime")}
                    checked={streamTime === "instant" ? true : false}
                  />
                  Instant
                </label>
                <label
                  htmlFor="schedule"
                  className="flex flex-row cursor-pointer"
                  onClick={() => setStreamTime("schedule")}
                >
                  <input
                    type="radio"
                    value="schedule"
                    className="mr-1"
                    {...register("streamTime")}
                    checked={streamTime === "schedule" ? true : false}
                  />
                  Schedule
                </label>{" "}
              </div>
              {streamTime === "schedule" && (
                <input
                  type="date"
                  {...register("streamTime", { required: true })}
                  className="text-black border-black p-1.5 rounded-md focus:outline-none"
                />
              )}
              <p className="text-red-500 text-xs mt-1.5">
                {errors.streamTime?.message}
              </p>
            </div>
            <button className="w-[50%] lg:w-[45%] mx-auto bg-yellow text-black py-1.5 rounded-md">
              Create
            </button>
          </form>
        </div>
        {createLiveStream.isSuccess && showShareModal && (
          <ShareModal
            meetingId={createLiveStream?.data?.name}
            setShowModal={closeShareModal}
          />
        )}
        <Toaster />
      </>
    </HomeLayout>
  );
};

export default CreateLivestream;
