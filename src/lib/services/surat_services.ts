import supabase from "@/lib/supabase-client";
import { Surat } from "@/lib/type/surat-type";

export const getSuratList = async (): Promise<Surat[]> => {
  const { data, error } = await supabase
    .from('tb_surat_keluar')
    .select(`
      id,
      nomor_urut,
      tanggal_surat,
      nomor_surat,
      uraian,
      created_at
    `)
    .order('created_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Error fetching Surat List:', error);
    return [];
  }

  return data as any[];
};
