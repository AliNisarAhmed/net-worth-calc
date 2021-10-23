import { LineItem, CurrencyCode } from "../types";
import { convertLineItem, currencyMap, floatToRate } from "./";

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

    let i3: LineItem = {
      label: "Line Item 3",
      amount: "0.00",
    };

    const exchangeRate = 1.236916;
    const rate = floatToRate(exchangeRate);

    const oldCurrency = currencyMap[CurrencyCode.USD];
    const newCurrency = currencyMap[CurrencyCode.CAD];

    const res1 = convertLineItem(i1, { rate, newCurrency, oldCurrency });
    const res2 = convertLineItem(i2, { rate, newCurrency, oldCurrency });
    const res3 = convertLineItem(i3, { rate, newCurrency, oldCurrency });
    expect(res1.amount).toEqual("1511.78");
    expect(res2.amount).toEqual("0.14");
    expect(res3.amount).toEqual("0");
  });

  test("Test: Convert CNY to USD", () => {
    let i1: LineItem = {
      label: "Line Item 1",
      amount: "639.33",
    };

    const exchangeRate = 0.156414;
    const rate = floatToRate(exchangeRate);

    const oldCurrency = currencyMap[CurrencyCode.CNY];
    const newCurrency = currencyMap[CurrencyCode.USD];

    const res1 = convertLineItem(i1, { rate, oldCurrency, newCurrency });

    expect(res1.amount).toEqual("100");
  });
});

describe("Test: floatToRate function", () => {
  test("Correct amount and scale for number less than zero", () => {
    let n1 = 0.12345;
    let n2 = 0.0234;
    let n3 = 0.1;
    let n4 = 0.156414;

    let r1 = floatToRate(n1);
    let r2 = floatToRate(n2);
    let r3 = floatToRate(n3);
    let r4 = floatToRate(n4);

    expect(r1).toEqual({ amount: 12345, scale: 5 });
    expect(r2).toEqual({ amount: 234, scale: 4 });
    expect(r3).toEqual({ amount: 1, scale: 1 });
    expect(r4).toEqual({ amount: 156414, scale: 6 });
  });

  test("Correct amount and scale for numbers greater than 1", () => {
    let n1 = 1.12345;
    let n2 = 12.345;
    let n3 = 100.2345;
    let n4 = 13.0001;

    let r1 = floatToRate(n1);
    let r2 = floatToRate(n2);
    let r3 = floatToRate(n3);
    let r4 = floatToRate(n4);

    expect(r1).toEqual({ amount: 112345, scale: 5 });
    expect(r2).toEqual({ amount: 12345, scale: 3 });
    expect(r3).toEqual({ amount: 1002345, scale: 4 });
    expect(r4).toEqual({ amount: 130001, scale: 4 });
  });
});
