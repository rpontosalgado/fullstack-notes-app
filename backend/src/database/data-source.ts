import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Note } from '../notes/note.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'notes_db',
  entities: [Note],
  synchronize: true,
});
