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
import { fetchTingkatPendidikan, PendidikanData } from "@/lib/services/pegawai-services"
import { useEffect, useState } from "react"
import { YAxis } from "recharts"

import { Bar, BarChart, XAxis } from "recharts"

const chartConfig = {
    jumlah: {
        label: "Jumlah Orang",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const PegawaiTkPendidikan = ({classVar}:any) => {
    const [data, setData] = useState<PendidikanData[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const pendidikanData = await fetchTingkatPendidikan();
            setData(pendidikanData);
        };
        loadData();
    }, []);

    console.log(data)


    return (
        <Card className={classVar}>
            <CardHeader>
                <CardTitle>Komposisi Pendidikan Pegawai</CardTitle>
                <CardDescription>Menampilkan sebaran tingkat pendidikan pegawai.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{
                            left: -20,
                        }}
                    >
                        <XAxis type="number" dataKey="jumlah" hide />
                        <YAxis
                            dataKey="tk_pendidikan"
                            type="category"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="jumlah" fill="var(--color-jumlah)" radius={2} />
                    </BarChart>
                </ChartContainer>
            </CardContent>

        </Card>
    )
}

export default PegawaiTkPendidikan