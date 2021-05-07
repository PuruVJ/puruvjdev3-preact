import { mdiMoonFull, mdiWhiteBalanceSunny } from '@mdi/js';
import { useLink, useMeta } from 'hoofd/preact';
import { useEffect, useState } from 'preact/hooks';
import { Theme, useTheme } from '../hooks/use-theme';
import { AppIcon } from './AppIcon';
import { MoonSVG } from './svg/MoonSVG';
import { SunsetSVG } from './svg/SunsetSVG';
import css from './ThemeSwitcher.module.scss';

const themes: Theme[] = ['morning', 'noon', 'night', 'twilight'];

const dev = process.env.NODE_ENV === 'development';

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
    content:
      theme === 'morning'
        ? '#fff'
        : theme === 'noon'
        ? '#f9dec9'
        : theme === 'twilight'
        ? '#13132A'
        : '#222428',
  });

  useLink({
    rel: 'icon',
    href: `/assets/icons/favicon-${dev ? 'dev' : theme}.${dev ? 'svg' : 'png'}`,
  });

  return (
    <button class={css.button} aria-label={themes[currentThemeIndex]} onClick={nextTheme}>
      {typeof window !== 'undefined' && (
        <>
          {theme === 'morning' && <AppIcon path={mdiWhiteBalanceSunny} />}
          {theme === 'noon' && <AppIcon path={mdiMoonFull} />}
          {theme === 'twilight' && <SunsetSVG />}
          {theme === 'night' && <MoonSVG />}
        </>
      )}
    </button>
  );
};
