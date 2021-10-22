import { LineItem, CurrencyCode } from "../types";
import { convertLineItem, getRate, sampleResponse } from "./";

describe("Test Line Item conversion", () => {
  test("Convert from USD to CAD", () => {
    let i1: LineItem = {
      label: "Line Item 1",
      amount: "1222.22",
    };

    let i2: LineItem = {
      label: "Line Item 2",
      amount: "0.12",
    };

    const rate = 1.23691041;

    const res1 = convertLineItem(i1, rate);
    const res2 = convertLineItem(i2, rate);

    expect(res1.amount).toEqual("1511.78");
    expect(res2.amount).toEqual("0.15");
  });
});
