import { useFormContext, useFieldArray } from "react-hook-form";
import { useAppStateContext } from "../context/AppStateContext";
import CollapseIcon from "./CollapseIcon";
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
  const { state, dispatch } = useAppStateContext();

  if (state.collapsed?.[name] === "collapsed") {
    return (
      <div className="flex flex-row justify-between border-b-2 border-gray-100">
        <h2 className="text-lg my-4 lg:text-xl lg:underline">{header}</h2>
        <CollapseIcon
          onClick={toggleCollapse(name)}
          collapseState={state?.collapsed[name]}
        />
      </div>
    );
  }

  return (
    <div
      className="
      divide-y 
      divide-black-900
      "
    >
      <div className="flex flex-row justify-between">
        <h2
          className="
        text-lg 
        my-4 
        lg:text-xl 
        lg:underline
        "
        >
          {header}
        </h2>
        <CollapseIcon
          onClick={toggleCollapse(name)}
          collapseState={state?.collapsed[name]}
        />
      </div>
      {fields.map((field, index) => {
        let displayedField = field as { id: string; label: string };
        return (
          <div
            key={index}
            className="
            flex flex-col 
            items-center 
            py-4
            "
          >
            <div
              className="
              flex 
              flex-col 
              lg:flex-row 
              items-start 
              lg:justify-between 
              lg:items-center 
              w-4/5 
              lg:w-10/12
              "
            >
              <label
                htmlFor={`${name}.${index}.amount`}
                className="
                block 
                text-sm 
                text-gray-600 
                lg:inline-block 
                lg:text-xl
              "
              >
                {displayedField.label}
              </label>
              <MoneyInput control={control} name={`${name}.${index}.amount`} />
            </div>
          </div>
        );
      })}
    </div>
  );

  function toggleCollapse(name: string) {
    return () => {
      console.log("toggle collapse: ", name);
      dispatch({
        type: "TOGGLE_COLLAPSE",
        payload: name,
      });
    };
  }
};

export default LineItems;
