import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

const connectionString = process.env.DATABASE_URL || '';

// Connection caching for Next.js hot-reloads in development
declare global {
  // eslint-disable-next-line no-var
  var __postgresClient: postgres.Sql | undefined;
}

const client = global.__postgresClient ?? postgres(connectionString, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
  prepare: false,
});

if (process.env.NODE_ENV !== 'production') {
  global.__postgresClient = client;
}

export const db = drizzle(client, { schema });
export * from './schema';
