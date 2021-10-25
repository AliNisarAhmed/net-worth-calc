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
exports.validateRequestMW = void 0;
const validateRequestMW = (resourceSchema) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const resource = req.body;
    try {
        yield resourceSchema.validate(resource);
        next();
    }
    catch (e) {
        return res.status(400).json({ error: (_a = e === null || e === void 0 ? void 0 : e.errors) === null || _a === void 0 ? void 0 : _a.join(", ") });
    }
});
exports.validateRequestMW = validateRequestMW;
//# sourceMappingURL=validateRequest.js.map