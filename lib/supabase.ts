import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://kxqrsdicrayblwpczxsy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4cXJzZGljcmF5Ymx3cGN6eHN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU2NTg5NjgsImV4cCI6MjA4MTIzNDk2OH0.A8RQRlAzFUVQhxDg7nAnNH-1UK6_0rGJfs0M_2XCZVQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface DbProject {
  id: string;
  name: string;
  emoji: string;
  description: string;
  url: string;
  status: 'live' | 'in-progress' | 'coming-soon' | 'archived';
  category: 'core' | 'business' | 'fun' | 'archive';
  progress: number;
  sort_order: number;
  created_at: string;
  updated_at: string;
}
