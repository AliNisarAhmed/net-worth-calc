import { CurrencyCode, FormFields } from "../types";

const key = "NET_WORTH_CALC_KEY";

export function getItemFromLocalStorage<T>(
  providedKey: string = key
): T | null {
  const json = localStorage.getItem(providedKey);
  if (!json) return null;

  const data = JSON.parse(json) as T;
  return data;
}

export function storeItemInLocalStorage<T>(data: T): void {
  let stringified = JSON.stringify(data);
  localStorage.setItem(key, stringified);
}

export function saveCurrencyToLocalStorage(currency: CurrencyCode): void {
  const json = localStorage.getItem(key);
  if (!json) return;

  const data = JSON.parse(json) as FormFields;
  data.currency = currency;

  storeItemInLocalStorage<FormFields>(data);
}
