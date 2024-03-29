export const allCurrencies = [
  "usd",
  "cad",
  "cny",
  "eur",
  "jpy",
  "inr",
  "gbp",
  "aud",
  "sgd",
  "aed",
];

export enum CurrencyCode {
  USD = "usd",
  CAD = "cad",
  CNY = "cny",
  EUR = "eur",
  JPY = "jpy",
  INR = "inr",
  GBP = "gbp",
  AUD = "aud",
  SGD = "sgd",
  AED = "aed",
}

// combining two types/objects: {date: string} with enum object
export type CurrencyAPIResponse = Partial<Record<CurrencyCode, number>> & {
  date: string;
};

export interface NetWorth {
  totalNetWorth: string;
  assets: Asset;
  liabilities: Liability;
}

export interface Asset {
  cashAndInvestments: LineItem[];
  longTermAssets: LineItem[];
  totalAssets: string;
}

export interface Liability {
  shortTerm: LineItem[];
  longTerm: LineItem[];
  totalLiabilities: string;
}

export interface LineItem {
  label: string;
  amount: string;
}

// -------------------------- REQUEST -------------------------

export type ConvertNetWorthRequest = {
  oldCurrencyCode: CurrencyCode;
  newCurrencyCode: CurrencyCode;
  netWorth: NetWorth;
};

export type CalculateNetWorthRequest = {
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
};

// ------------------------- RESPONSE --------------------------

export type CalculateNetWorthResult = {
  totalNetWorth: string; 
  totalAssets: string;
  totalLiabilities: string;
}
