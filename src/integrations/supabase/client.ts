
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://imroqrxslvstzuevxhjv.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imltcm9xcnhzbHZzdHp1ZXZ4aGp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyMDA4NTgsImV4cCI6MjA1Nzc3Njg1OH0.B2vbfZlKGf3MF3UkgiM1ZzNIbcQHniJT6OVWDWPWSDk";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
