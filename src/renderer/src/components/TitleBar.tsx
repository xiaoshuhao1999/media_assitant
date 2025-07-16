import React, { useState, useEffect } from 'react';
import { Button, Space, Typography } from 'antd';
import { 
  MinusOutlined, 
  BorderOutlined, 
  CloseOutlined, 
  ShrinkOutlined,
  ExpandOutlined 
} from '@ant-design/icons';
import './TitleBar.css';

const { Text } = Typography;

interface TitleBarProps {
  title?: string;
}

export const TitleBar: React.FC<TitleBarProps> = ({ title = '自媒体助手' }) => {
  const [isMaximized, setIsMaximized] = useState(false);
  const [platform, setPlatform] = useState<string>('');

  useEffect(() => {
    const initializeTitleBar = async () => {
      const electronAPI = (window as any).electronAPI;
      if (electronAPI) {
        // 获取平台信息
        const currentPlatform = await electronAPI.getPlatform();
        setPlatform(currentPlatform || '');
        
        // 获取窗口最大化状态
        const maximized = await electronAPI.windowIsMaximized();
        setIsMaximized(maximized || false);
      }
    };

    initializeTitleBar();
  }, []);

  const handleMinimize = async () => {
    const electronAPI = (window as any).electronAPI;
    if (electronAPI) {
      await electronAPI.windowMinimize();
    }
  };

  const handleMaximize = async () => {
    const electronAPI = (window as any).electronAPI;
    if (electronAPI) {
      await electronAPI.windowMaximize();
      const maximized = await electronAPI.windowIsMaximized();
      setIsMaximized(maximized || false);
    }
  };

  const handleClose = async () => {
    const electronAPI = (window as any).electronAPI;
    if (electronAPI) {
      await electronAPI.windowClose();
    }
  };

  // Windows 样式的窗口控制按钮
  const WindowsControls = () => (
    <Space size={0} className="window-controls">
      <Button
        type="text"
        icon={<MinusOutlined />}
        onClick={handleMinimize}
        className="window-control-btn minimize-btn"
        title="最小化"
        size="small"
      />
      <Button
        type="text"
        icon={isMaximized ? <ShrinkOutlined /> : <ExpandOutlined />}
        onClick={handleMaximize}
        className="window-control-btn maximize-btn"
        title={isMaximized ? '还原' : '最大化'}
        size="small"
      />
      <Button
        type="text"
        icon={<CloseOutlined />}
        onClick={handleClose}
        className="window-control-btn close-btn"
        title="关闭"
        size="small"
        danger
      />
    </Space>
  );

  // macOS 样式的窗口控制按钮
  const MacControls = () => (
    <Space size={8} className="window-controls mac-controls">
      <div
        className="mac-control-btn close-btn"
        onClick={handleClose}
        title="关闭"
      />
      <div
        className="mac-control-btn minimize-btn"
        onClick={handleMinimize}
        title="最小化"
      />
      <div
        className="mac-control-btn maximize-btn"
        onClick={handleMaximize}
        title={isMaximized ? '还原' : '最大化'}
      />
    </Space>
  );

  return (
    <div className="custom-title-bar">
      <div className="title-bar-content">
        {/* 左侧：macOS 控制按钮 */}
        {platform === 'darwin' && <MacControls />}
        
        {/* 中间：标题 */}
        <div className="title-bar-title">
          <Text strong>{title}</Text>
        </div>
        
        {/* 右侧：Windows 控制按钮 */}
        {platform === 'win32' && <WindowsControls />}
      </div>
      

    </div>
  );
}; 