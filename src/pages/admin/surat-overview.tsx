import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { useGetApiGuard } from "@/hooks/use-api-guard"
import { chartConfig, chartData } from "@/lib/metadata/surat-chart"
import { getSuratList } from "@/lib/services/surat_services"
import { Surat } from "@/lib/type/surat-type"
import { PlusCircleIcon, TrendingUp } from "lucide-react"
import * as React from "react"
import { useEffect, useState } from "react"
import { Label, Pie, PieChart } from "recharts"


const SuratOverview = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [suratList, setSuratList] = useState<Surat[]>([])
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
    }, [])

    const { fetchData, isLoading } = useGetApiGuard({
        key: 'tb_integritas_evidence_count',
        query: getSuratList,
    });

    useEffect(() => {
        const handleFetch = async () => {
            if (isLoading) {
                // Don't call fetchData if the query is already loading
                return;
            }

            try {
                const res = await fetchData(); // Fetch data
                if (res) {
                    setSuratList(res); // Update state only if data exists
                }
            } catch (err) {
                console.error('Error fetching evidence count:', err);
                // Handle error (optionally set an error state to display)
            }
        };

        handleFetch();
    }, [getSuratList]);




    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleGenerateSurat = async () => {
        try {
            // Generate nomorSurat using the generateNomorSurat function
            // const generatedNomorSurat = await generateNomorSurat({
            //   jenisSurat: formData.jenisSurat,
            //   kodeUnitKerja: formData.kodeUnitKerja,
            //   kodeKategori: formData.kodeKategori,
            //   tanggal: formData.tanggalSurat,
            // });

            // if (!generatedNomorSurat) {
            //   throw new Error("Failed to generate nomor surat.");
            // }

            // // Insert data into Supabase table (assuming your table is called 'tb_surat')
            // const { data, error } = await supabase
            //   .from('tb_surat')
            //   .insert([
            //     {
            //       nomorSurat: generatedNomorSurat,
            //       perihal: formData.perihal,
            //       tanggalSurat: formData.tanggalSurat,
            //       jenisSurat: formData.jenisSurat,
            //     },
            //   ]);

            // if (error) {
            //   throw error; // If there's an error, throw it
            // }



            // Close the dialog if data is successfully inserted
            handleCloseDialog();
            // console.log('Surat generated successfully!', data);

            // Optionally, you can refresh the surat list or show a success message

        } catch (error: any) {
            console.error('Error creating surat:', error.message);
        }
    };

    return (
        <div className="matsa-grid">
            <div className="flex justify-between items-center col-span-4">
                <h2 className="text-2xl font-semibold mb-4 ">Surat dan Manajemen Naskah</h2>
                <Button onClick={() => setIsDialogOpen(true)} ><PlusCircleIcon /> <span>Generate Surat</span></Button>
            </div>

            <Card className="flex flex-col">

                <CardHeader className="items-center pb-0">
                    <CardTitle>Rekapitulasi Surat Keluar</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfig}
                        className="mx-auto aspect-square max-h-[250px]"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey="visitors"
                                nameKey="browser"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalVisitors.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Visitors
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                </CardFooter>
            </Card>

            {/* Tim ZI */}
            <Card className="col-span-3 w-full">
                <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2">
                        <CardTitle>Daftar Surat Keluar</CardTitle>
                        <CardDescription>
                            Menampilkan daftar surat Keluar Satuan Kerja
                        </CardDescription>
                    </div>
                    <div className="flex">
                        <div
                            className="flex flex-1 flex-col justify-center px-6 py-2 gap-1 border-t text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0"
                        >
                            <span className="text-xs text-muted-foreground">
                                Nomor Akhir
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                001
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="px-0">
                    <div className="overflow-x-auto">
                        <Table className="min-w-full table-auto border-collapse">
                            {/* Table Header */}
                            <TableHeader>
                                <TableRow className="bg-accent  text-xs">
                                    <TableHead className="px-4 py-2 text-left">Nomor Urut</TableHead>
                                    <TableHead className="px-4 py-2 text-left">Tanggal Surat</TableHead>
                                    <TableHead className="px-4 py-2 text-left">Nomor Surat</TableHead>
                                    <TableHead className="px-4 py-2 text-left">Uraian</TableHead>
                                    <TableHead className="px-4 py-2 text-left">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>

                            {/* Table Body */}
                            <TableBody>
                                {suratList.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="px-4 py-2">{String(Number(item.nomor_urut)).padStart(3, '0')}</td>
                                        <td className="px-4 py-2">{item.tanggal_surat}</td>
                                        <td className="px-4 py-2">{item.nomor_surat}</td>
                                        <td className="px-4 py-2">{item.uraian}</td>
                                    </tr>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>

            </Card>

            {/* Dialog for generating surat */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="w-full max-w-lg h-auto sm:max-w-xl md:max-w-2xl grid grid-cols-2">
                    <DialogHeader className="col-span-2">
                        <DialogTitle>Generate Surat</DialogTitle>
                    </DialogHeader>

                    <div className="col-span-2">
                        <label className="block mb-2">Nomor Surat</label>
                        <Input readOnly
                            type="text"
                            name="perihal"
                            // value={formData.perihal}
                            // onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Generated Nomor Surat"
                        />
                    </div>


                    <div>
                        <label className="block mb-2">Unit Kerja</label>
                        <Input
                            type="text"
                            name="perihal"
                            // value={formData.perihal}
                            // onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Perihal Surat"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Sifat Surat</label>
                        <Input
                            type="text"
                            name="jenisSurat"
                            // value={formData.jenisSurat}
                            // onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Jenis Surat"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Kodefikasi Surat</label>
                        <Input
                            type="text"
                            name="kodeUnitKerja"
                            // value={formData.kodeUnitKerja}
                            // onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Kode Unit Kerja"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Sub-Kodefikasi Surat</label>
                        <Input
                            type="text"
                            name="kodeKategori"
                            // value={formData.kodeKategori}
                            // onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Kode Kategori"
                        />
                    </div>
                    <Separator className="col-span-2" />
                    <div className="mb-2">
                        <label className="block mb-2">Tanggal Surat</label>
                        <Input
                            type="date"
                            name="tanggalSurat"
                            // value={formData.tanggalSurat}
                            // onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-2">
                        <label className="block mb-2">Sifat Surat</label>
                        <Select>
                            <SelectTrigger >
                                <SelectValue placeholder="Pilih sifat surat atau kosongkan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Sifat Surat</SelectLabel>
                                    <SelectItem value="B">Biasa</SelectItem>
                                    <SelectItem value="S">Segera</SelectItem>
                                    <SelectItem value="P">Penting</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full gap-1.5 col-span-2">
                        <label className="block mb-2">Keterangan atau Uraian Surat</label>
                        <Textarea placeholder="Masukan keterangan atau uraian surat." id="message" />
                    </div>


                    <DialogFooter className="col-span-2">
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button className="ml-2" onClick={handleGenerateSurat}>
                            Generate
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default SuratOverview;
