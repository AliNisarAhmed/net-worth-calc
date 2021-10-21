import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import NumberFormat from "react-number-format";
import { FormFields } from "../types";
import { storeItemInLocalStorage } from "../localStorage";

interface Props {
  control: Control<FieldValues, Object>;
  name: string;
}

const MoneyInput = ({ control, name }: Props) => {
  const { handleSubmit } = useFormContext();

  return (
    <Controller
      control={control}
      render={({ field }) => {
        return (
          <NumberFormat
            defaultValue="0"
            thousandSeparator=","
            allowNegative={false}
            allowLeadingZeros={false}
            onValueChange={({ value }) => field.onChange(value)}
            value={field.value}
            displayType="input"
            type="text"
            prefix="$ "
            isNumericString={true}
            decimalScale={2}
            fixedDecimalScale
            onBlur={handleSubmit(handleOnBlur)}
            className={`px-5 py-2 outline-none rounded border-2 border-pink-500 hover:ring-2 focus:ring-2 ring-pink-500 max-w-lg ring-offset-pink-500`}
          />
        );
      }}
      name={name}
    />
  );

  function handleOnBlur(data: FormFields) {
    storeItemInLocalStorage<FormFields>(data);
  }
};

export default MoneyInput;
