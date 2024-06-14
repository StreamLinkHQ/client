type OptionProps = {
  option: any;
  setOption: Function;
  active: boolean;
};

const Option = ({ option, setOption, active }: OptionProps) => {
  return (
    <div
      className="flex flex-row items-center my-1.5"
      onClick={() => setOption(option)}
    >
      <div
        className={`mr-1.5 w-4 h-4 bg-[#343434] ${
          active ? "border-4" : "border-2"
        } border-[#F2F7F8] rounded-full`}
      />
      <p className="text-[#F2F7F8] text-sm font-semibold">{option?.text}</p>
    </div>
  );
};

export default Option;
