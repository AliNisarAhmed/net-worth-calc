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
exports.calculateNetWorthRequestSchema = exports.convertNetWorthRequestSchema = exports.netWorthSchema = exports.currencySchema = exports.assetSchema = exports.liabilitySchema = exports.lineItemSchema = exports.moneyRegex = void 0;
const types_1 = require("../types");
const yup = __importStar(require("yup"));
// FROM: https://stackoverflow.com/questions/308122/simple-regular-expression-for-a-decimal-with-a-precision-of-2
exports.moneyRegex = /^\d+(\.\d{1,2})?$/;
exports.lineItemSchema = yup.object().shape({
    label: yup.string().required().min(1).max(100),
    amount: yup
        .string()
        .required()
        .matches(exports.moneyRegex, ({ value, path }) => `Invalid Amount ${value} at path (${path}): Amount must be a number string with at most 2 decimal places`),
});
exports.liabilitySchema = yup
    .object()
    .required()
    .shape({
    shortTerm: yup.array().required().of(exports.lineItemSchema),
    longTerm: yup.array().required().of(exports.lineItemSchema),
    totalLiabilities: yup.string().matches(exports.moneyRegex),
});
exports.assetSchema = yup
    .object()
    .required()
    .shape({
    cashAndInvestments: yup.array().required().of(exports.lineItemSchema),
    longTermAssets: yup.array().required().of(exports.lineItemSchema),
    totalAssets: yup.string().matches(exports.moneyRegex),
});
exports.currencySchema = yup
    .mixed()
    .required()
    .oneOf(Object.values(types_1.CurrencyCode));
exports.netWorthSchema = yup.object().shape({
    assets: exports.assetSchema,
    liabilities: exports.liabilitySchema,
    totalNetWorth: yup.string().matches(exports.moneyRegex),
});
// ---------------------------- REQUEST Schemas ----------------------------------------
exports.convertNetWorthRequestSchema = yup.object().required().shape({
    oldCurrencyCode: exports.currencySchema,
    newCurrencyCode: exports.currencySchema,
    netWorth: exports.netWorthSchema,
});
exports.calculateNetWorthRequestSchema = yup.object().required().shape({
    assets: exports.assetSchema,
    liabilities: exports.liabilitySchema,
    currency: exports.currencySchema,
});
//# sourceMappingURL=index.js.map