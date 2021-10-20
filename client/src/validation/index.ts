import * as yup from "yup";
import { allCurrencies } from "../types";

// FROM: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
const moneyRegex = /^\d+(\.\d{1,2})?$/;

export const lineItemSchema = yup.object().shape({
  label: yup.string().required(),
  amount: yup.string().matches(moneyRegex),
});

export const liabilitySchema = yup.array().of(lineItemSchema);

export const assetSchema = yup.array().of(lineItemSchema);

export const currencySchema = yup.string().required().oneOf(allCurrencies)

export const netWorthSchema = yup.object().shape({
  assets: assetSchema,
  liabilities: liabilitySchema,
  currency: currencySchema
});
