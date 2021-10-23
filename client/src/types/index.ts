// --------------------------- DOMAIN -------------------------------

export interface NetWorth {
  netWorth: string;
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
] as const;

export type CurrencyCode = typeof allCurrencies[number];

// --------------------------- APP -------------------------------

export interface AppState {
  netWorth: string;
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
}

export type FormFields = {
  netWorth: string;
  assets: {
    cashAndInvestments: LineItem[];
    longTermAssets: LineItem[];
  };
  liabilities: {
    shortTerm: LineItem[];
    longTerm: LineItem[];
  };
  currency: CurrencyCode;
};

// -------------------------  REQUEST AND RESPONSE ----------------------

export interface ConvertNetWorthRequest {
  newCurrency: string;
  oldCurrency: string;
  netWorth: NetWorth;
}

export interface CalculateNetWorthRequest {
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
}

export interface NetWorthCalculationResponse {
  netWorth: string;
}
