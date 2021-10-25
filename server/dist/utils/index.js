"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumberOfSecondsToMidnight = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
function getNumberOfSecondsToMidnight(dateEnd, dateStart = (0, dayjs_1.default)()) {
    const date = (0, dayjs_1.default)(dateEnd).add(1, "day").startOf("day");
    return date.diff(dateStart, "seconds");
}
exports.getNumberOfSecondsToMidnight = getNumberOfSecondsToMidnight;
//# sourceMappingURL=index.js.map