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
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
// import { chartConfig } from "@/lib/metadata/surat-chart"
import { Label, Pie, PieChart } from "recharts"

import {
    ChartConfig
} from "@/components/ui/chart"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { fetchAPI } from "@/utils/fetcher"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";



async function getPegawaiCount() {
    return fetchAPI(`${baseUrl}/api/pegawai?count=true`);
}

async function getPegawaiJenis() {
    return fetchAPI(`${baseUrl}/api/pegawai?jenis=true`);
}


export const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    chrome: {
        label: "Chrome",
        color: "hsl(var(--chart-1))",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
    firefox: {
        label: "Firefox",
        color: "hsl(var(--chart-3))",
    },
    edge: {
        label: "Edge",
        color: "hsl(var(--chart-4))",
    },
    other: {
        label: "Other",
        color: "hsl(var(--chart-5))",
    },
} satisfies ChartConfig


export const chartData = [
    { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
    { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
    { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
    { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

const PegSebaran = () => {
    // 🟢 State untuk menyimpan data pegawai & status loading
    const [pegawaiJenis, setPegawaiJenis] = useState([]);
    const [pegawaiCount, setPegawaiCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true); // 🔹 Tambahkan state loading

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const jenisData = await getPegawaiJenis();
            const countData = await getPegawaiCount();
            setPegawaiJenis(jenisData.data || []);
            setPegawaiCount(countData.data.count || 0);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0 text-center">
                <CardTitle>Jenis Pegawai</CardTitle>
                <CardDescription>Sebaran data jenis kepegawaian.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                {isLoading ? (
                    // 🔹 Skeleton Loader saat data masih dimuat
                    <div className="flex flex-col items-center">
                        <Skeleton className="w-40 h-40 rounded-full mb-4 pt-5" />
                        <Skeleton className="w-20 h-6 rounded mb-2" />
                        <Skeleton className="w-28 h-4 rounded" />
                    </div>
                ) : (
                    <ChartContainer className="mx-auto aspect-square" config={chartConfig}>
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={pegawaiJenis}
                                dataKey="count"
                                nameKey="jenis_peg"
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
                                                        {pegawaiCount.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className="fill-muted-foreground"
                                                    >
                                                        Jumlah Pegawai
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm"></CardFooter>
        </Card>
    );
}

export default PegSebaran;