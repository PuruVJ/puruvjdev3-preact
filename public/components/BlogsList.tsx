import { mdiChevronRight } from '@mdi/js';
import clsx from 'clsx';
import { BlogType } from '../types/blog.type';
import { formatDate } from '../utils/format-date';
import { AppIcon } from './AppIcon';
import css from './BlogsList.module.scss';

type BlogsListProps = {
  blogsList: BlogType[];
  seeMore?: boolean;
};

export const BlogsList = ({ blogsList, seeMore = false }: BlogsListProps) => {
  return (
    <>
      {blogsList.map(({ id, title, series, description, date }) => (
        <a class={css.blogLink} href={`/blog/${id}`} aria-label={title}>
          <span class={css.series}>
            {series && (
              <>
                <mark>SERIES</mark> {series}
              </>
            )}
          </span>

          <h2 class={css.title} dangerouslySetInnerHTML={{ __html: title }} />
          <p class={css.description}>{description}</p>
          <p class={css.moreInfo}>
            <span />
            <time>{formatDate(date)}</time>
          </p>
        </a>
      ))}

      {seeMore && (
        <>
          <br />
          <a class={clsx(css.blogLink, css.showMore)} href="/blog" aria-label="See more blog posts">
            <h2 class={clsx(css.title, css.end)}>
              See more <AppIcon size={40} path={mdiChevronRight} />
            </h2>
          </a>
        </>
      )}
    </>
  );
};
