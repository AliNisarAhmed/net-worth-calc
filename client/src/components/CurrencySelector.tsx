import { allCurrencies as currencies } from "../types";
import { useFormContext } from "react-hook-form";
import { strings } from "../strings";
import * as API from "../api";
import { useAppContext } from "../context/AppContext";

const CurrencySelector = () => {
  const { register, getValues } = useFormContext();
  const { dispatch } = useAppContext();

  return (
    <div
      className="
      lg:flex 
      lg:flex-row 
      lg:justify-end 
      lg:items-baseline
    "
    >
      <label className="text-sm">Select Currency: </label>
      <select
        {...register("currency")}
        onChange={handleCurrencyChange}
        className="
          border-2 
          border-pink-500 
          py-2 mx-2 
          rounded-md
        "
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
      const { assets, liabilities, netWorth } = await API.convertNetWorth({
        oldCurrencyCode,
        newCurrencyCode,
        netWorth: {
          netWorth: oldNetWorth,
          assets: oldAssets,
          liabilities: oldLiabs,
        },
      });

      dispatch({
        type: "UPDATE_NET_WORTH",
        payload: {
          netWorth,
          assets,
          liabilities,
          currency: newCurrencyCode,
        },
      });
    } catch (e) {}
  }
};

export default CurrencySelector;
