import { Provider } from 'jotai';
import { ErrorBoundary, hydrate, lazy, LocationProvider, Route, Router } from 'preact-iso';
import { Nav } from './components/Nav';
import './css/global.scss';
import './css/themes.scss';
import Home from './pages/Home';
import('preact/devtools');

// if (typeof window === 'undefined') {
//   global.fetch = isoMorphicFetch;
// }

const BlogIndex = lazy(() => import('./pages/BlogIndex'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const NotFound = lazy(() => import('./pages/Error'));

export function App() {
  return (
    <LocationProvider>
      <Provider>
        <div class="app" style="padding-top: 3.75rem">
          <Nav />
          <ErrorBoundary>
            <Router>
              <Route path="/" component={Home} />
              <Route path="/blog" component={BlogIndex} />
              <Route path="/blog/:id" component={BlogPage} />
              <Route default component={NotFound} />
            </Router>
          </ErrorBoundary>
        </div>
      </Provider>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  return (await import('./prerender')).prerender(<App {...data} />);

  // const { promises: fsp } = (await eval('u=>import(u)')('fs')) as typeof import('fs');

  // const blogsListData: BlogType[] = JSON.parse(
  //   await fsp.readFile(new URL('./assets/data/blogs-list.json', import.meta.url), 'utf-8')
  // );
  // const blogIDs = blogsListData.map(({ id }) => id);

  // for (let blogID of blogIDs) {
  //   links.add(`/blog/${blogID.replace('.json', '')}`);
  // }

  // const head = toStatic();
  // const elements = new Set([
  //   ...head.links.map((props) => ({ type: 'link', props })),
  //   ...head.metas.map((props) => ({ type: 'meta', props })),
  // ]);

  // return { html, links, head: { title: head.title, lang: head.lang, elements } };
}
