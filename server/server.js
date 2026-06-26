import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'vikasya-secret-key-2026';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Determine connection strategy
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || process.env.SUPABASE_ANON_KEY;

const useSupabase = !!(SUPABASE_URL && SUPABASE_KEY);
let supabase = null;
let db = null;

if (useSupabase) {
  console.log('Supabase credentials found. Initializing Supabase client...');
  supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
} else {
  console.log('Supabase credentials not found. Falling back to local SQLite database...');
  // Database setup
  const dbPath = path.resolve(__dirname, 'database.sqlite');
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database', err);
    } else {
      console.log('Database connected at', dbPath);
      initializeSQLiteDatabase();
    }
  });
}

// Auth Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
}

function initializeSQLiteDatabase() {
  db.serialize(() => {
    // 1. Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      org TEXT
    )`);

    // 2. Connections table (matches between volunteers and beneficiaries)
    db.run(`CREATE TABLE IF NOT EXISTS connections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      volunteer_id INTEGER,
      beneficiary_id INTEGER,
      volunteer_name TEXT,
      beneficiary_name TEXT,
      skill TEXT,
      status TEXT DEFAULT 'active',
      hours INTEGER DEFAULT 0,
      created_at TEXT,
      FOREIGN KEY(volunteer_id) REFERENCES users(id),
      FOREIGN KEY(beneficiary_id) REFERENCES users(id)
    )`);

    // 3. Support Requests table
    db.run(`CREATE TABLE IF NOT EXISTS support_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      beneficiary_id INTEGER,
      beneficiary_name TEXT,
      type TEXT NOT NULL,
      description TEXT NOT NULL,
      urgency TEXT DEFAULT 'medium',
      language TEXT,
      availability TEXT,
      status TEXT DEFAULT 'pending',
      volunteer_id INTEGER,
      volunteer_name TEXT,
      submitted_date TEXT,
      next_session TEXT,
      FOREIGN KEY(beneficiary_id) REFERENCES users(id),
      FOREIGN KEY(volunteer_id) REFERENCES users(id)
    )`);

    // 4. Platform Metrics Baseline table
    db.run(`CREATE TABLE IF NOT EXISTS platform_metrics (
      metric_name TEXT PRIMARY KEY,
      metric_value INTEGER
    )`);

    // 5. Volunteer profiles table
    db.run(`CREATE TABLE IF NOT EXISTS volunteer_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      service_type TEXT,
      target_audience TEXT,
      description TEXT,
      created_at TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // 6. Organization profiles table
    db.run(`CREATE TABLE IF NOT EXISTS organization_profiles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      focus_areas TEXT,
      created_at TEXT,
      FOREIGN KEY(user_id) REFERENCES users(id)
    )`);

    // Seed Platform Metrics Baseline offsets
    db.get("SELECT COUNT(*) as count FROM platform_metrics", (err, row) => {
      if (row && row.count === 0) {
        db.run(`INSERT INTO platform_metrics (metric_name, metric_value) VALUES 
          ('active_volunteers_offset', 12400),
          ('lives_touched_offset', 45200),
          ('skills_shared_offset', 230)
        `);
        console.log('Seeded platform metrics baselines.');
      }
    });

    // Seed mock users
    db.get("SELECT COUNT(*) as count FROM users", async (err, row) => {
      if (row && row.count === 0) {
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        // Seed volunteers
        db.run(`INSERT INTO users (name, email, password, role) VALUES 
          ('Arjun Mehta', 'arjun@mehta.com', '${hashedPassword}', 'volunteer'),
          ('Dr. Lakshmi Rao', 'lakshmi@rao.com', '${hashedPassword}', 'volunteer'),
          ('Rahul Singh', 'rahul@singh.com', '${hashedPassword}', 'volunteer'),
          ('Priya Nair', 'priya@nair.com', '${hashedPassword}', 'volunteer')
        `);

        // Seed beneficiaries
        db.run(`INSERT INTO users (name, email, password, role) VALUES 
          ('Kamala Devi', 'kamala@devi.com', '${hashedPassword}', 'beneficiary')
        `);

        // Seed organization
        db.run(`INSERT INTO users (name, email, password, role, org) VALUES 
          ('Sister Priya Thomas', 'sister@priya.com', '${hashedPassword}', 'org', 'Grace Foundation')
        `);

        console.log('Seeded mock users.');
        
        // Seed connections (after users are created)
        db.all("SELECT id, name, role FROM users", (err, usersList) => {
          if (usersList) {
            const arjun = usersList.find(u => u.name === 'Arjun Mehta');
            const priya = usersList.find(u => u.name === 'Priya Nair');
            const kamala = usersList.find(u => u.name === 'Kamala Devi');

            if (kamala && priya && arjun) {
              const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
              
              db.run(`INSERT INTO connections (volunteer_id, beneficiary_id, volunteer_name, beneficiary_name, skill, status, hours, created_at) VALUES 
                (${priya.id}, ${kamala.id}, 'Priya Nair', 'Kamala Devi', 'Digital Skills', 'active', 12, '${todayStr}'),
                (${arjun.id}, ${kamala.id}, 'Arjun Mehta', 'Kamala Devi', 'English', 'active', 8, '${todayStr}')
              `);

              // Seed support requests
              db.run(`INSERT INTO support_requests (beneficiary_id, beneficiary_name, type, description, urgency, status, volunteer_id, volunteer_name, submitted_date, next_session) VALUES 
                (${kamala.id}, 'Kamala Devi', 'Digital Skill Learning', 'Need help learning to use WhatsApp to video call family members abroad.', 'high', 'matched', ${arjun.id}, 'Arjun Mehta', 'June 10, 2025', 'Today 4 PM'),
                (${kamala.id}, 'Kamala Devi', 'Companionship / Regular Calls', 'Feeling lonely on evenings. Would love someone to talk to 2-3 times a week.', 'medium', 'pending', NULL, NULL, 'June 12, 2025', NULL),
                (${kamala.id}, 'Kamala Devi', 'Financial Literacy', 'Want to understand how to use UPI apps safely and avoid scams.', 'low', 'completed', ${arjun.id}, 'Rahul Singh', 'May 25, 2025', NULL)
              `);
              
              console.log('Seeded connections and support requests.');
            }
          }
        });
      }
    });
  });
}

// ---------------- API ROUTES ----------------

// 1. Authentication & Onboarding
// POST /api/auth/register: Registers a user with role
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name, role, org } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  let normalizedRole = role.toLowerCase();
  if (normalizedRole === 'needs support' || normalizedRole === 'learner' || normalizedRole === 'beneficiary') {
    normalizedRole = 'beneficiary';
  } else if (normalizedRole === 'volunteer') {
    normalizedRole = 'volunteer';
  } else if (normalizedRole === 'org' || normalizedRole === 'organization') {
    normalizedRole = 'org';
  } else {
    return res.status(400).json({ error: 'Invalid role' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    if (useSupabase) {
      // Check if email already exists in Supabase
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .maybeSingle();

      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      const { data: newUser, error: insertError } = await supabase
        .from('users')
        .insert([{ name, email, password: hashedPassword, role: normalizedRole, org: org || null }])
        .select()
        .single();

      if (insertError) {
        return res.status(500).json({ error: insertError.message });
      }

      const token = jwt.sign(
        { id: newUser.id, email, name, role: normalizedRole },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.status(201).json({
        message: 'Registration successful',
        token,
        user: { id: newUser.id, name, email, role: normalizedRole, org }
      });
    } else {
      // SQLite execution
      const sql = `INSERT INTO users (name, email, password, role, org) VALUES (?, ?, ?, ?, ?)`;
      
      db.run(sql, [name, email, hashedPassword, normalizedRole, org || null], function(err) {
        if (err) {
          if (err.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: 'Email already registered' });
          }
          return res.status(500).json({ error: err.message });
        }

        const token = jwt.sign(
          { id: this.lastID, email, name, role: normalizedRole },
          JWT_SECRET,
          { expiresIn: '7d' }
        );

        res.status(201).json({
          message: 'Registration successful',
          token,
          user: { id: this.lastID, name, email, role: normalizedRole, org }
        });
      });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/auth/login: Authenticates user and returns JWT
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  if (useSupabase) {
    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .maybeSingle();

      if (error) return res.status(500).json({ error: error.message });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, org: user.org }
      });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // SQLite execution
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign(
        { id: user.id, email: user.email, name: user.name, role: user.role },
        JWT_SECRET,
        { expiresIn: '7d' }
      );

      res.json({
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role, org: user.org }
      });
    });
  }
});

// 2. Volunteer Matching
// GET /api/matches: Fetches opportunities or connections
app.get('/api/matches', async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  let userId = null;
  let userRole = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
      userRole = decoded.role;
    } catch (e) {
      // Ignore token verification errors, serve as guest
    }
  }

  if (useSupabase) {
    try {
      const { data: connections, error: connErr } = await supabase
        .from('connections')
        .select('*')
        .eq('status', 'active');

      const { data: opportunities, error: oppErr } = await supabase
        .from('support_requests')
        .select('*')
        .eq('status', 'pending');

      const { data: volunteers, error: volErr } = await supabase
        .from('users')
        .select('id, name, role')
        .eq('role', 'volunteer');

      if (connErr || oppErr || volErr) {
        return res.status(500).json({ error: (connErr || oppErr || volErr).message });
      }

      let userRequests = [];
      if (userId) {
        const field = userRole === 'volunteer' ? 'volunteer_id' : 'beneficiary_id';
        const { data: requests } = await supabase
          .from('support_requests')
          .select('*')
          .eq(field, userId);
        
        if (requests) {
          userRequests = requests;
        }
      }

      res.json({
        connections: connections || [],
        opportunities: opportunities || [],
        volunteers: volunteers || [],
        userRequests
      });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // SQLite execution
    db.all("SELECT * FROM connections WHERE status = 'active'", (err, connections) => {
      if (err) return res.status(500).json({ error: err.message });

      db.all("SELECT * FROM support_requests WHERE status = 'pending'", (err, opportunities) => {
        if (err) return res.status(500).json({ error: err.message });

        db.all("SELECT id, name, role FROM users WHERE role = 'volunteer'", (err, volunteers) => {
          if (err) return res.status(500).json({ error: err.message });

          if (userId) {
            const sql = userRole === 'volunteer' 
              ? "SELECT * FROM support_requests WHERE volunteer_id = ?"
              : "SELECT * FROM support_requests WHERE beneficiary_id = ?";
              
            db.all(sql, [userId], (err, userRequests) => {
              if (err) return res.status(500).json({ error: err.message });
              return res.json({
                connections,
                opportunities,
                volunteers,
                userRequests
              });
            });
          } else {
            return res.json({
              connections,
              opportunities,
              volunteers,
              userRequests: []
            });
          }
        });
      });
    });
  }
});

// POST /api/matches/request: Allows beneficiary or community to post a support request
app.post('/api/matches/request', authenticateToken, async (req, res) => {
  const { type, description, urgency, language, availability } = req.body;
  const beneficiaryId = req.user.id;
  const beneficiaryName = req.user.name;

  if (!type || !description) {
    return res.status(400).json({ error: 'Type and description are required' });
  }

  const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (useSupabase) {
    try {
      const { data: request, error } = await supabase
        .from('support_requests')
        .insert([{
          beneficiary_id: beneficiaryId,
          beneficiary_name: beneficiaryName,
          type,
          description,
          urgency: urgency || 'medium',
          language: language || null,
          availability: availability || null,
          status: 'pending',
          submitted_date: todayStr
        }])
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      res.status(201).json({
        message: 'Support request created successfully',
        request
      });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // SQLite execution
    const sql = `INSERT INTO support_requests (beneficiary_id, beneficiary_name, type, description, urgency, language, availability, status, submitted_date) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`;

    db.run(sql, [beneficiaryId, beneficiaryName, type, description, urgency || 'medium', language || null, availability || null, todayStr], function(err) {
      if (err) return res.status(500).json({ error: err.message });

      db.get("SELECT * FROM support_requests WHERE id = ?", [this.lastID], (err, request) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({
          message: 'Support request created successfully',
          request
        });
      });
    });
  }
});

// Helper / Endpoint to connect a volunteer to a request
app.post('/api/matches/connect', authenticateToken, async (req, res) => {
  const { requestId } = req.body;
  const volunteerId = req.user.id;
  const volunteerName = req.user.name;

  if (req.user.role !== 'volunteer') {
    return res.status(403).json({ error: 'Only volunteers can accept matching requests' });
  }

  if (useSupabase) {
    try {
      const { data: request, error: fetchErr } = await supabase
        .from('support_requests')
        .select('*')
        .eq('id', requestId)
        .single();

      if (fetchErr || !request) return res.status(404).json({ error: 'Request not found' });
      if (request.status !== 'pending') return res.status(400).json({ error: 'Request is already matched' });

      // Update status
      const { error: updateErr } = await supabase
        .from('support_requests')
        .update({ status: 'matched', volunteer_id: volunteerId, volunteer_name: volunteerName })
        .eq('id', requestId);

      if (updateErr) return res.status(500).json({ error: updateErr.message });

      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      // Insert Connection
      const { error: connErr } = await supabase
        .from('connections')
        .insert([{
          volunteer_id: volunteerId,
          beneficiary_id: request.beneficiary_id,
          volunteer_name: volunteerName,
          beneficiary_name: request.beneficiary_name,
          skill: request.type,
          status: 'active',
          created_at: todayStr
        }]);

      if (connErr) return res.status(500).json({ error: connErr.message });
      res.json({ message: 'Successfully matched!', requestId });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // SQLite execution
    db.get("SELECT * FROM support_requests WHERE id = ?", [requestId], (err, request) => {
      if (err) return res.status(500).json({ error: err.message });
      if (!request) return res.status(404).json({ error: 'Request not found' });
      if (request.status !== 'pending') return res.status(400).json({ error: 'Request is already matched' });

      db.run(
        "UPDATE support_requests SET status = 'matched', volunteer_id = ?, volunteer_name = ? WHERE id = ?",
        [volunteerId, volunteerName, requestId],
        function(err) {
          if (err) return res.status(500).json({ error: err.message });

          const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
          
          db.run(
            "INSERT INTO connections (volunteer_id, beneficiary_id, volunteer_name, beneficiary_name, skill, status, created_at) VALUES (?, ?, ?, ?, ?, 'active', ?)",
            [volunteerId, request.beneficiary_id, volunteerName, request.beneficiary_name, request.type, todayStr],
            function(err) {
              if (err) return res.status(500).json({ error: err.message });
              res.json({ message: 'Successfully matched!', requestId });
            }
          );
        }
      );
    });
  }
});

// 3. Platform Statistics
// GET /api/stats/impact: Runs aggregate query to dynamically pull live stats + offsets
app.get('/api/stats/impact', async (req, res) => {
  if (useSupabase) {
    try {
      // Call RPC function
      const { data, error } = await supabase.rpc('get_platform_impact_stats');
      if (error) {
        // Dynamic fallback aggregation in case the database function (RPC) isn't created yet
        const { count: volCount } = await supabase.from('users').select('*', { count: 'exact', head: true }).eq('role', 'volunteer');
        const { count: livesCount } = await supabase.from('connections').select('*', { count: 'exact', head: true }).eq('status', 'active');
        const { data: skillsList } = await supabase.from('connections').select('skill');
        const uniqueSkills = new Set(skillsList?.map(s => s.skill).filter(Boolean));

        return res.json({
          activeVolunteers: (12400 + (volCount || 0)) + "+",
          livesTouched: (45200 + (livesCount || 0)).toLocaleString(),
          skillsShared: (230 + (uniqueSkills.size || 0)) + "+"
        });
      }
      res.json(data);
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // SQLite execution
    const sql = `
      SELECT 
        (SELECT metric_value FROM platform_metrics WHERE metric_name = 'active_volunteers_offset') + 
        (SELECT COUNT(DISTINCT id) FROM users WHERE role = 'volunteer') AS activeVolunteers,
        
        (SELECT metric_value FROM platform_metrics WHERE metric_name = 'lives_touched_offset') + 
        (SELECT COUNT(DISTINCT beneficiary_id) FROM connections WHERE status = 'active') AS livesTouched,
        
        (SELECT metric_value FROM platform_metrics WHERE metric_name = 'skills_shared_offset') + 
        (SELECT COUNT(DISTINCT skill) FROM connections) AS skillsShared
    `;

    db.get(sql, [], (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      res.json({
        activeVolunteers: row.activeVolunteers + "+",
        livesTouched: row.livesTouched.toLocaleString(),
        skillsShared: row.skillsShared + "+"
      });
    });
  }
});

// POST /api/onboarding/volunteer: Save volunteer profile details
app.post('/api/onboarding/volunteer', authenticateToken, async (req, res) => {
  const { serviceType, targetAudience, description } = req.body;
  const userId = req.user.id;

  if (useSupabase) {
    try {
      const { data, error } = await supabase
        .from('volunteer_profiles')
        .insert([{
          user_id: userId,
          service_type: serviceType,
          target_audience: targetAudience || [],
          description
        }])
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      res.json({ message: 'Profile completed successfully!', data });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    const todayStr = new Date().toISOString();
    const audienceStr = Array.isArray(targetAudience) ? targetAudience.join(',') : '';
    const sql = `INSERT INTO volunteer_profiles (user_id, service_type, target_audience, description, created_at) VALUES (?, ?, ?, ?, ?)`;
    db.run(sql, [userId, serviceType, audienceStr, description, todayStr], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Profile completed successfully!', id: this.lastID });
    });
  }
});

// POST /api/onboarding/org: Save organization focus areas
app.post('/api/onboarding/org', authenticateToken, async (req, res) => {
  const { focusAreas } = req.body;
  const userId = req.user.id;

  if (useSupabase) {
    try {
      const { data, error } = await supabase
        .from('organization_profiles')
        .insert([{
          user_id: userId,
          focus_areas: focusAreas || []
        }])
        .select()
        .single();

      if (error) return res.status(500).json({ error: error.message });
      res.json({ message: 'Profile completed successfully!', data });
    } catch (e) {
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    const todayStr = new Date().toISOString();
    const focusStr = Array.isArray(focusAreas) ? focusAreas.join(',') : '';
    const sql = `INSERT INTO organization_profiles (user_id, focus_areas, created_at) VALUES (?, ?, ?)`;
    db.run(sql, [userId, focusStr, todayStr], function(err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Profile completed successfully!', id: this.lastID });
    });
  }
});

// Start Server — only listen when running locally (not on Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
