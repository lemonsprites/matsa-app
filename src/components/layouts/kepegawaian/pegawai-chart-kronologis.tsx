import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { fetchAccumulatedPegawaiData } from "@/lib/services/pegawai-services"
import { useEffect, useState } from "react"

const chartConfig = {
    male: {
      label: "Laki-laki",
      color: "hsl(var(--chart-1))",
    },
    female: {
      label: "Perempuan",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig
  


const PegawaiChartKronologis = ({classVar, totalPegawai}:any) => {

    const [pegawaiData, setPegawaiData] = useState<
        { year: string; male: number; female: number }[]
    >([]);

    useEffect(() => {
        const loadChartData = async () => {
            const data = await fetchAccumulatedPegawaiData();
            setPegawaiData(data);
        };
        

        loadChartData();
    }, []);

    return (
        <Card className='col-span-3'>
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Rekapitulasi Pegawai</CardTitle>
                    <CardDescription>
                        Sebaran data jumlah pegawai per Tahun.
                    </CardDescription>
                </div>
                <div className="flex">
                    <button

                        className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"

                    >
                        <span className="text-xs text-muted-foreground">
                            Laki-laki
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {totalPegawai.male}
                        </span>
                    </button>
                    <button

                        className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"

                    >
                        <span className="text-xs text-muted-foreground">
                            Perempuan
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                            {totalPegawai.female}
                        </span>
                    </button>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[150px] w-full"
                >
                    <BarChart accessibilityLayer data={pegawaiData} >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="year"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="male" fill="var(--color-desktop)" radius={4}  />
                        <Bar dataKey="female" fill="var(--color-mobile)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default PegawaiChartKronologis