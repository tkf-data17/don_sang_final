import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ngsbwzwyzejbmuecmkpk.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5nc2J3end5emVqYm11ZWNta3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQzMjc0NTUsImV4cCI6MjA3OTkwMzQ1NX0.bWAeG3Brn_lmEQmWKEfKoTG5mkOI6FGNGs3_b_drdvk";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
