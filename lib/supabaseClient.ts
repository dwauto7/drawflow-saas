import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Use the NEXT_PUBLIC_ variables that Vercel provides
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.error('Missing Supabase environment variables');
}

export { supabase };
