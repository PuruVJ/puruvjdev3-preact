import { useHead, useLink } from 'hoofd/preact';
import { useEffect } from 'preact/hooks';
import { BlogsList } from '../../components/BlogsList';
import { usePromise } from '../../hooks/use-promise';
import type { BlogType } from '../../types/blog.type';

const BlogIndex = () => {
  const data = usePromise(preload, ['blog', 'root']);

  async function preload(): Promise<BlogType[]> {
    const res = await fetch('/assets/data/blogs-list.json');
    return await res.json();
  }

  useEffect(() => {
    document.body.classList.add('background');
  }, []);

  useHead({
    title: 'Blog // Puru Vijay',
    metas: [
      {
        name: 'description',
        content: `Read about web development, designing and programming on Puru Vijay's blog.`,
      },
      {
        property: 'og:title',
        content: 'Blog // Puru Vijay',
      },
      {
        property: 'og:description',
        content: `Read about web development, designing and programming on Puru Vijay's blog.`,
      },
      {
        property: 'og:image',
        content: 'https://puruvj.dev/media/blog-social-intro.png',
      },
      {
        property: 'og:url',
        content: 'https://puruvj.dev/blog/',
      },
    ],
  });

  useLink({ rel: 'canonical', href: 'https://puruvj.dev/blog/' });

  return (
    <main>
      <h1>Blog</h1>
      <BlogsList blogsList={data} />
    </main>
  );
};

export default BlogIndex;
