// Creates (or resets) one demo account per role for testing.
//
// Usage:
//   node --env-file=.env scripts/seed-demo-users.mjs           # create / reset demo accounts
//   node --env-file=.env scripts/seed-demo-users.mjs --remove  # delete them again
//
// Passwords are random on every run (printed once) unless DEMO_PASSWORD is set.
// Remove these accounts before going live: a known admin login is a backdoor.
import { randomBytes } from "crypto";
import bcrypt from "bcryptjs";
import postgres from "postgres";

const DEMO_USERS = [
  { username: "demo_admin", email: "demo.admin@learnai.test", fullName: "Demo Admin", role: "admin", dashboard: "/admin" },
  { username: "demo_subadmin", email: "demo.subadmin@learnai.test", fullName: "Demo Sub-Admin", role: "subadmin", dashboard: "/admin" },
  { username: "demo_student", email: "demo.student@learnai.test", fullName: "Demo Student", role: "user", dashboard: "/dashboard" },
];

// Tables with a user_id foreign key, in a safe deletion order
const USER_TABLES = [
  "recommendations",
  "user_moods",
  "quiz_attempts",
  "notes",
  "notifications",
  "activities",
  "progress",
  "study_plans",
  "assessments",
  "user_achievements",
  "profiles",
];

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  process.exit(1);
}

if (process.env.NODE_ENV === "production" && !process.argv.includes("--force")) {
  console.error("Refusing to seed demo accounts with NODE_ENV=production (pass --force to override)");
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { max: 1, prepare: false });

async function removeDemoUsers() {
  const rows = await sql`select id from users where username in ${sql(DEMO_USERS.map((u) => u.username))}`;
  const ids = rows.map((r) => r.id);
  if (ids.length === 0) {
    console.log("No demo accounts found.");
    return;
  }

  await sql.begin(async (tx) => {
    for (const table of USER_TABLES) {
      await tx`delete from ${tx(table)} where user_id in ${tx(ids)}`;
    }
    await tx`update quizzes set created_by = null where created_by in ${tx(ids)}`;
    await tx`delete from users where id in ${tx(ids)}`;
  });
  console.log(`Removed ${ids.length} demo account(s).`);
}

async function seedDemoUsers() {
  const created = [];

  for (const demo of DEMO_USERS) {
    const password = process.env.DEMO_PASSWORD || `Demo-${randomBytes(6).toString("base64url")}`;
    const hash = await bcrypt.hash(password, 10);

    const [user] = await sql`
      insert into users (username, password, email, full_name, academic_level, role, profile_completed)
      values (${demo.username}, ${hash}, ${demo.email}, ${demo.fullName}, 'undergraduate', ${demo.role}, true)
      on conflict (username) do update
        set password = excluded.password,
            email = excluded.email,
            full_name = excluded.full_name,
            role = excluded.role
      returning id
    `;

    const [profile] = await sql`select id from profiles where user_id = ${user.id}`;
    if (!profile) {
      await sql`
        insert into profiles (user_id, interests, goals, weaknesses, strengths, educational_level, show_only_relevant_content, preferences)
        values (
          ${user.id}, ${["General"]}, ${["Master key skills"]}, ${[]}, ${[]}, 'undergraduate', true,
          ${sql.json({ studyTime: "morning", preferredLearningStyle: "visual" })}
        )
      `;
    }

    created.push({ role: demo.role, username: demo.username, email: demo.email, password, dashboard: demo.dashboard });
  }

  console.table(created);
}

try {
  if (process.argv.includes("--remove")) {
    await removeDemoUsers();
  } else {
    await seedDemoUsers();
  }
} finally {
  await sql.end();
}
