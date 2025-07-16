// 项目相关类型
export interface Project {
  id: number;
  name: string;
  description?: string;
  type: 'video' | 'audio' | 'image' | 'document';
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

// 媒体文件类型
export interface MediaFile {
  id: number;
  project_id?: number;
  name: string;
  path: string;
  type: 'video' | 'audio' | 'image' | 'document';
  size: number;
  duration?: number;
  created_at: string;
}

// 任务类型
export interface Task {
  id: number;
  project_id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

// 应用设置类型
export interface AppSettings {
  theme: 'light' | 'dark';
  language: 'zh' | 'en';
  autoUpdate: boolean;
  windowState: {
    width: number;
    height: number;
    x?: number;
    y?: number;
    isMaximized: boolean;
  };
  mediaSettings: {
    defaultOutputPath: string;
    quality: 'high' | 'medium' | 'low';
    format: string;
  };
  shortcuts: Record<string, string>;
}

// 更新信息类型
export interface UpdateInfo {
  version: string;
  releaseDate: string;
  releaseNotes: string;
  downloadUrl: string;
  fileSize: number;
}

// 下载进度类型
export interface DownloadProgress {
  percent: number;
  transferred: number;
  total: number;
  bytesPerSecond: number;
}

// 日志类型
export interface Log {
  id: number;
  level: 'info' | 'warn' | 'error' | 'debug';
  message: string;
  data?: any;
  created_at: string;
}

// 导航菜单项类型
export interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path: string;
  children?: MenuItem[];
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// 表单状态类型
export interface FormState {
  loading: boolean;
  error?: string;
  success?: boolean;
}

// 页面状态类型
export interface PageState {
  loading: boolean;
  error?: string;
  data?: any;
}

// 主题配置类型
export interface ThemeConfig {
  primaryColor: string;
  isDarkMode: boolean;
  borderRadius: number;
  fontSize: number;
}

// 快捷键配置类型
export interface ShortcutConfig {
  key: string;
  label: string;
  description: string;
  defaultValue: string;
  currentValue: string;
} 