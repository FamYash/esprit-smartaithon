import { useState, useEffect, useCallback } from "react";

const STORAGE_EVENT = "atmoai-storage-change";

export function getStoreItem<T>(key: string, defaultValue: T): T {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = localStorage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as T;
    }
  } catch (err) {
    console.warn(`[storage] Failed to read key "${key}":`, err);
  }
  return defaultValue;
}

export function setStoreItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event for same-tab reactivity
    window.dispatchEvent(
      new CustomEvent(STORAGE_EVENT, {
        detail: { key, value },
      })
    );
  } catch (err) {
    console.warn(`[storage] Failed to write key "${key}":`, err);
  }
}

export function removeStoreItem(key: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(key);
    window.dispatchEvent(
      new CustomEvent(STORAGE_EVENT, {
        detail: { key, value: null },
      })
    );
  } catch (err) {
    console.warn(`[storage] Failed to remove key "${key}":`, err);
  }
}

/**
 * Reactive hook for shared localStorage state across components (and cross-tab).
 * Any change made in User portal or Admin portal will trigger immediate re-render in all subscribed components!
 */
export function useReactiveStore<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => getStoreItem<T>(key, defaultValue));

  useEffect(() => {
    // Initial sync
    setState(getStoreItem<T>(key, defaultValue));

    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent<{ key: string; value: any }>;
      if (customEvent.detail && customEvent.detail.key === key) {
        setState(customEvent.detail.value ?? defaultValue);
      }
    };

    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key === key) {
        try {
          const val = e.newValue ? JSON.parse(e.newValue) : defaultValue;
          setState(val);
        } catch {
          setState(defaultValue);
        }
      }
    };

    window.addEventListener(STORAGE_EVENT, handleCustomEvent);
    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener(STORAGE_EVENT, handleCustomEvent);
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, [key, defaultValue]);

  const updateState = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setState((prev) => {
        const resolved =
          typeof newValue === "function"
            ? (newValue as (prev: T) => T)(prev)
            : newValue;
        setStoreItem(key, resolved);
        return resolved;
      });
    },
    [key]
  );

  return [state, updateState];
}
