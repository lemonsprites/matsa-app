"use client";
import { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Skeleton } from "@/components/ui/skeleton"; // Import ShadCN Skeleton
import { fetchAPI } from "@/utils/fetcher";

const chartConfig = {
    laki_laki: {
        label: "laki_laki",
        color: "hsl(var(--chart-1))",
    },
    perempuan: {
        label: "perempuan",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const PegKronologis = () => {
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

    return (
        <Card className="col-span-3 h-full">
            <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                    <CardTitle>Rekapitulasi Pegawai</CardTitle>
                    <CardDescription>Sebaran data jumlah pegawai per Tahun.</CardDescription>
                </div>
                <div className="flex">
                    <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                        <span className="text-xs text-muted-foreground">Laki-laki</span>
                        {loading ? (
                            <Skeleton className="h-6 w-12" />
                        ) : (
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                {pegawaiData[pegawaiData.length - 1]?.laki_laki || 0}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6">
                        <span className="text-xs text-muted-foreground">Perempuan</span>
                        {loading ? (
                            <Skeleton className="h-6 w-12" />
                        ) : (
                            <span className="text-lg font-bold leading-none sm:text-3xl">
                                {pegawaiData[pegawaiData.length - 1]?.perempuan || 0}
                            </span>
                        )}
                    </div>
                </div>
            </CardHeader>
            <CardContent className="px-2 sm:p-6">
                {loading ? (
                    <Skeleton className="h-[150px] w-full" />
                ) : (
                    <ChartContainer config={chartConfig} className="aspect-auto h-[150px] w-full">
                        <BarChart accessibilityLayer data={pegawaiData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="tahun"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                            <Bar dataKey="laki_laki" fill="var(--color-desktop)" radius={4} />
                            <Bar dataKey="perempuan" fill="var(--color-mobile)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    );
};

export default PegKronologis;
