import supertest from "supertest";
import { CalculateNetWorthRequest, CurrencyCode } from "./types";
import app from "./app";
import { sampleResponse } from "./api";
import * as currency from "./domain/currency";
import {
  assets,
  liabilities,
  conversionResponse,
  convertRequest,
} from "./data/testData";

describe("Testing POST: convertNetWorth Route", () => {
  test("It should convert net worth correctly", async () => {
    let server = await app();

    const convertAPICall = jest.spyOn(currency, "getCurrencyConversionRate");
    convertAPICall.mockImplementation(() => Promise.resolve(sampleResponse));

    const res = await supertest(server)
      .post("/api/networth/convert")
      .send(convertRequest)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(conversionResponse);
  });

  test("It should fail with 400 bad request if a property is missing", async () => {
    let server = await app();

    const convertAPICall = jest.spyOn(currency, "getCurrencyConversionRate");
    convertAPICall.mockImplementation(() => Promise.resolve(sampleResponse));

    const { newCurrencyCode, ...badConvertRequest } = convertRequest;

    const res = await supertest(server)
      .post("/api/networth/convert")
      .send(badConvertRequest)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toEqual({ error: "newCurrencyCode is a required field" });
  });
});

describe("Testing POST: calculateNetWorth Route", () => {
  test("It should calculate net worth correctly", async () => {
    let server = await app();

    const postRequest: CalculateNetWorthRequest = {
      currency: CurrencyCode.USD,
      assets,
      liabilities,
    };

    const res = await supertest(server)
      .post("/api/networth/calculate")
      .send(postRequest)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("totalNetWorth");
    expect(res.body).toHaveProperty("totalAssets");
    expect(res.body).toHaveProperty("totalLiabilities");
    expect(res.body.totalNetWorth).toBe("12.31");
    expect(res.body.totalAssets).toBe("100.24");
    expect(res.body.totalLiabilities).toBe("87.93");
  });

  test("It should return 400 bad request if currency is missing", async () => {
    let server = await app();

    const postRequest = {
      assets,
      liabilities,
    };

    const res = await supertest(server)
      .post("/api/networth/calculate")
      .send(postRequest)
      .set("Accept", "application/json")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toBe("currency is a required field");
  });
});
