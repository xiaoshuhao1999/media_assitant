import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron';
import { join } from 'path';
import { autoUpdater } from 'electron-updater';
import { DatabaseService } from './services/database';
import { ConfigService } from './services/config';
import { UpdateService } from './services/update';

// 保持对窗口对象的全局引用
let mainWindow: BrowserWindow | null = null;

// 服务实例
let databaseService: DatabaseService;
let configService: ConfigService;
let updateService: UpdateService;

const isDev = process.env.NODE_ENV === 'development';

function createWindow(): void {
  // 创建浏览器窗口
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: join(__dirname, 'preload.js'),
    },
    frame: false, // 无边框窗口
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    show: false,
  });

  // 加载应用
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }

  // 当窗口准备好显示时
  mainWindow.once('ready-to-show', () => {
    mainWindow?.show();
    
    // 检查更新
    if (!isDev) {
      updateService.checkForUpdates();
    }
  });

  // 当窗口关闭时触发
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // 处理外部链接
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// 初始化服务
async function initializeServices(): Promise<void> {
  try {
    configService = new ConfigService();
    databaseService = new DatabaseService();
    updateService = new UpdateService();
    
    await databaseService.initialize();
    console.log('所有服务初始化完成');
  } catch (error) {
    console.error('服务初始化失败:', error);
  }
}

// 应用就绪时
app.whenReady().then(async () => {
  await initializeServices();
  createWindow();
  
  // 设置应用菜单
  const template = [
    {
      label: '文件',
      submenu: [
        {
          label: '新建',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow?.webContents.send('menu-new');
          },
        },
        {
          label: '打开',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            mainWindow?.webContents.send('menu-open');
          },
        },
        { type: 'separator' },
        {
          label: '退出',
          accelerator: process.platform === 'darwin' ? 'Cmd+Q' : 'Ctrl+Q',
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: '编辑',
      submenu: [
        { label: '撤销', accelerator: 'CmdOrCtrl+Z', role: 'undo' },
        { label: '重做', accelerator: 'Shift+CmdOrCtrl+Z', role: 'redo' },
        { type: 'separator' },
        { label: '剪切', accelerator: 'CmdOrCtrl+X', role: 'cut' },
        { label: '复制', accelerator: 'CmdOrCtrl+C', role: 'copy' },
        { label: '粘贴', accelerator: 'CmdOrCtrl+V', role: 'paste' },
      ],
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          click: () => {
            mainWindow?.webContents.send('menu-about');
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template as any);
  Menu.setApplicationMenu(menu);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 所有窗口关闭时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// IPC 处理程序
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

ipcMain.handle('get-config', (_, key: string) => {
  return configService.get(key);
});

ipcMain.handle('set-config', (_, key: string, value: any) => {
  return configService.set(key, value);
});

ipcMain.handle('db-query', async (_, sql: string, params?: any[]) => {
  return databaseService.query(sql, params);
});

ipcMain.handle('db-run', async (_, sql: string, params?: any[]) => {
  return databaseService.run(sql, params);
});

ipcMain.handle('check-for-updates', () => {
  return updateService.checkForUpdates();
});

ipcMain.handle('quit-and-install', () => {
  return updateService.quitAndInstall();
});

// 窗口控制相关的IPC处理程序
ipcMain.handle('window-minimize', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.handle('window-maximize', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle('window-close', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('window-is-maximized', () => {
  return mainWindow ? mainWindow.isMaximized() : false;
});

ipcMain.handle('get-platform', () => {
  return process.platform;
});

// 应用更新事件
autoUpdater.on('update-available', (info) => {
  mainWindow?.webContents.send('update-available', info);
});

autoUpdater.on('update-not-available', (info) => {
  mainWindow?.webContents.send('update-not-available', info);
});

autoUpdater.on('update-downloaded', (info) => {
  mainWindow?.webContents.send('update-downloaded', info);
});

autoUpdater.on('error', (error) => {
  mainWindow?.webContents.send('update-error', error);
});

autoUpdater.on('download-progress', (progress) => {
  mainWindow?.webContents.send('download-progress', progress);
});

export { mainWindow }; 