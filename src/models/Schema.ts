import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export enum Position {
  Atacante = 'Atacante',
  Defensor = 'Defensor',
}

export enum Stamina {
  Regular = 'Regular',
  Medio = 'Medio',
  Alto = 'Alto',
}

export const playerTable = sqliteTable('player', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  teamId: text('team_id').notNull(),
  rating: integer('rating').notNull(),
  active: integer('active', { mode: 'boolean' }),
  position: text('position', {
    enum: [Position.Atacante, Position.Defensor],
  }).notNull(),
  stamina: text('stamina', {
    enum: [Stamina.Alto, Stamina.Regular, Stamina.Medio],
  }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});
