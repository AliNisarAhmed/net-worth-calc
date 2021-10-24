import {
  CalculateNetWorthRequest,
  ConvertNetWorthRequest,
  CurrencyCode,
} from "../types";
import * as yup from "yup";

// FROM: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
export const moneyRegex = /^\d+(\.\d{1,2})?$/;

export const lineItemSchema = yup.object().shape({
  label: yup.string().required().min(1).max(100),
  amount: yup
    .string()
    .required()
    .matches(
      moneyRegex,
      ({ value, path }) =>
        `Invalid Amount ${value} at path (${path}): Amount must be a number string with at most 2 decimal places`
    ),
});

export const liabilitySchema = yup
  .object()
  .required()
  .shape({
    shortTerm: yup.array().required().of(lineItemSchema),
    longTerm: yup.array().required().of(lineItemSchema),
    totalLiabilities: yup.string().matches(moneyRegex),
  });

export const assetSchema = yup
  .object()
  .required()
  .shape({
    cashAndInvestments: yup.array().required().of(lineItemSchema),
    longTermAssets: yup.array().required().of(lineItemSchema),
    totalAssets: yup.string().matches(moneyRegex),
  });

export const currencySchema = yup
  .mixed()
  .required()
  .oneOf(Object.values(CurrencyCode));

export const netWorthSchema = yup.object().shape({
  assets: assetSchema,
  liabilities: liabilitySchema,
  netWorth: yup.string().matches(moneyRegex),
});

// ---------------------------- REQUEST Schemas ----------------------------------------

export const convertNetWorthRequestSchema: yup.SchemaOf<ConvertNetWorthRequest> =
  yup.object().required().shape({
    oldCurrencyCode: currencySchema,
    newCurrencyCode: currencySchema,
    netWorth: netWorthSchema,
  });

export const calculateNetWorthRequestSchema: yup.SchemaOf<CalculateNetWorthRequest> =
  yup.object().required().shape({
    assets: assetSchema,
    liabilities: liabilitySchema,
    currency: currencySchema,
  });
