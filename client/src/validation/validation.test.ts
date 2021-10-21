import { moneyRegex } from "./";

describe("Test two decimal places number Regex", () => {
  test("matches two digits numbers with no decimal places", () => {
    const num = "12";
    expect(num.match(moneyRegex)).toBeTruthy();
  });

  test("matches number with two decimal places", () => {
    const num = "12.12";
    expect(num.match(moneyRegex)).toBeTruthy();
  });

  test("matches number with single decimal digit", () => {
    const num = "12.1";
    expect(num.match(moneyRegex)).toBeTruthy();
  });

  test("does not match number with three decimal places", () => {
    const num = "12.123";
    expect(num.match(moneyRegex)).toBeFalsy();
  });

  test("matches decimal numbers less than one with leading 0", () => {
    const num = "0.12";
    expect(num.match(moneyRegex)).toBeTruthy();
  });

  test("does not match less than 1 decimal number without leading zeroes", () => {
    const num = ".23";
    expect(num.match(moneyRegex)).toBeFalsy();
  });

  test("does not match non-numbers", () => {
    const num = "12a";
    expect(num.match(moneyRegex)).toBeFalsy();
  });
});
