import { users } from '@/database/schemas';
import { eq, or } from 'drizzle-orm';
import { db } from '../client';

const findByUsernameOrEmail = async (usernameOrEmail: string) => {
  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
      lastLoggedIn: users.lastLoggedIn,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(
      or(eq(users.username, usernameOrEmail), eq(users.email, usernameOrEmail))
    )
    .limit(1);
  return user;
};

const findById = async (id: string) => {
  const [user] = await db
    .select({
      id: users.id,
      username: users.username,
      email: users.email,
      password: users.password,
    })
    .from(users)
    .where(eq(users.id, id))
    .limit(1);
  return user;
};

interface User {
  username: string;
  email: string;
  password: string;
}

const create = async (user: User) => {
  const [newUser] = await db.insert(users).values(user).returning({
    id: users.id,
    username: users.username,
    email: users.email,
  });
  return newUser;
};

const update = async (id: string, user: Partial<User>) => {
  const [updatedUser] = await db
    .update(users)
    .set(user)
    .where(eq(users.id, id))
    .returning({
      id: users.id,
      username: users.username,
    });
  return updatedUser;
};

const remove = async (id: string) => {
  await db.delete(users).where(eq(users.id, id));
};

export default { findByUsernameOrEmail, findById, create, update, remove };
