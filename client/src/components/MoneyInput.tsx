import {
  Control,
  Controller,
  FieldValues,
  useFormContext,
} from "react-hook-form";
import NumberFormat from "react-number-format";
import { FormFields } from "../types";
import { getCurrencySymbol } from "../utils";
import * as API from "../api";
import { useFormStateContext } from "../context/FormStateContext";
import { toast } from "react-toastify";
import { useAppStateContext } from "../context/AppStateContext";

interface Props {
  control: Control<FieldValues, Object>;
  name: string;
}

const MoneyInput = ({ control, name }: Props) => {
  const { handleSubmit, watch, formState } = useFormContext();
  const { dispatch } = useFormStateContext();
  const { state: appState, dispatch: appDispatch } = useAppStateContext();

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
            disabled={appState.isLoading}
            id={name}
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
              ${appState.isLoading ? "cursor-wait" : "cursor-auto"}
              `}
          />
        );
      }}
    />
  );

  async function handleOnBlur(data: FormFields) {
    if (formState.isDirty) {
      try {
        appDispatch({
          type: "TOGGLE_IS_LOADING",
        });

        const { totalNetWorth, totalAssets, totalLiabilities } =
          await API.calculateNetWorthOnServer({
            assets: data.assets,
            liabilities: data.liabilities,
            currency: data.currency,
          });

        dispatch({
          type: "NET_WORTH_CALCULATION_RESULT",
          payload: {
            currency: data.currency,
            assets: { ...data.assets, totalAssets },
            liabilities: { ...data.liabilities, totalLiabilities },
            totalNetWorth,
          },
        });

        console.log("Response from server: ", {
          totalNetWorth,
          totalAssets,
          totalLiabilities,
        });
      } catch (e: any) {
        toast(e?.response?.data?.message);
      } finally {
        appDispatch({
          type: "TOGGLE_IS_LOADING",
        });
      }
    }
  }
};

export default MoneyInput;
