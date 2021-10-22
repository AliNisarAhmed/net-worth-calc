import axios from "axios";
import { ConvertNetWorthRequest, CurrencyCode, NetWorth } from "../types";

const serverUrl = process.env.REACT_APP_API_URL;
console.log("serverurl: ", serverUrl);

export async function convertNetWorth({
  oldCurrency,
  newCurrency,
  netWorth,
}: ConvertNetWorthRequest): Promise<NetWorth> {
  const res = await axios.post(`${serverUrl}/networth`, {
    oldCurrency,
    newCurrency,
    netWorth,
  });

  return res.data as NetWorth;
}
