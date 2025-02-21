import AdminArtikelEdit from '@/components/matsa/admin/admin-artikel-edit'
import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'
import "react-markdown-editor-lite/lib/index.css"


type Props = {
    params: Promise<{ id: string | null }>
}

const TulisPage: NextPage<Props> = async ({ params }: Props) => {
    const id = (await params).id
    console.log(id)
    return (
        <AdminContent title='Edit Artikel'>
            <AdminArtikelEdit param={id} />
        </AdminContent>
    )
}

export default TulisPage