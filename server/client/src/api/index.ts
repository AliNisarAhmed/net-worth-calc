import axios from "axios";
import {
  CalculateNetWorthRequest,
  ConvertNetWorthRequest,
  NetWorth,
  NetWorthCalculationResponse,
} from "../types";

export async function convertNetWorth(
  req: ConvertNetWorthRequest,
): Promise<NetWorth> {
  const res = await axios.post(`/api/networth/convert`, req);

  return res.data as NetWorth;
}

export async function calculateNetWorthOnServer(
  req: CalculateNetWorthRequest,
): Promise<NetWorthCalculationResponse> {
  const res = await axios.post(`/api/networth/calculate`, req);

  return res.data as NetWorthCalculationResponse;
}

export async function getAppStatus() {
  const res = await axios.get("/status");
  return res.data as { msg: string };
}
