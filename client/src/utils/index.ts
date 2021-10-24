import { strings } from "../strings";
import { Asset, CurrencyCode, Liability, LineItem } from "../types";

function calculateTotalAssets(assets: Asset): number {
  return (
    sumLineItems(assets.cashAndInvestments) +
    sumLineItems(assets.longTermAssets)
  );
}

function calculateTotalLiabilities(liabilities: Liability): number {
  return (
    sumLineItems(liabilities.longTerm) + sumLineItems(liabilities.shortTerm)
  );
}

function calculateNetWorth(assets: Asset, liabilities: Liability): number {
  return calculateTotalAssets(assets) - calculateTotalLiabilities(liabilities);
}

function getCurrencySymbol(currency: CurrencyCode): string {
  return strings.currencySymbols[currency];
}

export {
  calculateTotalAssets,
  calculateTotalLiabilities,
  calculateNetWorth,
  getCurrencySymbol,
};

// ------------------- PRIVATE Functions --------------------------

function sumLineItems(lineItems: LineItem[]): number {
  return lineItems.reduce((acc, item) => Number(item.amount) + acc, 0);
}
