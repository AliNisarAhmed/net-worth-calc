import { Request, Response, NextFunction } from "express";

export { HttpException, httpErrorHandler, genericErrorHandler };

// ----------------------------------------------------------------------------------------

class HttpException extends Error {
  status: number;
  message: string;

  constructor(status: number = 500, message: string = "Internal Server Error") {
    super(message);
    this.status = status;
    this.message = message;
  }
}

function httpErrorHandler(
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("httpErrorHandler", err.name, err.stack, err.message, err.status);
  if (!(err instanceof HttpException)) {
    return next(err);
  }
  return res.json({ status: err.status, message: err.message });
}

function genericErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("genericErrorHandler", err.message, err.stack);
  res.status(500);
  return res.json({ status: 500, message: err.message });
}
