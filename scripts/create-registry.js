#!/usr/bin/env node
/**
 * create-registry.js
 * Creates the nsprd_projects table in Supabase and seeds it with current projects.
 * Uses the Supabase Management API to execute raw SQL.
 */

const SUPABASE_PROJECT_REF = 'kxqrsdicrayblwpczxsy';
const SUPABASE_URL = 'https://kxqrsdicrayblwpczxsy.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cXJzZGljcmF5Ymx3cGN6eHN5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NTY1ODk2OCwiZXhwIjoyMDgxMjM0OTY4fQ.aS08Saba5oOQsJZqfRf3tUuaCXqwcwyyno4kzMgzsEc';

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS nsprd_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT DEFAULT '🚀',
  description TEXT,
  url TEXT,
  status TEXT DEFAULT 'in-progress' CHECK (status IN ('live', 'in-progress', 'coming-soon', 'archived')),
  category TEXT DEFAULT 'core' CHECK (category IN ('core', 'business', 'fun', 'archive')),
  progress INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 99,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
`;

const SEED_DATA = [
  { id: 'lifeos',     name: 'LifeOS',                emoji: '🎯', description: 'Life tracking dashboard',                    url: 'https://pd.nsprd.com',             status: 'live',        category: 'core',     progress: 100, sort_order: 1  },
  { id: 'lyne',       name: 'LYNE',                  emoji: '🎮', description: 'Generational wealth platform',              url: 'https://rp1.nsprd.com',            status: 'live',        category: 'core',     progress: 100, sort_order: 2  },
  { id: 'portal',     name: 'Inspired Design Portal', emoji: '💼', description: 'Business manager',                         url: 'https://nsprd.com/login',          status: 'live',        category: 'business', progress: 100, sort_order: 3  },
  { id: 'memory',     name: 'Memory Palace',         emoji: '🧠', description: 'Memory archive',                            url: 'https://memory.nsprd.com',         status: 'live',        category: 'core',     progress: 100, sort_order: 4  },
  { id: 'bailey',     name: 'Bailey Dashboard',      emoji: '🐕', description: "Bailey's health tracker",                   url: 'https://bailey.nsprd.com',         status: 'live',        category: 'fun',      progress: 100, sort_order: 5  },
  { id: 'faggnation', name: 'Faggnation Archive',    emoji: '🎬', description: 'Podcast archive',                           url: 'https://faggnation.nsprd.com',     status: 'live',        category: 'archive',  progress: 100, sort_order: 6  },
  { id: 'petos',      name: 'PetOS',                 emoji: '🐾', description: 'Complete pet management system',            url: 'https://petos.nsprd.com',          status: 'live',        category: 'core',     progress: 100, sort_order: 7  },
  { id: 'prep',       name: 'Print File Prep',       emoji: '🖨️', description: 'Convert designs to print-ready PDFs',       url: 'https://prep.nsprd.com',           status: 'live',        category: 'business', progress: 100, sort_order: 8  },
  { id: 'onething',   name: 'ONE THING',             emoji: '⏱️', description: 'Anti-multitasking productivity timer',     url: 'https://one-thing-three.vercel.app', status: 'live',      category: 'fun',      progress: 100, sort_order: 9  },
  { id: 'wealthos',   name: 'WealthOS',              emoji: '💰', description: 'Personal finance tracker',                  url: 'https://wealth.nsprd.com',         status: 'in-progress', category: 'core',     progress: 40,  sort_order: 10 },
  { id: 'hhh',        name: 'Happy Hour Heroes',     emoji: '🍺', description: 'The drinking game app',                     url: 'https://hhh.nsprd.com',            status: 'in-progress', category: 'fun',      progress: 30,  sort_order: 11 },
];

async function executeSQL(sql) {
  // Try Supabase Management API first
  const managementUrl = `https://api.supabase.com/v1/projects/${SUPABASE_PROJECT_REF}/database/query`;
  try {
    const res = await fetch(managementUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
      },
      body: JSON.stringify({ query: sql }),
    });
    const text = await res.text();
    if (res.ok) {
      console.log('✅ SQL executed via Management API');
      return { ok: true, text };
    }
    console.warn('⚠️  Management API failed:', res.status, text);
  } catch (err) {
    console.warn('⚠️  Management API error:', err.message);
  }

  // Fallback: try pg-meta endpoint
  const pgMetaUrl = `${SUPABASE_URL}/pg-meta/v1/query`;
  try {
    const res = await fetch(pgMetaUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
      },
      body: JSON.stringify({ query: sql }),
    });
    const text = await res.text();
    if (res.ok) {
      console.log('✅ SQL executed via pg-meta');
      return { ok: true, text };
    }
    console.warn('⚠️  pg-meta failed:', res.status, text);
  } catch (err) {
    console.warn('⚠️  pg-meta error:', err.message);
  }

  return { ok: false };
}

async function upsertProjects(projects) {
  const url = `${SUPABASE_URL}/rest/v1/nsprd_projects`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey': SERVICE_KEY,
      'Prefer': 'resolution=merge-duplicates',
    },
    body: JSON.stringify(projects),
  });
  const text = await res.text();
  return { ok: res.ok, status: res.status, text };
}

async function main() {
  console.log('🚀 Creating nsprd_projects table...');
  const createResult = await executeSQL(CREATE_TABLE_SQL);

  if (!createResult.ok) {
    console.error('\n❌ Could not create table automatically.');
    console.log('\n📋 Run this SQL manually in the Supabase Dashboard > SQL Editor:\n');
    console.log(CREATE_TABLE_SQL);
    console.log('\nThen re-run this script with --seed-only flag.');
    if (process.argv.includes('--seed-only')) {
      console.log('--seed-only detected, continuing to seed...');
    } else {
      process.exit(1);
    }
  }

  console.log('\n🌱 Seeding projects...');
  const seedResult = await upsertProjects(SEED_DATA);
  if (seedResult.ok || seedResult.status === 201) {
    console.log(`✅ Seeded ${SEED_DATA.length} projects successfully`);
  } else {
    console.error('❌ Seed failed:', seedResult.status, seedResult.text);
    process.exit(1);
  }

  console.log('\n✨ Registry setup complete!');
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
