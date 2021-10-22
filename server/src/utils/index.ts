import {
  Asset,
  CurrencyAPIResponse,
  CurrencyCode,
  Liability,
  LineItem,
  NetWorth,
} from "../types";

export const sampleResponse: CurrencyAPIResponse = {
  meta: {
    code: 200,
    disclaimer: "Usage subject to terms: https://currencyscoop.com/terms",
  },
  response: {
    date: "2021-10-22T00:12:51Z",
    base: "USD",
    rates: {
      AED: 3.6725,
      CAD: 1.23691041,
      AUD: 1.33980474,
      CNY: 6.39533017,
      EUR: 0.86016364,
      GBP: 0.72502779,
      INR: 74.86699133,
      JPY: 113.84019258,
      SGD: 1.3468343,
      USD: 1,
    },
  },
};

export function getRate(currency: CurrencyCode, apiResponse: CurrencyAPIResponse): number {
  return apiResponse.response.rates[currency];
}

export function convertNetWorth(nw: NetWorth, rate: number): NetWorth {
  return {
    assets: convertAssets(nw.assets, rate),
    liabilities: convertLiabilities(nw.liabilities, rate),
  };
}

export function convertLiabilities(liab: Liability, rate: number): Liability {
  return {
    shortTerm: liab.shortTerm.map((item) => convertLineItem(item, rate)),
    longTerm: liab.longTerm.map((item) => convertLineItem(item, rate)),
  };
}

export function convertAssets(asset: Asset, rate: number): Asset {
  return {
    cashAndInvestments: asset.cashAndInvestments.map((item) =>
      convertLineItem(item, rate)
    ),
    longTermAssets: asset.longTermAssets.map((item) =>
      convertLineItem(item, rate)
    ),
  };
}

export function convertLineItem(item: LineItem, rate: number): LineItem {
  let newAmount = roundToTwoDecimalPlaces(Number(item.amount) * rate);
  return { ...item, amount: String(newAmount) };
}

export function roundToTwoDecimalPlaces(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}
