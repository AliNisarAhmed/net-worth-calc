import { Asset, CurrencyCode, Liability } from "../types";
import { calculateNetworth } from "./networth";

describe("Test calculateNetworth function", () => {
  test("calculates net worth correctly for given assets and liabilities", () => {
    let assets: Asset = {
      cashAndInvestments: [
        { label: "Line Item 1", amount: "1000.22" },
        { label: "Line Item 2", amount: "0.12" },
      ],
      longTermAssets: [
        { label: "Line Item 3", amount: "1400" },
        { label: "Line Item 4", amount: "1400.99" },
      ],
    };

    let liabilities: Liability = {
      longTerm: [{ label: "Line Item 4", amount: "99.99" }],
      shortTerm: [{ label: "Line Item 5", amount: "87.87" }],
    };

    let result = calculateNetworth(assets, liabilities, CurrencyCode.USD);

    expect(result).toBe("3613.47");
  });
});
