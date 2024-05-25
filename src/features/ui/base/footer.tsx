import { BsTwitterX, BsInstagram } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="w-full p-5 fixed bottom-0 bg-yellow text-black flex flex-row items-center justify-between">
      <p>Logo</p>
      <div className="flex flex-row items-center">
        <BsTwitterX className="text-2xl mr-8" />

        <BsInstagram className="text-2xl" />
      </div>
    </div>
  );
};

export default Footer;
