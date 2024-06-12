const AnswerCard = () => {
  const options = ["hhhhh", "hhhhhjjjjj", "hhhgjdfg", "hhhhhfffggf"];
  return (
    <div className="my-1">
      <p className="text-xl">What is the purpose of a budget?</p>
      <div className="flex flex-col bg-[#343434] p-3.5 rounded-xl text-white my-1.5">
        {options.map((option, i) => (
          <label htmlFor={option} key={i} className="my-1">
            <input type="radio" value={option} className="mr-1.5"/>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
};

export default AnswerCard;

// {...register("options")}     {...register("weather")}
