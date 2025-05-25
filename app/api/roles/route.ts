import createAdminClient from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = createAdminClient();

    // 1. Fetch profiles
    const { data: Role, error: roleError } = await supabase
        .from('roles')
        .select('*');

    if (roleError) {
        return NextResponse.json({ error: roleError.message }, { status: 500 });
    }



    return NextResponse.json(Role, { status: 200 });
}