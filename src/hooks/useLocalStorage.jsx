/**
 * @module useLocalStorage
 * @description Custom React hook for managing state synchronized with localStorage.
 */
import { useState } from 'react';

/**
 * Custom hook that persists state in localStorage.
 * @function useLocalStorage
 * @param {string} key - localStorage key.
 * @param {*} initialValue - Default value if key is not found.
 * @returns {Array} A stateful value and a setter function.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Помилка читання з localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Помилка запису в localStorage:", error);
    }
  };

  return [storedValue, setValue];
}