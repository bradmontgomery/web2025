import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Outlet,
  isRouteErrorResponse,
  useRouteError  // this is a Hook
} from 'react-router';

import './index.css'
import App from './App.jsx'
import Hello from './Hello';
import FavoriteColor from './FavoriteColor';
import NamePicker from './NamePicker';
import Weather from './Weather';
import ApiFetcher from './ApiFetcher';
import Names from './Names';

function Root() {
  return (
    <StrictMode>
      <div>
        <h1>I am Root! 🌳</h1>
        <nav className="main-nav">
          <Link to={'app'}>App</Link>
          <Link to={'hello'}>Hello</Link>
          <Link to={'favorite-color'}>Favorite Color</Link>
          <Link to={'name-picker'}>Name Picker</Link>
          <Link to={'weather'}>Weather</Link>
          <Link to={'api-fetcher'}>API Fetcher</Link>
          <Link to={'names'}>Name API thing</Link>
        </nav>
        <hr />
        <div>
          <Outlet />
        </div>
      </div>
    </StrictMode>
  )
}

function ErrorBoundary() {
  const error = useRouteError();
  if(isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>{error.status} {error.statusText}</h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Errors</h1>
        <p>{error.message}</p>
      </div>
    )
  } else {
    return <h1>Unknown Error</h1>;
  }
}


const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    ErrorBoundary: ErrorBoundary,
    children: [
      { index: true, path: 'app', Component: App },
      { path: 'hello', Component: Hello },
      { path: 'favorite-color', Component: FavoriteColor },
      { path: 'name-picker', Component: NamePicker },
      { path: 'weather', Component: Weather },
      { path: 'api-fetcher', Component: ApiFetcher },
      { path: 'names', Component: Names }
    ]
  }
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
