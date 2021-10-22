import express, { Request, Response } from "express";
import { convertNetWorth } from "../utils";
import { ConvertNetWorthRequest } from "../types";
import { getRateFromApi } from "../api";

const router = express.Router();

router.post("/networth", async (req: Request, res: Response) => {
  const { netWorth, oldCurrency, newCurrency } =
    req.body as ConvertNetWorthRequest;

  console.log("req body: ", req.body);

  const apiResponse = await getRateFromApi(oldCurrency, newCurrency);

  const newNetWorth = convertNetWorth(netWorth, apiResponse[newCurrency]);

  console.log(JSON.stringify(newNetWorth, null, 2));

  res.json(newNetWorth);
});

export default router;
