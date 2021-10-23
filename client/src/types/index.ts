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
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
}

export type Action = { type: ActionType; payload: any };

export type ActionType = "UPDATE_NET_WORTH";

export type Dispatch = (action: Action) => void;

export type FormFields = {
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

// -------------------------  REQUEST AND RESPONSE ----------------------

export interface ConvertNetWorthRequest {
  newCurrency: string;
  oldCurrency: string;
  netWorth: NetWorth;
}
