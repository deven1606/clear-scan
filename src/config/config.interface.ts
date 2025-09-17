export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AppConfig {
  nodeEnv: string;
  port: number;
  database: DatabaseConfig;
}
