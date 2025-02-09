// @ts-nocheck

import { NextPage } from 'next'

interface Props { }

const Page: NextPage<Props> = ({ }) => {
    return (
        <>
            <Card className='col-span-4'>
                <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                        <CardTitle>Progres Nilai Pembangunan</CardTitle>
                        <CardDescription>
                            Menampilkan Progres Penilaian ZI
                        </CardDescription>
                    </div>
                    <div className="flex">
                        {["desktop", "mobile"].map((key) => {
                            const chart = key as keyof typeof chartConfig
                            return (
                                <button
                                    key={chart}
                                    data-active={activeChart === chart}
                                    className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                                    onClick={() => setActiveChart(chart)}
                                >
                                    <span className="text-xs text-muted-foreground">
                                        {chartConfig[chart].label}
                                    </span>
                                    <span className="text-lg font-bold leading-none sm:text-3xl">
                                        {total[key as keyof typeof total].toLocaleString()}
                                    </span>
                                </button>
                            )
                        })}
                    </div>
                </CardHeader>
                <CardContent className="px-2 sm:p-6">
                    <ChartContainer
                        config={chartConfig}
                        className="aspect-auto h-[250px] w-full"
                    >
                        <LineChart
                            data={integritasChartData as any[]}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="date"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                minTickGap={32}
                                tickFormatter={(value) => {
                                    const date = new Date(value)
                                    return date.toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })
                                }}
                            />
                            <ChartTooltip
                                content={
                                    <ChartTooltipContent
                                        className="w-[150px]"
                                        nameKey="views"
                                        labelFormatter={(value) => {
                                            return new Date(value).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric",
                                            })
                                        }}
                                    />
                                }
                            />
                            <Line
                                dataKey={activeChart}
                                type="monotone"
                                stroke={`var(--color-${activeChart})`}
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <SimpleCard title='Dokumen Pendukung' count={count} />
                <SimpleCard title='Standar Operasional Prosedur' count={2} />
                <SimpleCard title='Artikel Kegiatan' count={2} />
                <SimpleCard title='Aplikasi Pelayanan Publik' count={2} />

            </Card>

            {/* Tim ZI */}
            <Card className="col-span-2 w-full">
                <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2">
                        <CardTitle>Tim Zona Integritas</CardTitle>
                        <CardDescription>
                            Menampilkan Anggota Tim Generasi saat ini
                        </CardDescription>
                    </div>
                    <div className="flex">
                        <div
                            className="flex flex-1 flex-col justify-center px-6 py-2 gap-1 border-t text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0"
                        >
                            <span className="text-xs text-muted-foreground">
                                Generasi Tim
                            </span>
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                001
                            </span>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table className='border'>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-left">Nomor Surat</TableHead>
                                <TableHead className="text-left">Perihal</TableHead>
                                <TableHead className="text-left">Tanggal Surat</TableHead>
                                <TableHead className="text-left">Jenis Surat</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {/* {suratList.map((surat) => (
            <TableRow key={surat.id}>
              <TableCell>{surat.nomorSurat}</TableCell>
              <TableCell>{surat.perihal}</TableCell>
              <TableCell>{surat.tanggalSurat}</TableCell>
              <TableCell>{surat.jenisSurat}</TableCell>
            </TableRow>
          ))} */}
                        </TableBody>
                    </Table>
                </CardContent>

            </Card>

            {/* Role Model */}
            <Card className='overflow-hidden'>
                <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
                    <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-2">
                        <CardTitle>Role Model</CardTitle>
                    </div>
                    <button className="flex bg-green-400 text-black">
                        <div
                            className="flex flex-1 flex-col justify-center px-6 py-2 gap-1 border-t text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0"
                        >
                            <span className="text-xs">
                                Generasi Tim
                            </span>
                        </div>
                    </button>
                </CardHeader>
                <CardContent>
                    asd
                </CardContent>

            </Card>

            {/* Menu Pengungkit */}
            <h1 className='col-span-4 text-center text-2xl font-bold mt-5'>Menu Pengungkit</h1>

            <IntegritasUpload title="P1" desc="Manajemen Perubahan" bucketPath="public-data/zi/p1" />
            <IntegritasUpload title="P2" desc="Penataan Tatalaksana" bucketPath="public-data/zi/p2" />
            <IntegritasUpload title="P3" desc="Penataan SDM" bucketPath="public-data/zi/p3" />
            <IntegritasUpload title="P4" desc="Penataan Akuntabilitas" bucketPath="public-data/zi/p4" />
            <IntegritasUpload title="P5" desc="Penataan Pengawasan" bucketPath="public-data/zi/p5" className="col-span-2" />
            <IntegritasUpload title="P6" desc="Penataan Kualitas Layanan" bucketPath="public-data/zi/p6" className="col-span-2" />


            {/* Dialog for generating surat */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Generate Surat</DialogTitle>
                    </DialogHeader>

                    {/* Form Fields for Surat */}
                    <div className="mb-4">
                        <label className="block mb-2">Perihal</label>
                        <input
                            type="text"
                            name="perihal"
                            value={formData.perihal}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Perihal Surat"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Jenis Surat</label>
                        <input
                            type="text"
                            name="jenisSurat"
                            value={formData.jenisSurat}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Jenis Surat"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Kode Unit Kerja</label>
                        <input
                            type="text"
                            name="kodeUnitKerja"
                            value={formData.kodeUnitKerja}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Kode Unit Kerja"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Kode Kategori</label>
                        <input
                            type="text"
                            name="kodeKategori"
                            value={formData.kodeKategori}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                            placeholder="Kode Kategori"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2">Tanggal Surat</label>
                        <input
                            type="date"
                            name="tanggalSurat"
                            value={formData.tanggalSurat}
                            onChange={handleInputChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    {/* Footer buttons */}
                    <DialogFooter>
                        <Button onClick={handleCloseDialog}>Cancel</Button>
                        <Button className="ml-2" onClick={handleGenerateSurat}>
                            Generate
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Page