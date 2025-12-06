// npm install @supabase/supabase-js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * Boolean flag indicating whether Supabase is properly configured.
 * Returns true only if both VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * are defined and non-empty strings.
 */
export const isSupabaseConfigured =
  typeof supabaseUrl === 'string' &&
  supabaseUrl.length > 0 &&
  typeof supabaseAnonKey === 'string' &&
  supabaseAnonKey.length > 0;

if (!isSupabaseConfigured) {
  console.warn(
    '[Supabase] VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY is not set. ' +
      'Supabase-dependent features will not work until these environment variables are configured.'
  );
}

/**
 * Shared Supabase client instance.
 *
 * In production, this should use real credentials from Vite env variables.
 * During early development, if env vars are not set, it uses placeholder values
 * just to keep the app compiling; network calls will fail at runtime.
 */
export const supabase = createClient(
  supabaseUrl ?? 'https://placeholder.supabase.co',
  supabaseAnonKey ?? 'placeholder_anon_key'
);
