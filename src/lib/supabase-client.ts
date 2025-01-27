import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

let isRequestDisabled = false;

// Function to toggle request control
export const setRequestDisabled = (disabled: boolean) => {
  isRequestDisabled = disabled;
};

// Wrapper for Supabase `createClient`
export const createSupabaseClient = (): SupabaseClient => {
  const client = createClient(supabaseUrl, supabaseKey);

  // Proxy to intercept client calls
  return new Proxy(client, {
    get(target, prop) {
      // If requests are disabled, return a mock response
      if (isRequestDisabled) {
        console.warn(`Requests are disabled. Supabase method "${String(prop)}" is intercepted.`);
        return async () => ({
          data: null, // Mock data
          error: { message: "Requests are currently disabled." },
        });
      }

      // Return the original property or method if requests are enabled
      return target[prop as keyof typeof target];
    },
  });
};

// Export the overridden Supabase client
const supabase = createSupabaseClient();

export default supabase;
