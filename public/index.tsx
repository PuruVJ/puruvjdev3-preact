import { HoofdProvider } from 'hoofd';
import { Provider } from 'jotai';
import { ErrorBoundary, hydrate, lazy, LocationProvider, Route, Router } from 'preact-iso';
import { Footer } from './components/Footer';
import { Nav } from './components/Nav';
import './css/global.scss';
import './css/themes.scss';

if (process.env.NODE_ENV === 'development') {
  import('preact/devtools');
}

const Home = lazy(() => import('./pages/home/Home'));
const BlogIndex = lazy(() => import('./pages/blog-index/BlogIndex'));
const BlogPage = lazy(() => import('./pages/blog-page/BlogPage'));
const Works = lazy(() => import('./pages/works/Works'));

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

              <Route path="/works" component={Works} />

              <Route default component={NotFound} />
            </Router>
          </ErrorBoundary>
          <Footer />
        </div>
      </Provider>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  return (await import('./prerender')).prerender(<App {...data} />);
}
