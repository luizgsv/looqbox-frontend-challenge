import type { ReactNode } from 'react';
import { ConfigProvider } from 'antd';

export function AntDesignProvider({ children }: { children: ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3b82f6', // azul Tailwind (pode trocar depois)
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
