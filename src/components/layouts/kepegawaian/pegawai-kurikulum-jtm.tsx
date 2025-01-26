import AdminWrapper from "@/components/layouts/admin/admin-wrapper";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import supabase from "@/lib/supabase-client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { Check, ChevronsUpDown } from "lucide-react";

import Toast from "@/components/toast";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import AppSlot from "@/components/app-slot";

const PegawaiKurikulumJTM = ({ title }: any) => {
    const { idKurikulum } = useParams()

    // comboBox State
    const [open, setOpen] = useState(false)
    const [jmlStdJtm, setJmlStdJtm] = useState("")

    // dataValue
    const [dataJTM, setDataJTM] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [mapels, setMapels] = useState<any[]>([])
    const [selectedMapel, setSelectedMapel] = useState()

    // Fetch data mapel
    const fetchMapel = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('tb_mapel')
            .select(`*`);


        if (error) {
            toast.error(`Gagal memuat data Mapel: ${error.message}`);
        } else {
            setMapels(data || []);
        }
        setLoading(false);
    }


    // Fetch data standarisasi JTM
    const fetchJTMData = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("tb_standarisasi_jtm")
            .select(`
                id,
                kurikulum:tb_kurikulum(nama_kurikulum),
                mapel:tb_mapel(nama_mapel),
                jtm
            `).eq('id_kurikulum', idKurikulum);

        if (error) {
            toast.error(`Gagal memuat data JTM: ${error.message}`);
        } else {
            setDataJTM(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchJTMData();
        fetchMapel();
    }, []);

    async function handleSubmit() {
        setLoading(true);
        const { error } = await supabase
            .from("tb_standarisasi_jtm")
            .insert([{ id_kurikulum: idKurikulum, id_mapel: selectedMapel, jtm: jmlStdJtm }])
            .select();

        if (error) {
            Toast({
                title: "Matsa App | Error",
                variant: "error",
                desc: `Pengiriman data gagal. ${error.message}`,
            });
        } else {
            Toast({
                title: "Matsa App | Sukses",
                variant: "success",
                desc: "Pengiriman data berhasil.",
            });

            setDataJTM([]);

            // Refresh the table data
            await fetchJTMData();
        }
        setLoading(false);
    }

    return (
        <AppSlot title={title}>
            <AdminWrapper title={title}>
                <Card>
                    <CardHeader>
                        <CardTitle>Tambahkan Data JTM Standar</CardTitle>
                        <CardDescription>Masukan data pada kolom tersedia.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nama Mapel</Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                role="combobox"
                                                aria-expanded={open}
                                                className="w-full justify-between"
                                            >
                                                {selectedMapel
                                                    ? mapels.find((mapel) => mapel.id === selectedMapel)?.nama_mapel //label
                                                    : "Cari nama mapel..."}
                                                <ChevronsUpDown className="opacity-50" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-full p-0">
                                            <Command>
                                                <CommandInput placeholder="Cari nama mapel..." className="h-9" />
                                                <CommandList>
                                                    <CommandEmpty>Mapel tidak ditemukan.</CommandEmpty>
                                                    <CommandGroup>
                                                        {mapels?.map((mapel) => (
                                                            <CommandItem
                                                                key={mapel.id}
                                                                value={mapel.id}
                                                                onSelect={(currentValue: any) => {
                                                                    setSelectedMapel(currentValue === selectedMapel ? "" : mapel.id)
                                                                    console.log(selectedMapel)
                                                                    setOpen(false)
                                                                }}
                                                            >
                                                                {mapel.nama_mapel}
                                                                <Check
                                                                    className={cn(
                                                                        "ml-auto",
                                                                        selectedMapel === mapel.id ? "opacity-100" : "opacity-0"
                                                                    )}
                                                                />
                                                            </CommandItem>
                                                        ))}
                                                    </CommandGroup>
                                                </CommandList>
                                            </Command>
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Standar JTM</Label>
                                    <Input id="name" placeholder="Masukan jumlah JTM" onChange={(e: any) => setJmlStdJtm(e.target.value)} />
                                </div>

                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button className="flex w-full" onClick={handleSubmit} disabled={loading}>Simpan</Button>
                    </CardFooter>
                </Card>
                <Card className="col-span-2">
                    <CardHeader>
                        <CardTitle>Standarisasi JTM</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-gray-600">Memuat data...</p>
                        ) : dataJTM.length > 0 ? (
                            <Table className="w-full table-auto border-collapse border border-gray-300">
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableCell>#</TableCell>
                                        <TableCell>Kurikulum</TableCell>
                                        <TableCell>Mata Pelajaran</TableCell>
                                        <TableCell>JTM</TableCell>
                                        <TableCell>Aksi</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dataJTM.map((item, index) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>{item.kurikulum?.nama_kurikulum || "-"}</TableCell>
                                            <TableCell>{item.mapel?.nama_mapel || "-"}</TableCell>
                                            <TableCell>{item.jtm}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => toast(`Edit data ID: ${item.id}`)}
                                                >
                                                    Edit
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-gray-600">Belum ada data JTM.</p>
                        )}
                    </CardContent>
                </Card>
            </AdminWrapper>
        </AppSlot>
    );
};

export default PegawaiKurikulumJTM;
