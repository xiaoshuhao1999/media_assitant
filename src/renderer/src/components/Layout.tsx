import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Button, Avatar, Dropdown, Space } from 'antd';
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined, 
  DashboardOutlined, 
  ProjectOutlined, 
  FileImageOutlined, 
  SettingOutlined, 
  UserOutlined, 
  LogoutOutlined, 
  BulbOutlined 
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { useThemeStore } from '../stores/themeStore';
import { TitleBar } from './TitleBar';
import type { MenuProps } from 'antd';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useThemeStore();

  // 侧边栏菜单项
  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: '工作台',
    },
    {
      key: '/projects',
      icon: <ProjectOutlined />,
      label: '项目管理',
    },
    {
      key: '/media',
      icon: <FileImageOutlined />,
      label: '媒体库',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '设置',
    },
  ];

  // 用户菜单项
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人资料',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        console.log('打开个人资料');
        break;
      case 'logout':
        console.log('用户退出');
        break;
      default:
        break;
    }
  };

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      {/* 自定义标题栏 */}
      <TitleBar />
      
      <AntLayout style={{ height: 'calc(100vh - 32px)' }}>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" style={{ 
            height: 64, 
            margin: 16, 
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: collapsed ? 16 : 18,
            fontWeight: 'bold'
          }}>
            {collapsed ? '媒' : '自媒体助手'}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        
        <AntLayout>
          <Header style={{ 
            padding: '0 16px', 
            background: isDarkMode ? '#141414' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0',
            height: 48
          }}>
            <Space>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{ fontSize: '16px', width: 48, height: 48 }}
              />
            </Space>
            
            <Space>
              <Button
                type="text"
                icon={<BulbOutlined />}
                onClick={toggleTheme}
                title={isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
              />
              <Dropdown 
                menu={{ items: userMenuItems, onClick: handleUserMenuClick }}
                placement="bottomRight"
              >
                <Button type="text" style={{ height: 'auto' }}>
                  <Space>
                    <Avatar size="small" icon={<UserOutlined />} />
                    用户
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </Header>
          
          <Content style={{ 
            margin: '16px', 
            padding: '24px',
            background: isDarkMode ? '#1f1f1f' : '#fff',
            borderRadius: 6,
            overflow: 'auto'
          }}>
            {children}
          </Content>
        </AntLayout>
      </AntLayout>
    </AntLayout>
  );
}; 