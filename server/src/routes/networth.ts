import express, { Request, Response } from "express";
import { convertNetWorth, getNumberWithScale } from "../utils";
import { ConvertNetWorthRequest } from "../types";
import { getRateFromApi } from "../api";
import { calculateNetworth } from "../domain/networth";

const router = express.Router();

router.post("/networth/convert", async (req: Request, res: Response) => {
  const { netWorth, oldCurrencyCode, newCurrencyCode } =
    req.body as ConvertNetWorthRequest;

  console.log("req body: ", req.body);

  const apiResponse = await getRateFromApi(oldCurrencyCode, newCurrencyCode);

  console.log("API response: ", apiResponse);

  const newNetWorth = convertNetWorth(netWorth, {
    scaledRate: getNumberWithScale(String(apiResponse[newCurrencyCode])),
    newCurrencyCode,
    oldCurrencyCode,
  });

  console.log(JSON.stringify(newNetWorth, null, 2));

  res.json(newNetWorth);
});

router.post("/networth/calculate", async (req: Request, res: Response) => {
  const { assets, liabilities, currency } = req.body;

  const netWorth = calculateNetworth(assets, liabilities, currency);

  return res.json({ netWorth });
});

export default router;
