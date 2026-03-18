import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://nwunocvmtfmuakaspoad.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dW5vY3ZtdGZtdWFrYXNwb2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MzYwODAsImV4cCI6MjA4OTMxMjA4MH0.ZwqVpKOwpw82jXu6HPEC0DgZOp5EKCOnLrW0_FUkSTU";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
