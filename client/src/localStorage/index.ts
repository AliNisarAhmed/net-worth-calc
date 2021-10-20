const key = "NET_WORTH_CALC_KEY";

export function getItemFromLocalStorage<T>(providedKey: string = key): T | null {
  const json = localStorage.getItem(providedKey);
  if (!json) return null;

  const data = JSON.parse(json) as T;
  return data;
}

export function storeItemInLocalStorage<T>(data: T): void {
  let stringified = JSON.stringify(data);
  localStorage.setItem(key, stringified);
}
