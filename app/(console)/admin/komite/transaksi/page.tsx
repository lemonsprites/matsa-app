import TransaksiBendahara from '@/app/(console)/admin/komite/transaksi/transaksi-konten'
import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return (<AdminContent title="Transaksi Bendahara">
        <TransaksiBendahara />
    </AdminContent>);
}

export default Page