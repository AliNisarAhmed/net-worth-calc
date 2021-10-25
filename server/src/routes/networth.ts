import express, { Request, Response } from "express";
import { convertNetWorth, getNumberWithScale } from "../domain/networth";
import { CalculateNetWorthRequest, ConvertNetWorthRequest } from "../types";
import { calculateNetworth } from "../domain/networth";
import {
  calculateNetWorthRequestSchema,
  convertNetWorthRequestSchema,
} from "../validation";
import { validateRequestMW } from "./middleware/validateRequest";
import asyncHandler from "express-async-handler";
import { getCurrencyConversionRate } from "../domain/currency";

const router = express.Router();

router.post(
  "/networth/convert",
  validateRequestMW<ConvertNetWorthRequest>(convertNetWorthRequestSchema),
  asyncHandler(async (req: Request, res: any) => {
    const { netWorth, oldCurrencyCode, newCurrencyCode } =
      req.body as ConvertNetWorthRequest;

    const conversionRate = await getCurrencyConversionRate({
      oldCurrencyCode,
      newCurrencyCode,
    });

    const newNetWorth = convertNetWorth(netWorth, {
      scaledRate: getNumberWithScale(String(conversionRate[newCurrencyCode])),
      newCurrencyCode,
      oldCurrencyCode,
    });

    return res.json(newNetWorth);
  })
);

router.post(
  "/networth/calculate",
  validateRequestMW<CalculateNetWorthRequest>(calculateNetWorthRequestSchema),
  asyncHandler((req: Request, res: any) => {
    const { assets, liabilities, currency } = req.body;

    const netWorth = calculateNetworth(assets, liabilities, currency);

    return res.json(netWorth);
  })
);

export default router;
