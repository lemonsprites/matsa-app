"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { createClient } from "@/lib/helper/supabase-client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const getLaporan = async (page: number, limit: number) => {
  try {
    const supabase = createClient();
    const { data: sessionData, error: userError } = await supabase.auth.getUser();

    if (userError || !sessionData?.user) {
      console.warn("Pengguna belum login atau sesi tidak valid");
      return { data: [], total: 0 };
    }

    const start = (page - 1) * limit;
    const end = start + limit - 1;

    const { data, error, count } = await supabase
      .from("tb_laporan_pegawai")
      .select("id, tanggal, kegiatan, pekerjaan, volume", { count: "exact" })
      .eq("pegawai_id", sessionData.user.id)
      .order("tanggal", { ascending: true })
      .range(start, end);

    if (error) {
      console.error("Error mengambil data laporan:", error);
      return { data: [], total: 0 };
    }

    return { data, total: count || 0 };
  } catch (error) {
    console.error("Terjadi kesalahan saat fetching laporan:", error);
    return { data: [], total: 0 };
  }
};

const TableLaporan = () => {
  const limit = 10;
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const [laporanData, setLaporanData] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data, total } = await getLaporan(currentPage, limit);
      setLaporanData(data);
      setTotal(total);
    };

    fetchData();
  }, [currentPage]); // ✅ Depend only on the page change

  const totalPages = Math.ceil(total / limit);

 

  return (
    <>
      
    </>
  );
};

export default TableLaporan;
