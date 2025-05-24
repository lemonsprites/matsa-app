import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

interface Props {
  params: Promise<{ id: string | null }>
}

const DeleteArtikelPage = async ({ params }: Props) => {
  const supabase = createClient()
  const id = (await params).id

  // Delete article
  const { error } = await (await supabase)
    .from("tb_artikel")
    .delete()
    .eq("id", id)

  if (error) {
    console.error("Error deleting article:", error)
    return <div>Failed to delete the article. Please try again later.</div>
  }

  redirect("/admin/artikel/daftar") // Redirect after deletion
}

export default DeleteArtikelPage
