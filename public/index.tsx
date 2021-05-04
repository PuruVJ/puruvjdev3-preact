import hydrate from 'preact-iso/hydrate';
import lazy, { ErrorBoundary } from 'preact-iso/lazy';
import { LocationProvider, Route, Router } from 'preact-iso/router';
import { Nav } from './components/Nav';
import './css/global.scss';
import NotFound from './pages/Error';
import Home from './pages/Home';

import 'preact/debug';

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
  const { html, links } = await prerender(<App {...data} />);

  return { html, links };
}
