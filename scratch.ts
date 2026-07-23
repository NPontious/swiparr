import { db, likes } from '@/lib/db';
import { eq, and, desc } from 'drizzle-orm';

async function main() {
  const sessionCode = 'ZQB3'; // From the previous query
  const matches = await db.select().from(likes)
      .where(and(
        eq(likes.sessionCode, sessionCode),
        eq(likes.isMatch, true),
      ))
      .groupBy(likes.externalId)
      .orderBy(desc(likes.createdAt));

  console.log('API query result:', matches);
  process.exit(0);
}
main();
