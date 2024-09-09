import { createId } from '@paralleldrive/cuid2';
import { relations, sql } from 'drizzle-orm';
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core';

export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export const users = sqliteTable('users', {
  id: text('id').$defaultFn(() => createId()),
  username: text('username').notNull().unique(),
  email: text('email').notNull().unique(),
  password: text('password').notNull().unique(),
  lastLoggedIn: integer('last_logged_in', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdateFn(() => sql`(CURRENT_TIMESTAMP)`),
});

export const usersRelations = relations(users, ({ many }) => ({
  usersToRoles: many(usersToRoles),
}));

export const roles = sqliteTable('roles', {
  id: text('id').$defaultFn(() => createId()),
  name: text('name', { enum: [Role.ADMIN, Role.USER] })
    .default(Role.USER)
    .$type<Role>()
    .notNull()
    .unique(),
  description: text('description'),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(CURRENT_TIMESTAMP)`),
});

export const usersToRoles = sqliteTable(
  'user_roles',
  {
    userId: text('user_id')
      .references(() => users.id)
      .notNull(),
    roleId: text('role_id')
      .references(() => roles.id)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.roleId] }),
  })
);

export const usersToRolesRelations = relations(usersToRoles, ({ one }) => ({
  user: one(users, {
    fields: [usersToRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [usersToRoles.roleId],
    references: [roles.id],
  }),
}));
