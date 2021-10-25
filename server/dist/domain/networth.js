"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNetworth = exports.convertAssets = exports.convertLiabilities = exports.convertNetWorth = exports.convertLineItem = exports.getNumberWithScale = exports.numberToDinero = exports.currencyMap = void 0;
const D = __importStar(require("dinero.js"));
const types_1 = require("../types");
const currencies_1 = require("@dinero.js/currencies");
// --------------------------------------------------------------------------------
// --------------------------------- DINERO ---------------------------------------------
// --------------------------------------------------------------------------------
// A hashmap from CurrencyCode to Currency type from Dinero.js
const currencyMap = {
    [types_1.CurrencyCode.AED]: currencies_1.AED,
    [types_1.CurrencyCode.USD]: currencies_1.USD,
    [types_1.CurrencyCode.CAD]: currencies_1.CAD,
    [types_1.CurrencyCode.AUD]: currencies_1.AUD,
    [types_1.CurrencyCode.CNY]: currencies_1.CNY,
    [types_1.CurrencyCode.SGD]: currencies_1.SGD,
    [types_1.CurrencyCode.JPY]: currencies_1.JPY,
    [types_1.CurrencyCode.INR]: currencies_1.INR,
    [types_1.CurrencyCode.EUR]: currencies_1.EUR,
    [types_1.CurrencyCode.GBP]: currencies_1.GBP,
};
exports.currencyMap = currencyMap;
// Line item has amounts in two decimal places
function lineItemToDinero({ amount }, currency) {
    return numberToDinero(amount, currency);
}
function sumLineItemsToDinero(items, currency) {
    if (items.length === 0) {
        return D.dinero({ amount: 0, currency });
    }
    return items.map((item) => lineItemToDinero(item, currency)).reduce(D.add);
}
// e.g. getNumeberWithScale(1.2345) -> { amount: 12345, scale: 4 }
function numberToDinero(n, currency) {
    let numberWithScale = getNumberWithScale(n);
    return D.dinero({
        amount: numberWithScale.amount,
        scale: numberWithScale.scale,
        currency: currency,
    });
}
exports.numberToDinero = numberToDinero;
function dineroToString(dinero) {
    return String(D.toUnit(dinero, { digits: 2, round: D.halfEven }));
}
function getNumberWithScale(n) {
    if (typeof n === "number") {
        n = String(n);
    }
    if (n.startsWith("0.")) {
        let rem = n.slice(2);
        return { amount: Number(rem), scale: rem.length };
    }
    else {
        let [preDecimal, postDecimal] = n.split(".");
        if (postDecimal === undefined) {
            return { amount: Number(preDecimal), scale: 0 };
        }
        else {
            return {
                amount: Number(preDecimal + postDecimal),
                scale: postDecimal.length,
            };
        }
    }
}
exports.getNumberWithScale = getNumberWithScale;
function convertLineItem(item, { scaledRate, newCurrencyCode, oldCurrencyCode }) {
    const newCurrency = currencyMap[newCurrencyCode];
    const oldCurrency = currencyMap[oldCurrencyCode];
    const amountDinero = numberToDinero(item.amount, oldCurrency);
    let rates = {
        [newCurrency.code]: scaledRate,
    };
    let converted = D.convert(amountDinero, newCurrency, rates);
    return Object.assign(Object.assign({}, item), { amount: dineroToString(converted) });
}
exports.convertLineItem = convertLineItem;
// --------------------------------------------------------------------------------
// --------------------------- NET WORTH - Conversion --------------------------------
// --------------------------------------------------------------------------------
function convertNetWorth(nw, args) {
    const assets = convertAssets(nw.assets, args);
    const liabs = convertLiabilities(nw.liabilities, args);
    const { totalNetWorth, totalAssets, totalLiabilities } = calculateNetworth(assets, liabs, args.newCurrencyCode);
    return {
        totalNetWorth,
        assets: Object.assign(Object.assign({}, assets), { totalAssets }),
        liabilities: Object.assign(Object.assign({}, liabs), { totalLiabilities }),
    };
}
exports.convertNetWorth = convertNetWorth;
function convertLiabilities(liab, args) {
    const shortTerm = liab.shortTerm.map((item) => convertLineItem(item, args));
    const longTerm = liab.longTerm.map((item) => convertLineItem(item, args));
    return {
        shortTerm,
        longTerm,
        totalLiabilities: liab.totalLiabilities,
    };
}
exports.convertLiabilities = convertLiabilities;
function convertAssets(asset, args) {
    const cashAndInvestments = asset.cashAndInvestments.map((item) => convertLineItem(item, args));
    const longTermAssets = asset.longTermAssets.map((item) => convertLineItem(item, args));
    return {
        cashAndInvestments,
        longTermAssets,
        totalAssets: asset.totalAssets,
    };
}
exports.convertAssets = convertAssets;
// --------------------------------------------------------------------------------
// ----------------------------- NET WORTH - Sum -------------------------------------
// --------------------------------------------------------------------------------
function sumAssets({ cashAndInvestments, longTermAssets }, currency) {
    return D.add(sumLineItemsToDinero(cashAndInvestments, currency), sumLineItemsToDinero(longTermAssets, currency));
}
function sumLiabilities({ shortTerm, longTerm }, currency) {
    return D.add(sumLineItemsToDinero(shortTerm, currency), sumLineItemsToDinero(longTerm, currency));
}
function calculateNetworth(assets, liabilities, currencyCode) {
    const currency = currencyMap[currencyCode];
    const totalAssets = sumAssets(assets, currency);
    const totalLiabs = sumLiabilities(liabilities, currency);
    const totalNetWorthDinero = D.subtract(totalAssets, totalLiabs);
    return {
        totalNetWorth: dineroToString(totalNetWorthDinero),
        totalAssets: dineroToString(totalAssets),
        totalLiabilities: dineroToString(totalLiabs),
    };
}
exports.calculateNetworth = calculateNetworth;
//# sourceMappingURL=networth.js.map