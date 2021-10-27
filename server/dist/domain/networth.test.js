"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const networth_1 = require("./networth");
const networth_2 = require("./networth");
describe("Test calculateNetworth function", () => {
    test("calculates net worth correctly for given assets and liabilities - 1", () => {
        let assets = {
            cashAndInvestments: [
                { label: "Line Item 1", amount: "1000.22" },
                { label: "Line Item 2", amount: "0.12" },
            ],
            longTermAssets: [
                { label: "Line Item 3", amount: "1400" },
                { label: "Line Item 4", amount: "1400.99" },
            ],
            totalAssets: "",
        };
        let liabilities = {
            longTerm: [{ label: "Line Item 4", amount: "99.99" }],
            shortTerm: [{ label: "Line Item 5", amount: "87.87" }],
            totalLiabilities: "",
        };
        let result = (0, networth_1.calculateNetworth)(assets, liabilities, types_1.CurrencyCode.USD);
        expect(result.totalNetWorth).toBe("3613.47");
        expect(result.totalAssets).toBe("3801.33");
        expect(result.totalLiabilities).toBe("187.86");
    });
    test("Check for rounding errors", () => {
        let assets = {
            cashAndInvestments: [{ label: "Line Item 1", amount: "1000.88" }],
            longTermAssets: [],
            totalAssets: "",
        };
        let liabilities = {
            longTerm: [],
            shortTerm: [],
            totalLiabilities: "",
        };
        let result = (0, networth_1.calculateNetworth)(assets, liabilities, types_1.CurrencyCode.USD);
        expect(result.totalNetWorth).toBe("1000.88");
        expect(result.totalAssets).toBe("1000.88");
        expect(result.totalLiabilities).toBe("0");
    });
    test("Test calculateNetworth function after conversion - 1", () => {
        let assets = {
            cashAndInvestments: [
                { label: "Line Item 1", amount: "1000.22" },
                { label: "Line Item 2", amount: "0.12" },
            ],
            longTermAssets: [
                { label: "Line Item 3", amount: "1400.00" },
                { label: "Line Item 4", amount: "1400.99" },
            ],
            totalAssets: "",
        };
        let liabilities = {
            longTerm: [{ label: "Line Item 4", amount: "99.99" }],
            shortTerm: [{ label: "Line Item 5", amount: "87.87" }],
            totalLiabilities: "",
        };
        let newCurrencyCode = types_1.CurrencyCode.CAD;
        let oldCurrencyCode = types_1.CurrencyCode.USD;
        let exchangeRate = 0.80857;
        let scaledRate = (0, networth_2.getNumberWithScale)(exchangeRate);
        let conversionResult = (0, networth_1.convertNetWorth)({ assets, liabilities, totalNetWorth: "0" }, {
            newCurrencyCode,
            oldCurrencyCode,
            scaledRate,
        });
        expect(conversionResult.assets.totalAssets).toBe("3073.65");
        expect(conversionResult.liabilities.totalLiabilities).toBe("151.9");
        expect(conversionResult.totalNetWorth).toBe("2921.75");
    });
    test("Test calculateNetworth function after conversion - 2", () => {
        let assets = {
            cashAndInvestments: [
                { label: "Line Item 1", amount: "10000.29" },
                { label: "Line Item 2", amount: "8900.89" }, // 11008.18760839
            ],
            longTermAssets: [
                { label: "Line Item 3", amount: "9999.99" },
                { label: "Line Item 4", amount: "10000.99" }, // 12476.18331037
            ],
            totalAssets: "", // 48219.73720904
        };
        let liabilities = {
            longTerm: [{ label: "Line Item 4", amount: "1099.99" }],
            shortTerm: [{ label: "Line Item 5", amount: "10087.87" }],
            totalLiabilities: "",
        };
        let newCurrencyCode = types_1.CurrencyCode.USD;
        let oldCurrencyCode = types_1.CurrencyCode.CAD;
        let exchangeRate = 1.236751;
        let scaledRate = (0, networth_2.getNumberWithScale)(exchangeRate);
        let conversionResult = (0, networth_1.convertNetWorth)({ assets, liabilities, totalNetWorth: "0" }, {
            newCurrencyCode,
            oldCurrencyCode,
            scaledRate,
        });
        expect(conversionResult.assets.totalAssets).toBe("48112.28");
        expect(conversionResult.liabilities.totalLiabilities).toBe("13836.59");
        expect(conversionResult.totalNetWorth).toBe("34275.69");
    });
    test("test calculateNetworth with big numbers", () => {
        let assets = {
            cashAndInvestments: [
                { label: "Line Item 1", amount: "1000000000000000000" },
                { label: "Line Item 2", amount: "1000000000000000000" },
            ],
            longTermAssets: [
                { label: "Line Item 3", amount: "1000000000000000000" },
                { label: "Line Item 4", amount: "1000000000000000000" },
            ],
            totalAssets: "",
        };
        let liabilities = {
            longTerm: [{ label: "Line Item 4", amount: "1000000000000000000" }],
            shortTerm: [{ label: "Line Item 5", amount: "100000000000000000" }],
            totalLiabilities: "",
        };
        const result = (0, networth_1.calculateNetworth)(assets, liabilities, types_1.CurrencyCode.USD);
        expect(result.totalAssets).toBe("4000000000000000000");
        expect(result.totalLiabilities).toBe("1100000000000000000");
        expect(result.totalNetWorth).toBe("2900000000000000000");
    });
});
describe("Test Line Item conversion", () => {
    test("Convert from USD to CAD", () => {
        let i1 = {
            label: "Line Item 1",
            amount: "1222.22",
        };
        let i2 = {
            label: "Line Item 2",
            amount: "0.12",
        };
        let i3 = {
            label: "Line Item 3",
            amount: "0.00",
        };
        const exchangeRate = 1.236916;
        const scaledRate = (0, networth_2.getNumberWithScale)(exchangeRate);
        const oldCurrencyCode = types_1.CurrencyCode.USD;
        const newCurrencyCode = types_1.CurrencyCode.CAD;
        const res1 = (0, networth_2.convertLineItem)(i1, {
            scaledRate,
            newCurrencyCode,
            oldCurrencyCode,
        });
        const res2 = (0, networth_2.convertLineItem)(i2, {
            scaledRate,
            newCurrencyCode,
            oldCurrencyCode,
        });
        const res3 = (0, networth_2.convertLineItem)(i3, {
            scaledRate,
            newCurrencyCode,
            oldCurrencyCode,
        });
        expect(res1.amount).toEqual("1511.78");
        expect(res2.amount).toEqual("0.15");
        expect(res3.amount).toEqual("0");
    });
    test("Test: Convert CNY to USD", () => {
        let i1 = {
            label: "Line Item 1",
            amount: "639.33",
        };
        const exchangeRate = 0.156414;
        const scaledRate = (0, networth_2.getNumberWithScale)(exchangeRate);
        const oldCurrencyCode = types_1.CurrencyCode.CNY;
        const newCurrencyCode = types_1.CurrencyCode.USD;
        const res1 = (0, networth_2.convertLineItem)(i1, {
            scaledRate,
            oldCurrencyCode,
            newCurrencyCode,
        });
        expect(res1.amount).toEqual("100");
    });
});
describe("Test: getNumberWithScale function", () => {
    test("Correct amount and scale for number less than zero", () => {
        let n1 = 0.12345;
        let n2 = 0.0234;
        let n3 = 0.1;
        let n4 = 0.156414;
        let r1 = (0, networth_2.getNumberWithScale)(n1);
        let r2 = (0, networth_2.getNumberWithScale)(n2);
        let r3 = (0, networth_2.getNumberWithScale)(n3);
        let r4 = (0, networth_2.getNumberWithScale)(n4);
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
        let r1 = (0, networth_2.getNumberWithScale)(n1);
        let r2 = (0, networth_2.getNumberWithScale)(n2);
        let r3 = (0, networth_2.getNumberWithScale)(n3);
        let r4 = (0, networth_2.getNumberWithScale)(n4);
        expect(r1).toEqual({ amount: 112345, scale: 5 });
        expect(r2).toEqual({ amount: 12345, scale: 3 });
        expect(r3).toEqual({ amount: 1002345, scale: 4 });
        expect(r4).toEqual({ amount: 130001, scale: 4 });
    });
});
//# sourceMappingURL=networth.test.js.map