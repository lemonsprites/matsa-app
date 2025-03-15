import EditLaporan from '@/app/(console)/admin/pegawai/(lapkin)/laporan/edit-laporan';
import FormLaporan from '@/app/(console)/admin/pegawai/(lapkin)/laporan/edit-laporan'
import { Modal } from '@/components/modal';
import { createClient } from '@/lib/helper/supabase-server';
import React from 'react'

type Props = {
  params: Promise<{ id: string }>
}


export default async function LaporanDetailModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const supabase = createClient();

  const lapID = (await params).id;


  try {
    const { data, error } = await (await supabase)
      .from("tb_laporan_pegawai")
      .select("id, tanggal, kegiatan, pekerjaan, volume", { count: "exact" })
      .eq("id", lapID)

      return <Modal>asdasdasdasddd</Modal>;
  } catch (error) {
    console.error("Error fetching laporan data:", error);
    // return { data: [], total: 0 };
  }
}