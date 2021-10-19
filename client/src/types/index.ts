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
  amount: number; // in 100 cents so $24 = 2400
}

export interface AppState {
  netWorth: NetWorth;
}

export type Action
  = { type: ActionType, payload: any }

export type ActionType
  = 'InputFieldChanged'

export type Dispatch = (action: Action) => void
