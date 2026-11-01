-- DROP ALL TABLES (in reverse dependency order)
DROP TABLE IF EXISTS notifications CASCADE;
DROP TABLE IF EXISTS notes CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS quiz_questions CASCADE;
DROP TABLE IF EXISTS quizzes CASCADE;
DROP TABLE IF EXISTS recommendations CASCADE;
DROP TABLE IF EXISTS user_moods CASCADE;
DROP TABLE IF EXISTS user_achievements CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS assessments CASCADE;
DROP TABLE IF EXISTS study_plans CASCADE;
DROP TABLE IF EXISTS activities CASCADE;
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS subjects CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  academic_level TEXT NOT NULL,
  profile_completed BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  dashboard_layout JSON,
  created_at TIMESTAMP DEFAULT NOW(),
  level INTEGER DEFAULT 1 NOT NULL,
  xp INTEGER DEFAULT 0 NOT NULL,
  total_points INTEGER DEFAULT 0 NOT NULL,
  streak INTEGER DEFAULT 0 NOT NULL,
  last_active TIMESTAMP DEFAULT NOW()
);

-- PROFILES
CREATE TABLE profiles (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  interests TEXT[],
  goals TEXT[],
  weaknesses TEXT[],
  strengths TEXT[],
  academic_stream TEXT,
  institution TEXT,
  board_or_university TEXT,
  graduation_year INTEGER,
  current_grade TEXT,
  specialization_or_major TEXT,
  show_only_relevant_content BOOLEAN DEFAULT TRUE,
  educational_level TEXT,
  preferences JSON,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- SUBJECTS
CREATE TABLE subjects (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  educational_level TEXT NOT NULL,
  educational_stream TEXT NOT NULL DEFAULT 'general',
  grade_level TEXT,
  description TEXT,
  order_index INTEGER DEFAULT 0
);

-- COURSES
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  subject_id INTEGER NOT NULL REFERENCES subjects(id),
  cover_image TEXT,
  difficulty TEXT NOT NULL,
  estimated_duration INTEGER,
  prerequisites TEXT[],
  learning_outcomes TEXT[],
  content_type TEXT NOT NULL,
  is_published BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  content_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- PROGRESS
CREATE TABLE progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  subject_id INTEGER NOT NULL REFERENCES subjects(id),
  percent_complete INTEGER NOT NULL,
  last_activity TIMESTAMP DEFAULT NOW()
);

-- ACTIVITIES
CREATE TABLE activities (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  score INTEGER,
  duration INTEGER,
  completed_at TIMESTAMP DEFAULT NOW()
);

-- STUDY PLANS
CREATE TABLE study_plans (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  date TIMESTAMP NOT NULL,
  sessions JSON NOT NULL
);

-- ASSESSMENTS
CREATE TABLE assessments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMP NOT NULL,
  type TEXT NOT NULL
);

-- ACHIEVEMENTS
CREATE TABLE achievements (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL,
  points INTEGER NOT NULL,
  xp_reward INTEGER DEFAULT 0 NOT NULL,
  tier TEXT DEFAULT 'bronze' NOT NULL,
  badge_color TEXT DEFAULT '#CD7F32' NOT NULL,
  criteria JSON NOT NULL,
  required_level INTEGER DEFAULT 1
);

-- USER ACHIEVEMENTS
CREATE TABLE user_achievements (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  achievement_id INTEGER NOT NULL REFERENCES achievements(id),
  progress INTEGER NOT NULL DEFAULT 0,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- USER MOODS
CREATE TABLE user_moods (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  mood TEXT NOT NULL,
  energy INTEGER NOT NULL,
  focus INTEGER NOT NULL,
  stress INTEGER NOT NULL,
  receptiveness INTEGER NOT NULL,
  description TEXT,
  suggested_activities TEXT[],
  content_type TEXT NOT NULL,
  difficulty_preference TEXT NOT NULL,
  session_duration TEXT NOT NULL,
  learning_mode TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- RECOMMENDATIONS
CREATE TABLE recommendations (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  resource_url TEXT,
  mood_id INTEGER REFERENCES user_moods(id),
  content_type TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- QUIZZES
CREATE TABLE quizzes (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  subject_id INTEGER REFERENCES subjects(id),
  topic_name TEXT,
  difficulty TEXT NOT NULL,
  time_limit INTEGER,
  passing_score INTEGER DEFAULT 70,
  created_by INTEGER REFERENCES users(id),
  is_ai_generated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- QUIZ QUESTIONS
CREATE TABLE quiz_questions (
  id SERIAL PRIMARY KEY,
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id),
  question_text TEXT NOT NULL,
  question_type TEXT NOT NULL,
  options JSONB,
  correct_answer TEXT NOT NULL,
  explanation TEXT,
  points INTEGER DEFAULT 1,
  "order" INTEGER DEFAULT 0
);

-- QUIZ ATTEMPTS
CREATE TABLE quiz_attempts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  quiz_id INTEGER NOT NULL REFERENCES quizzes(id),
  score INTEGER,
  max_score INTEGER,
  percentage_score INTEGER,
  time_spent INTEGER,
  completed BOOLEAN DEFAULT FALSE,
  answers JSONB,
  started_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

-- NOTES
CREATE TABLE notes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  subject_id INTEGER REFERENCES subjects(id),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  session_id TEXT,
  is_ai_generated BOOLEAN DEFAULT FALSE,
  tags TEXT[],
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- NOTIFICATIONS
CREATE TABLE notifications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  related_id INTEGER,
  related_type TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
