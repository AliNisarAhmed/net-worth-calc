import { allCurrencies as currencies } from "../types";
import { useFormContext } from "react-hook-form";
import { strings } from "../strings";

const CurrencySelector = () => {
  const { register } = useFormContext();
  return (
    <div>
      Select Currency:
      <select {...register("currency")} disabled={true}>
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
