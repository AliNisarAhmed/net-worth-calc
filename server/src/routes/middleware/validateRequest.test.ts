import { calculateNetWorthRequestSchema } from "../../validation";
import { validateRequestMW } from "./validateRequest";
import { Request } from "express";
import { CalculateNetWorthRequest, CurrencyCode } from "../../types";

test("Gives status 400 with errors object as string when called with wrong currency", async () => {
  const body: CalculateNetWorthRequest = {
    assets: {
      cashAndInvestments: [],
      longTermAssets: [],
      totalAssets: "0",
    },
    liabilities: {
      shortTerm: [],
      longTerm: [],
      totalLiabilities: "0",
    },
    currency: "cap" as CurrencyCode,
  };
  const req: Request = { body } as Request;
  const next = jest.fn();
  const res: any = { json: jest.fn(() => res), status: jest.fn(() => res) };

  await validateRequestMW(calculateNetWorthRequestSchema)(req, res, next);

  expect(next).not.toHaveBeenCalled();
  expect(res.json).toHaveBeenCalledTimes(1);
  expect(res.json).toHaveBeenLastCalledWith({
    error:
      "currency must be one of the following values: usd, cad, cny, eur, jpy, inr, gbp, aud, sgd, aed",
  });
  expect(res.status).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(400);
});

test("with a valid schema, next function is called", async () => {
  const body: CalculateNetWorthRequest = {
    assets: {
      cashAndInvestments: [],
      longTermAssets: [],
      totalAssets: "0",
    },
    liabilities: {
      shortTerm: [],
      longTerm: [],
      totalLiabilities: "0",
    },
    currency: CurrencyCode.CAD,
  };

  const req: Request = { body } as Request;
  const next = jest.fn();
  const res: any = { json: jest.fn(() => res), status: jest.fn(() => res) };

  await validateRequestMW(calculateNetWorthRequestSchema)(req, res, next);

  expect(next).toHaveBeenCalled();
  expect(res.json).not.toHaveBeenCalled();
  expect(res.status).not.toHaveBeenCalled();
});
