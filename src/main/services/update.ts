import { autoUpdater } from 'electron-updater';
import { dialog } from 'electron';
import { mainWindow } from '../main';

export class UpdateService {
  constructor() {
    // 配置更新服务
    autoUpdater.checkForUpdatesAndNotify();
    
    // 设置更新事件
    this.setupUpdateEvents();
  }

  private setupUpdateEvents(): void {
    autoUpdater.on('checking-for-update', () => {
      console.log('正在检查更新...');
    });

    autoUpdater.on('update-available', (info) => {
      console.log('发现新版本:', info.version);
      this.showUpdateDialog(info);
    });

    autoUpdater.on('update-not-available', (info) => {
      console.log('当前已是最新版本:', info.version);
    });

    autoUpdater.on('error', (err) => {
      console.error('更新错误:', err);
      if (mainWindow) {
        dialog.showMessageBox(mainWindow, {
          type: 'error',
          title: '更新错误',
          message: '检查更新时发生错误',
          detail: err.message,
        });
      }
    });

    autoUpdater.on('download-progress', (progressObj) => {
      const { percent, transferred, total } = progressObj;
      console.log(`下载进度: ${percent.toFixed(2)}% (${transferred}/${total})`);
    });

    autoUpdater.on('update-downloaded', (info) => {
      console.log('更新下载完成:', info.version);
      this.showRestartDialog(info);
    });
  }

  private async showUpdateDialog(info: any): Promise<void> {
    if (!mainWindow) return;

    const result = await dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: '发现新版本',
      message: `发现新版本 ${info.version}`,
      detail: '是否立即下载更新？',
      buttons: ['立即下载', '稍后提醒'],
      defaultId: 0,
      cancelId: 1,
    });

    if (result.response === 0) {
      autoUpdater.downloadUpdate();
    }
  }

  private async showRestartDialog(info: any): Promise<void> {
    if (!mainWindow) return;

    const result = await dialog.showMessageBox(mainWindow, {
      type: 'info',
      title: '更新已下载',
      message: `新版本 ${info.version} 已下载完成`,
      detail: '应用需要重启以应用更新，是否立即重启？',
      buttons: ['立即重启', '稍后重启'],
      defaultId: 0,
      cancelId: 1,
    });

    if (result.response === 0) {
      autoUpdater.quitAndInstall();
    }
  }

  checkForUpdates(): void {
    autoUpdater.checkForUpdatesAndNotify();
  }

  quitAndInstall(): void {
    autoUpdater.quitAndInstall();
  }

  // 增量更新逻辑
  async downloadIncrementalUpdate(version: string): Promise<void> {
    try {
      // 这里可以实现增量更新的逻辑
      // 比如只下载变更的文件
      console.log(`开始增量更新到版本: ${version}`);
      
      // 实现增量更新的具体逻辑
      // 1. 获取当前版本
      // 2. 比较版本差异
      // 3. 下载差异文件
      // 4. 应用更新
      
    } catch (error) {
      console.error('增量更新失败:', error);
      throw error;
    }
  }
} 