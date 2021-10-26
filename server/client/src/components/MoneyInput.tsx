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
import ErrorMessage from "../components/ErrorMessage";
import ErrorToast from "./ErrorToast";

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
    <div
      className="
      flex 
      flex-col 
      sm:justify-between 
      lg:justify-end 
      lg:items-end 
      py-2 
      sm:h-24
      self-stretch
      "
    >
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
              onValueChange={({ value }) => {
                if (
                  value === null ||
                  value === undefined ||
                  value.length === 0
                ) {
                  field.onChange("0");
                } else {
                  field.onChange(value);
                }
              }}
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
              px-3
              py-2 
              outline-none 
              rounded 
              border-2 border-pink-500 
              hover:ring-2 focus:ring-2 
              ring-pink-500 
              ring-offset-pink-500 
              lg:text-xl
              lg:text-right
              disabled:opacity-50
              sm:max-w-30
              sm:w-30
              sm:self-stretch
              ${formState.errors?.[name] ?? "aria-invalid"}
              ${appState.isLoading ? "cursor-wait" : "cursor-auto"}
              `}
            />
          );
        }}
      />
      <ErrorMessage name={name} errors={formState.errors} />
    </div>
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
      } catch (e: any) {
        toast(<ErrorToast message={e?.response?.data?.message} />);
      } finally {
        appDispatch({
          type: "TOGGLE_IS_LOADING",
        });
      }
    }
  }
};

export default MoneyInput;
