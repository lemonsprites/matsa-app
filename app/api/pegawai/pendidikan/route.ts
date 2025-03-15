import { createClient } from "@/lib/helper/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";


export async function GET(req: Request) {
    const supabase = await createClient();
    const { data, error } = await supabase.rpc("get_pegawai_by_pendidikan");

    if (error) {
        return apiRes(false, null, { code: "FETCH_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    } else {
        return apiRes(true, data, null, HttpStatus.OK);
    }
}