import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.https://urqqmhsuvjngraweruba.supabase.co;
const supabaseAnonKey = process.env.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVycXFtaHN1dmpuZ3Jhd2VydWJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMTMzMTIsImV4cCI6MjA3ODU4OTMxMn0.9apzq-U2htbingBtC3DD_p_3pLhjpCNSmP9oF16bbrE;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };
