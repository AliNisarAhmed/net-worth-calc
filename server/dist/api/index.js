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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleResponse = exports.getRateFromApi = void 0;
const axios_1 = __importDefault(require("axios"));
const types_1 = require("../types");
const exchangeApiBaseUrl = process.env.API_BASE_URL;
function getRateFromApi(oldCurrency, newCurrency) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.get(`${exchangeApiBaseUrl}/${oldCurrency}/${newCurrency}.json`);
        return res.data;
    });
}
exports.getRateFromApi = getRateFromApi;
const sampleResponse = {
    date: "2021-10-21",
    [types_1.CurrencyCode.CAD]: 1.231841,
};
exports.sampleResponse = sampleResponse;
//# sourceMappingURL=index.js.map