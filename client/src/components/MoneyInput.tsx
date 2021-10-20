import { Control, Controller, FieldValues } from "react-hook-form";
import NumberFormat from "react-number-format";

interface Props {
  control: Control<FieldValues, Object>;
  name: string;
}

const MoneyInput = ({ control, name }: Props) => (
  <Controller
    control={control}
    render={({ field }) => {
      return (
        <NumberFormat
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
        />
      );
    }}
    name={name}
  />
);

export default MoneyInput;
