import { useHead, useLink } from 'hoofd';
import { useEffect } from 'preact/hooks';
import { BlogsList } from '../components/BlogsList';
import { useAsync } from '../hooks/use-async';
import type { BlogType } from '../types/blog.type';

const BlogIndex = () => {
  const { status, value, execute } = useAsync(preload, false);

  async function preload(): Promise<BlogType[]> {
    const res = await fetch('../assets/data/blogs-list.json');
    return await res.json();
  }

  useEffect(() => {
    document.body.classList.add('background');

    execute();
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
      {status === 'success' && <BlogsList blogsList={value} />}
    </main>
  );
};

export default BlogIndex;
