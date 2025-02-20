import AdminArtikelEditor from '@/app/(console)/admin/artikel/edit/[id]/admin-artikel-editor'
import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'
import "react-markdown-editor-lite/lib/index.css"

interface Props { }

const TulisPage: NextPage<Props> = ({ }) => {
    return (
        <AdminContent title='Tulis Artikel'>
            <AdminArtikelEditor />
        </AdminContent>
    )
}

export default TulisPage