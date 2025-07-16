import Database from 'better-sqlite3';
import { join } from 'path';
import { app } from 'electron';
import { existsSync, mkdirSync } from 'fs';

export class DatabaseService {
  private db: Database.Database | null = null;
  private dbPath: string;

  constructor() {
    const userDataPath = app.getPath('userData');
    if (!existsSync(userDataPath)) {
      mkdirSync(userDataPath, { recursive: true });
    }
    this.dbPath = join(userDataPath, 'app.db');
  }

  async initialize(): Promise<void> {
    try {
      this.db = new Database(this.dbPath);
      
      // 启用外键约束
      this.db.pragma('foreign_keys = ON');
      
      // 创建表
      await this.createTables();
      
      console.log('数据库初始化成功');
    } catch (error) {
      console.error('数据库初始化失败:', error);
      throw error;
    }
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    // 项目表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        type TEXT NOT NULL,
        status TEXT DEFAULT 'active',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 媒体文件表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS media_files (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        name TEXT NOT NULL,
        path TEXT NOT NULL,
        type TEXT NOT NULL,
        size INTEGER,
        duration INTEGER,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id)
      )
    `);

    // 任务表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER,
        title TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        priority TEXT DEFAULT 'medium',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id)
      )
    `);

    // 设置表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        type TEXT DEFAULT 'string',
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 日志表
    this.db.exec(`
      CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        level TEXT NOT NULL,
        message TEXT NOT NULL,
        data TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
  }

  query(sql: string, params?: any[]): any[] {
    if (!this.db) throw new Error('数据库未初始化');
    
    try {
      const stmt = this.db.prepare(sql);
      return stmt.all(params || []);
    } catch (error) {
      console.error('查询错误:', error);
      throw error;
    }
  }

  run(sql: string, params?: any[]): any {
    if (!this.db) throw new Error('数据库未初始化');
    
    try {
      const stmt = this.db.prepare(sql);
      return stmt.run(params || []);
    } catch (error) {
      console.error('执行错误:', error);
      throw error;
    }
  }

  transaction(fn: () => void): void {
    if (!this.db) throw new Error('数据库未初始化');
    
    const transaction = this.db.transaction(fn);
    transaction();
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
} 