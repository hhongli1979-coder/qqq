export const localStorage = {
  get<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('localStorage.set error:', error);
    }
  },

  remove(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('localStorage.remove error:', error);
    }
  },

  clear(): void {
    try {
      window.localStorage.clear();
    } catch (error) {
      console.error('localStorage.clear error:', error);
    }
  }
};
