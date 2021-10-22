import Axios from "axios";
import { CurrencyAPIResponse, CurrencyCode } from "../types";

const exchangeApiBaseUrl = process.env.API_BASE_URL;

export async function getRateFromApi(
  oldCurrency: CurrencyCode,
  newCurrency: CurrencyCode
): Promise<CurrencyAPIResponse> {
  const res = await Axios.get(
    `${exchangeApiBaseUrl}/${oldCurrency}/${newCurrency}.json`
  );
  return res.data as CurrencyAPIResponse;
}
