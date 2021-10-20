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

export type Action = { type: ActionType; payload: any };

export type ActionType = "InputFieldChanged";

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

export type CurrencyCode =
  | "usd"
  | "cad"
  | "cny"
  | "eur"
  | "pkr"
  | "inr"
  | "gbp"
  | "aud"
  | "sgd"
  | "aed";

export const allCurrencies: CurrencyCode[] = [
  "usd",
  "cad",
  "cny",
  "eur",
  "pkr",
  "inr",
  "gbp",
  "aud",
  "sgd",
  "aed",
];
