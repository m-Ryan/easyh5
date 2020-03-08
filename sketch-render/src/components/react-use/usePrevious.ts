import { useEffect, useRef } from 'react';

export function usePrevious<T extends any>(value: T) {
  const ref = useRef<T>(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref;
}
