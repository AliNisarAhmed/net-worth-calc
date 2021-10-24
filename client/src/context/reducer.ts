import { AppState, Asset, CurrencyCode, Liability } from "../types";

export type NetWorthCalculationPayload = {
  netWorth: string;
  assets: Asset;
  liabilities: Liability;
  currency: CurrencyCode;
};

export type Action =
  | { type: "UPDATE_NET_WORTH"; payload: NetWorthCalculationPayload }
  | {
      type: "NET_WORTH_CALCULATION_RESULT";
      payload: NetWorthCalculationPayload;
    }
  | { type: "TOGGLE_IS_LOADING" };

export type Dispatch = (action: Action) => void;

function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "UPDATE_NET_WORTH":
      return {
        ...state,
        formState: {
          netWorth: action.payload.netWorth,
          assets: action.payload.assets,
          liabilities: action.payload.liabilities,
          currency: action.payload.currency,
        },
      };

    case "NET_WORTH_CALCULATION_RESULT":
      return {
        ...state,
        formState: {
          ...action.payload,
          currency: state.formState.currency,
        },
      };

    case "TOGGLE_IS_LOADING":
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    default:
      return state;
  }
}

export { appStateReducer };
