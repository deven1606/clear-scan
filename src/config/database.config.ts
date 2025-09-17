import { registerAs } from '@nestjs/config';
import { DatabaseConfig } from './config.interface';

export const databaseConfig = registerAs('database', (): DatabaseConfig => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'clear_scan',
}));
