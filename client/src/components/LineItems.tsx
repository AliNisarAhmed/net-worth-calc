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
    <div className="divide-y divide-black-900">
      <h2 className="text-lg my-4 lg:text-xl lg:underline">{header}</h2>
      {fields.map((field, index) => {
        let displayedField = field as { id: string; label: string };
        return (
          <div key={index} className="flex flex-col items-center py-4">
            <div className="flex flex-col lg:flex-row items-start lg:justify-between lg:items-center w-4/5 lg:w-10/12">
              <label className="block text-sm text-gray-600 lg:inline-block lg:text-xl">
                {displayedField.label}
              </label>
              <MoneyInput control={control} name={`${name}.${index}.amount`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LineItems;
