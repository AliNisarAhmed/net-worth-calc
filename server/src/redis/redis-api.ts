import { CurrencyAPIResponse, CurrencyCode } from "../types";
import client from "./redis-client";
import { getNumberOfSecondsToMidnight } from "../utils";

type CurrencyParams = {
  oldCurrencyCode: CurrencyCode;
  newCurrencyCode: CurrencyCode;
};

async function getCurrencyRateFromCache({
  oldCurrencyCode,
  newCurrencyCode,
}: CurrencyParams): Promise<CurrencyAPIResponse | null> {
  const key = `${oldCurrencyCode}-${newCurrencyCode}`;

  const keyExists = await client.exists(key);

  if (keyExists) {
    const res = await client.get(`${oldCurrencyCode}-${newCurrencyCode}`);
    return JSON.parse(res);
  }

  return null;
}

async function storeCurrencyRateInCache(
  { oldCurrencyCode, newCurrencyCode }: CurrencyParams,
  apiResponse: CurrencyAPIResponse
) {
  await client.set(
    `${oldCurrencyCode}-${newCurrencyCode}`,
    JSON.stringify(apiResponse),
    ["EX", getNumberOfSecondsToMidnight(apiResponse.date)]
  );
}

export { getCurrencyRateFromCache, storeCurrencyRateInCache };
