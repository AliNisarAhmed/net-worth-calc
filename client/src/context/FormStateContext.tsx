import React from "react";
import { FormFields } from "../types";
import { data } from "../data";
import { useForm, FormProvider } from "react-hook-form";
import {
  getItemFromLocalStorage,
  storeItemInLocalStorage,
} from "../localStorage";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "../validation";
import { Dispatch, formStateReducer } from "./formStateReducer";

const FormContext = React.createContext<
  { state: FormFields; dispatch: Dispatch } | undefined
>(undefined);

type FormContextProviderProps = { children: React.ReactNode };

const initialFormState: FormFields = {
  totalNetWorth: data.totalNetWorth,
  assets: data.assets,
  liabilities: data.liabilities,
  currency: "cad",
};

const defaultFormValues =
  getItemFromLocalStorage<FormFields>() ?? initialFormState;

function FormStateContextProvider({ children }: FormContextProviderProps) {
  const [state, dispatch] = React.useReducer(
    formStateReducer,
    defaultFormValues
  );

  const methods = useForm<FormFields>({
    defaultValues: state,
    resolver: yupResolver(formSchema),
  });

  // This effect is used to update the form state after response from the server
  React.useEffect(() => {
    storeItemInLocalStorage<FormFields>(state);
    methods.reset(state);
  }, [methods, state]);

  const value = {
    state,
    dispatch,
  };

  return (
    <FormContext.Provider value={value}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormContext.Provider>
  );
}

function useFormStateContext() {
  const context = React.useContext(FormContext);

  if (context === undefined) {
    throw new Error(
      "useFormStateContext must be used within an FormStateContextProvider"
    );
  }

  return context;
}

export { FormStateContextProvider, useFormStateContext };
