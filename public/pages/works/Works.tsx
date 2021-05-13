import { mdiGithub, mdiWeb } from '@mdi/js';
import { useTitle } from 'hoofd/preact';
import { useEffect } from 'preact/hooks';
import { AppIcon } from '../../components/AppIcon';
import { usePromise } from '../../hooks/use-promise';
import css from './Works.module.scss';

export type IWork = {
  title: string;
  url: string;
  stack: string;
  description: string;
  repo: {
    url: string;
    type: 'github';
  };
  image: {
    large: {
      webp: string;
      org: string;
    };
    small: {
      webp: string;
      org: string;
    };
    aspectHTW: number;
    color: number[];
  };
};

export default function Works() {
  const worksList = usePromise(preload, ['works']);

  async function preload(): Promise<IWork[]> {
    const res = await fetch(`/assets/data/works.json`);
    return await res.json();
  }

  useTitle('Works // Puru Vijay');

  useEffect(() => {
    document.body.classList.add('background');
  }, []);

  return (
    <main class={css.main}>
      {worksList.map(({ title, image, url, repo }) => (
        <section>
          <div class={css['img-preview']}>
            <img src={image.small.org} alt={title} />
          </div>
          <div class={css['info-section']}>
            <div class={css.title}>{title}</div>
            <div class={css.icons}>
              <a rel="noopener" target="_blank" href={url}>
                <AppIcon path={mdiWeb} />
              </a>
              <a rel="noopener" target="_blank" href={repo.url}>
                <AppIcon path={mdiGithub} />
              </a>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
