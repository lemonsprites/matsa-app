import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'

interface Props { }

const ManajemenKelasSiswa: NextPage<Props> = ({ }) => {
    return <AdminContent title="Manajemen Kelas Siswa">
        <div>Manajemen Siswa</div>
    </AdminContent>
}

export default ManajemenKelasSiswa