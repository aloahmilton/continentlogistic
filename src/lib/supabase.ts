import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vdsmvzkqbsighqbifygq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_uuAtfuQXOUU4w54EUDMifA_jpTTdoOu';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
