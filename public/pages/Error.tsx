import { useTitle } from 'hoofd';
import { NotFoundSVG } from '../components/svg/NotFoundSVG';
import css from './Error.module.scss';

const NotFound = () => {
  useTitle('Not found // Puru Vijay');

  return (
    <main class={css.main}>
      <h1>
        <span style="color: var(--app-color-primary)">404</span> - Not Found
      </h1>

      <NotFoundSVG />
    </main>
  );
};

export default NotFound;
