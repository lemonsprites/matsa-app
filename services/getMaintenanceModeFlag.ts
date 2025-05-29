import { createClient } from "@/lib/supabase-server";

export async function getMaintenanceModeFlag() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("web_config")
    .select("web_mode")
    .eq("id", 1)
    .single();

  if (error) throw new Error(error.message);

  // Return the maintenance_mode boolean, default to false if undefined
  return data?.web_mode ?? false;
}