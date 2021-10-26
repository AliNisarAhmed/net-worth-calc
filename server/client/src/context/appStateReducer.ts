import { AppState } from "../types";

export type Action = { type: "TOGGLE_IS_LOADING" };

export type AppDispatch = (action: Action) => void;

function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "TOGGLE_IS_LOADING":
      return { ...state, isLoading: !state.isLoading };

    default:
      return state;
  }
}

export { appStateReducer };
