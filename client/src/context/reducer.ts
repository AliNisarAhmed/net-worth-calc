import { AppState } from "../types";

export type Action = { type: ActionType; payload: any };

export type ActionType = "UPDATE_NET_WORTH" | "NET_WORTH_CALCULATION_RESULT";

export type Dispatch = (action: Action) => void;

export function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "UPDATE_NET_WORTH":
      return {
        netWorth: "999.99",
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        currency: action.payload.currency,
      };

    case "NET_WORTH_CALCULATION_RESULT":
      return {
        ...action.payload,
        currency: state.currency,
      };

    default:
      return state;
  }
}
