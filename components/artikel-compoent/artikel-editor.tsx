"use client"

import AdminArtikelGaleri from '@/components/matsa/admin/admin-artikel-galerry'
import AdminEditor from '@/components/matsa/admin/admin-editor'
import { Label } from '@/components/ui/label'
import { ArtikelProvider } from '@/lib/context/artikel-context'

type Props = {
    param: string | null
    mode: "read" | "write"
}

const ArtikelEditor = ({ param = null, mode }: Props) => {
    return (
        <ArtikelProvider mode={mode}>
            <main className="mx-auto relative max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
                    <section className="col-span-1 md:col-span-5 w-full">
                        <AdminEditor id={param} />
                    </section>
                    <aside className="col-span-1 md:col-span-2 rounded-md truncate">
                        <AdminArtikelGaleri id={param} />
                    </aside>
                </div>
            </main>
        </ArtikelProvider>
    )
}

export default ArtikelEditor
