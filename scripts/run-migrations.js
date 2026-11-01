import { execSync } from 'child_process';
import path from 'path';

console.log('Running database migrations...');

// Run the migrate.ts script to create tables
try {
  console.log('Creating tables...');
  execSync('tsx server/migrate.ts', { stdio: 'inherit' });
  console.log('Tables created successfully!');
} catch (error) {
  console.error('Error creating tables:', error);
  process.exit(1);
}

// Run the migrate-achievements.ts script to create achievements
try {
  console.log('Setting up achievements...');
  execSync('tsx server/migrate-achievements.ts', { stdio: 'inherit' });
  console.log('Achievements set up successfully!');
} catch (error) {
  console.error('Error setting up achievements:', error);
  process.exit(1);
}

// Run the migrate-gamification.ts script to add gamification fields
try {
  console.log('Setting up gamification features...');
  execSync('tsx server/migrate-gamification.ts', { stdio: 'inherit' });
  console.log('Gamification features set up successfully!');
} catch (error) {
  console.error('Error setting up gamification features:', error);
  process.exit(1);
}

console.log('All migrations completed successfully!');