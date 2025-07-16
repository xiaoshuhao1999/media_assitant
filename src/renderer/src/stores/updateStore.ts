import { create } from 'zustand';
import { UpdateInfo, DownloadProgress } from '../types';

interface UpdateState {
  // 更新状态
  isUpdateAvailable: boolean;
  updateInfo: UpdateInfo | null;
  isDownloading: boolean;
  downloadProgress: DownloadProgress | null;
  isUpdateDownloaded: boolean;
  updateError: string | null;
  
  // 模态框显示状态
  showUpdateModal: boolean;
  showDownloadModal: boolean;
  showInstallModal: boolean;
  
  // 操作方法
  checkForUpdates: () => Promise<void>;
  downloadUpdate: () => Promise<void>;
  installUpdate: () => Promise<void>;
  dismissUpdate: () => void;
  initializeUpdateListeners: () => void;
  
  // 内部状态更新方法
  setUpdateAvailable: (info: UpdateInfo) => void;
  setUpdateNotAvailable: () => void;
  setDownloadProgress: (progress: DownloadProgress) => void;
  setUpdateDownloaded: (info: UpdateInfo) => void;
  setUpdateError: (error: string) => void;
}

export const useUpdateStore = create<UpdateState>((set, get) => ({
  // 初始状态
  isUpdateAvailable: false,
  updateInfo: null,
  isDownloading: false,
  downloadProgress: null,
  isUpdateDownloaded: false,
  updateError: null,
  
  showUpdateModal: false,
  showDownloadModal: false,
  showInstallModal: false,
  
  // 检查更新
  checkForUpdates: async () => {
    try {
      await window.electronAPI?.checkForUpdates();
    } catch (error) {
      console.error('检查更新失败:', error);
      set({ updateError: '检查更新失败' });
    }
  },
  
  // 下载更新
  downloadUpdate: async () => {
    set({ isDownloading: true, showUpdateModal: false, showDownloadModal: true });
    // 实际的下载逻辑由主进程处理
  },
  
  // 安装更新
  installUpdate: async () => {
    try {
      await window.electronAPI?.quitAndInstall();
    } catch (error) {
      console.error('安装更新失败:', error);
      set({ updateError: '安装更新失败' });
    }
  },
  
  // 忽略更新
  dismissUpdate: () => {
    set({
      showUpdateModal: false,
      showDownloadModal: false,
      showInstallModal: false,
    });
  },
  
  // 初始化更新监听器
  initializeUpdateListeners: () => {
    window.electronAPI?.onUpdateAvailable((info) => {
      get().setUpdateAvailable(info);
    });
    
    window.electronAPI?.onUpdateNotAvailable(() => {
      get().setUpdateNotAvailable();
    });
    
    window.electronAPI?.onDownloadProgress((progress) => {
      get().setDownloadProgress(progress);
    });
    
    window.electronAPI?.onUpdateDownloaded((info) => {
      get().setUpdateDownloaded(info);
    });
    
    window.electronAPI?.onUpdateError((error) => {
      get().setUpdateError(error.message || '更新出错');
    });
  },
  
  // 设置更新可用
  setUpdateAvailable: (info: UpdateInfo) => {
    set({
      isUpdateAvailable: true,
      updateInfo: info,
      showUpdateModal: true,
      updateError: null,
    });
  },
  
  // 设置无更新
  setUpdateNotAvailable: () => {
    set({
      isUpdateAvailable: false,
      updateInfo: null,
      showUpdateModal: false,
      updateError: null,
    });
  },
  
  // 设置下载进度
  setDownloadProgress: (progress: DownloadProgress) => {
    set({
      downloadProgress: progress,
      isDownloading: true,
    });
  },
  
  // 设置更新已下载
  setUpdateDownloaded: (info: UpdateInfo) => {
    set({
      isUpdateDownloaded: true,
      updateInfo: info,
      isDownloading: false,
      downloadProgress: null,
      showDownloadModal: false,
      showInstallModal: true,
    });
  },
  
  // 设置更新错误
  setUpdateError: (error: string) => {
    set({
      updateError: error,
      isDownloading: false,
      downloadProgress: null,
      showDownloadModal: false,
    });
  },
})); 