import { createClient } from "@/lib/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";
import { NextResponse } from "next/server";

export async function GET() {


    const supabase = await createClient();

    let { data: tb_pegawai, error } = await supabase
        .from('tb_pegawai')
        .select('*')


    return NextResponse.json(tb_pegawai, { status: 200 });
}