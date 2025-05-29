import { createClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {


    const supabase = await createClient();

    let { count, error } = await supabase
        .from('pegawai')
        .select('*', { count: 'exact', head: true });


    return NextResponse.json(count, { status: 200 });
}
