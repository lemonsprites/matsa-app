import Toast from '@/components/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import supabase from '@/lib/supabase-client';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from "sonner"

const PegawaiManajemenMapel = () => {
    const [gurus, setGurus] = useState<any[]>([]);
    const [mapels, setMapels] = useState<any[]>([]);
    const [assignments, setAssignments] = useState<any[]>([]);
    const [selectedGuru, setSelectedGuru] = useState<any | null>(null);
    const [selectedMapel, setSelectedMapel] = useState<any | null>(null);
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [tugasBtn, setTugasBtn] = useState(true);
    const [modeView, setModeView] = useState(2)

    useEffect(() => {
        // Fetch Guru and Mapel data from Supabase
        async function fetchData() {
            const { data: guruData } = await supabase.from('tb_pegawai').select('*');
            const { data: mapelData } = await supabase.from('tb_mapel').select('*');

            setGurus(guruData || []);
            setMapels(mapelData || []);
        }

        fetchData();

        if (modeView === 1) {
            fetchAssignmentsByMapel();
        } else if (modeView === 2) {
            fetchAssignmentsByGuru();
        }
    }, [modeView]);

    const fetchAssignmentsByMapel = async () => {
        const { data } = await supabase
            .from('tb_pegawai_mapel')
            .select('*, tb_pegawai(id,nama), tb_mapel(nama_mapel)');

        const groupedAssignments = (data || []).reduce((acc: any, curr: any) => {
            if (curr.tb_pegawai && curr.tb_mapel) {
                if (!acc[curr.tb_pegawai.id]) {
                    acc[curr.tb_pegawai.id] = {
                        id: curr.tb_pegawai.id,
                        nama: curr.tb_pegawai.nama,
                        mapels: [],
                    };
                }
                acc[curr.tb_pegawai.id].mapels.push({
                    id: curr.id,
                    nama_mapel: curr.tb_mapel.nama_mapel,
                });
            }
            return acc;
        }, {});

        setAssignments(Object.values(groupedAssignments));
    };

    const fetchAssignmentsByGuru = async () => {
        const { data } = await supabase
            .from('tb_pegawai_mapel')
            .select('*, tb_pegawai(id,nama), tb_mapel(id,nama_mapel)');

        const groupedAssignments = (data || []).reduce((acc: any, curr: any) => {
            if (curr.tb_pegawai && curr.tb_mapel) {
                if (!acc[curr.tb_mapel.id]) {
                    acc[curr.tb_mapel.id] = {
                        id: curr.tb_mapel.id,
                        nama: curr.tb_mapel.nama_mapel,
                        pegawai: [],
                    };
                }
                acc[curr.tb_mapel.id].pegawai.push({
                    id: curr.id,
                    nama: curr.tb_pegawai.nama,
                });
            }
            return acc;
        }, {});

        setAssignments(Object.values(groupedAssignments));
        console.log(assignments)
    };

    const handleAssignGuru = async () => {
        setTugasBtn(false)
        if (!selectedGuru || !selectedMapel) {
            toast.warning(
                "Matsa App | Peringatan",
                {
                    description: "Silakan pilih guru dan mata pelajaran terlebih dahulu",
                }
            )
            return;
        }

        const { error } = await supabase
            .from('tb_pegawai_mapel')
            .insert([{ pegawai_id: selectedGuru, mapel_id: selectedMapel }]);

        if (error) {
            toast.error(
                "Matsa App | Query Error",
                {
                    description: `${error}`,
                })
        } else {
            Toast({ variant: 'success', title: "Matsa App | Query Success", desc: `Guru berhasil ditugaskan pada mata pelajaran.` });
            // toast(
            //     "Matsa App | Query Success",
            //     {
            //         description: `Guru berhasil ditugaskan pada mata pelajaran.`,
            //     })
            (modeView === 1) ? fetchAssignmentsByMapel() : fetchAssignmentsByGuru();
            setTugasBtn(true)
        }
    };

    const handleDelete = async (id: number) => {
        const { error } = await supabase.from('tb_pegawai_mapel').delete().eq('id', id);

        if (error) {
            console.error('Error deleting assignment:', error);
        } else {
            alert('Penugasan berhasil dihapus');
            (modeView === 1) ? fetchAssignmentsByMapel() : fetchAssignmentsByGuru();
        }
    };

    const handleDeleteMapelPegawai = async (id: number) => {
        const { error } = await supabase.from('tb_pegawai_mapel').delete().eq('pegawai_id', id);

        if (error) {
            console.error('Error deleting assignment:', error);
        } else {
            alert('Penugasan berhasil dihapus');
            (modeView === 1) ? fetchAssignmentsByMapel() : fetchAssignmentsByGuru();
        }
    };

    return (
        <>
            <Card>
                <CardContent>
                    <div className="p-6 space-y-6">
                        <h1 className="text-xl font-semibold">Penugasan Guru ke Mata Pelajaran</h1>

                        {/* Dropdown for selecting Guru */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium">Pilih Guru</label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-[200px] justify-between"
                                        >
                                            {selectedGuru
                                                ? gurus.find((guru) => guru.id === selectedGuru)?.nama
                                                : "Cari nama guru..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari nama guru..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>Guru tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    {gurus?.map((guru) => (
                                                        <CommandItem
                                                            key={guru.id}
                                                            value={guru.id}
                                                            onSelect={(currentValue) => {
                                                                setSelectedGuru(currentValue === selectedGuru ? "" : guru.id)
                                                                console.log(selectedGuru, selectedMapel)
                                                                setOpen(false)
                                                            }}
                                                        >
                                                            {guru.nama}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    selectedGuru === guru.id ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {/* <Select value={selectedGuru} onValueChange={(val) => setSelectedGuru(val)}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Pilih Guru" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {gurus.map((guru) => (
                                            <SelectItem key={guru.id} value={guru.id}>
                                                {guru.nama}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select> */}
                            </div>

                            {/* Dropdown for selecting Mata Pelajaran */}
                            <div>
                                <label className="block text-sm font-medium">Pilih Mata Pelajaran</label>
                                <Popover open={open2} onOpenChange={setOpen2}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open2}
                                            className="w-[200px] justify-between"
                                        >
                                            {selectedMapel
                                                ? mapels.find((mapel) => mapel.id === selectedMapel)?.nama_mapel //label
                                                : "Cari nama mapel..."}
                                            <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[200px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Cari nama mapel..." className="h-9" />
                                            <CommandList>
                                                <CommandEmpty>Mapel tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    {mapels?.map((mapel) => (
                                                        <CommandItem
                                                            key={mapel.id}
                                                            value={mapel.id}
                                                            onSelect={(currentValue) => {
                                                                setSelectedMapel(currentValue === selectedMapel ? "" : mapel.id)
                                                                console.log(selectedMapel, selectedGuru)
                                                                setOpen2(false)
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
                                {/* <Select value={selectedMapel} onValueChange={(val) => setSelectedMapel(val)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih Mata Pelajaran" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {mapels.map((mapel) => (
                                            <SelectItem key={mapel.id} value={mapel.id}>
                                                {mapel.nama_mapel}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select> */}
                            </div>

                            <Button onClick={handleAssignGuru} disabled={!tugasBtn}>Tugaskan Guru</Button>
                        </div>

                        {/* Static Table for Assignments */}
                        <Select onValueChange={(val) => {
                            setModeView(parseInt(val))
                            console.log(modeView);
                        }}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Pilih Mode View " />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Mode View</SelectLabel>
                                    <SelectItem value="1">Menurut Guru</SelectItem>
                                    <SelectItem value="2">Menurut Mapel</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Table */}
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {modeView === 1 ? (
                                        <>
                                            <TableHead>Guru</TableHead>
                                            <TableHead>Mata Pelajaran</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </>
                                    ) : (
                                        <>
                                            <TableHead>Mata Pelajaran</TableHead>
                                            <TableHead>Guru</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </>
                                    )}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignments.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">
                                            Tidak ada data untuk ditampilkan.
                                        </TableCell>
                                    </TableRow>
                                ) : modeView === 1 ? (
                                    assignments?.map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.nama}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    {row.mapels?.map((mapel: any) => (
                                                        <Badge
                                                            key={mapel.id}
                                                            onClick={() => handleDelete(mapel.id)}
                                                        >
                                                            {mapel.nama_mapel}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    color="destructive"
                                                    onClick={() => handleDeleteMapelPegawai(row.id)}
                                                >
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    assignments?.map((row: any) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.nama}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    {row.pegawai?.map((pg: any) => (
                                                        <Badge key={pg.id} onClick={() => handleDelete(pg.id)}>
                                                            {pg.nama}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    color="destructive"
                                                    onClick={() => handleDeleteMapelPegawai(row.id)}
                                                >
                                                    Hapus
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>



                        {/* <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Guru</TableHead>
                                    <TableHead>Mata Pelajaran</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assignments.map((row: any) => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.nama}</TableCell>
                                        <TableCell>
                                            <div className="flex space-x-2">
                                                {row.mapels.map((mapel: any) => (
                                                    <Badge key={mapel.id} onClick={() => handleDelete(mapel.id)}>
                                                        {mapel.nama_mapel}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outline"
                                                color="destructive"
                                                onClick={() => {
                                                    console.log(row)
                                                    handleDeleteMapelPegawai(row.id)
                                                }}
                                            >
                                                Hapus
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table> */}
                    </div>
                </CardContent>
            </Card>
        </>
    );
}

export default PegawaiManajemenMapel;