import { useFormContext, useFieldArray } from "react-hook-form";

interface Props {
  header: string;
  name: string;
}

const LineItems = ({ header, name }: Props) => {
  const { register, control } = useFormContext();
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
            <div>{displayedField.label}</div>
            <input
              key={field.id}
              {...register(`${name}.${index}.amount`, { valueAsNumber: true })}
            />
          </>
        );
      })}
    </div>
  );
};

export default LineItems;
