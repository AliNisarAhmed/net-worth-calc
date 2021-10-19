import { NetWorth } from "../types";

export const data: NetWorth = {
  assets: {
    cashAndInvestments: [
      { label: "Chequing", amount: 2000_00 },
      { label: "Saving For Taxes", amount: 4000_00 },
      { label: "Rainy Day Fund", amount: 506_00 },
    ],
    longTermAssets: [],
  },
  liabilities: {
    shortTerm: [
      { label: "Credit Card 1", amount: 4342_00 },
      { label: "Credit Card 2", amount: 322_00 },
    ],
    longTerm: [
      { label: "Mortgage 1", amount: 250999_00 },
      { label: "Mortgage 2", amount: 632634_00 },
    ],
  },
};
