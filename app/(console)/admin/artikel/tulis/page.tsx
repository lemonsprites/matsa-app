import AdminArtikelTulis from '@/components/matsa/admin/admin-artikel-tulis'
import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'
import "react-markdown-editor-lite/lib/index.css"

interface Props { }

const TulisPage: NextPage<Props> = ({ }) => {
    return (
        <AdminContent title='Tulis Artikel'>
            <AdminArtikelTulis />
        </AdminContent>
    )
}

export default TulisPage