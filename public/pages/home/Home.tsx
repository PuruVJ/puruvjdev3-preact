import { useHead } from 'hoofd/preact';
import { useEffect } from 'preact/hooks';
import { BlogsList } from '../../components/BlogsList';
import { ContactMeLink } from '../../components/ContactMeLink';
import { ContactMeSVG } from '../../components/svg/ContactMeSvg';
import { WavyHRSVG } from '../../components/svg/WavyHRSVG';
import { usePromise } from '../../hooks/use-promise';
import { BlogType } from '../../types/blog.type';
import css from './Home.module.scss';

export default function Home() {
  const blogsList = usePromise(preload, ['homepage-blogs']);

  async function preload(): Promise<BlogType[]> {
    const res = await fetch(`/assets/data/homepage-blogs-list.json`);
    return await res.json();
  }

  useHead({
    title: 'Puru, Developer and Designer',
    metas: [
      {
        name: 'description',
        content: `Read about web development, designing and programming on Puru Vijay's blog.`,
      },
      {
        name: 'og:title',
        content: 'Puru, Developer and Designer',
      },
      {
        name: 'og:description',
        content: `Read about web development, designing and programming on Puru Vijay's blog.`,
      },
      {
        name: 'og:image',
        content: 'https://puruvj.dev/media/blog-social-intro.png',
      },
      {
        name: 'og:url',
        content: 'https://puruvj.dev',
      },
    ],
  });

  useEffect(() => {
    document.body.classList.add('background', 'animated');
  }, []);

  return (
    <main class={css.main}>
      <br />
      <br />
      <br />
      <section class={css.puruIntro}>
        <div class={css.written}>
          <h1>
            Hi, I'm <mark>Puru</mark>
          </h1>
          <h2 class={css.aboutMe}>
            I am a 19 y/o <mark>self-taught fullstack web developer</mark> based in India with 6
            years of hobbyist experience. I make <mark>blazing fast and performant</mark> web apps.
            Like this blog.
          </h2>
        </div>
        <div class={css.photoArea}>
          <figure class={css.figure}>
            <img
              class={css.photo}
              src="assets/photos/puru-profile.jpg"
              alt="Puru Vijay Profile Photo"
            />
          </figure>
        </div>
      </section>

      <br />
      <br />
      <br />
      <div class={css.hr}>
        <WavyHRSVG />
      </div>
      <br />
      <br />

      <section class="popular-blogs">
        <h1>Popular posts</h1>
        <BlogsList seeMore blogsList={blogsList} />
      </section>

      <br />
      <br />
      <div class={css.hr}>
        <WavyHRSVG />
      </div>
      <br />
      <br />

      <section class={css['contact-me']}>
        <div class={css['cm-svg']}>
          <ContactMeSVG />
        </div>
        <div>
          <ContactMeLink />
        </div>
      </section>
    </main>
  );
}
