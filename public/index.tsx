import hydrate from 'preact-iso/hydrate';
import { ErrorBoundary } from 'preact-iso/lazy';
import { LocationProvider, Route, Router } from 'preact-iso/router';
import './css/global.scss';
import Header from './header';
import NotFound from './pages/Error';
import Home from './pages/Home';

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <Header />
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />

            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  const { default: prerender } = await import('preact-iso/prerender');
  return await prerender(<App {...data} />);
}
