import { toStatic } from 'hoofd';
import hydrate from 'preact-iso/hydrate';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';
import { LocationProvider, Route, Router } from 'preact-iso/router';
import { Nav } from './components/Nav';
import './css/global.scss';
import NotFound from './pages/Error';
import Home from './pages/Home';

const BlogIndex = lazy(() => import('./pages/BlogIndex'));

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <Nav />
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/blog" component={BlogIndex} />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  console.log(data);
  const { default: prerender } = await import('preact-iso/prerender');
  const { html, links: htmlLinks } = await prerender(<App {...data} />);
  const { links, metas, title } = toStatic();
  console.log({ links, metas, title });
  const head = stringify(title, metas, links);

  const htmlWithHead = head + html;

  return { html: htmlWithHead, links: htmlLinks };
}

const stringify = (title, metas, links) => {
  const visited = new Set();
  return `
    <title>${title}</title>

    ${metas.reduce((acc, meta) => {
      if (!visited.has(meta.charset ? meta.keyword : meta[meta.keyword])) {
        visited.add(meta.charset ? meta.keyword : meta[meta.keyword]);
        return `${acc}<meta ${meta.keyword}="${meta[meta.keyword]}"${
          meta.charset ? '' : ` content="${meta.content}"`
        }>`;
      }
      return acc;
    }, '')}

    ${links.reduce((acc, link) => {
      return `${acc}<link${Object.keys(link).reduce(
        (properties, key) => `${properties} ${key}="${link[key]}"`,
        ''
      )}>`;
    }, '')}
  `;
};
