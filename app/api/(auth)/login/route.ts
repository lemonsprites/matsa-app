import { getSupabaseServer } from "@/lib/helper/supabase-server";
import { apiRes } from "@/utils/apiRes";
import { NextApiRequest } from "next";


export const POST = async (req: NextApiRequest) => {
    const supabase = (await getSupabaseServer());
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return apiRes(false, null, { code: "AUTH_ERROR", message: error.message }, 401);
  }

  return apiRes(true, data, null, 200);
};
