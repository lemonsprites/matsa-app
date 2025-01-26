import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import supabase from "@/lib/supabase-client";
import AppSlot from "@/components/app-slot";
import AdminWrapper from "@/components/layouts/admin/admin-wrapper";

type BebanKerja = {
  id: number;
  jenisPekerjaan: string;
  durasiJam: number;
  status: boolean;
};

const RUHBebanKerja = ({ title }: any) => {
  const [bebanKerjaList, setBebanKerjaList] = useState<BebanKerja[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentData, setCurrentData] = useState<BebanKerja | null>(null);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from("tb_beban_kerja")
      .select("*");

    if (error) {
      console.error("Error fetching data:", error);
      return;
    }

    setBebanKerjaList(data as BebanKerja[]);
  };

  const handleSave = async () => {
    if (currentData) {
      if (currentData.id) {
        // Update existing record
        const { error } = await supabase
          .from("tb_beban_kerja")
          .update({
            jenisPekerjaan: currentData.jenisPekerjaan,
            durasiJam: currentData.durasiJam,
            status: currentData.status,
          })
          .eq("id", currentData.id);

        if (error) console.error("Error updating data:", error);
      } else {
        // Insert new record
        const { error } = await supabase.from("tb_beban_kerja").insert([
          {
            jenisPekerjaan: currentData.jenisPekerjaan,
            durasiJam: currentData.durasiJam,
            status: currentData.status,
          },
        ]);

        if (error) console.error("Error inserting data:", error);
      }

      fetchData();
      setIsModalOpen(false);
      setCurrentData(null);
    }
  };

  const handleDelete = async (id: number) => {
    const { error } = await supabase
      .from("tb_beban_kerja")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting data:", error);
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppSlot title={title}>
      <AdminWrapper title={title}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">RUH Beban Kerja</h2>
            <Button onClick={() => setIsModalOpen(true)}>Tambah Beban Kerja</Button>
          </div>

          <Table>
            <thead>
              <tr>
                <th>Jenis Pekerjaan</th>
                <th>Durasi (Jam)</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {bebanKerjaList.map((item) => (
                <tr key={item.id}>
                  <td>{item.jenisPekerjaan}</td>
                  <td>{item.durasiJam}</td>
                  <td>{item.status ? "Aktif" : "Non-Aktif"}</td>
                  <td>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentData(item);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      Hapus
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
            <DialogHeader>
              <h3>{currentData?.id ? "Edit Beban Kerja" : "Tambah Beban Kerja"}</h3>
            </DialogHeader>
            <DialogContent>
              <div className="space-y-4">
                <Input
                  aria-label="Jenis Pekerjaan"
                  value={currentData?.jenisPekerjaan || ""}
                  onChange={(e: any) =>
                    setCurrentData((prev) =>
                      prev ? { ...prev, jenisPekerjaan: e.target.value } : null
                    )
                  }
                />
                <Input
                  aria-label="Durasi (Jam)"
                  type="number"
                  value={currentData?.durasiJam || 0}
                  onChange={(e: any) =>
                    setCurrentData((prev) =>
                      prev ? { ...prev, durasiJam: Number(e.target.value) } : null
                    )
                  }
                />
                <Select
                  aria-label="Status"
                  value={currentData?.status ? "true" : "false"}
                  onValueChange={(e: any) =>
                    setCurrentData((prev) =>
                      prev
                        ? { ...prev, status: e.target.value === "true" }
                        : null
                    )
                  }
                >
                  <option value="true">Aktif</option>
                  <option value="false">Non-Aktif</option>
                </Select>
              </div>
            </DialogContent>
            <DialogFooter>
              <Button onClick={handleSave}>Simpan</Button>
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Batal
              </Button>
            </DialogFooter>
          </Dialog>
        </div>
      </AdminWrapper>
    </AppSlot>
  );
};

export default RUHBebanKerja;
