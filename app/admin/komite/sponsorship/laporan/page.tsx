import LaporanKeuangan from '@/app/(console)/admin/komite/laporan/laporan-keuangan'
import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return <AdminContent title="Laporan Keuangan">
        <LaporanKeuangan />
    </AdminContent>
}

export default Page