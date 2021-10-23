import axios from "axios";
import { ConvertNetWorthRequest, NetWorth } from "../types";

const serverUrl = process.env.REACT_APP_API_URL;

export async function convertNetWorth(
  req: ConvertNetWorthRequest
): Promise<NetWorth> {
  const res = await axios.post(`${serverUrl}/networth`, req);

  return res.data as NetWorth;
}
