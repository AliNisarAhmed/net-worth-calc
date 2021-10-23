import { NetWorth } from "../types";

export const data: NetWorth = {
  netWorth: "1000",
  assets: {
    cashAndInvestments: [
      { label: "Chequing", amount: "500.00" },
      { label: "Saving For Taxes", amount: "500" },
      { label: "Rainy Day Fund", amount: "0" },
      { label: "Savings for Fun", amount: "0" },
      { label: "Savings for Travel", amount: "0" },
      {
        label: "Savings for Personal Development",
        amount: "0",
      },
      { label: "Investment 1", amount: "0" },
      { label: "Investment 2", amount: "0" },
      { label: "Investment 3", amount: "0" },
    ],
    longTermAssets: [
      { label: "Primary Home", amount: "500" },
      { label: "Secondary Home", amount: "500" },
      { label: "Other", amount: "0" },
    ],
  },
  liabilities: {
    shortTerm: [
      { label: "Credit Card 1", amount: "500" },
      { label: "Credit Card 2", amount: "0" },
    ],
    longTerm: [
      { label: "Mortgage 1", amount: "500" },
      { label: "Mortgage 2", amount: "0" },
      { label: "Line of Credit", amount: "0" },
      { label: "Investment Load", amount: "0" },
    ],
  },
};
