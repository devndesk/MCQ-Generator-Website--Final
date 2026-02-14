import { createBrowserRouter } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Generator } from './pages/Generator';
import { Library } from './pages/Library';
import { Templates } from './pages/Templates';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'generator', Component: Generator },
      { path: 'library', Component: Library },
      { path: 'templates', Component: Templates },
    ],
  },
]);
