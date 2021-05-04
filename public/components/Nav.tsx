import clsx from 'clsx';
import { useLocation } from 'preact-iso/router';
import { useEffect, useState } from 'preact/hooks';
import { throttle } from 'throttle-debounce';
import css from './Nav.module.scss';
import { SiteLogoSVG } from './svg/SiteLogoSVG';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Nav = () => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  const handleScroll = () => setScrollY(document.body.scrollTop);

  useEffect(() => {
    const handleScrollThrottled = throttle(50, false, handleScroll);
    document.body.addEventListener('scroll', handleScrollThrottled);

    return () => {
      document.body.removeEventListener('scroll', handleScrollThrottled);
    };
  }, []);

  return (
    <nav class={clsx(css.nav, scrollY > 2 && css.shadow)}>
      <ul class={css.navLinksList}>
        <li>
          <a aria-current={location.path === '/' && 'page'} href=".">
            HOME
          </a>
        </li>
        <li>
          <a aria-current={location.path.startsWith('/blog') && 'page'} href="/blog">
            BLOG
          </a>
        </li>
        <li>
          <a aria-current={location.path.startsWith('/works') && 'page'} href="/works">
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
