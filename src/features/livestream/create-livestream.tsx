import { useState, useEffect, useContext } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import toast, { Toaster } from "react-hot-toast";
import { FaXTwitter, FaFacebook, FaTiktok } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { TbCopy } from "react-icons/tb";
import { HomeLayout, Modal } from "../ui";
import { AuthContext } from "../../context";
import { useCreateLivestream } from "./use-livestream";

type FormData = {
  streamName: string;
  streamTime: string;
};

const CreateLivestream = () => {
  const [streamTime, setStreamTime] = useState("");
  const [streamDetails, setStreamDetails] = useState<FormData | null>(null)
  const createLiveStream = useCreateLivestream();
  const navigate = useNavigate();
  const { setShowAuthFlow } = useDynamicContext();
  const { user } = useContext(AuthContext)

  const validation = yup.object().shape({
    streamName: yup.string().required("Please, name your stream"),
    streamTime: yup.string().required("Please, pick stream time"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });
  const onSubmit = (values: FormData) => {
      setStreamDetails(values)
    if (Object.values(user).length === 0) {
      setShowAuthFlow(true)
      return;
    }
    const { streamName } = values;
    const data = {
      streamName,
      userId: user?.id,
    };
    createLiveStream.mutate(data);
  };

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Link copied");
    } catch (error: any) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (Object.values(user).length !== 0 && streamDetails !== null) {
      toast.success("Logged in successfully");
      onSubmit(streamDetails);
      return;
    }
  }, [user]);

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
        {createLiveStream.isSuccess && (
          <Modal bgColor="bg-modal-black">
            <div className="bg-[#222] w-[78%] mx-auto rounded-xl p-5 text-black my-28 lg:w-[28%]">
              <div className="flex flex-row justify-between items-center mb-4">
                <p className="text-xl text-white font-semibold">Share</p>
              </div>
              <div className="flex flex-row justify-between items-center my-3.5 w-full">
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
              </div>
              <div className="flex flex-col">
                <div className="my-2">
                  <p className="capitalize font-semibold text-sm text-white">
                    for Co-host
                  </p>
                  <div className="bg-[#222] border border-yellow flex flex-row items-center rounded-md mt-3 p-2 justify-between">
                    <p className="text-sm truncate text-white">{`${window.location.hostname}/${createLiveStream?.data?.name}?mode=host`}</p>
                    <TbCopy
                      className="text-white text-3xl font-semibold"
                      onClick={() =>
                        copyText(
                          `${window.location.hostname}/${createLiveStream?.data?.name}?mode=host`
                        )
                      }
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <p className="capitalize font-semibold text-sm text-white">
                    for Audience
                  </p>
                  <div className="bg-[#222] border border-yellow flex flex-row items-center rounded-md mt-3 p-2 justify-between">
                    <p className="text-sm truncate text-white">{`${window.location.hostname}/${createLiveStream?.data?.name}?mode=guest`}</p>
                    <TbCopy
                      className="text-white text-3xl font-semibold"
                      onClick={() =>
                        copyText(
                          `${window.location.hostname}/${createLiveStream?.data?.name}?mode=guest`
                        )
                      }
                    />
                  </div>
                </div>
              </div>
              {streamTime === "" && (
                <button
                  className="w-full mt-3.5 bg-yellow text-black py-2 rounded-md"
                  onClick={() =>
                    navigate(
                      `${window.location.hostname}/${createLiveStream?.data?.name}?mode=host`
                    )
                  }
                >
                  Join call
                </button>
              )}
            </div>
          </Modal>
        )}
        <Toaster />
      </>
    </HomeLayout>
  );
};

export default CreateLivestream;
