
import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Using the values directly from the Supabase project configuration
const supabaseUrl = 'https://cltcekuvmcoylzgrqixf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNsdGNla3V2bWNveWx6Z3JxaXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUyNTQyMTEsImV4cCI6MjA2MDgzMDIxMX0.iPtIq8VRCH2Fay8NSpA5EJuIRvSUGZYBuGG72yXdZ-A';

// Create and export the Supabase client
export const supabase = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Export a function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return Boolean(supabaseUrl && supabaseAnonKey);
};
