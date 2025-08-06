import type { RouteObject } from 'react-router-dom';
import ErrorPage from '~/shared/components/ErrorPage';
import Home from '~/modules/home/Home';
import NotFound from '~/shared/components/NotFound';
import Layout from './shared/components/Layout';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export { routes };
