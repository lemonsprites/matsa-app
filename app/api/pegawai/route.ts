import { createClient } from "@/lib/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";

export async function GET() {


    const supabase = await createClient();

    let { data: tb_pegawai, error } = await supabase
        .from('tb_pegawai')
        .select('*')


    return apiRes(true, tb_pegawai, null, HttpStatus.OK);
}