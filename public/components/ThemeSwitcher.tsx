import { mdiMoonFull, mdiWhiteBalanceSunny } from '@mdi/js';
import { useMeta } from 'hoofd/preact';
import { useEffect, useState } from 'preact/hooks';
import { Theme, useTheme } from '../hooks/use-theme';
import { AppIcon } from './AppIcon';
import { MoonSVG } from './svg/MoonSVG';
import css from './ThemeSwitcher.module.scss';

const themes: Theme[] = ['light', 'midday', 'dark'];

const localTheme = localStorage.getItem('theme');
const browserPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

export const ThemeSwitcher = () => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);
  const [theme, setTheme] = useTheme();

  function nextTheme() {
    setCurrentThemeIndex((currentThemeIndex + 1) % themes.length);
  }

  useEffect(() => {
    setTheme(themes[currentThemeIndex]);
  }, [currentThemeIndex]);

  useMeta({
    name: 'theme-color',
    content: currentThemeIndex === 0 ? 'white' : currentThemeIndex === 1 ? '#f9dec9' : '#222428',
  });

  return (
    <button class={css.button} aria-label={themes[currentThemeIndex]} onClick={nextTheme}>
      {theme === 'light' && <AppIcon path={mdiWhiteBalanceSunny} />}
      {theme === 'midday' && <AppIcon path={mdiMoonFull} />}
      {theme === 'dark' && <MoonSVG />}
    </button>
  );
};
