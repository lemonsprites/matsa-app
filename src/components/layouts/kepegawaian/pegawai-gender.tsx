
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
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"
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


const PegawaiGender = ({ classVar, data }: any) => {
    const chartData = [{ pria: data.male, wanita: data.female }]
    console.log(data)

    const percentPria = data.male / (data.male + data.female) *100;
    const percentWanita = data.female / (data.male + data.female)*100;

    return (
        <Card className={classVar}>
            <CardHeader className="items-center pb-0">
                <CardTitle>Komposisi <i>Gender</i> Pegawai</CardTitle>
                <CardDescription>Sebaran komposisi <i>gender</i> pegawai.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="h-full w-full mt-20"
                >
                    <RadialBarChart
                        data={chartData}
                        endAngle={180}
                        innerRadius={100}
                        outerRadius={150}
                        width={5000}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
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
                    {
                        percentPria > percentWanita
                            ? `Pria ${(percentPria - percentWanita).toFixed(2)}% lebih banyak.`
                            : `Wanita ${(percentWanita - percentPria).toFixed(2)}% lebih banyak.`
                    }
                </div>
                <div className="leading-none text-muted-foreground text-center">
                    Komposisi pria dan wanita
                </div>
            </CardFooter>
        </Card>
    )
}

export default PegawaiGender