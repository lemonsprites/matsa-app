import AdminArtikelEdit from '@/components/matsa/admin/admin-artikel-edit'
import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'
import "react-markdown-editor-lite/lib/index.css"

interface Props { }

const TulisPage: NextPage<Props> = ({ }) => {
    return (
        <AdminContent title='Tulis Artikel'>
            <AdminArtikelEdit param={null} mode="write" />
        </AdminContent>
    )
}

export default TulisPage