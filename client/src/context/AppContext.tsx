import React from "react";
import { AppState, Action, Dispatch, FormFields } from "../types";
import { data as netWorth } from "../data";
import { useForm, FormProvider } from "react-hook-form";
import {
  getItemFromLocalStorage,
  storeItemInLocalStorage,
} from "../localStorage";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../validation";

const AppContext = React.createContext<
  { state: AppState; dispatch: Dispatch } | undefined
>(undefined);

type AppContextProviderProps = { children: React.ReactNode };

function appStateReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "UPDATE_NET_WORTH":
      return {
        assets: action.payload.assets,
        liabilities: action.payload.liabilities,
        currency: action.payload.currency,
      };

    default:
      return state;
  }
}

const initialState: AppState = {
  assets: netWorth.assets,
  liabilities: netWorth.liabilities,
  currency: "cad",
};

const defaultFormValues = getItemFromLocalStorage<FormFields>() ?? initialState;

function AppContextProvider({ children }: AppContextProviderProps) {
  const [state, dispatch] = React.useReducer(
    appStateReducer,
    defaultFormValues
  );

  const methods = useForm<FormFields>({
    defaultValues: state,
    resolver: yupResolver(formSchema),
  });

  React.useEffect(() => {
    storeItemInLocalStorage<AppState>(state);
    methods.reset(state);
  }, [methods, state]);

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
