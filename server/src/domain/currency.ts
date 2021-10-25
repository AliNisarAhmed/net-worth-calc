import { CurrencyAPIResponse, CurrencyCode } from "../types";
import * as redisAPI from "../redis/redis-api";
import { getRateFromApi } from "../api";

type CurrencyConversionParams = {
  oldCurrencyCode: CurrencyCode;
  newCurrencyCode: CurrencyCode;
};

async function getCurrencyConversionRate({
  oldCurrencyCode,
  newCurrencyCode,
}: CurrencyConversionParams): Promise<CurrencyAPIResponse> {
  const rateInCache = await redisAPI.getCurrencyRateFromCache({
    oldCurrencyCode,
    newCurrencyCode,
  });

  if (rateInCache) {
    return rateInCache;
  }

  const apiResponse = await getRateFromApi(oldCurrencyCode, newCurrencyCode);

  await redisAPI.storeCurrencyRateInCache(
    { oldCurrencyCode, newCurrencyCode },
    apiResponse
  );

  return apiResponse;
}

export { getCurrencyConversionRate };
