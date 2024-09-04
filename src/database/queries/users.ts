import { users } from '@/database/schemas';
import { eq } from 'drizzle-orm';
import { db } from '../client';

const findByUsername = async (username: string) => {
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
    .where(eq(users.username, username))
    .limit(1);
  return user;
};

export default { findByUsername };
