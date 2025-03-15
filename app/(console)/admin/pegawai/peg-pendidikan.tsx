"use client"
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
import { fetchAPI } from "@/utils/fetcher"
import { useEffect, useState } from "react"
import { YAxis, Bar, BarChart, XAxis } from "recharts"
import { Skeleton } from "@/components/ui/skeleton" // 🟢 Tambahkan Skeleton

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

const PegPendidikan = ({ classVar }: any) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const pendidikanData = await fetchAPI('/api/pegawai/pendidikan');
                setData(pendidikanData.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    if (loading) {
        return (
            <Card className={classVar}>
                <CardHeader>
                    <Skeleton className="w-48 h-6" />
                    <Skeleton className="w-64 h-4 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="w-full h-[300px]" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className={classVar}>
            <CardHeader>
                <CardTitle>Komposisi Pendidikan Pegawai</CardTitle>
                <CardDescription>Menampilkan sebaran tingkat pendidikan pegawai.</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px] w-full">
                    <BarChart
                        accessibilityLayer
                        data={data}
                        layout="vertical"
                        margin={{ left: -20 }}
                    >
                        <XAxis type="number" dataKey="jumlah_pegawai" hide />
                        <YAxis
                            dataKey="pendidikan"
                            type="category"
                            tickLine={false}
                            tickMargin={5}
                            axisLine={false}
                        />
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Bar dataKey="jumlah_pegawai" fill="var(--color-jumlah)" radius={2} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}

export default PegPendidikan
