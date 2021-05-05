import { atom, useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';

export type Theme = 'light' | 'midday' | 'dark';

// This is needed here
let isFirstUpdate = true;

const browser = typeof window !== 'undefined';

const localValue = browser ? localStorage.getItem<Theme>('theme') : 'light';
const systemTheme =
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const themeAtom = atom<Theme>(localValue || systemTheme);

/**
 * Sitewide theme
 */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  if (typeof window === 'undefined') return [theme, setTheme] as const;

  useLayoutEffect(() => {
    if (isFirstUpdate) {
      setTheme(localValue || systemTheme);
      isFirstUpdate = false;
    }
  }, []);

  /**
   * Don't use `useLayoutEffect` here, as it runs before `useEffect`, so it persists to the initial value of
   * the `theme` atom provided, and by the time the onMount useEffect runs, `isFirstUpdate` is already false,
   * hence initial theme is not set
   */
  useEffect(() => {
    localStorage.setItem('theme', theme);

    document.body.classList.remove('light', 'dark', 'midday');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
