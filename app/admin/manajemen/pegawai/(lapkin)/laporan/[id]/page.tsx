import EditLaporan from '@/app/(console)/admin/pegawai/(lapkin)/laporan/edit-laporan';
import { Modal } from '@/components/modal';
import { createClient } from '@/lib/supabase-server';
import { NextPage } from 'next';

interface Props {
    params: Promise<{ id: string }>
}

const LaporanDetail: NextPage<Props> = async ({ params }) => {
    const supabase = createClient();

    const lapID = (await params).id;
  
  
    try {
      const { data, error } = await (await supabase)
        .from("tb_laporan_pegawai")
        .select("id, tanggal, kegiatan, pekerjaan, volume", { count: "exact" })
        .eq("id", lapID)
  
        return <EditLaporan initialData={data} />;
    } catch (error) {
      console.error("Error fetching laporan data:", error);
      // return { data: [], total: 0 };
    }
}

export default LaporanDetail