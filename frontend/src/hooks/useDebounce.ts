import { useState, useEffect } from 'react';

/**
 * Debounces a value by a specified delay.
 * Returns the debounced value which only updates after the user
 * stops changing the input for `delay` milliseconds.
 *
 * Used to avoid making API calls on every keystroke.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
