import AdminWrapper from "@/components/layouts/admin-wrapper"
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
import { chartConfig } from "@/lib/metadata/surat-chart"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"


import PegawaiChartKronologis from "@/components/layouts/pegawai-chart-kronologis"
import PegawaiTkPendidikan from "@/components/layouts/pegawai-tk-pendidikan"
import { fetchGenderCount } from "@/lib/services/pegawai-services"
import supabase from "@/lib/supabase-client"
import { useEffect, useState } from "react"



interface PegawaiData {
  jenis_pegawai: string;
  jml_pegawai: number;
  fill: string;
}

const PegawaiOverview = ({ title }: any) => {


  const [pegawaiData, setPegawaiData] = useState<PegawaiData[]>([]);
  const [genderData, setGenderData] = useState<{ male: number; female: number }>({
    male: 0,
    female: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.rpc('get_pegawai_counts');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        const formattedData = data.map((item: any) => ({
          jenis_pegawai: item.jenis_pegawai,
          jml_pegawai: item.jml_pegawai,
          fill: getFillColor(item.jenis_pegawai),
        }));

        setPegawaiData(formattedData);
      }

    };
    const fetchGenderData = async () => {
      const dataGender = await fetchGenderCount();
      setGenderData(dataGender); // Set the fetched gender data to state
    };

    fetchData();
    fetchGenderData();
  }, []);

  const getFillColor = (jenis_pegawai: string) => {
    switch (jenis_pegawai) {
      case 'PNS':
        return 'var(--color-chrome)';
      case 'PPPK':
        return 'var(--color-safari)';
      case 'NON ASN':
        return 'var(--color-firefox)';
      default:
        return 'var(--color-default)';
    }
  };


  // const totalVisitors = React.useMemo(() => {
  //   return chartData.reduce((acc, curr) => acc + curr.visitors, 0)
  // }, [])

  const totalPegawai = pegawaiData.reduce((sum, item) => sum + item.jml_pegawai, 0);

  return (
    <AdminWrapper title={title}>
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0 text-center">
          <CardTitle>Sebaran Jenis Pegawai Satker</CardTitle>
          <CardDescription>Satuan Kerja MTsN 1 Ciamis</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square "
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pegawaiData}
                dataKey="jml_pegawai"
                nameKey="jenis_pegawai"
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
                            {totalPegawai.toLocaleString()}
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
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
        </CardFooter>
      </Card>

      <PegawaiChartKronologis totalPegawai={genderData} />

      <PegawaiTkPendidikan />

      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>Radial Chart - Stacked</CardTitle>
          <CardDescription>January - June 2024</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center pb-0">
          <ChartContainer
            config={{
              PNS: {
                label: "PNS",
                color: "hsl(var(--chart-1))",
              },
              PPPK: {
                label: "PPPK",
                color: "hsl(var(--chart-2))",
              },
              NON_ASN: {
                label: "NON ASN",
                color: "hsl(var(--chart-2))",
              }
            }}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <RadialBarChart
              data={[{ month: "january", desktop: 1260, mobile: 570 }]}
              endAngle={180}
              innerRadius={80}
              outerRadius={130}
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
                            {pegawaiData.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 4}
                            className="fill-muted-foreground"
                          >
                            Visitors
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </PolarRadiusAxis>
              <RadialBar
                dataKey="desktop"
                stackId="a"
                cornerRadius={5}
                fill="var(--color-desktop)"
                className="stroke-transparent stroke-2"
              />
              <RadialBar
                dataKey="mobile"
                fill="var(--color-mobile)"
                stackId="a"
                cornerRadius={5}
                className="stroke-transparent stroke-2"
              />
            </RadialBarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </AdminWrapper>
  )
}

export default PegawaiOverview