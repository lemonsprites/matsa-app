import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import supabase from '@/lib/supabase-client';
import React, { useState } from 'react';
import { generateNomorSurat } from '@/lib/generate-number';  // Assuming generateNomorSurat is in a separate file
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';
import SimpleCard from '@/components/simple-card';

const chartData: any[] = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const IntegritasIkhtisar = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop")
  const [formData, setFormData] = useState({
    nomorSurat: '',
    perihal: '',
    tanggalSurat: '',
    jenisSurat: '',
    kodeUnitKerja: '',
    kodeKategori: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateSurat = async () => {
    try {
      // Generate nomorSurat using the generateNomorSurat function
      const generatedNomorSurat = await generateNomorSurat({
        jenisSurat: formData.jenisSurat,
        kodeUnitKerja: formData.kodeUnitKerja,
        kodeKategori: formData.kodeKategori,
        tanggal: formData.tanggalSurat,
      });

      if (!generatedNomorSurat) {
        throw new Error("Failed to generate nomor surat.");
      }

      // Insert data into Supabase table (assuming your table is called 'tb_surat')
      const { data, error } = await supabase
        .from('tb_surat')
        .insert([
          {
            nomorSurat: generatedNomorSurat,
            perihal: formData.perihal,
            tanggalSurat: formData.tanggalSurat,
            jenisSurat: formData.jenisSurat,
          },
        ]);

      if (error) {
        throw error; // If there's an error, throw it
      }

      // Close the dialog if data is successfully inserted
      handleCloseDialog();
      console.log('Surat generated successfully!', data);

      // Optionally, you can refresh the surat list or show a success message

    } catch (error: any) {
      console.error('Error creating surat:', error.message);
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };


  const chartConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Pengungkit",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Pelaksanaan",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <div className="matsa-grid">
      <h2 className="text-2xl font-semibold mb-4 col-span-4">Ikhtisar Integritas</h2>

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
              data={chartData as any[]}
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
        <SimpleCard title='Dokumen Pendukung' count={2} />
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
    </div>
  );
};

export default IntegritasIkhtisar;
