import hydrate from "preact-iso/hydrate";
import lazy, { ErrorBoundary } from "preact-iso/lazy";
import { LocationProvider, Route, Router } from "preact-iso/router";
import Header from "./header";
import Home from "./pages/home";
import NotFound from "./pages/_404";

const About = lazy(() => import("./pages/about").then((m) => m.About));

export function App() {
  return (
    <LocationProvider>
      <div class="app">
        <Header />
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/about" component={About} />
            <NotFound default />
          </Router>
        </ErrorBoundary>
      </div>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender(data) {
  const { default: prerender } = await import("preact-iso/prerender");
  return await prerender(<App {...data} />);
}
