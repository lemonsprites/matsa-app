import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Table } from "@/components/ui/table";
import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";

type Pegawai = {
    id: number;
    nama: string;
    jenis_kelamin: "Laki-Laki" | "Perempuan";
    tmt_masuk_satker: string;
    status: boolean;
    tk_pendidikan: string; // Tingkat Pendidikan
};

const PegawaiManajemen = () => {
    const [pegawaiList, setPegawaiList] = useState<Pegawai[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentData, setCurrentData] = useState<Pegawai | null>(null);

    // Fetch data pegawai
    const fetchData = async () => {
        const { data, error } = await supabase
            .from("tb_pegawai")
            .select("*");

        if (error) {
            console.error("Error fetching pegawai data:", error);
            return;
        }

        setPegawaiList(data as Pegawai[]);
    };

    const handleSave = async () => {
        if (currentData) {
            if (currentData.id) {
                // Update existing record
                const { error } = await supabase
                    .from("tb_pegawai")
                    .update({
                        nama: currentData.nama,
                        jenis_kelamin: currentData.jenis_kelamin,
                        tmt_masuk_satker: currentData.tmt_masuk_satker,
                        status: currentData.status,
                        tk_pendidikan: currentData.tk_pendidikan,
                    })
                    .eq("id", currentData.id);

                if (error) console.error("Error updating data:", error);
            } else {
                // Insert new record
                const { error } = await supabase.from("tb_pegawai").insert([
                    {
                        nama: currentData.nama,
                        jenis_kelamin: currentData.jenis_kelamin,
                        tmt_masuk_satker: currentData.tmt_masuk_satker,
                        status: currentData.status,
                        tk_pendidikan: currentData.tk_pendidikan,
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
        const { error } = await supabase.from("tb_pegawai").delete().eq("id", id);

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
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Manajemen Pegawai</h2>
                <Button onClick={() => setIsModalOpen(true)}>Tambah Pegawai</Button>
            </div>

            <Table>
                <thead>
                    <tr>
                        <th>Nama</th>
                        <th>Jenis Kelamin</th>
                        <th>TMT Masuk</th>
                        <th>Status</th>
                        <th>Tingkat Pendidikan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pegawaiList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.nama}</td>
                            <td>{item.jenis_kelamin}</td>
                            <td>{new Date(item.tmt_masuk_satker).toLocaleDateString()}</td>
                            <td>{item.status ? "Aktif" : "Non-Aktif"}</td>
                            <td>{item.tk_pendidikan}</td>
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
                    <h3>{currentData?.id ? "Edit Pegawai" : "Tambah Pegawai"}</h3>
                </DialogHeader>
                <DialogContent>
                    <div className="space-y-4">
                        <Input
                            aria-label="Nama"
                            value={currentData?.nama || ""}
                            onChange={(e: any) =>
                                setCurrentData((prev) =>
                                    prev ? { ...prev, nama: e.target.value } : null
                                )
                            }
                        />
                        <Select
                            aria-label="Jenis Kelamin"
                            value={currentData?.jenis_kelamin || ""}
                            onValueChange={(e: any) =>
                                setCurrentData((prev) =>
                                    prev
                                        ? { ...prev, jenis_kelamin: e.target.value as Pegawai["jenis_kelamin"] }
                                        : null
                                )
                            }
                        >
                            <option value="Laki-Laki">Laki-Laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </Select>
                        <Input
                            aria-label="TMT Masuk"
                            type="date"
                            value={
                                currentData?.tmt_masuk_satker
                                    ? new Date(currentData.tmt_masuk_satker).toISOString().split("T")[0]
                                    : ""
                            }
                            onChange={(e: any) =>
                                setCurrentData((prev) =>
                                    prev ? { ...prev, tmt_masuk_satker: e.target.value } : null
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
                        <Input
                            aria-label="Tingkat Pendidikan"
                            value={currentData?.tk_pendidikan || ""}
                            onChange={(e: any) =>
                                setCurrentData((prev) =>
                                    prev ? { ...prev, tk_pendidikan: e.target.value } : null
                                )
                            }
                        />
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
    );
};

export default PegawaiManajemen;
