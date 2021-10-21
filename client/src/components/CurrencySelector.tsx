import React from "react";
import { allCurrencies as currencies } from "../types";
import { useFormContext, useWatch } from "react-hook-form";
import { strings } from "../strings";
import { saveCurrencyToLocalStorage } from "../localStorage";

const CurrencySelector = () => {
  const { register, control } = useFormContext();

  // watch for changes to the currency field in the form
  const currency = useWatch({
    control,
    name: "currency",
  });

  // Save the currency to local storage whenever it changes
  React.useEffect(() => {
    saveCurrencyToLocalStorage(currency);
  }, [currency]);

  return (
    <div>
      <label className="text-sm">Select Currency: </label>
      <select {...register("currency")} className="border-2 border-pink-500 py-2 mx-2 rounded-md">
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {strings.currencyLabels[currency]} ({currency.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );

};

export default CurrencySelector;
