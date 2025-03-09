import { createBrowserClient } from "@supabase/ssr";
/**
 * Create Supabase Client untuk Client (CSR)
 */
export function getSupabaseClient() {
    return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );
  }
  