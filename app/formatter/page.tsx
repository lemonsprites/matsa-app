
import PdfA4Layout from '@/components/pdf/pdf-layout'
import { SuratTugasPDF } from '@/components/pdf/pdf-surat-tugas'

import React from 'react'

const FormatterPage = () => {
    return (
        <div className='bg-black h-full text-white flex items-center justify-center w-screen'>

            <SuratTugasPDF data={{
                nomor: 'B-100/Mts.10.38/KP.00.1/05/2025',
                tanggal: new Date().toISOString().split('T')[0],
                nama: 'Noor Alfath',
                jabatan: 'Operator Keuangan',
                tujuan: 'Dinas Pendidikan',
                keperluan: 'Menghadiri Kegiatan Sosialisasi Peneraptan Tanah Sosial'
            }} />
        </div>
    )
}

export default FormatterPage