"use client"

import Loader from '@/app/(console)/admin/artikel/edit/[id]/loader'
import AdminArtikelGaleri from '@/components/matsa/admin/admin-artikel-galerry'
import AdminEditor from '@/components/matsa/admin/admin-editor'
import { Label } from '@/components/ui/label'
import { ArtikelProvider, useArtikel } from '@/lib/context/artikel-context'

type Props = {
    param: string | null
}

const AdminArtikelEdit = ({ param }: Props) => {

    return (
        <ArtikelProvider mode="read">

            <div className='pl-2 mx-auto relative'>
                <div className='grid grid-cols-7 gap-4'>
                    <div className='col-span-5'>
                        <div className="">
                            <Label htmlFor="deskripsi">Konten Artikel</Label>
                            <AdminEditor id={param} />

                        </div>
                    </div>
                    <div className='col-span-2 rounded-md truncate'>

                        <AdminArtikelGaleri id={param} />
                    </div>
                </div>
            </div>
        </ArtikelProvider>
    )
}

export default AdminArtikelEdit