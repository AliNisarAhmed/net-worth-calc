import * as D from "dinero.js";
import { Dinero } from "dinero.js";
import {
  Asset,
  CalculateNetWorthResult,
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

export {
  currencyMap,
  numberToDinero,
  getNumberWithScale,
  convertLineItem,
  convertNetWorth,
  convertLiabilities,
  convertAssets,
  calculateNetworth,
};

// --------------------------------------------------------------------------------
// --------------------------------- DINERO ---------------------------------------------
// --------------------------------------------------------------------------------

// A hashmap from CurrencyCode to Currency type from Dinero.js
const currencyMap: Record<CurrencyCode, Currency<number>> = {
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

// Line item has amounts in two decimal places
function lineItemToDinero(
  { amount }: LineItem,
  currency: Currency<number>
): Dinero<number> {
  return numberToDinero(amount, currency);
}

function sumLineItemsToDinero(
  items: LineItem[],
  currency: Currency<number>
): Dinero<number> {
  return items.reduce(
    (acc, item) => D.add(acc, lineItemToDinero(item, currency)),
    D.dinero({ amount: 0, currency })
  );
}

// e.g. getNumeberWithScale(1.2345) -> { amount: 12345, scale: 4 }
function numberToDinero(n: string, currency: Currency<number>): Dinero<number> {
  let numberWithScale = getNumberWithScale(n);

  return D.dinero({
    amount: numberWithScale.amount,
    scale: numberWithScale.scale,
    currency: currency,
  });
}

function dineroToString(dinero: Dinero<number>): string {
  return String(D.toUnit(dinero, { digits: 2, round: D.down }));
}

// --------------------------------------------------------------------------------
// ------------------------ NUMBER WITH SCALE -------------------------------------
// --------------------------------------------------------------------------------

export type NumberWithScale = {
  amount: number;
  scale: number;
};

function getNumberWithScale(n: string | number): NumberWithScale {
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

// --------------------------------------------------------------------------------
// ------------------------- LINE ITEM - Conversion -------------------------
// --------------------------------------------------------------------------------

export type ConvertLineItemArgs = {
  scaledRate: NumberWithScale;
  newCurrencyCode: CurrencyCode;
  oldCurrencyCode: CurrencyCode;
};

function convertLineItem(
  item: LineItem,
  { scaledRate, newCurrencyCode, oldCurrencyCode }: ConvertLineItemArgs
): LineItem {
  const newCurrency = currencyMap[newCurrencyCode];
  const oldCurrency = currencyMap[oldCurrencyCode];

  const amountDinero = numberToDinero(item.amount, oldCurrency);

  console.log("Amount Dinero: ", D.toSnapshot(amountDinero));

  let rates = {
    [newCurrency.code]: scaledRate,
  };

  console.log("Rates: ", rates);

  let converted = D.convert(amountDinero, newCurrency, rates);

  console.log("Converted: ", D.toSnapshot(converted));

  return {
    ...item,
    amount: String(D.toUnit(converted, { digits: 2, round: D.down })),
  };
}

// --------------------------------------------------------------------------------
// --------------------------- NET WORTH - Conversion --------------------------------
// --------------------------------------------------------------------------------

function convertNetWorth(nw: NetWorth, args: ConvertLineItemArgs): NetWorth {
  const assets = convertAssets(nw.assets, args);
  const liabs = convertLiabilities(nw.liabilities, args);
  const { totalNetWorth, totalAssets, totalLiabilities } = calculateNetworth(
    assets,
    liabs,
    args.newCurrencyCode
  );

  return {
    totalNetWorth,
    assets: { ...assets, totalAssets },
    liabilities: { ...liabs, totalLiabilities },
  };
}

function convertLiabilities(
  liab: Liability,
  args: ConvertLineItemArgs
): Liability {
  const shortTerm = liab.shortTerm.map((item) => convertLineItem(item, args));
  const longTerm = liab.longTerm.map((item) => convertLineItem(item, args));
  const totalLiabilities = sumLiabilities(
    { shortTerm, longTerm },
    currencyMap[args.newCurrencyCode]
  );

  return {
    shortTerm,
    longTerm,
    totalLiabilities: dineroToString(totalLiabilities),
  };
}

function convertAssets(asset: Asset, args: ConvertLineItemArgs): Asset {
  const cashAndInvestments = asset.cashAndInvestments.map((item) =>
    convertLineItem(item, args)
  );
  const longTermAssets = asset.longTermAssets.map((item) =>
    convertLineItem(item, args)
  );

  const totalAssets = sumAssets(
    { cashAndInvestments, longTermAssets },
    currencyMap[args.newCurrencyCode]
  );

  return {
    cashAndInvestments,
    longTermAssets,
    totalAssets: dineroToString(totalAssets),
  };
}

// --------------------------------------------------------------------------------
// ----------------------------- NET WORTH - Sum -------------------------------------
// --------------------------------------------------------------------------------

function sumAssets(
  { cashAndInvestments, longTermAssets }: Partial<Asset>,
  currency: Currency<number>
): Dinero<number> {
  return D.add(
    sumLineItemsToDinero(cashAndInvestments, currency),
    sumLineItemsToDinero(longTermAssets, currency)
  );
}

function sumLiabilities(
  { shortTerm, longTerm }: Partial<Liability>,
  currency: Currency<number>
): Dinero<number> {
  return D.add(
    sumLineItemsToDinero(shortTerm, currency),
    sumLineItemsToDinero(longTerm, currency)
  );
}

function calculateNetworth(
  assets: Asset,
  liabilities: Liability,
  currencyCode: CurrencyCode
): CalculateNetWorthResult {
  const currency = currencyMap[currencyCode];

  const totalAssets = sumAssets(assets, currency);
  const totalLiabs = sumLiabilities(liabilities, currency);

  const totalNetWorthDinero = D.subtract(
    sumAssets(assets, currency),
    sumLiabilities(liabilities, currency)
  );

  return {
    totalNetWorth: dineroToString(totalNetWorthDinero),
    totalAssets: dineroToString(totalAssets),
    totalLiabilities: dineroToString(totalLiabs),
  };
}
