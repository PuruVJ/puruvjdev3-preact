import { useHead, useLink } from 'hoofd';
import { useLocation } from 'preact-iso';
import { useEffect, useState } from 'preact/hooks';
import '../../css/blog-page-styles.scss';
import { usePromise } from '../../hooks/use-promise';
import { BlogType } from '../../types/blog.type';
import { formatDate } from '../../utils/format-date';
import css from './BlogPage.module.scss';
import { memo } from 'preact/compat';

async function preload(slug: string): Promise<BlogType> {
  const res = await fetch(`/assets/blog/${slug}.json`);
  return await res.json();
}

const BlogPage = () => {
  const loc = useLocation();

  const slug = loc.path.split('/').reverse()[0];

  const data = usePromise(() => preload(slug), ['blog', slug]);
  const { id, body, series, title, date, reading_time, description, cover_image } = data;

  // Reading progress
  const [readingProgress, setReadingProgress] = useState(0);

  function handleProgressBar() {
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const currentY = document.documentElement.scrollTop;

    setReadingProgress(currentY / height);
  }

  useEffect(() => {
    document.body.classList.remove('background');

    document.addEventListener('scroll', handleProgressBar);

    import('lazysizes');

    window.addEventListener('lazyloaded', (e) => {
      const target = e.target as HTMLImageElement;

      // Figure is 2 levels above image
      const figure = target.parentElement.parentElement;
      figure.style.setProperty('--bgcolor', 'transparent');
    });
  }, []);

  return (
    <main class={css.main}>
      <div class={css.progress} aria-roledescription="progress">
        <div class={css.indicator} style={{ transform: `scaleX(${readingProgress})` }} />
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
      {data && <SEO {...data} />}
    </main>
  );
};

const SEO = memo(({ title, description, cover_image, id }: BlogType) => {
  const browserTitle = title.replace(/<img.*?alt="(.*?)"[^\>]+>/g, '$1');

  console.log('Hello');

  useHead({
    title: `${browserTitle} // Puru Vijay`,
    metas: [
      {
        name: 'description',
        content: description,
      },
      {
        name: 'og:title',
        content: `${browserTitle} // Puru Vijay`,
      },
      {
        name: 'og:description',
        content: description,
      },
      {
        name: 'og:image',
        content: `https://puruvj.dev/${cover_image}`,
      },
      {
        name: 'og:url',
        content: `https://puruvj.dev/blog/${id}`,
      },
    ],
  });

  useLink({ rel: 'canonical', href: `https://puruvj.dev/blog/${id}` });

  return <></>;
});

export default BlogPage;
