const ACCESS_TOKEN = 'TOKEN';

type KEYS = 'CART';

function setItemInLocalstorage(key: KEYS, item: any) {
  localStorage.setItem(key, JSON.stringify(item));
}

function getItemFromLocalstorage<T>(key: KEYS): T {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
}

function clearAll() {
  localStorage.clear();
}

function removeItem(key: KEYS) {
  localStorage.removeItem(key);
}

function setToken(value: string): void {
  localStorage.setItem(ACCESS_TOKEN, value);
}

function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN);
}

function cleanTokensData(): void {
  localStorage.removeItem(ACCESS_TOKEN);
}

export {
  cleanTokensData,
  clearAll,
  getAccessToken,
  getItemFromLocalstorage,
  removeItem,
  setItemInLocalstorage,
  setToken,
};
