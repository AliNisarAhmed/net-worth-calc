"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genericErrorHandler = exports.httpErrorHandler = exports.HttpException = void 0;
// ----------------------------------------------------------------------------------------
class HttpException extends Error {
    constructor(status = 500, message = "Internal Server Error") {
        super(message);
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
function httpErrorHandler(err, req, res, next) {
    console.log("httpErrorHandler");
    if (!(err instanceof HttpException)) {
        return next(err);
    }
    return res.json({ status: err.status, message: err.message });
}
exports.httpErrorHandler = httpErrorHandler;
function genericErrorHandler(err, req, res, next) {
    console.log("genericErrorHandler", err.message);
    res.status(500);
    return res.json({ status: 500, message: err.message });
}
exports.genericErrorHandler = genericErrorHandler;
//# sourceMappingURL=index.js.map