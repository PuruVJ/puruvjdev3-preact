import { useEffect } from 'preact/hooks';

export const useTimeout = (callback: Function, duration: number) => {
  useEffect(() => {
    const timeOut = setTimeout(callback, duration);

    return () => {
      clearTimeout(timeOut);
    };
  }, []);
};
