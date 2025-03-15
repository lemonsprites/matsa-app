import { createClient } from "@/lib/helper/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";


// GET request to fetch tags
export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("tb_artikel").select("*").limit(100);

    if (error) {
      return apiRes(false, null, { code: "FETCH_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return apiRes(true, data, null, HttpStatus.OK);
  } catch (error: Error | any) {
    return apiRes(false, null, { code: "FETCH_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// POST request to add a tag
export async function POST(req: Request) {
  const { tag }: { tag: string } = await req.json();

  if (!tag) {
    return new Response(
      JSON.stringify({ error: "Tag is required" }),
      { status: 400 }
    );
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tb_tag")
      .insert([{ tag }]).select();

    if (error) {
      return new Response(
        JSON.stringify({ error: "Error adding tag" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while adding the tag" }),
      { status: 500 }
    );
  }
}

// PUT request to edit a tag
export async function PUT(req: Request) {
  const { id, tag }: { id: number; tag: string } = await req.json();

  if (!id || !tag) {
    return new Response(
      JSON.stringify({ error: "ID and tag are required" }),
      { status: 400 }
    );
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tb_tag")
      .update({ tag })
      .match({ id });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Error updating tag" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while editing the tag" }),
      { status: 500 }
    );
  }
}

// DELETE request to delete a tag
export async function DELETE(req: Request) {
  const { id }: { id: number } = await req.json();

  if (!id) {
    return new Response(
      JSON.stringify({ error: "ID is required" }),
      { status: 400 }
    );
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tb_tag")
      .delete()
      .match({ id });

    if (error) {
      return new Response(
        JSON.stringify({ error: "Error deleting tag" }),
        { status: 500 }
      );
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred while deleting the tag" }),
      { status: 500 }
    );
  }
}
