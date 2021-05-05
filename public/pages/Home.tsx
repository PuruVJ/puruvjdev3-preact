import { useEffect } from 'preact/hooks';
import { useHead } from 'hoofd/preact';
import css from './Home.module.scss';

export default function Home() {
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
    import('lazysizes');

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
    </main>
  );
}
