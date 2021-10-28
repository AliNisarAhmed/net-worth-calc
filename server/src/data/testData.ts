import { ConvertNetWorthRequest, CurrencyCode, NetWorth } from "../types";
import { LineItem } from "../types";

const newCurrencyCode = CurrencyCode.CAD;
const oldCurrencyCode = CurrencyCode.USD;

const assets = {
  totalAssets: "100.24",
  cashAndInvestments: [
    {
      label: "Asset 1",
      amount: "100.24",
    },
  ],
  longTermAssets: [] as LineItem[],
};

const liabilities = {
  totalLiabilities: "87.93",
  shortTerm: [
    {
      label: "Liability 1",
      amount: "87.93",
    },
  ],
  longTerm: [] as LineItem[],
};

const convertRequest: ConvertNetWorthRequest = {
  netWorth: {
    assets,
    liabilities,
    totalNetWorth: "12.31",
  },
  newCurrencyCode,
  oldCurrencyCode,
};
const conversionResponse: NetWorth = {
  assets: {
    cashAndInvestments: [{ label: "Asset 1", amount: "123.48" }],
    longTermAssets: [],
    totalAssets: "123.48",
  },
  liabilities: {
    shortTerm: [
      {
        label: "Liability 1",
        amount: "108.32",
      },
    ],
    longTerm: [],
    totalLiabilities: "108.32",
  },
  totalNetWorth: "15.16",
};

export {
  assets,
  liabilities,
  convertRequest,
  newCurrencyCode,
  oldCurrencyCode,
  conversionResponse,
};
