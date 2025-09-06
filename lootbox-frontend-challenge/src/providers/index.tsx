import { RouterProvider } from 'react-router-dom';
import { routes } from '../routes/routes';
import { AntDesignProvider } from './ant-design.provider';

export function Providers() {
  return (
    <AntDesignProvider>
      <RouterProvider router={routes} />
    </AntDesignProvider>
  );
}
