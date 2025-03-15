import { LaporanParams } from "@/app/api/laporan/laporan-type";
import { createClient } from "@/lib/helper/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";

// ✅ POST: Tambah laporan pegawai
export async function POST(request: Request) {
    const supabase = createClient();

    try {
        const body = await request.json();
        console.log("Received Data:", body); // Debugging

        const { tanggal, kegiatan, pekerjaan, volume, pegawai_id } = body;

        // 🔴 Cek jika ada field yang kosong
        if (!tanggal || !kegiatan || !pekerjaan || !volume || !pegawai_id) {
            return apiRes(false, null, { code: "BAD_REQUEST", message: "Missing fields" }, HttpStatus.BAD_REQUEST);
        }

        // 🔹 Insert ke Supabase
        const { data, error } = await (await supabase)
            .from("tb_laporan_pegawai")
            .insert([{ tanggal, kegiatan, pekerjaan, volume, pegawai_id }]);

        // 🔴 Cek error dari Supabase
        if (error) {
            console.error("Supabase Insert Error:", error);
            return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return apiRes(true, data, null, HttpStatus.CREATED);
    } catch (error) {
        console.error("Server Error:", error);
        return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// ✅ GET: Ambil laporan pegawai berdasarkan sesi pengguna
export async function GET(request: Request, { params }: { params: LaporanParams }) {
    const supabase = createClient();

    try {
        // 🔹 Dapatkan user dari sesi
        const { data: { user }, error: userError } = await (await supabase).auth.getUser();

        // 🔴 Cek jika pengguna tidak login
        if (userError || !user?.id) {
            return apiRes(false, null, { code: "UNAUTHORIZED", message: "Unauthorized" }, HttpStatus.UNAUTHORIZED);
        }

        // 🔹 Ambil data laporan berdasarkan pegawai_id dari sesi
        const { data, error } = await (await supabase)
            .from("tb_laporan_pegawai")
            .select("*")
            .eq("pegawai_id", user.id)
            .order("tanggal", { ascending: false }); // 🔹 Urutkan dari terbaru

        // 🔴 Cek error saat fetching data
        if (error) {
            console.error("Supabase Fetch Error:", error);
            return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return apiRes(true, data, null, HttpStatus.OK);
    } catch (error) {
        console.error("Server Error:", error);
        return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}


export default async function DELETE(request: Request,
    { params }: { params: Promise<{ id: string }> }) {
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

        // Return a success response after deletion
        return apiRes(true, null, null, HttpStatus.INTERNAL_SERVER_ERROR); // or HttpStatus.OK if you want to return a message
    } catch (error) {
        console.error("Server Error:", error);
        return apiRes(false, null, { code: "INTERNAL_SERVER_ERROR", message: "Internal Server Error" }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}