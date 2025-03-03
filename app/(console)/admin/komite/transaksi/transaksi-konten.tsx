"use client"
import { Plus, Edit, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import AdminContent from "@/components/matsa/admin/admin-content";
import React from "react";

const transaksiDummy: any[] = [
    { id: 1, kode: "TRX001", tanggal: "2025-02-25", keterangan: "Setoran Tabungan", jumlah: 50000, status: "Final" },
    { id: 2, kode: "TRX002", tanggal: "2025-02-26", keterangan: "Pembayaran SPP", jumlah: 150000, status: "Draft" },
];

export default function TransaksiBendahara() {
    const [transaksi, setTransaksi] = React.useState(transaksiDummy);
    const [open, setOpen] = React.useState(false);
    const [form, setForm] = React.useState({ kode: "", tanggal: "", keterangan: "", jumlah: "" });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = () => {
        setTransaksi([...transaksi, { ...form, id: transaksi.length + 1, status: "Draft" }]);
        setOpen(false);
    };


    return (

        <div className="p-6">

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Kode</TableHead>
                        <TableHead>Tanggal</TableHead>
                        <TableHead>Keterangan</TableHead>
                        <TableHead>Jumlah</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {transaksi.map((trx) => (
                        <TableRow key={trx.id}>
                            <TableCell>{trx.kode}</TableCell>
                            <TableCell>{trx.tanggal}</TableCell>
                            <TableCell>{trx.keterangan}</TableCell>
                            <TableCell>{trx.jumlah}</TableCell>
                            <TableCell>{trx.status}</TableCell>
                            <td>
                                <Button variant="outline" size="sm" className="mr-2" onClick={(e) => { setOpen(true) }}>
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="destructive" size="sm">
                                    <Trash className="w-4 h-4" />
                                </Button>
                            </td>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Tambah Transaksi</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Input name="kode" placeholder="Kode" onChange={handleInputChange} />
                        <Input name="tanggal" type="date" onChange={handleInputChange} />
                        <Input name="keterangan" placeholder="Keterangan" onChange={handleInputChange} />
                        <Input name="jumlah" type="number" placeholder="Jumlah" onChange={handleInputChange} />
                        <Button onClick={handleSubmit}>Simpan</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}