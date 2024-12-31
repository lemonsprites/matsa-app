
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NaskahPopup({ isOpen, onClose, onGenerate }: {
    isOpen: boolean,
    onClose: () => void,
    onGenerate: (data: any) => void
}) {
    const [jenisSurat, setJenisSurat] = useState("SK");
    const [urgensi, setUrgensi] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [kodeUnitKerja, setKodeUnitKerja] = useState("");
    const [kodeKategori, setKodeKategori] = useState("");

    const handleGenerate = () => {
        if (!tanggal) {
            alert("Tanggal harus diisi.");
            return;
        }

        const data = {
            jenisSurat,
            urgensi,
            kodeUnitKerja: jenisSurat === "SR" ? kodeUnitKerja : "",
            kodeKategori: jenisSurat === "SR" ? kodeKategori : "",
            tanggal,
        };

        onGenerate(data);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Nomor Surat</DialogTitle>
                </DialogHeader>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Jenis Surat</label>
                        <Select value={jenisSurat} onValueChange={setJenisSurat}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih jenis surat" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="SK">Surat Keputusan</SelectItem>
                                <SelectItem value="SR">Surat Keluar Reguler</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Urgensi</label>
                        <Select value={urgensi} onValueChange={setUrgensi}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Pilih urgensi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">Reguler</SelectItem>
                                <SelectItem value="S">Segera</SelectItem>
                                <SelectItem value="B">Biasa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                        <Input
                            type="date"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                        />
                    </div>

                    {jenisSurat === "SR" && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kode Unit Kerja</label>
                                <Input
                                    type="text"
                                    value={kodeUnitKerja}
                                    onChange={(e) => setKodeUnitKerja(e.target.value)}
                                    placeholder="Masukkan kode unit kerja"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Kode Kategori</label>
                                <Input
                                    type="text"
                                    value={kodeKategori}
                                    onChange={(e) => setKodeKategori(e.target.value)}
                                    placeholder="Masukkan kode kategori"
                                />
                            </div>
                        </>
                    )}
                </div>

                <DialogFooter>
                    <Button variant="secondary" onClick={onClose}>
                        Batal
                    </Button>
                    <Button onClick={handleGenerate}>Generate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
