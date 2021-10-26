import { strings } from "../strings";
import { CurrencyCode } from "../types";

function getCurrencySymbol(currency: CurrencyCode): string {
  return strings.currencySymbols[currency];
}

export { getCurrencySymbol };
