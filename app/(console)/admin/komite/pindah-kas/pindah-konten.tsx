"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

export default function PindahKonten() {
    const [sumberKas, setSumberKas] = useState("");
    const [tujuanKas, setTujuanKas] = useState("");
    const [nominal, setNominal] = useState("");
    const [catatan, setCatatan] = useState("");

    const akunKas = [
        { id: "1101", nama: "Kas Tunai" },
        { id: "1102", nama: "Kas Bank" },
    ];

    useEffect(() => {
        if (sumberKas === tujuanKas) {
            setTujuanKas(prev => (prev === akunKas[0].id ? akunKas[1].id : akunKas[0].id));
        }
    }, [sumberKas, tujuanKas]); // Ensures they are always different



    const handleSubmit = () => {
        if (!sumberKas || !tujuanKas || !nominal) {
            toast({ title: "Error", description: "Harap isi semua kolom!", variant: "destructive" });
            return;
        }

        if (sumberKas === tujuanKas) {
            toast({ title: "Error", description: "Sumber dan tujuan tidak boleh sama!", variant: "destructive" });
            return;
        }

        // Simpan transaksi di database (Supabase/Firebase)
        console.log({ sumberKas, tujuanKas, nominal, catatan });

        toast({ title: "Sukses", description: "Pemindahan kas berhasil!" });

        // Reset form
        setSumberKas("");
        setTujuanKas("");
        setNominal("");
        setCatatan("");
    };

    return (
        <div className="max-w-xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Pemindahan Kas</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Pilih Sumber Kas */}
                        <div>
                            <Label>Sumber Kas</Label>
                            <Select onValueChange={setSumberKas} value={sumberKas}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Sumber Kas" />
                                </SelectTrigger>
                                <SelectContent>
                                    {akunKas.map((akun) => (
                                        <SelectItem key={akun.id} value={akun.id}>
                                            {akun.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Pilih Tujuan Kas */}
                        <div>
                            <Label>Tujuan Kas</Label>
                            <Select onValueChange={setTujuanKas} value={tujuanKas}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih Tujuan Kas" />
                                </SelectTrigger>
                                <SelectContent>
                                    {akunKas.map((akun) => (
                                        <SelectItem key={akun.id} value={akun.id}>
                                            {akun.nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Input Nominal */}
                        <div>
                            <Label>Nominal</Label>
                            <Input type="number" placeholder="Masukkan nominal" value={nominal} onChange={(e) => setNominal(e.target.value)} />
                        </div>

                        {/* Input Catatan */}
                        <div>
                            <Label>Catatan (Opsional)</Label>
                            <Textarea placeholder="Tambahkan catatan (opsional)" value={catatan} onChange={(e) => setCatatan(e.target.value)} />
                        </div>

                        {/* Tombol Submit */}
                        <Button onClick={handleSubmit} className="w-full">
                            Simpan Pemindahan Kas
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
