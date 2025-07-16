import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider, theme } from 'antd';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { MediaLibrary } from './pages/MediaLibrary';
import { Settings } from './pages/Settings';
import { useThemeStore } from './stores/themeStore';
import { useUpdateStore } from './stores/updateStore';
import { UpdateModal } from './components/UpdateModal';

export const App: React.FC = () => {
  const { isDarkMode } = useThemeStore();
  const { checkForUpdates, initializeUpdateListeners } = useUpdateStore();

  useEffect(() => {
    // 初始化更新监听器
    initializeUpdateListeners();
    
    // 检查更新
    checkForUpdates();

    // 设置主题属性
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');

    // 监听菜单事件
    const electronAPI = (window as any).electronAPI;
    if (electronAPI) {
      electronAPI.onMenuNew(() => {
        console.log('新建项目');
      });

      electronAPI.onMenuOpen(() => {
        console.log('打开项目');
      });

      electronAPI.onMenuAbout(() => {
        console.log('关于应用');
      });

      return () => {
        // 清理事件监听器
        electronAPI.removeAllListeners('menu-new');
        electronAPI.removeAllListeners('menu-open');
        electronAPI.removeAllListeners('menu-about');
      };
    }
  }, [checkForUpdates, initializeUpdateListeners, isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/media" element={<MediaLibrary />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <UpdateModal />
      </Router>
    </ConfigProvider>
  );
}; 