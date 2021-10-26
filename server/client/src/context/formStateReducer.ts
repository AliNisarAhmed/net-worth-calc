import { Asset, CurrencyCode, FormFields, Liability } from "../types";

export type NetWorthConversionPayload = {
  totalNetWorth: string;
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
};

export type NetWorthCalculationPayload = FormFields;

export type Action =
  | { type: "UPDATE_NET_WORTH"; payload: NetWorthConversionPayload }
  | {
      type: "NET_WORTH_CALCULATION_RESULT";
      payload: NetWorthCalculationPayload;
    };

export type Dispatch = (action: Action) => void;

function formStateReducer(state: FormFields, action: Action): FormFields {
  switch (action.type) {
    case "UPDATE_NET_WORTH":
      return {
        totalNetWorth: action.payload.totalNetWorth,
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        currency: action.payload.currency,
      };

    case "NET_WORTH_CALCULATION_RESULT":
      return {
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        totalNetWorth: action.payload.totalNetWorth,
        currency: action.payload.currency,
      };

    default:
      return state;
  }
}

export { formStateReducer };
