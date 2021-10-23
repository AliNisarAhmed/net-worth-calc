import { AppState } from "../types";

export type Action = { type: ActionType; payload: any };

export type ActionType = "UPDATE_NET_WORTH" | "NET_WORTH_CALCULATION_RESULT";

export type Dispatch = (action: Action) => void;

export function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "UPDATE_NET_WORTH":
      return {
        isLoading: false,
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

    default:
      return state;
  }
}
