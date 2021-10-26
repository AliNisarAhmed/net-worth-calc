import React from "react";
import { AppState } from "../types";
import { AppDispatch, appStateReducer } from "./appStateReducer";

type AppContextProviderProps = { children: React.ReactNode };

const AppStateContext = React.createContext<
  | {
      state: AppState;
      dispatch: AppDispatch;
    }
  | undefined
>(undefined);

const initialAppState: AppState = { isLoading: false };

function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = React.useReducer(appStateReducer, initialAppState);

  const value = {
    state,
    dispatch,
  };

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
}

function useAppStateContext() {
  const context = React.useContext(AppStateContext);

  if (context === undefined) {
    throw new Error(
      "App State Context must be used within an AppContextProvider"
    );
  }

  return context;
}

export { AppContextProvider, useAppStateContext };
