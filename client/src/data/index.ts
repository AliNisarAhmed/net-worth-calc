import { NetWorth } from "../types";

export const data: NetWorth = {
  assets: {
    cashAndInvestments: [
      { label: "Chequing", amount: 2000 },
      { label: "Saving For Taxes", amount: 4000 },
      { label: "Rainy Day Fund", amount: 506 },
    ],
    longTermAssets: [],
  },
  liabilities: {
    shortTerm: [
      { label: "Credit Card 1", amount: 4342 },
      { label: "Credit Card 2", amount: 322 },
    ],
    longTerm: [
      { label: "Mortgage 1", amount: 250999 },
      { label: "Mortgage 2", amount: 632634 },
    ],
  },
};
