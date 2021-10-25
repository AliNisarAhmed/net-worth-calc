"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = require("../../validation");
const validateRequest_1 = require("./validateRequest");
const types_1 = require("../../types");
test("Gives status 400 with errors object as string when called with wrong currency", () => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        assets: {
            cashAndInvestments: [],
            longTermAssets: [],
            totalAssets: "0",
        },
        liabilities: {
            shortTerm: [],
            longTerm: [],
            totalLiabilities: "0",
        },
        currency: "cap",
    };
    const req = { body };
    const next = jest.fn();
    const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
    yield (0, validateRequest_1.validateRequestMW)(validation_1.calculateNetWorthRequestSchema)(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenLastCalledWith({
        error: "currency must be one of the following values: usd, cad, cny, eur, jpy, inr, gbp, aud, sgd, aed",
    });
    expect(res.status).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(400);
}));
test("with a valid schema, next function is called", () => __awaiter(void 0, void 0, void 0, function* () {
    const body = {
        assets: {
            cashAndInvestments: [],
            longTermAssets: [],
            totalAssets: "0",
        },
        liabilities: {
            shortTerm: [],
            longTerm: [],
            totalLiabilities: "0",
        },
        currency: types_1.CurrencyCode.CAD,
    };
    const req = { body };
    const next = jest.fn();
    const res = { json: jest.fn(() => res), status: jest.fn(() => res) };
    yield (0, validateRequest_1.validateRequestMW)(validation_1.calculateNetWorthRequestSchema)(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
}));
//# sourceMappingURL=validateRequest.test.js.map