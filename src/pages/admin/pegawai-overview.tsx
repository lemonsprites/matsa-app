import AdminWrapper from "@/components/layouts/admin-wrapper"


import PegawaiChartKronologis from "@/components/layouts/pegawai-chart-kronologis"
import PegawaiGender from "@/components/layouts/pegawai-gender"
import PegawaiSebaran from "@/components/layouts/pegawai-sebaran"
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

  const totalPegawai = pegawaiData.reduce((sum, item) => sum + item.jml_pegawai, 0);

  return (
    <AdminWrapper title={title}>

      <PegawaiSebaran pegData={pegawaiData} totalPeg={totalPegawai} />
      <PegawaiChartKronologis totalPegawai={genderData} />
      <PegawaiTkPendidikan classVar="col-span-3"/>
      <PegawaiGender data={genderData} totalPegawai={totalPegawai} classVar="flex flex-col col-span-1"/>
      
    </AdminWrapper>
  )
}

export default PegawaiOverview