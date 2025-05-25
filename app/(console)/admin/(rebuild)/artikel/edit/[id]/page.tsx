import AdminContent from '@/components/matsa/admin/admin-content'
import ArtikelEditor from '@/components/matsa/artikel/artikel-editor'
import "react-markdown-editor-lite/lib/index.css"

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditPage({
  params
}: Props) {
  const { id } = await params || null

  return (
    <AdminContent title='Edit Artikel'>
      <ArtikelEditor param={id} mode="read" />
    </AdminContent>
  )
}
