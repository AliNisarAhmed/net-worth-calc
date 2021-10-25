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
const express_1 = __importDefault(require("express"));
const networth_1 = require("../domain/networth");
const networth_2 = require("../domain/networth");
const validation_1 = require("../validation");
const validateRequest_1 = require("./middleware/validateRequest");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const currency_1 = require("../domain/currency");
const router = express_1.default.Router();
router.post("/networth/convert", (0, validateRequest_1.validateRequestMW)(validation_1.convertNetWorthRequestSchema), (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { netWorth, oldCurrencyCode, newCurrencyCode } = req.body;
    const conversionRate = yield (0, currency_1.getCurrencyConversionRate)({
        oldCurrencyCode,
        newCurrencyCode,
    });
    const newNetWorth = (0, networth_1.convertNetWorth)(netWorth, {
        scaledRate: (0, networth_1.getNumberWithScale)(String(conversionRate[newCurrencyCode])),
        newCurrencyCode,
        oldCurrencyCode,
    });
    return res.json(newNetWorth);
})));
router.post("/networth/calculate", (0, validateRequest_1.validateRequestMW)(validation_1.calculateNetWorthRequestSchema), (0, express_async_handler_1.default)((req, res) => {
    const { assets, liabilities, currency } = req.body;
    const netWorth = (0, networth_2.calculateNetworth)(assets, liabilities, currency);
    return res.json(netWorth);
}));
exports.default = router;
//# sourceMappingURL=networth.js.map