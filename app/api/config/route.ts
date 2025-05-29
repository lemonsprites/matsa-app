import { createClient } from "@/lib/supabase-client";  // Supabase client
import { HttpStatus } from "@/lib/enums/http";  // HTTP status codes
import { NextResponse } from "next/server";  // NextResponse for API responses
import { DateTime } from "luxon";

// Handler for GET request
export async function GET() {
  const supabase = await createClient(); // Create the Supabase client

  try {
    // Fetch data from Supabase
    const { data, error } = await supabase
      .from("web_config")
      .select("web_mode")
      .eq("id", 1)
      .single();

    // If there's an error fetching the data
    if (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }

    // Return success response with status 200
    return NextResponse.json(
      {
        success: true,
        data: data,
        error: null,
        status: HttpStatus.OK,
      },
      { status: HttpStatus.OK }
    );
  } catch (error: any) {
    // Return error response with status 500
    return NextResponse.json(
      {
        success: false,
        data: null,
        error: { code: "FETCH_ERROR", message: error.message },
        status: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}


export async function POST(req: Request) {
  const body = await req.json();
  const supabase = await createClient();

  const jakartaTime = DateTime.now().setZone("Asia/Jakarta").toISO();
  const { data, error } = await supabase
    .from('web_config')
    .update({
      web_mode: (body.maintenanceMode) ? 1 : 0,
      updated_at: jakartaTime,
      // site_title: body.siteTitle,
      // site_description: body.siteDescription,
    })
    .eq('id', 1)
    .single();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}