
import { HttpStatus } from "@/lib/enums/http";
import { createClient } from "@/lib/supabase-server";
import { Tag } from "@/lib/type/tag-type";
import { apiRes } from "@/utils/apiRes";
export const revalidate = 60

// GET request to fetch tags
export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error, status } = await supabase.from("tb_tag").select("*").limit(100);

    if (error) {
      return apiRes(false, null, { code: "FETCH_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return Response.json(data, { status: status });
  } catch (error) {
    return apiRes(false, null, { code: "FETCH_ERROR", message: "An error occurred while fetching tags" }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// POST request to add a tag
export async function POST(req: Request) {
  const { tag }: { tag: string } = await req.json();

  if (!tag) {
    return apiRes(false, null, { code: "VALIDATION_ERROR", message: "Tag is required" }, HttpStatus.BAD_REQUEST);
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tb_tag")
      .insert([{ tag }]).select();

    if (error) {
      return apiRes(false, null, { code: "INSERT_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return Response.json(data, { status: 201 });
  } catch (error) {
    return apiRes(false, null, { code: "INSERT_ERROR", message: "An error occurred while adding the tag" }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// PUT request to edit a tag
export async function PUT(req: Request) {
  const { id, tag }: { id: number; tag: string } = await req.json();

  if (!id || !tag) {
    return apiRes(false, null, { code: "VALIDATION_ERROR", message: "ID and tag are required" }, HttpStatus.BAD_REQUEST);
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tb_tag")
      .update({ tag })
      .match({ id });

    if (error) {
      return apiRes(false, null, { code: "UPDATE_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    return apiRes(false, null, { code: "UPDATE_ERROR", message: "An error occurred while editing the tag" }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

// DELETE request to delete a tag
export async function DELETE(req: Request) {
  const { id }: { id: number } = await req.json();

  if (!id) {
    return apiRes(false, null, { code: "VALIDATION_ERROR", message: "ID is required" }, HttpStatus.BAD_REQUEST);
  }

  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("tb_tag")
      .delete()
      .match({ id });

    if (error) {
      return apiRes(false, null, { code: "DELETE_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return Response.json(data, { status: 200 });
  } catch (error) {
    return apiRes(false, null, { code: "DELETE_ERROR", message: "An error occurred while deleting the tag" }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

