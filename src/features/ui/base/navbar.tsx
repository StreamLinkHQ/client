import { useContext } from "react";
import { Link } from "react-router-dom";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { RxAvatar } from "react-icons/rx";
import { AuthContext } from "../../../context";
import { appPaths } from "../../../app";

const Navbar = () => {
  const { setShowAuthFlow } = useDynamicContext();

  const { user } = useContext(AuthContext);
  return (
    <div className="bg-yellow flex flex-row justify-between px-6 py-3.5 items-center w-full mx-auto sticky top-0 box-border">
      <Link to="/">
        <div className="flex flex-row items-center lg:w-[15%] justify-between w-[30%]">
          <p>Logo</p>
        </div>
      </Link>

      <div className="hidden lg:flex flex-row items-center w-[25%] justify-between">
        <Link to={appPaths.explore}>
          <button className="rounded-lg p-1.5 text-sm lg:text-base">
            Explore
          </button>
        </Link>
        <Link to={appPaths.create}>
          <button className="rounded-lg p-1 lg:p-1.5 text-sm lg:text-base">
            Start Stream
          </button>
        </Link>
        {Object.values(user).length === 0 ? (
          <button
            className="rounded-lg p-1 lg:p-1.5 text-sm lg:text-base"
            onClick={() => {
              setShowAuthFlow(true);
            }}
          >
            Sign In / Up
          </button>
        ) : (
          <Link to={appPaths.profile}>
            <div className="flex flex-row items-center">
              <RxAvatar className="text-xl" />
              <button className="rounded-lg p-1 lg:p-1.5 text-sm lg:text-base">
                Profile
              </button>
            </div>
          </Link>
        )}
      </div>
      <HiOutlineMenuAlt3 className="block lg:hidden text-3xl cursor-pointer" />
    </div>
  );
};

export default Navbar;
