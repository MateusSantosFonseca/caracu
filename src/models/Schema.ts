import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export enum Position {
  Forward = 'Atacante',
  Defensor = 'Defensor',
  Any = 'Qualquer',
}

export enum Stamina {
  Regular = 'Regular',
  Normal = 'Medio',
  High = 'Alto',
}

export enum DrawType {
  Smart = 'Smart',
  Random = 'Random',
  Custom = 'Custom',
}

export const playerTable = sqliteTable('player', {
  id: integer('id').primaryKey(),
  name: text('name').notNull(),
  teamId: text('team_id').notNull(),
  rating: integer('rating').notNull(),
  active: integer('active', { mode: 'boolean' }),
  position: text('position', {
    enum: [Position.Forward, Position.Defensor, Position.Any],
  }).notNull(),
  stamina: text('stamina', {
    enum: [Stamina.High, Stamina.Regular, Stamina.Normal],
  }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(
    sql`(strftime('%s', 'now'))`,
  ),
});
