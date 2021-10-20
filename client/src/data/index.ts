import { NetWorth } from "../types";

export const data: NetWorth = {
  assets: {
    cashAndInvestments: [
      { label: "Chequing", amount: "2000" },
      { label: "Saving For Taxes", amount: "4000" },
      { label: "Rainy Day Fund", amount: "6000" },
      { label: "Savings for Fun", amount: "5000" },
      { label: "Savings for Travel", amount: "400" },
      {
        label: "Savings for Personal Development",
        amount: "2000",
      },
      { label: "Investment 1", amount: "4000" },
      { label: "Investment 2", amount: "5000" },
      { label: "Investment 3", amount: "4000" },
    ],
    longTermAssets: [
      { label: "Primary Home", amount: "2000" },
      { label: "Secondary Home", amount: "2000" },
      { label: "Other", amount: "2000" },
    ],
  },
  liabilities: {
    shortTerm: [
      { label: "Credit Card 1", amount: "2000" },
      { label: "Credit Card 2", amount: "2000" },
    ],
    longTerm: [
      { label: "Mortgage 1", amount: "2000" },
      { label: "Mortgage 2", amount: "2000" },
      { label: "Line of Credit", amount: "2000" },
      { label: "Investment Load", amount: "2000" },
    ],
  },
};
