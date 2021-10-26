import * as yup from "yup";
import { allCurrencies } from "../types";

// FROM: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
// https://regex101.com/r/CsivpJ/1
const moneyRegex = /^\d+(\.\d{1,2})?$/;

const lineItemSchema = yup.object().shape({
  label: yup.string().required(),
  amount: yup.string().matches(moneyRegex).max(19),
});

const liabilitySchema = yup.object().shape({
  shortTerm: yup.array().of(lineItemSchema),
  longTerm: yup.array().of(lineItemSchema),
});

const assetSchema = yup.object().shape({
  cashAndInvestments: yup.array().of(lineItemSchema),
  longTermAssets: yup.array().of(lineItemSchema),
});

const currencySchema = yup
  .string()
  .required()
  .oneOf([...allCurrencies]);

const formSchema = yup.object().shape({
  assets: assetSchema,
  liabilities: liabilitySchema,
  currency: currencySchema,
});

export { moneyRegex, formSchema };
