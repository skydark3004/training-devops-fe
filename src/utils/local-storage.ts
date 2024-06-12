/* export const localStorageUtils = {
  add(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  get(key: string) {
    const stored = localStorage.getItem(key);
    return stored == null ? undefined : JSON.parse(stored);
  },
}; */

export const localStorageUtils = {
  add(key: string, value: any) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  },
  remove(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  },
  get(key: string) {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(key);
      return stored == null ? undefined : JSON.parse(stored);
    }
  },
};
