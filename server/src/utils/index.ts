import {
  Asset,
  CurrencyAPIResponse,
  CurrencyCode,
  Liability,
  LineItem,
  NetWorth,
} from "../types";
import {
  USD,
  CAD,
  CNY,
  JPY,
  INR,
  SGD,
  AUD,
  GBP,
  AED,
  EUR,
  Currency,
} from "@dinero.js/currencies";
import {
  convert,
  dinero,
  toSnapshot,
  toUnit,
  halfEven,
  down,
  Dinero,
} from "dinero.js";

export const currencyMap: Record<CurrencyCode, Currency<number>> = {
  [CurrencyCode.AED]: AED,
  [CurrencyCode.USD]: USD,
  [CurrencyCode.CAD]: CAD,
  [CurrencyCode.AUD]: AUD,
  [CurrencyCode.CNY]: CNY,
  [CurrencyCode.SGD]: SGD,
  [CurrencyCode.JPY]: JPY,
  [CurrencyCode.INR]: INR,
  [CurrencyCode.EUR]: EUR,
  [CurrencyCode.GBP]: GBP,
};

export const sampleResponse: CurrencyAPIResponse = {
  date: "2021-10-21",
  [CurrencyCode.CAD]: 1.231841,
};

export function convertNetWorth(
  nw: NetWorth,
  args: ConvertLineItemArgs
): NetWorth {
  return {
    assets: convertAssets(nw.assets, args),
    liabilities: convertLiabilities(nw.liabilities, args),
  };
}

export function convertLiabilities(
  liab: Liability,
  args: ConvertLineItemArgs
): Liability {
  return {
    shortTerm: liab.shortTerm.map((item) => convertLineItem(item, args)),
    longTerm: liab.longTerm.map((item) => convertLineItem(item, args)),
  };
}

export function convertAssets(asset: Asset, args: ConvertLineItemArgs): Asset {
  return {
    cashAndInvestments: asset.cashAndInvestments.map((item) =>
      convertLineItem(item, args)
    ),
    longTermAssets: asset.longTermAssets.map((item) =>
      convertLineItem(item, args)
    ),
  };
}

export type ConvertLineItemArgs = {
  scaledRate: NumberWithScale;
  newCurrency: Currency<number>;
  oldCurrency: Currency<number>;
};
export function convertLineItem(
  item: LineItem,
  { scaledRate, newCurrency, oldCurrency }: ConvertLineItemArgs
): LineItem {
  const amountDinero = numberToDinero(item.amount, oldCurrency);

  console.log("Amount Dinero: ", toSnapshot(amountDinero));

  let rates = {
    [newCurrency.code]: scaledRate,
  };

  console.log("Rates: ", rates);

  let converted = convert(amountDinero, newCurrency, rates);

  console.log("Converted: ", toSnapshot(converted));

  return {
    ...item,
    amount: String(toUnit(converted, { digits: 2, round: down })),
  };
}

// export function roundToTwoDecimalPlaces(n: number): number {
//   return Math.round((n + Number.EPSILON) * 100) / 100;
// }

export type NumberWithScale = {
  amount: number;
  scale: number;
};

// e.g. getNumeberWithScale(1.2345) -> { amount: 12345, scale: 4 }
export function getNumberWithScale(n: string | number): NumberWithScale {
  if (typeof n === "number") {
    n = String(n);
  }
  if (n.startsWith("0.")) {
    let rem = n.slice(2);
    return { amount: Number(rem), scale: rem.length };
  } else {
    let [preDecimal, postDecimal] = n.split(".");
    if (postDecimal === undefined) {
      return { amount: Number(preDecimal), scale: 0 };
    } else {
      return {
        amount: Number(preDecimal + postDecimal),
        scale: postDecimal.length,
      };
    }
  }
}

export function numberToDinero(
  n: string,
  currency: Currency<number>
): Dinero<number> {
  let numberWithScale = getNumberWithScale(n);

  return dinero({
    amount: numberWithScale.amount,
    scale: numberWithScale.scale,
    currency: currency,
  });
}
