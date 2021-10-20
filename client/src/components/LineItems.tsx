import { useFormContext, useFieldArray } from "react-hook-form";
import MoneyInput from "./MoneyInput";

interface Props {
  header: string;
  name: string;
}

const LineItems = ({ header, name }: Props) => {
  const { control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <h2>{header}</h2>
      {fields.map((field, index) => {
        let displayedField = field as { id: string; label: string };
        return (
          <>
            <MoneyInput control={control} name={`${name}.${index}.amount`} />
            <div>{displayedField.label}</div>
          </>
        );
      })}
    </div>
  );
};

export default LineItems;
