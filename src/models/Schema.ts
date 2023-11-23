import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export enum Position {
  Pivo = 'pivo',
  Fixo = 'fixo',
  Ala = 'ala',
}

export const playerTable = sqliteTable('player', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  teamId: text('team_id').notNull(),
  rating: integer('rating').notNull(),
  active: integer('active', { mode: 'boolean' }),
  position: text('position', {
    enum: [Position.Ala, Position.Fixo, Position.Pivo],
  }).notNull(),
  stamina: integer('stamina').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});
