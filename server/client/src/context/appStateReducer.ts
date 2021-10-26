import { AppState, toggleCollapse } from "../types";

export type Action =
  | { type: "TOGGLE_IS_LOADING" }
  | { type: "TOGGLE_COLLAPSE"; payload: string };

export type AppDispatch = (action: Action) => void;

function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "TOGGLE_IS_LOADING":
      return { ...state, isLoading: !state.isLoading };

    case "TOGGLE_COLLAPSE":
      return {
        ...state,
        collapsed: {
          ...state.collapsed,
          [action.payload]: toggleCollapse(state.collapsed[action.payload]),
        },
      };

    default:
      return state;
  }
}

export { appStateReducer };
