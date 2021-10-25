"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_1 = __importDefault(require("dayjs"));
const _1 = require("./");
describe('Test: getNumberOfSecondsToMidnight function', () => {
    test('calculates seconds correctly - 1 hour', () => {
        const start = (0, dayjs_1.default)().hour(23).minute(0).second(0).millisecond(0);
        const end = (0, dayjs_1.default)().endOf('day').format('YYYY-MM-DD');
        const result = (0, _1.getNumberOfSecondsToMidnight)(end, start);
        expect(result).toBe(60 * 60);
    });
});
//# sourceMappingURL=utils.test.js.map