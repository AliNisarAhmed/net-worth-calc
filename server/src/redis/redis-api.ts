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

  try {
    const keyExists = await client.exists(key);

    if (keyExists) {
      const res = await client.get(`${oldCurrencyCode}-${newCurrencyCode}`);
      return JSON.parse(res);
    }
  } catch (e) {
  } finally {
    return null;
  }
}

async function storeCurrencyRateInCache(
  { oldCurrencyCode, newCurrencyCode }: CurrencyParams,
  apiResponse: CurrencyAPIResponse
) {
  try {
    await client.set(
      `${oldCurrencyCode}-${newCurrencyCode}`,
      JSON.stringify(apiResponse),
      ["EX", getNumberOfSecondsToMidnight(apiResponse.date)]
    );
  } catch (e) {}
}

export { getCurrencyRateFromCache, storeCurrencyRateInCache };
