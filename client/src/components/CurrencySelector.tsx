import { allCurrencies as currencies } from "../types";
import { useFormContext } from "react-hook-form";

const CurrencySelector = () => {
  const { register } = useFormContext();
  return (
    <div>
      Select Currency:
      <select {...register("currency")} disabled={true}>
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
