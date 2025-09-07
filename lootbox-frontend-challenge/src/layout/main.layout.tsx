import { FileTextFilled } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';

export function MainLayout() {
  const { Sider, Content } = Layout;

  return (
    <Layout className="h-screen w-screen">
      <Sider breakpoint="lg" collapsedWidth="0">
        <img
          src="/src/assets/images/pokemon-logo.webp"
          alt="logo pokemon"
          className="h-auto w-[10rem] object-cover mx-auto my-4"
        />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['list']}
          items={[
            {
              key: 'list',
              label: 'Lista de pokémon',
              icon: <FileTextFilled />,
            },
          ]}
        />
      </Sider>

      <Layout>
        <Content className="overflow-auto">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
