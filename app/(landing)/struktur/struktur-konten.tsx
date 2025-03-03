"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Jabatan {
  jabatan_id: string;
  nama_jabatan: string;
  pegawai?: {
    id: string;
    nama: string;
    foto?: string;
  }[];
  bawahan?: Jabatan[];
}

const StrukturOrganisasi = () => {
  const [data, setData] = useState<Jabatan[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data: jabatanData, error } = await supabase.from("view_struktur_organisasi").select("*");

      if (!error && jabatanData) {
        const mappedData = mapToHierarchy(jabatanData);
        setData(mappedData);
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const mapToHierarchy = (jabatanList: any[]): Jabatan[] => {
    const jabatanMap: Record<string, Jabatan> = {};

    // 1️⃣ Buat semua jabatan di map terlebih dahulu
    jabatanList.forEach(({ jabatan_id, nama_jabatan }) => {
      if (!jabatanMap[jabatan_id]) {
        jabatanMap[jabatan_id] = { jabatan_id, nama_jabatan, pegawai: [], bawahan: [] };
      } else {
        jabatanMap[jabatan_id].nama_jabatan = nama_jabatan;
      }
    });

    // 2️⃣ Hubungkan jabatan dengan atasan dan pegawai
    jabatanList.forEach(({ jabatan_id, jabatan_utama_id, nama_jabatan, pegawai_id, pegawai_nama, pegawai_foto }) => {
      // Perbarui nama jabatan jika masih kosong
      jabatanMap[jabatan_id].nama_jabatan = nama_jabatan;

      // Tambahkan pegawai ke jabatan
      if (pegawai_id) {
        jabatanMap[jabatan_id].pegawai?.push({ id: pegawai_id, nama: pegawai_nama, foto: pegawai_foto });
      }

      // Hubungkan jabatan dengan atasannya
      if (jabatan_utama_id) {
        if (!jabatanMap[jabatan_utama_id]) {
          jabatanMap[jabatan_utama_id] = { jabatan_id: jabatan_utama_id, nama_jabatan: "Jabatan Tidak Diketahui", pegawai: [], bawahan: [] };
        }
        jabatanMap[jabatan_utama_id].bawahan?.push(jabatanMap[jabatan_id]);
      }
    });

    // 3️⃣ Cari root node (jabatan tanpa atasan)
    const rootJabatan = Object.values(jabatanMap).filter(j =>
      jabatanList.some(({ jabatan_id, jabatan_utama_id }) => jabatan_id === j.jabatan_id && jabatan_utama_id === null)
    );

    return rootJabatan;
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold text-center mb-4">Struktur Organisasi</h2>
      {loading ? <Skeleton className="w-full h-32 rounded-lg" /> : <TreeNode jabatan={data[0]} />}
    </div>
  );
};


const TreeNode = ({ jabatan }: { jabatan?: Jabatan }) => {
  if (!jabatan) return null;

  return (
    <div className="flex flex-col items-center relative">
      {/* Kartu Jabatan */}
      <Card className="p-4 mb-4 text-center bg-white shadow-md rounded-lg">
        <p className="text-md font-semibold">{jabatan.nama_jabatan}</p>
        {jabatan.pegawai?.map((pegawai) => (
          <div key={pegawai.id} className="flex items-center gap-2 p-2">
            <Avatar>
              <AvatarImage src={pegawai.foto || "/default-avatar.png"} alt={pegawai.nama} />
              <AvatarFallback>{pegawai.nama.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-xs text-left">{pegawai.nama}</p>
          </div>
        ))}
      </Card>

      {/* Garis & Bawahan */}
      {(jabatan.bawahan?.length ?? 0) > 0 && (
        <div className="flex flex-col items-center">
          <div className="w-1 h-6 bg-gray-400" />
          <div className="flex gap-4">
            {jabatan.bawahan?.map((child) => (
              <div key={child.jabatan_id} className="relative flex flex-col items-center">
                <div className="absolute top-0 h-6 w-1 bg-gray-400" />
                <TreeNode jabatan={child} />
              </div>
            )) ?? []}
          </div>
        </div>
      )}
    </div>
  );
};

export default StrukturOrganisasi;
