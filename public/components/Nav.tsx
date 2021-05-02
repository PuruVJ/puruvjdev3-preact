import clsx from 'clsx';
import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';
import { throttle } from 'throttle-debounce';
import css from './Nav.module.scss';

export const Nav = () => {
  const [scrollY, setScrollY] = useState(0);
  const location = useLocation();

  const handleScroll = () => setScrollY(document.body.scrollTop);

  useEffect(() => {
    const handleScrollThrottled = throttle(50, false, handleScroll);
    document.body.addEventListener('scroll', handleScrollThrottled);

    console.log(location);

    return () => {
      document.body.removeEventListener('scroll', handleScrollThrottled);
    };
  }, []);

  return (
    <nav class={clsx(css.nav, scrollY > 2 && css.shadow)}>
      <ul>
        <li>
          <a aria-current={location.path === '/' && 'page'} href=".">
            HOME
          </a>
        </li>
      </ul>
    </nav>
  );
};
