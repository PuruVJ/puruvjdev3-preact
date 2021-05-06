import { toStatic, useTitleTemplate } from 'hoofd/preact';
import { Provider } from 'jotai';
import hydrate from 'preact-iso/hydrate';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';
import { LocationProvider, Route, Router } from 'preact-iso/router';
import { Nav } from './components/Nav';
import './css/global.scss';
import './css/themes.scss';
import NotFound from './pages/Error';
import Home from './pages/Home';
import('preact/devtools');

const BlogIndex = lazy(() => import('./pages/BlogIndex'));

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
              <NotFound default />
            </Router>
          </ErrorBoundary>
        </div>
      </Provider>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  const { default: prerender } = await import('preact-iso/prerender');
  const { html, links } = await prerender(<App {...data} />);

  const head = toStatic();
  const elements = new Set([
    ...head.links.map((props) => ({ type: 'link', props })),
    ...head.metas.map((props) => ({ type: 'meta', props })),
  ]);

  return { html, links, head: { title: head.title, lang: head.lang, elements } };
}
