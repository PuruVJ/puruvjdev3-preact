import { useHead } from 'hoofd';
import { useLocation } from 'preact-iso';
import { useEffect } from 'preact/hooks';
import { formatDate } from '../utils/format-date';
import '../css/blog-page-styles.scss';
import { useAsync } from '../hooks/use-async';
import { BlogType } from '../types/blog.type';
import css from './BlogPage.module.scss';

const BlogPage = () => {
  const loc = useLocation();
  const slug = loc.path.split('/').reverse()[0];
  const { execute, status, value } = useAsync(preload);

  async function preload(): Promise<BlogType> {
    const res = await fetch(`/assets/blog/${slug}.json`);
    return await res.json();
  }

  useEffect(() => {
    document.body.classList.remove('background');

    import('lazysizes');

    execute();
  }, []);

  useHead({});

  const { body, series, title, date, reading_time } = value || {};

  return (
    status === 'success' && (
      <main class={css.main}>
        <div class={css.progress} aria-roledescription="progress">
          <div class={css.indicator} style="transform: scaleX({$readingProgress})" />
        </div>
        <span class={css.series}>
          {series && (
            <>
              <mark>SERIES</mark> {series}
            </>
          )}
        </span>
        <h1 dangerouslySetInnerHTML={{ __html: title }}></h1>
        <p class={css.metadata}>
          <time>{formatDate(date)}</time> &bull; <span>{Math.ceil(reading_time)} min read</span>
        </p>
        <article id="blog-content" dangerouslySetInnerHTML={{ __html: body }}></article>
      </main>
    )
  );
};

export default BlogPage;
