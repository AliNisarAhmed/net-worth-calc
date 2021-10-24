import express, { NextFunction, Request, Response } from "express";
import { convertNetWorth, getNumberWithScale } from "../domain/networth";
import { CalculateNetWorthRequest, ConvertNetWorthRequest } from "../types";
import { getRateFromApi } from "../api";
import { calculateNetworth } from "../domain/networth";
import {
  calculateNetWorthRequestSchema,
  convertNetWorthRequestSchema,
} from "../validation";
import { validateRequestMW } from "./middleware/validateRequest";
import { HttpException } from "./errorHandler";
import asyncHandler from "express-async-handler";

const router = express.Router();

router.post(
  "/networth/convert",
  validateRequestMW<ConvertNetWorthRequest>(convertNetWorthRequestSchema),
  asyncHandler(async (req: Request, res: any, next: NextFunction) => {
    const { netWorth, oldCurrencyCode, newCurrencyCode } =
      req.body as ConvertNetWorthRequest;

    console.log("req body: ", req.body);

    let apiResponse;
    try {
      apiResponse = await getRateFromApi(oldCurrencyCode, newCurrencyCode);
    } catch (e) {
      return next(
        new HttpException(
          500,
          "Something wrong with currency exchange API, please try again"
        )
      );
    }

    console.log("API response: ", apiResponse);

    const newNetWorth = convertNetWorth(netWorth, {
      scaledRate: getNumberWithScale(String(apiResponse[newCurrencyCode])),
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

    return res.json({ netWorth });
  })
);

export default router;
