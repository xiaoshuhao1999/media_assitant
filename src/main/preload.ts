import { contextBridge, ipcRenderer } from 'electron';

// 定义API接口
export interface ElectronAPI {
  // 应用信息
  getAppVersion: () => Promise<string>;
  
  // 配置管理
  getConfig: (key: string) => Promise<any>;
  setConfig: (key: string, value: any) => Promise<void>;
  
  // 数据库操作
  dbQuery: (sql: string, params?: any[]) => Promise<any[]>;
  dbRun: (sql: string, params?: any[]) => Promise<any>;
  
  // 更新相关
  checkForUpdates: () => Promise<void>;
  quitAndInstall: () => Promise<void>;
  
  // 窗口控制
  windowMinimize: () => Promise<void>;
  windowMaximize: () => Promise<void>;
  windowClose: () => Promise<void>;
  windowIsMaximized: () => Promise<boolean>;
  getPlatform: () => Promise<string>;
  
  // 事件监听
  onUpdateAvailable: (callback: (info: any) => void) => void;
  onUpdateNotAvailable: (callback: (info: any) => void) => void;
  onUpdateDownloaded: (callback: (info: any) => void) => void;
  onUpdateError: (callback: (error: any) => void) => void;
  onDownloadProgress: (callback: (progress: any) => void) => void;
  
  // 菜单事件
  onMenuNew: (callback: () => void) => void;
  onMenuOpen: (callback: () => void) => void;
  onMenuAbout: (callback: () => void) => void;
  
  // 移除监听器
  removeAllListeners: (channel: string) => void;
}

// 暴露给渲染进程的API
const electronAPI: ElectronAPI = {
  // 应用信息
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  
  // 配置管理
  getConfig: (key: string) => ipcRenderer.invoke('get-config', key),
  setConfig: (key: string, value: any) => ipcRenderer.invoke('set-config', key, value),
  
  // 数据库操作
  dbQuery: (sql: string, params?: any[]) => ipcRenderer.invoke('db-query', sql, params),
  dbRun: (sql: string, params?: any[]) => ipcRenderer.invoke('db-run', sql, params),
  
  // 更新相关
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  quitAndInstall: () => ipcRenderer.invoke('quit-and-install'),
  
  // 窗口控制
  windowMinimize: () => ipcRenderer.invoke('window-minimize'),
  windowMaximize: () => ipcRenderer.invoke('window-maximize'),
  windowClose: () => ipcRenderer.invoke('window-close'),
  windowIsMaximized: () => ipcRenderer.invoke('window-is-maximized'),
  getPlatform: () => ipcRenderer.invoke('get-platform'),
  
  // 事件监听
  onUpdateAvailable: (callback: (info: any) => void) => {
    ipcRenderer.on('update-available', (_, info) => callback(info));
  },
  onUpdateNotAvailable: (callback: (info: any) => void) => {
    ipcRenderer.on('update-not-available', (_, info) => callback(info));
  },
  onUpdateDownloaded: (callback: (info: any) => void) => {
    ipcRenderer.on('update-downloaded', (_, info) => callback(info));
  },
  onUpdateError: (callback: (error: any) => void) => {
    ipcRenderer.on('update-error', (_, error) => callback(error));
  },
  onDownloadProgress: (callback: (progress: any) => void) => {
    ipcRenderer.on('download-progress', (_, progress) => callback(progress));
  },
  
  // 菜单事件
  onMenuNew: (callback: () => void) => {
    ipcRenderer.on('menu-new', callback);
  },
  onMenuOpen: (callback: () => void) => {
    ipcRenderer.on('menu-open', callback);
  },
  onMenuAbout: (callback: () => void) => {
    ipcRenderer.on('menu-about', callback);
  },
  
  // 移除监听器
  removeAllListeners: (channel: string) => {
    ipcRenderer.removeAllListeners(channel);
  },
};

// 将API暴露给渲染进程
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// 类型声明
declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
} 