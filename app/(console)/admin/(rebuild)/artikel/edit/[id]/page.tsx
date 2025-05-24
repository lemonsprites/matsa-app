import AdminArtikelEdit from '@/components/matsa/admin/admin-artikel-edit'
import AdminContent from '@/components/matsa/admin/admin-content'
import ArtikelEditor from '@/components/matsa/artikel/artikel-editor'
import { NextPage } from 'next'
import "react-markdown-editor-lite/lib/index.css"


type Props = {
    params: { id: string }
}

const EditPage: NextPage<Props> = async ({ params }: Props) => {
    const id = params.id

    return (
        <AdminContent title='Edit Artikel'>
            <ArtikelEditor param={id} mode="read" />
        </AdminContent>
    )
}

export default EditPage