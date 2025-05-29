"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { fetchAPI } from "@/utils/fetcher"
import { useEffect, useState } from "react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
import { Skeleton } from "@/components/ui/skeleton" // 🟢 Tambahkan Skeleton

const chartConfig = {
    pria: {
        label: "Laki-laki",
        color: "hsl(var(--chart-1))",
    },
    wanita: {
        label: "Perempuan",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const PegGender = ({ classVar }: any) => {
    const [pegawaiData, setPegawaiData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadChartData = async () => {
            try {
                const res = await fetchAPI(`${baseUrl}/api/pegawai/jk`);
                setPegawaiData(res.data);
            } catch (error) {
                console.error("Error loading chart data:", error);
            } finally {
                setLoading(false); // Stop loading after fetch
            }
        };
        
        loadChartData();
    }, []);

    if (loading) {
        return (
            <Card className={classVar}>
                <CardHeader className="items-center pb-0">
                    <Skeleton className="w-40 h-6" /> 
                    <Skeleton className="w-60 h-4 mt-2" />
                </CardHeader>
                <CardContent className="flex flex-1 items-center justify-center pb-0">
                    <Skeleton className="w-40 h-40 rounded-full" /> 
                </CardContent>
                <CardFooter className="flex flex-col gap-2 text-sm">
                    <Skeleton className="w-48 h-4" />
                    <Skeleton className="w-36 h-4" />
                </CardFooter>
            </Card>
        )
    }

    const chartData = [
        { pria: pegawaiData[pegawaiData.length - 1].laki_laki, wanita: pegawaiData[pegawaiData.length - 1].perempuan }
    ]

    const percentPria = pegawaiData[pegawaiData.length - 1].laki_laki / (pegawaiData[pegawaiData.length - 1].laki_laki + pegawaiData[pegawaiData.length - 1].perempuan) * 100;
    const percentWanita = pegawaiData[pegawaiData.length - 1].perempuan / (pegawaiData[pegawaiData.length - 1].laki_laki + pegawaiData[pegawaiData.length - 1].perempuan) * 100;

    return (
        <Card className={classVar}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Komposisi <i>Gender</i> Pegawai</CardTitle>
                <CardDescription>Sebaran komposisi <i>gender</i> pegawai.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer config={chartConfig} className="h-[240px] w-full mt-20">
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={100}
                        outerRadius={150}
                        width={500}
                    >
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) - 16}
                                                    className="fill-foreground text-2xl font-bold"
                                                >
                                                    {percentPria.toFixed(1) + "%"} | {percentWanita.toFixed(1) + "%"}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 4}
                                                    className="fill-muted-foreground"
                                                >
                                                    Jenis Kelamin
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                        <RadialBar
                            dataKey="wanita"
                            stackId="a"
                            cornerRadius={5}
                            fill="var(--color-pria)"
                            className="stroke-transparent stroke-2"
                        />
                        <RadialBar
                            dataKey="pria"
                            fill="var(--color-wanita)"
                            stackId="a"
                            cornerRadius={5}
                            className="stroke-transparent stroke-2"
                        />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex text-center gap-2 font-medium leading-none">
                    {percentPria > percentWanita
                        ? `Pria ${(percentPria - percentWanita).toFixed(2)}% lebih banyak.`
                        : `Wanita ${(percentWanita - percentPria).toFixed(2)}% lebih banyak.`}
                </div>
                <div className="leading-none text-muted-foreground text-center">
                    Komposisi pria dan wanita
                </div>
            </CardFooter>
        </Card>
    )
}

export default PegGender
