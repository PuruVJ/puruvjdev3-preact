import clsx from 'clsx';
import { useLocation } from 'preact-iso/router';
import { useInView } from 'react-intersection-observer';
import { useTimeout } from '../hooks/use-timeout';
import css from './Nav.module.scss';
import { SiteLogoSVG } from './svg/SiteLogoSVG';
import { ThemeSwitcher } from './ThemeSwitcher';

export const Nav = () => {
  const { path } = useLocation();
  const [ref, inView] = useInView({ initialInView: true, threshold: 0 });

  useTimeout(() => {
    document.body.style.setProperty('--transition-duration', '200ms');
  }, 200);

  return (
    <>
      <div ref={ref} style={{ position: 'absolute', top: 0, width: '100%', height: '2px' }}></div>
      <nav class={clsx(css.nav, !inView && css.shadow)}>
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
    </>
  );
};
