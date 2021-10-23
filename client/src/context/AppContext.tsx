import React from "react";
import { AppState, FormFields } from "../types";
import { data } from "../data";
import { useForm, FormProvider } from "react-hook-form";
import {
  getItemFromLocalStorage,
  storeItemInLocalStorage,
} from "../localStorage";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../validation";
import { appStateReducer, Dispatch } from "./reducer";

const AppContext = React.createContext<
  { state: AppState; dispatch: Dispatch } | undefined
>(undefined);

type AppContextProviderProps = { children: React.ReactNode };

const initialState: AppState = {
  netWorth: data.netWorth,
  assets: data.assets,
  liabilities: data.liabilities,
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
