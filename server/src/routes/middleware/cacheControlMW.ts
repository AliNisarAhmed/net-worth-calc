import { Request, Response, NextFunction } from "express";

function setCache(req: Request, res: Response, next: NextFunction) {
  const period = 3 * 24 * 60 * 60;

  if (req.method === "GET") {
    res.set("Cache-control", `public max-age=${period}`);
  } else {
    res.set("Cache-control", "no-store");
  }

  next();
}

export default setCache;
