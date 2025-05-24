import FormLaporan from "@/app/(console)/admin/pegawai/(lapkin)/laporan/form-laporan";
import MoreButton from "@/app/(console)/admin/pegawai/(lapkin)/laporan/more-button";
import AdminContent from "@/components/matsa/admin/admin-content";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { createClient } from "@/lib/supabase-server";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import Link from "next/link";

const getLaporan = async (userId: string, page: number, limit: number) => {
  const supabase = createClient();
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  const { data, error, count } = await (await supabase)
    .from("tb_laporan_pegawai")
    .select("id, tanggal, kegiatan, pekerjaan, volume", { count: "exact" })
    .eq("pegawai_id", userId)
    .order("tanggal", { ascending: true })
    .range(start, end);

  if (error) {
    console.error("Error fetching laporan data:", error);
    return { data: [], total: 0 };
  }

  return { data, total: count || 0 };
};




const Page = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const supabase = createClient();
  const { data: sessionData, error: userError } = await (await supabase).auth.getUser();

  if (userError || !sessionData?.user) {
    return <p className="text-red-500">Anda harus login untuk melihat data laporan.</p>;
  }

  const limit = 10;
  const currentPage = Number(await searchParams.page) || 1;
  const { data: laporanData, total } = await getLaporan(sessionData.user.id, currentPage, limit);
  const totalPages = Math.ceil(total / limit);




  return (
    <AdminContent title="Laporan Kinerja">
      <div className="grid grid-cols-4 mb-4">
        <div className="col-span-3"></div>
        <FormLaporan />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NO</TableHead>
            <TableHead>TANGGAL</TableHead>
            <TableHead>KEGIATAN</TableHead>
            <TableHead>PEKERJAAN</TableHead>
            <TableHead>VOLUME</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {laporanData.length > 0 ? (
            laporanData.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{(currentPage - 1) * limit + index + 1}</TableCell>
                <TableCell>{item.tanggal}</TableCell>
                <TableCell>{item.kegiatan}</TableCell>
                <TableCell>{item.pekerjaan}</TableCell>
                <TableCell>
                  <div className="grid grid-cols-2 items-center">
                    <span>{item.volume}</span>
                    <MoreButton id={item.id} initData={item} />
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                Tidak ada data laporan.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-4">
        <Button disabled={currentPage <= 1}>
          <Link href={`?page=${currentPage - 1}`}>Sebelumnya</Link>
        </Button>

        <div className="flex items-center space-x-2">
          {[...Array(totalPages)].map((_, i) => (
            <Link key={i + 1} href={`?page=${i + 1}`}>
              <Button variant="outline" className={currentPage === i + 1 ? "bg-gray-200" : ""}>
                {i + 1}
              </Button>
            </Link>
          ))}
        </div>

        <Button disabled={currentPage >= totalPages}>
          <Link href={`?page=${currentPage + 1}`}>Selanjutnya</Link>
        </Button>
      </div>

    </AdminContent>
  );
};

export default Page;