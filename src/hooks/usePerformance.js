import { useEffect, useRef } from 'react';

export const usePerformanceMonitor = (componentName) => {
  const startTime = useRef(performance.now());
  const renderCount = useRef(0);

  useEffect(() => {
    renderCount.current += 1;
    const endTime = performance.now();
    const renderTime = endTime - startTime.current;

    if (process.env.NODE_ENV === 'development') {
      console.group(`🔍 Performance Monitor: ${componentName}`);
      console.log(`Render #${renderCount.current}`);
      console.log(`Render time: ${renderTime.toFixed(2)}ms`);
      console.groupEnd();
    }

    startTime.current = performance.now();
  });

  return { renderCount: renderCount.current };
};

export const useThrottle = (callback, delay) => {
  const lastRun = useRef(Date.now());

  return (...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callback(...args);
      lastRun.current = Date.now();
    }
  };
};

export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
