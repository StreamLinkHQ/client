type DropDownProps = {
  children: React.ReactNode;
};

const DropDown = ({ children }: DropDownProps) => {
  return (
    <div className="z-10 absolute p-2 rounded-md shadow bg-[#222] right-7">
      {children}
    </div>
  );
};

export default DropDown;

