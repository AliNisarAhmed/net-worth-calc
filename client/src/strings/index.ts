import { CurrencyCode } from "../types";

type Strings = {
  currencyLabels: {
    [key in CurrencyCode]: string;
  };
  currencySymbols: {
    [key in CurrencyCode]: string;
  };
};
export const strings: Strings = {
  currencyLabels: {
    usd: "US Dollar",
    cad: "Canadian Dollar",
    cny: "Yuan Renminbi",
    eur: "Euro",
    jpy: "Japanese Yen",
    inr: "Indian Rupee",
    gbp: "Pound Sterling",
    aud: "Australian Dollar",
    sgd: "Singapore Dollar",
    aed: "UAD Dirham",
  },
  currencySymbols: {
    cad: "\u0024",
    usd: "\u0024",
    aud: "\u0024",
    gbp: "\u00a3",
    jpy: "\u0045",
    eur: "\u20ac",
    inr: "\u20a8",
    sgd: "S\u0024",
    aed: "DH",
    cny: "\u5143",
  },
};
