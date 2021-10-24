import { Request, Response, NextFunction } from "express";

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
  console.log("httpErrorHandler");
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
  console.log("genericErrorHandler", err.message);
  res.status(500);
  return res.json({ status: 500, message: err.message });
}

export { HttpException, httpErrorHandler, genericErrorHandler };
