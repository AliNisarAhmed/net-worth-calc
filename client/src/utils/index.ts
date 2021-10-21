import { strings } from "../strings";
import { Asset, CurrencyCode, Liability, LineItem } from "../types";

export function calculateTotalAssets(assets: Asset): number {
  return (
    sumLineItems(assets.cashAndInvestments) +
    sumLineItems(assets.longTermAssets)
  );
}

export function calculateTotalLiabilities(liabilities: Liability): number {
  return (
    sumLineItems(liabilities.longTerm) + sumLineItems(liabilities.shortTerm)
  );
}

export function calculateNetWorth(
  assets: Asset,
  liabilities: Liability
): number {
  return calculateTotalAssets(assets) - calculateTotalLiabilities(liabilities);
}

export function getCurrencySymbol(currency: CurrencyCode): string {
  return strings.currencySymbols[currency];
}

function sumLineItems(lineItems: LineItem[]): number {
  return lineItems.reduce((acc, item) => Number(item.amount) + acc, 0);
}
