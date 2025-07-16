import Store from 'electron-store';

interface ConfigSchema {
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
  [key: string]: any;
}

const defaultConfig: ConfigSchema = {
  theme: 'light',
  language: 'zh',
  autoUpdate: true,
  windowState: {
    width: 1200,
    height: 800,
    isMaximized: false,
  },
  mediaSettings: {
    defaultOutputPath: '',
    quality: 'high',
    format: 'mp4',
  },
  shortcuts: {
    'new-project': 'CmdOrCtrl+N',
    'open-project': 'CmdOrCtrl+O',
    'save-project': 'CmdOrCtrl+S',
    'settings': 'CmdOrCtrl+,',
  },
};

export class ConfigService {
  private store: Store<ConfigSchema>;

  constructor() {
    this.store = new Store<ConfigSchema>({
      defaults: defaultConfig,
      name: 'config',
    });
  }

  get<K extends keyof ConfigSchema>(key: K): ConfigSchema[K] {
    return this.store.get(key);
  }

  set<K extends keyof ConfigSchema>(key: K, value: ConfigSchema[K]): void {
    this.store.set(key, value);
  }

  has(key: keyof ConfigSchema): boolean {
    return this.store.has(key);
  }

  delete(key: keyof ConfigSchema): void {
    this.store.delete(key);
  }

  clear(): void {
    this.store.clear();
  }

  getAll(): ConfigSchema {
    return this.store.store;
  }

  reset(): void {
    this.store.store = defaultConfig;
  }
} 