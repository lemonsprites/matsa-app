"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import React from 'react'

import { useRouter } from 'next/navigation'

const MoreButton = (id: any) => {
    const router = useRouter();

    async function handleDelete(id: string) {
        "use client"
        if (confirm("Apakah Anda yakin ingin menghapus laporan ini?")) {
            fetch(`/api/laporan/${id}`, {
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
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDelete(id.id)}>
                    Hapus
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default MoreButton