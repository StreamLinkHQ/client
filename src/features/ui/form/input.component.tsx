import { useController } from "react-hook-form";
import { Obj } from "../../../types";

type InputProps = {
  name: string;
  label?: string;
  defaultValue?: string;
  placeholder?: string;
  rules?: Obj;
};

type RadioButtonProps = InputProps & {
  options: any[];
}

export const RadioButton = (props: RadioButtonProps) => {
  const { name, label } = props;
  const {
    field: { value },
    fieldState: { error },
  } = useController({ name });
  return (
    <div>
      <div>
        <label htmlFor={label} className="my-1">
          <input
            type="radio"
            value={value}
            name={name}
            className="mr-1.5 w-4 h-4 text-[#343434] bg-[#343434] border-2 border-[#F2F7F8] focus:ring-[#F2F7F8] focus:ring-2"
          />
          {label}
        </label>
      </div>
      {error && <p className="">{error?.message}</p>}
    </div>
  );
};
