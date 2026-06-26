-- 1. Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password TEXT, -- Nullable for users registered via Supabase Auth
  role TEXT NOT NULL,
  org TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Connections Table
CREATE TABLE IF NOT EXISTS connections (
  id SERIAL PRIMARY KEY,
  volunteer_id UUID REFERENCES users(id),
  beneficiary_id UUID REFERENCES users(id),
  volunteer_name TEXT,
  beneficiary_name TEXT,
  skill TEXT,
  status TEXT DEFAULT 'active',
  hours INTEGER DEFAULT 0,
  created_at TEXT
);

-- 3. Support Requests Table
CREATE TABLE IF NOT EXISTS support_requests (
  id SERIAL PRIMARY KEY,
  beneficiary_id UUID REFERENCES users(id),
  beneficiary_name TEXT,
  type TEXT NOT NULL,
  description TEXT NOT NULL,
  urgency TEXT DEFAULT 'medium',
  language TEXT,
  availability TEXT,
  status TEXT DEFAULT 'pending',
  volunteer_id UUID REFERENCES users(id),
  volunteer_name TEXT,
  submitted_date TEXT,
  next_session TEXT
);

-- 4. Database Function for Platform Statistics (SQL Aggregate Query)
CREATE OR REPLACE FUNCTION get_platform_impact_stats()
RETURNS json AS $$
DECLARE
  active_v INTEGER;
  lives_t INTEGER;
  skills_s INTEGER;
BEGIN
  -- Count active volunteers
  SELECT COUNT(DISTINCT id) INTO active_v FROM users WHERE role = 'volunteer';
  -- Count lives touched (active matches)
  SELECT COUNT(DISTINCT beneficiary_id) INTO lives_t FROM connections WHERE status = 'active';
  -- Count skills shared
  SELECT COUNT(DISTINCT skill) INTO skills_s FROM connections;
  
  RETURN json_build_object(
    'activeVolunteers', (12400 + active_v) || '+',
    'livesTouched', TO_CHAR(45200 + lives_t, 'FM99,999,999'),
    'skillsShared', (230 + skills_s) || '+'
  );
END;
$$ LANGUAGE plpgsql;

-- 5. Volunteer Profiles Table
CREATE TABLE IF NOT EXISTS volunteer_profiles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  service_type TEXT,
  target_audience TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Organization Profiles Table
CREATE TABLE IF NOT EXISTS organization_profiles (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  focus_areas TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
