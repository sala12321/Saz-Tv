
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// These environment variables are automatically available in Lovable+Supabase projects
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are properly set in your environment.');
}

// Use fallback values to prevent runtime errors during development or if environment variables are missing
// In production, these should be properly set
export const supabase = createClient<Database>(
  supabaseUrl || 'https://your-project-url.supabase.co', // This will be replaced with actual URL in production
  supabaseAnonKey || 'your-anon-key', // This will be replaced with actual key in production
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return !!supabaseUrl && !!supabaseAnonKey;
};
