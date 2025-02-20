import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

interface Props {
  params: { id: string }
}

const DeleteArtikelPage = async ({ params }: Props) => {
  const supabase = createClient()

  // Delete article
  const { error } = await (await supabase)
    .from("tb_artikel")
    .delete()
    .eq("id", params.id)

  if (error) {
    console.error("Error deleting article:", error)
    return <div>Failed to delete the article. Please try again later.</div>
  }

  redirect("/admin/artikel/daftar") // Redirect after deletion
}

export default DeleteArtikelPage
