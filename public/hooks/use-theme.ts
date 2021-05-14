import { atom, useAtom } from 'jotai';
import { useEffect, useLayoutEffect, useRef } from 'preact/hooks';

export type Theme = 'morning' | 'noon' | 'night' | 'radioactive';

// This is needed here
let isFirstUpdate = true;

const browser = typeof window !== 'undefined';

let localValue = browser ? localStorage.getItem<Theme>('theme') : 'morning';
const systemTheme: Theme =
  browser && matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'morning';

const themeAtom = atom<Theme>(localValue || systemTheme);

/**
 * Sitewide theme
 */
export function useTheme() {
  const [theme, setTheme] = useAtom(themeAtom);

  if (typeof window === 'undefined') return [theme, setTheme] as const;

  useLayoutEffect(() => {
    if (isFirstUpdate) {
      // @ts-expect-error
      if (localValue === 'light') {
        localValue = 'morning';
      }

      // @ts-expect-error
      if (localValue === 'midday') {
        localValue = 'noon';
      }

      // @ts-expect-error
      if (localValue === 'dark') {
        localValue = 'night';
      }

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

    document.body.classList.remove('morning', 'noon', 'radioactive', 'night');
    document.body.classList.add(theme);
  }, [theme]);

  return [theme, setTheme] as const;
}
