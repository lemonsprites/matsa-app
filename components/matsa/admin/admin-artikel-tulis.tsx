"use client"

import AdminArtikelGaleri from '@/components/matsa/admin/admin-artikel-galerry'
import AdminEditor from '@/components/matsa/admin/admin-editor'
import { Label } from '@/components/ui/label'
import { ArtikelProvider } from '@/lib/context/artikel-context'

const AdminArtikelTulis = () => {
    return (

        <ArtikelProvider>
            <div className='h-[100vh] overflow-hidden pl-2 mx-auto'>
                <div className='grid grid-cols-7 gap-4 h-full'>
                    <div className='col-span-5'>
                        <div className="h-full">
                            <Label htmlFor="deskripsi">Konten Artikel</Label>
                            <AdminEditor />

                        </div>
                    </div>
                    <div className='col-span-2 rounded-md truncate'>

                        <AdminArtikelGaleri />
                    </div>
                </div>
            </div>
        </ArtikelProvider>

    )
}

export default AdminArtikelTulis