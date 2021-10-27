import { NetWorth } from "../types";

export const data: NetWorth = {
  totalNetWorth: "0",
  assets: {
    totalAssets: "0",
    cashAndInvestments: [
      { label: "Chequing", amount: "0.00" },
      { label: "Saving For Taxes", amount: "0" },
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
      { label: "Primary Home", amount: "0" },
      { label: "Secondary Home", amount: "0" },
      { label: "Other", amount: "0" },
    ],
  },
  liabilities: {
    totalLiabilities: "0",
    shortTerm: [
      { label: "Credit Card 1", amount: "0.00" },
      { label: "Credit Card 2", amount: "0" },
    ],
    longTerm: [
      { label: "Mortgage 1", amount: "0" },
      { label: "Mortgage 2", amount: "0" },
      { label: "Line of Credit", amount: "0" },
      { label: "Investment Loan", amount: "0" },
    ],
  },
};
