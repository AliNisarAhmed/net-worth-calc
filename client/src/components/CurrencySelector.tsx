import React from "react";
import { CurrencyCode } from "../types";
import { useFormContext } from 'react-hook-form'

const currencies: CurrencyCode[] = [
  "usd",
  "cad",
  "cny",
  "eur",
  "pkr",
  "inr",
  "gbp",
  "aud",
  "sgd",
  "aed",
];

const CurrencySelector = () => {
  const {register} = useFormContext();
  return (
    <div>
      Select Currency:
      <select {...register('currency')}>
        {currencies.map((currency) => (
          <option value={currency}>{currency}</option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelector;
