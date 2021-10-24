import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import NumberFormat from "react-number-format";
import { FormFields } from "../types";
import { storeItemInLocalStorage } from "../localStorage";
import { getCurrencySymbol } from "../utils";
import * as API from "../api";
import { useAppContext } from "../context/AppContext";

interface Props {
  control: Control<FieldValues, Object>;
  name: string;
}

const MoneyInput = ({ control, name }: Props) => {
  const { handleSubmit, watch } = useFormContext();
  const { state, dispatch } = useAppContext();

  const currency = watch("currency");

  return (
    <Controller
      control={control}
      name={name}
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
            prefix={getCurrencySymbol(currency) + " "}
            isNumericString={true}
            decimalScale={2}
            fixedDecimalScale
            onBlur={handleSubmit(handleOnBlur)}
            disabled={state.isLoading}
            className={`
              px-5 py-2 
              outline-none 
              rounded 
              border-2 border-pink-500 
              hover:ring-2 focus:ring-2 
              ring-pink-500 
              ring-offset-pink-500 
              sm:max-w-md
              sm:w-md
              lg:max-w-sm 
              lg:text-xl
              lg:text-right
              disabled:opacity-50
              ${state.isLoading ? 'cursor-wait' : 'cursor-auto'}
              `}
          />
        );
      }}
    />
  );

  async function handleOnBlur(data: FormFields) {
    dispatch({
      type: "TOGGLE_IS_LOADING",
    });

    const res = await API.calculateNetWorthOnServer({
      assets: data.assets,
      liabilities: data.liabilities,
      currency: data.currency,
    });

    dispatch({
      type: "NET_WORTH_CALCULATION_RESULT",
      payload: {
        ...data,
        netWorth: res.netWorth,
      },
    });

    dispatch({
      type: "TOGGLE_IS_LOADING",
    });

    console.log("Response from server: ", res);
    storeItemInLocalStorage<FormFields>(data);
  }
};

export default MoneyInput;
