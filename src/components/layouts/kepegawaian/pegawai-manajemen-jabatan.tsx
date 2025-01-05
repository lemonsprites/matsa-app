
// src/pages/pegawai/index.tsx
import { useState, useEffect } from "react";
import supabase from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { PegawaiModalAdd } from "@/components/layouts/block/pegawai-modal-add";
import { PegawaiModalEdit } from "@/components/layouts/block/pegawai-modal-edit";

const PegawaiManajemenJabatan = () => {
  const [pegawai, setPegawai] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchPegawai();
  }, []);

  const fetchPegawai = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("tb_pegawai_jabatan")
      .select(`
      *,
      tb_jabatan(
        jabatan
      ),
      tb_pegawai(
        nama, nip, status
      )
    `);
    if (error) console.error("Error fetching pegawai data:", error);

    console.log(data)

    // Transform the data to flatten it
    const transformedData = data?.map((item: any) => ({
      id: item.id,
      nama: item.tb_pegawai?.nama,
      nip: item.tb_pegawai?.nip,
      jabatan: item.tb_jabatan?.jabatan, // Joining multiple jabatan
      status: item.tb_pegawai?.status ? "Aktif" : "Non-aktif"
    }));
    setPegawai(transformedData || []);
    setLoading(false);
  };

  console.log(pegawai)
  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("tb_pegawai_jabatan").delete().eq("id", id);
    if (error) console.error("Error deleting pegawai:", error);
    fetchPegawai();
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manajemen Pegawai</h1>
        <Button onClick={() => setShowAddModal(true)}>Tambah Pegawai</Button>
      </div>
      <DataTable
        data={pegawai}
        columns={[
          { key: "nama", label: "Nama" },
          { key: "nip", label: "NIP/NIK" },
          { key: "jabatan", label: "Jabatan" },
          { key: "status", label: "Status Aktif", render: (row: any) => (row.active ? "Aktif" : "Non-aktif") },
          {
            key: "actions",
            label: "Aksi",
            render: (row: any) => (
              <div className="flex gap-2">
                <Button variant="secondary" onClick={() => setEditData(row)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(row.id)}>
                  Hapus
                </Button>
              </div>
            ),
          },
        ]}
        loading={loading}
      />
      {showAddModal && (
        <PegawaiModalAdd onClose={() => setShowAddModal(false)} onRefresh={fetchPegawai} />
      )}
      {editData && (
        <PegawaiModalEdit
          data={editData}
          onClose={() => setEditData(null)}
          onRefresh={fetchPegawai}
        />
      )}
    </div>
  );
}

export default PegawaiManajemenJabatan;