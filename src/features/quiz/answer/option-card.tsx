type OptionCardProps = {
  option: any;
  setOption?: Function;
};

const OptionCard = ({ option }: OptionCardProps) => {
  return (
    <div className="flex flex-row items-center">
      <div
        className={`mr-1.5 w-4 h-4 bg-[#343434] border-2 border-[#F2F7F8] rounded-full`}
      />
      <p className="text-[#F2F7F8] text-base font-bold">{option?.text}</p>
    </div>
  );
};

export default OptionCard;
