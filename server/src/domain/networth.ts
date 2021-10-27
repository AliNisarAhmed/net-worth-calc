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
  if (items.length === 0) {
    return D.dinero({ amount: 0, currency });
  }

  return items.map((item) => lineItemToDinero(item, currency)).reduce(D.add);
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
  return String(D.toUnit(dinero, { digits: 2, round: D.halfEven }));
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

  const rates = {
    [newCurrency.code]: scaledRate,
  };

  const converted = D.convert(amountDinero, newCurrency, rates);

  return {
    ...item,
    amount: dineroToString(converted),
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

  return {
    shortTerm,
    longTerm,
    totalLiabilities: liab.totalLiabilities,
  };
}

function convertAssets(asset: Asset, args: ConvertLineItemArgs): Asset {
  const cashAndInvestments = asset.cashAndInvestments.map((item) =>
    convertLineItem(item, args)
  );
  const longTermAssets = asset.longTermAssets.map((item) =>
    convertLineItem(item, args)
  );

  return {
    cashAndInvestments,
    longTermAssets,
    totalAssets: asset.totalAssets,
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

  const totalNetWorthDinero = D.subtract(totalAssets, totalLiabs);

  return {
    totalNetWorth: dineroToString(totalNetWorthDinero),
    totalAssets: dineroToString(totalAssets),
    totalLiabilities: dineroToString(totalLiabs),
  };
}
