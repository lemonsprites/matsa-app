import AppSlot from "@/components/app-slot";
import AdminWrapper from "@/components/layouts/admin/admin-wrapper";
import Toast from "@/components/toast";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import supabase from "@/lib/supabase-client";
import { Kurikulum } from "@/lib/type/pegawai-type";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PegawaiKurikulum = ({ title }: any) => {

    const [kurikulum, setKurikulum] = useState<string>('');
    const [date, setDate] = useState<Date>()
    const [dataKurikulum, setDataKurikulum] = useState<Kurikulum[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false)



    // Fungsi untuk mengambil data dari Supabase
    const fetchCurriculumData = async () => {
        const { data, error } = await supabase
            .from("tb_kurikulum")
            .select("*");

        if (error) {
            console.error("Error fetching data:", error.message);
        } else {
            setDataKurikulum(data || []);
        }
    };

    // Ambil data saat komponen dimuat
    useEffect(() => {
        fetchCurriculumData();
    }, []);

    async function handleSubmit() {
        setDisabled(true);

        const { error } = await supabase
            .from("tb_kurikulum")
            .insert([{ nama_kurikulum: kurikulum, berlaku_mulai: date }])
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

            // Clear the form fields
            setKurikulum("");
            setDate(undefined);

            // Refresh the table data
            await fetchCurriculumData();
        }

        setDisabled(false);
    }


    async function handleChange(id: number, value: boolean) {
        setDisabled(true);

        if (value) {
            // Update all rows to set status to false
            const { error: resetError } = await supabase
                .from("tb_kurikulum")
                .update({ status: false })
                .not("id", "eq", id); // Exclude the current row

            if (resetError) {
                Toast({
                    title: "Matsa App | Error",
                    variant: "error",
                    desc: `Gagal mereset status. ${resetError.message}`,
                });
                setDisabled(false);
                return;
            }
        }

        // Set status for the selected row
        const { error } = await supabase
            .from("tb_kurikulum")
            .update({ status: value })
            .eq("id", id);

        if (error) {
            Toast({
                title: "Matsa App | Error",
                variant: "error",
                desc: `Gagal memperbarui status. ${error.message}`,
            });
        } else {
            // Update local state to reflect changes
            setDataKurikulum((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, status: value } : { ...item, status: false }
                )
            );
            Toast({
                title: "Matsa App | Sukses",
                variant: "success",
                desc: "Status berhasil diperbarui.",
            });
        }

        setDisabled(false);
    }



    return (
        <AppSlot title={title}>
            <AdminWrapper title={title}>
                <Card>
                    <CardHeader>
                        <CardTitle>Tambahkan Data Kurikulum</CardTitle>
                        <CardDescription>Masukan data pada kolom tersedia.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">Nama Kurikulum</Label>
                                    <Input id="name" placeholder="Masukan nama kurikulum" onChange={(e) => setKurikulum(e.target.value)} />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label>Berlaku Mulai</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-[240px] justify-start text-left font-normal",
                                                    !date && "text-muted-foreground"
                                                )}
                                            >
                                                <CalendarIcon />
                                                {date ? format(date, "PPP") : <span>Pilih tanggal mulai</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                onSelect={setDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button className="flex w-full" onClick={handleSubmit} disabled={disabled}>Simpan</Button>
                    </CardFooter>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Daftar Kurikulum</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {dataKurikulum.length > 0 ? (
                            <Table className="w-full table-auto border-collapse border border-gray-300">
                                <TableHeader>
                                    <TableRow className="bg-gray-100">
                                        <TableCell>#</TableCell>
                                        <TableCell>Nama Kurikulum</TableCell>
                                        <TableCell>Mulai Berlaku</TableCell>
                                        <TableCell>Status</TableCell>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {dataKurikulum.map((item, index) => (
                                        <TableRow key={index}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell><Link className="hover:underline" to={`${location.pathname}/${item.id}`}>{item.nama_kurikulum}</Link></TableCell>
                                            <TableCell>{format(new Date(item.berlaku_mulai), "PPP")}</TableCell>
                                            <TableCell>
                                                <Switch
                                                    checked={item.status}
                                                    onCheckedChange={(val) => handleChange(item.id, val)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-gray-600">Belum ada data kurikulum.</p>
                        )}
                    </CardContent>
                </Card>
            </AdminWrapper>
        </AppSlot>
    );
};

export default PegawaiKurikulum;
