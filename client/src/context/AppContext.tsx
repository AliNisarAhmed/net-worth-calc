import React from "react";
import { AppState, Action, Dispatch } from "../types";
import { data as netWorth } from "../data";
import { useForm, FormProvider } from "react-hook-form";

const AppContext = React.createContext<
  { state: AppState; dispatch: Dispatch } | undefined
>(undefined);

type AppContextProviderProps = { children: React.ReactNode };

function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "InputFieldChanged":
      // TODO
      console.log("Input field changed");
      return state;

    default:
      return state;
  }
}

const initialState: AppState = {
  netWorth,
};

function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = React.useReducer(appStateReducer, initialState);
  const methods = useForm();

  const value = {
    state,
    dispatch,
  };

  return (
    <AppContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </AppContext.Provider>
  );
}

function useAppContext() {
  const context = React.useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }

  return context;
}

export { AppContextProvider, useAppContext };
