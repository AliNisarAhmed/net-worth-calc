export const allCurrencies = [
  "USD",
  "CAD",
  "CNY",
  "EUR",
  "JPY",
  "INR",
  "GBP",
  "AUD",
  "SGD",
  "AED",
];

export enum CurrencyCode {
  USD = "USD",
  CAD = "CAD",
  CNY = "CNY",
  EUR = "EUR",
  JPY = "JPY",
  INR = "INR",
  GBP = "GBP",
  AUD = "AUD",
  SGD = "SGD",
  AED = "AED",
}

// export type CurrencyCode = typeof allCurrencies[number];

export type CurrencyAPIResponse = {
  meta: {
    code: number;
    disclaimer: string;
  };
  response: {
    date: string;
    base: string;
    rates: {
      [key in CurrencyCode]: number;
    };
  };
};

export interface NetWorth {
  assets: Asset;
  liabilities: Liability;
}

export interface Asset {
  cashAndInvestments: LineItem[];
  longTermAssets: LineItem[];
}

export interface Liability {
  shortTerm: LineItem[];
  longTerm: LineItem[];
}

export interface LineItem {
  label: string;
  amount: string;
}

export interface AppState {
  netWorth: NetWorth;
}

export type NetWorthConvertRequest = {
  oldCurrency: CurrencyCode;
  newCurrency: CurrencyCode;
  netWorth: NetWorth;
};
