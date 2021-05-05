import { mdiMoonFull, mdiWhiteBalanceSunny } from '@mdi/js';
import { useMeta } from 'hoofd/preact';
import { useEffect, useState } from 'preact/hooks';
import { Theme, useTheme } from '../hooks/use-theme';
import { AppIcon } from './AppIcon';
import { MoonSVG } from './svg/MoonSVG';
import css from './ThemeSwitcher.module.scss';

const themes: Theme[] = ['light', 'midday', 'dark'];

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useTheme();
  const [currentThemeIndex, setCurrentThemeIndex] = useState(themes.indexOf(theme));

  function nextTheme() {
    setCurrentThemeIndex((currentThemeIndex + 1) % themes.length);
  }

  useEffect(() => {
    setTheme(themes[currentThemeIndex]);
  }, [currentThemeIndex]);

  useMeta({
    name: 'theme-color',
    content: theme === 'light' ? '#fff' : theme === 'midday' ? '#f9dec9' : '#222428',
  });

  return (
    <button class={css.button} aria-label={themes[currentThemeIndex]} onClick={nextTheme}>
      {theme === 'light' && <AppIcon path={mdiWhiteBalanceSunny} />}
      {theme === 'midday' && <AppIcon path={mdiMoonFull} />}
      {theme === 'dark' && <MoonSVG />}
    </button>
  );
};
