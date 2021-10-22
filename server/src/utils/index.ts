import {
  Asset,
  CurrencyAPIResponse,
  CurrencyCode,
  Liability,
  LineItem,
  NetWorth,
} from "../types";

export const sampleResponse: CurrencyAPIResponse = {
  date: "2021-10-21",
  [CurrencyCode.CAD]: 1.231841,
};

export function getRate(
  currency: CurrencyCode,
  apiResponse: CurrencyAPIResponse
): number {
  return apiResponse[currency];
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
