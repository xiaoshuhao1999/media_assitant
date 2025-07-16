 # 自媒体助手

一个基于 Electron + React 的桌面应用程序，为自媒体创作者提供全面的工具集。

## 功能特性

### 核心功能
- 🎬 **项目管理** - 创建、管理和组织您的媒体项目
- 📚 **媒体库** - 统一管理所有媒体文件
- ✅ **任务管理** - 跟踪项目进度和待办事项
- ⚙️ **全局设置** - 个性化配置和主题切换

### 技术特性
- 🔄 **自动更新** - 支持全量和增量更新
- 💾 **本地数据库** - 使用 SQLite 存储数据
- 🎨 **主题切换** - 支持明暗主题切换
- 📱 **响应式设计** - 适配不同屏幕尺寸
- 🔒 **数据安全** - 本地存储，保护隐私

## 技术栈

### 前端
- **React 18** - 用户界面框架
- **TypeScript** - 类型安全的 JavaScript
- **Ant Design** - 企业级 UI 组件库
- **Zustand** - 轻量级状态管理
- **React Router** - 单页面应用路由

### 后端
- **Electron** - 跨平台桌面应用框架
- **Better SQLite3** - 高性能 SQLite 数据库
- **Electron Store** - 配置存储
- **Electron Updater** - 自动更新功能

### 开发工具
- **Vite** - 现代化构建工具
- **ESLint** - 代码质量检查
- **Electron Builder** - 应用打包和分发

## 快速开始

### 环境要求
- Node.js 16.0+
- npm 或 yarn

### 安装依赖
```bash
npm install
```

### 开发模式
```bash
npm run dev
```

### 构建应用
```bash
# 构建所有平台
npm run build:dist

# 构建 Windows 版本
npm run build:win

# 构建 macOS 版本
npm run build:mac

# 构建 Linux 版本
npm run build:linux
```

## 项目结构

```
media-assistant/
├── src/
│   ├── main/                 # 主进程
│   │   ├── main.ts          # 主进程入口
│   │   ├── preload.ts       # 预加载脚本
│   │   └── services/        # 服务层
│   │       ├── database.ts  # 数据库服务
│   │       ├── config.ts    # 配置服务
│   │       └── update.ts    # 更新服务
│   └── renderer/            # 渲染进程
│       ├── index.html       # HTML 入口
│       └── src/
│           ├── App.tsx      # 应用主组件
│           ├── main.tsx     # 渲染进程入口
│           ├── components/  # 组件
│           ├── pages/       # 页面
│           ├── stores/      # 状态管理
│           ├── types/       # 类型定义
│           └── styles/      # 样式文件
├── package.json             # 项目配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
└── README.md               # 项目文档
```

## 功能说明

### 数据库设计
应用使用 SQLite 数据库存储以下数据：
- 项目信息（projects）
- 媒体文件（media_files）
- 任务记录（tasks）
- 应用设置（settings）
- 操作日志（logs）

### 更新机制
- **全量更新**：下载完整的新版本应用
- **增量更新**：只下载变更的文件，提高更新效率
- **自动检查**：启动时自动检查更新
- **用户控制**：用户可以选择立即更新或稍后更新

### 主题系统
- 支持明暗主题切换
- 自定义主色调
- 可调节圆角和字体大小
- 主题设置持久化存储

## 开发指南

### 添加新功能
1. 在 `src/renderer/src/types/` 中定义类型
2. 在 `src/renderer/src/components/` 中创建组件
3. 在 `src/renderer/src/pages/` 中创建页面
4. 在 `src/renderer/src/stores/` 中管理状态
5. 在主进程中添加相应的 IPC 处理

### 数据库操作
```typescript
// 查询数据
const results = await window.electronAPI.dbQuery('SELECT * FROM projects');

// 执行 SQL
await window.electronAPI.dbRun('INSERT INTO projects (name, type) VALUES (?, ?)', ['项目名称', 'video']);
```

### 配置管理
```typescript
// 读取配置
const theme = await window.electronAPI.getConfig('theme');

// 写入配置
await window.electronAPI.setConfig('theme', 'dark');
```

## 打包说明

### 构建配置
应用使用 `electron-builder` 进行打包，支持：
- Windows (NSIS 安装包)
- macOS (DMG 镜像)
- Linux (AppImage)

### 发布配置
修改 `package.json` 中的 `build.publish` 配置来设置更新服务器。

## 贡献指南

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

## 许可证

本项目使用 MIT 许可证。详见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：
- 邮箱：247695042@qq.com
- 项目主页：https://github.com/xiaoshuhao1999/media_assitant.git

## 更新日志

### v1.0.0
- 初始版本发布
- 实现基础的项目管理功能
- 支持主题切换
- 集成自动更新机制