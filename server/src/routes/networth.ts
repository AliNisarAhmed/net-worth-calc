import express, { Request, Response } from "express";
import { convertNetWorth, floatToRate } from "../utils";
import { ConvertNetWorthRequest } from "../types";
import { getRateFromApi } from "../api";
import { currencyMap } from "../utils";

const router = express.Router();

router.post("/networth", async (req: Request, res: Response) => {
  const { netWorth, oldCurrency, newCurrency } =
    req.body as ConvertNetWorthRequest;

  console.log("req body: ", req.body);

  const apiResponse = await getRateFromApi(oldCurrency, newCurrency);

  console.log("API response: ", apiResponse);

  const newNetWorth = convertNetWorth(netWorth, {
    rate: floatToRate(apiResponse[newCurrency]),
    newCurrency: currencyMap[newCurrency],
    oldCurrency: currencyMap[oldCurrency],
  });

  console.log(JSON.stringify(newNetWorth, null, 2));

  res.json(newNetWorth);
});

export default router;
