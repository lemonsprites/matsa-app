
import { createClient } from '@/lib/helper/supabase-server';
import { HttpStatus } from '@/lib/httpEnum';
import { apiRes } from '@/utils/apiRes';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextRequest } from 'next/server';

interface Data {
    params: Promise<{ id: string }>

}

export async function DELETE(request: Request, { params }: Data) {
    const supabase = createClient();
    const { id } = await params;


    try {

        // 🔹 Cek jika id tidak ada
        if (!id) {
            return apiRes(false, null, { code: "BAD_REQUEST", message: "Missing id" }, HttpStatus.BAD_REQUEST);
        }

        // 🔹 Hapus data laporan berdasarkan id
        const { error } = await (await supabase)
            .from("tb_laporan_pegawai")
            .delete()
            .eq("id", id);

        // 🔴 Cek error saat menghapus data
        if (error) {
            console.error("Supabase Delete Error:", error);
            return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return apiRes(true, null, null, HttpStatus.OK);
    } catch (error) {
        console.error("Server Error:", error);
        return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}