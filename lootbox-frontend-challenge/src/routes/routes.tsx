import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home/home.page';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
