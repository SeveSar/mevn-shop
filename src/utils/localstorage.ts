const ACCESS_TOKEN = "TOKEN";
const KEYS = {
  CART: "CART",
} as const;

const setItemInLocalstorage = (key: keyof typeof KEYS, item: any) => {
  localStorage.setItem(key, JSON.stringify(item));
};

const getItemFromLocalstorage = <T>(key: keyof typeof KEYS): T => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const clearAll = () => {
  localStorage.clear();
};

function setToken(value: string): void {
  localStorage.setItem(ACCESS_TOKEN, value);
}

function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN);
}

function cleanTokensData(): void {
  localStorage.removeItem(ACCESS_TOKEN);
}

export { setToken, clearAll, cleanTokensData, getAccessToken, setItemInLocalstorage, getItemFromLocalstorage };
