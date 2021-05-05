import clsx from 'clsx';
import { useLocation } from 'preact-iso/router';
import { useEffect, useState } from 'preact/hooks';
import { useTimeout } from '../hooks/use-timeout';
import { throttle } from 'throttle-debounce';
import css from './Nav.module.scss';
import { SiteLogoSVG } from './svg/SiteLogoSVG';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Nav = () => {
  const [scrollY, setScrollY] = useState(0);
  const { path } = useLocation();

  useTimeout(() => {
    document.body.style.setProperty('--transition-duration', '200ms');
  }, 200);

  const handleScroll = () => {
    setScrollY(document.documentElement.scrollTop);
  };

  useEffect(() => {
    const throttledHandleScroll = throttle(50, false, handleScroll);

    document.body.onscroll = throttledHandleScroll;
  }, []);

  return (
    <nav class={clsx(css.nav, scrollY > 2 && css.shadow)}>
      <ul class={css.navLinksList}>
        <li>
          <a aria-current={path === '/' && 'page'} href=".">
            HOME
          </a>
        </li>
        <li>
          <a aria-current={path.startsWith('/blog') && 'page'} href="/blog">
            BLOG
          </a>
        </li>
        <li>
          <a aria-current={path.startsWith('/works') && 'page'} href="/works">
            WORKS
          </a>
        </li>
      </ul>

      <div class={css.brand}>
        <SiteLogoSVG />
        <span>puruvj.dev</span>
      </div>
      <span />
      <span class={css.themeSwitcher}>
        <ThemeSwitcher />
      </span>
    </nav>
  );
};
