// --------------------------- DOMAIN -------------------------------

export interface NetWorth {
  totalNetWorth: string;
  assets: Asset;
  liabilities: Liability;
}

export interface Asset {
  totalAssets: string;
  cashAndInvestments: LineItem[];
  longTermAssets: LineItem[];
}

export interface Liability {
  totalLiabilities: string;
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

export type CollapseState = "collapsed" | "un-collapsed";

export const toggleCollapse = (c: CollapseState) =>
  c === "collapsed" ? "un-collapsed" : "collapsed";

export interface AppState {
  isLoading: boolean;
  collapsed: {
    [key: string]: CollapseState;
  };
}

export type FormFields = {
  totalNetWorth: string;
  assets: {
    totalAssets: string;
    cashAndInvestments: LineItem[];
    longTermAssets: LineItem[];
  };
  liabilities: {
    totalLiabilities: string;
    shortTerm: LineItem[];
    longTerm: LineItem[];
  };
  currency: CurrencyCode;
};

// -------------------------  REQUEST AND RESPONSE ----------------------

export interface ConvertNetWorthRequest {
  newCurrencyCode: CurrencyCode;
  oldCurrencyCode: CurrencyCode;
  netWorth: NetWorth;
}

export interface CalculateNetWorthRequest {
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
}

export interface NetWorthCalculationResponse {
  totalNetWorth: string;
  totalAssets: string;
  totalLiabilities: string;
}
