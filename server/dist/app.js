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
const networth_1 = __importDefault(require("./routes/networth"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./routes/errorHandler");
const redis_client_1 = __importDefault(require("./redis/redis-client"));
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    yield redis_client_1.default.connect();
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use("/api", networth_1.default);
    app.use(errorHandler_1.httpErrorHandler);
    app.use(errorHandler_1.genericErrorHandler);
    return app;
});
//# sourceMappingURL=app.js.map