"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, MoreHorizontal } from 'lucide-react'
import React from 'react'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import EditLaporan from '@/app/(console)/admin/pegawai/(lapkin)/laporan/edit-laporan'

const MoreButton = ({id, initData}:any) => {
    const router = useRouter();

    async function handleDelete(id: string) {
        "use client"
        if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
            fetch(`/api/lap/${id}`, {
                method: "DELETE"
            });
        }
        router.refresh();
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline">
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
                <DropdownMenuItem>
                   <Link href={`/admin/pegawai/laporan/${id}`}>Detail</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(id)}>
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MoreButton