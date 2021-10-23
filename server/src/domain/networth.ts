import {
  add,
  Currency,
  dinero,
  Dinero,
  down,
  subtract,
  toUnit,
} from "dinero.js";
import { Asset, CurrencyCode, Liability, LineItem } from "../types";
import { currencyMap, numberToDinero } from "../utils";

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
    (acc, item) => add(acc, lineItemToDinero(item, currency)),
    dinero({ amount: 0, currency })
  );
}

function sumAssets(
  { cashAndInvestments, longTermAssets }: Asset,
  currency: Currency<number>
): Dinero<number> {
  return add(
    sumLineItemsToDinero(cashAndInvestments, currency),
    sumLineItemsToDinero(longTermAssets, currency)
  );
}

function sumLiabilities(
  { shortTerm, longTerm }: Liability,
  currency: Currency<number>
): Dinero<number> {
  return add(
    sumLineItemsToDinero(shortTerm, currency),
    sumLineItemsToDinero(longTerm, currency)
  );
}

export function calculateNetworth(
  assets: Asset,
  liabilities: Liability,
  currencyCode: CurrencyCode
): string {
  const currency = currencyMap[currencyCode];

  console.log('currency: ', currency);

  const netWorthDinero = subtract(
    sumAssets(assets, currency),
    sumLiabilities(liabilities, currency)
  );

  return String(toUnit(netWorthDinero, { digits: 2, round: down }));
}
