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
exports.storeCurrencyRateInCache = exports.getCurrencyRateFromCache = void 0;
const redis_client_1 = __importDefault(require("./redis-client"));
const utils_1 = require("../utils");
function getCurrencyRateFromCache({ oldCurrencyCode, newCurrencyCode, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const key = `${oldCurrencyCode}-${newCurrencyCode}`;
        const keyExists = yield redis_client_1.default.exists(key);
        if (keyExists) {
            const res = yield redis_client_1.default.get(`${oldCurrencyCode}-${newCurrencyCode}`);
            return JSON.parse(res);
        }
        return null;
    });
}
exports.getCurrencyRateFromCache = getCurrencyRateFromCache;
function storeCurrencyRateInCache({ oldCurrencyCode, newCurrencyCode }, apiResponse) {
    return __awaiter(this, void 0, void 0, function* () {
        yield redis_client_1.default.set(`${oldCurrencyCode}-${newCurrencyCode}`, JSON.stringify(apiResponse), ["EX", (0, utils_1.getNumberOfSecondsToMidnight)(apiResponse.date)]);
    });
}
exports.storeCurrencyRateInCache = storeCurrencyRateInCache;
//# sourceMappingURL=redis-api.js.map