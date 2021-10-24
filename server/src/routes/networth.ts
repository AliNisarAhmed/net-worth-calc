import express, { Request, Response } from "express";
import { convertNetWorth, getNumberWithScale } from "../domain/networth";
import { CalculateNetWorthRequest, ConvertNetWorthRequest } from "../types";
import { getRateFromApi } from "../api";
import { calculateNetworth } from "../domain/networth";
import {
  calculateNetWorthRequestSchema,
  convertNetWorthRequestSchema,
} from "../validation";
import { validateRequestMW } from "./middleware/validateRequest";

const router = express.Router();

router.post(
  "/networth/convert",
  validateRequestMW<ConvertNetWorthRequest>(convertNetWorthRequestSchema),
  async (req: Request, res: Response) => {
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

    return res.json(newNetWorth);
  }
);

router.post(
  "/networth/calculate",
  validateRequestMW<CalculateNetWorthRequest>(calculateNetWorthRequestSchema),
  async (req: Request, res: Response) => {
    const { assets, liabilities, currency } = req.body;

    const netWorth = calculateNetworth(assets, liabilities, currency);

    return res.json({ netWorth });
  }
);

export default router;
