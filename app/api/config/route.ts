import { getSupabaseServer } from "@/lib/helper/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";



export async function GET() {
    const supabase = await getSupabaseServer();
    try {
        const { data, error } = await supabase
            .from('web_config')
            .select('web_mode')
            .eq('id', 1)
            .single();

        if (error) {
            throw new Error(`Error fetching data: ${error.message}`);
        }

        return apiRes(true, data, null, HttpStatus.OK);
    } catch (error: Error | any) {
        return apiRes(false, null, { code: "FETCH_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
