import express, { Request, Response } from "express";
import { convertNetWorth } from "../utils";
import { NetWorthConvertRequest } from "../types";
import { getRateFromApi } from "../api";

const router = express.Router();

router.get("/networth", async (req: Request, res: Response) => {
  const { netWorth, oldCurrency, newCurrency } =
    req.body as NetWorthConvertRequest;

  const apiResponse = await getRateFromApi(oldCurrency, newCurrency);

  res.json(convertNetWorth(netWorth, apiResponse[newCurrency]));
});

export default router;
