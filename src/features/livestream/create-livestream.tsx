import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { HomeLayout, Modal } from "../ui";
import { useCreateLivestream } from "./use-livestream";

type FormData = {
  streamName: string;
  streamTime: string;
};

const CreateLivestream = () => {
  const [showModal, setShowModal] = useState(false);
  const [streamTime, setStreamTime] = useState("");

  const createLiveStream = useCreateLivestream();

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
    // Check for signed in user
    // If no user, open Login modal, if there's a user, call create livestream
    console.log(values);
    const { streamName } = values
    const data = {
      streamName,
      userId: "Chiamaka"
    }
    createLiveStream.mutate(data)
  };

  return (
    <HomeLayout>
      <>
        <div className="text-white mt-12 w-full">
          <form
            className="w-[88%] mx-auto p-5 flex flex-col lg:w-[35%] border border-yellow rounded-lg"
            onSubmit={handleSubmit(onSubmit)}
          >
            <p className="text-center text-lg">Create Stream</p>
            <div className="mt-2.5">
              <p className="mb-1">Enter stream name</p>
              <input
                type="text"
                className="border w-full border-black p-1.5 rounded-md focus:outline-none text-black my-1"
                {...register("streamName")}
              />
              <p className="text-red-500 text-xs">
                {errors.streamName?.message}
              </p>
            </div>
            <div className="my-2.5">
              <p className="mb-1">Choose stream time</p>
              <div className="flex flex-row items-center justify-between w-[60%] lg:w-[38%] mb-3">
                <label htmlFor="instant" className="my-1 flex flex-row">
                  <input
                    type="radio"
                    value="instant"
                    className="mr-1"
                    {...register("streamTime")}
                    onClick={() => setStreamTime("instant")}
                  />
                  Instant
                </label>
                <label htmlFor="schedule" className="flex flex-row">
                  <input
                    type="radio"
                    value="schedule"
                    className="mr-1"
                    {...register("streamTime")}
                    onClick={() => setStreamTime("schedule")}
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
        {showModal && (
          <Modal bgColor="bg-white">
            <p>Hey there</p>
          </Modal>
        )}
      </>
    </HomeLayout>
  );
};

export default CreateLivestream;
