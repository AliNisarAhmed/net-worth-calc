"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 3000;
(0, app_1.default)().then((app) => app.listen(port, () => {
    console.log("Listening on port: ", port);
}));
//# sourceMappingURL=index.js.map