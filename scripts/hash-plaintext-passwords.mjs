// One-off migration: replace any plaintext passwords in the users table with bcrypt hashes.
// Users keep logging in with the same password; it just stops being stored in clear text.
//
// Usage: node --env-file=.env scripts/hash-plaintext-passwords.mjs
import bcrypt from "bcryptjs";
import postgres from "postgres";

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });
const BCRYPT_HASH = /^\$2[aby]\$\d{2}\$/;

try {
  const users = await sql`select id, username, password from users`;
  const plaintext = users.filter((u) => !BCRYPT_HASH.test(u.password));

  for (const user of plaintext) {
    const hash = await bcrypt.hash(user.password, 10);
    await sql`update users set password = ${hash} where id = ${user.id}`;
    console.log(`Hashed password for user #${user.id} (${user.username})`);
  }

  console.log(`Done. ${plaintext.length} of ${users.length} users migrated.`);
} finally {
  await sql.end();
}
