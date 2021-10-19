import React from "react";
import { LineItem } from "../types";
import { useFormContext, useFieldArray } from "react-hook-form";

interface Props {
  items: LineItem[];
  header: string;
  name: string;
}

const LineItems = ({ items, header, name }: Props) => {
  const { register, control } = useFormContext();
  const { fields } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      <h2>{header}</h2>
      {fields.map((field, index) => {
        let displayedField = field as {id: string, label: string}
        return (
          <>
            <div>{displayedField.label}</div>
            <input key={field.id} {...register(`${name}.${index}.amount`)} />
          </>
        );
      })}
    </div>
  );
};

export default LineItems;
