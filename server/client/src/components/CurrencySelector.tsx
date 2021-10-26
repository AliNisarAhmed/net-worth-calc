import { allCurrencies as currencies } from "../types";
import { useFormContext } from "react-hook-form";
import { strings } from "../strings";
import * as API from "../api";
import { useFormStateContext } from "../context/FormStateContext";
import { toast } from "react-toastify";
import { useAppStateContext } from "../context/AppStateContext";

const CurrencySelector = () => {
  const { register, getValues } = useFormContext();
  const { dispatch } = useFormStateContext();
  const { state: appState, dispatch: appDispatch } = useAppStateContext();

  return (
    <div
      className="
      lg:flex
      lg:flex-row
      lg:justify-end
      lg:items-baseline
    "
    >
      <label htmlFor="currencySelector" className="text-sm">
        Select Currency:{" "}
      </label>
      <select
        {...register("currency")}
        id="currencySelector"
        onChange={handleCurrencyChange}
        disabled={appState.isLoading}
        className={`
          border-2
          border-pink-500
          py-2 mx-2
          rounded-md
          disabled:opacity-50
          ${appState.isLoading ? "cursor-wait" : "cursor-auto"}
        `}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {strings.currencyLabels[currency]} ({currency.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );

  async function handleCurrencyChange(e: any) {
    const newCurrencyCode = e.target.value;
    const oldCurrencyCode = getValues("currency");
    const oldAssets = getValues("assets");
    const oldLiabs = getValues("liabilities");
    const oldNetWorth = getValues("netWorth");

    try {
      appDispatch({
        type: "TOGGLE_IS_LOADING",
      });

      const { assets, liabilities, totalNetWorth } = await API.convertNetWorth({
        oldCurrencyCode,
        newCurrencyCode,
        netWorth: {
          totalNetWorth: oldNetWorth,
          assets: oldAssets,
          liabilities: oldLiabs,
        },
      });

      dispatch({
        type: "UPDATE_NET_WORTH",
        payload: {
          totalNetWorth,
          assets,
          liabilities,
          currency: newCurrencyCode,
        },
      });
    } catch (e: any) {
      toast(e?.response?.data?.message);
    } finally {
      appDispatch({
        type: "TOGGLE_IS_LOADING",
      });
    }
  }
};

export default CurrencySelector;
