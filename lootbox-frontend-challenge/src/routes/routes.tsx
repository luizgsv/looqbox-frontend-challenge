import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home.page';
import { MainLayout } from '../layout/main.layout';
import { NotFoundPage } from '../pages/not-found.page';
import { DetailsPage } from '../pages/[pokemon]';

export const routes = createBrowserRouter([
  {
    path: '/',
    // element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/:pokemon',
        element: <DetailsPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
