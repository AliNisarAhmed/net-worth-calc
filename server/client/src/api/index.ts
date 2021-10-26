import axios from "axios";
import {
  CalculateNetWorthRequest,
  ConvertNetWorthRequest,
  NetWorth,
  NetWorthCalculationResponse,
} from "../types";

const serverUrl = process.env.REACT_APP_API_URL;

export async function convertNetWorth(
  req: ConvertNetWorthRequest
): Promise<NetWorth> {
  const res = await axios.post(`${serverUrl}/networth/convert`, req);

  return res.data as NetWorth;
}

export async function calculateNetWorthOnServer(
  req: CalculateNetWorthRequest
): Promise<NetWorthCalculationResponse> {
  const res = await axios.post(`${serverUrl}/networth/calculate`, req);

  return res.data as NetWorthCalculationResponse;
}
