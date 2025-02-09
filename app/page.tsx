import KontenArtikel from "@/components/matsa/artikel/artikel-konten";
import LandingComponent from "@/components/matsa/landing/landing-component";
import Slideshow from "@/components/matsa/landing/landing-slideshow";
import SelayangPandang from "@/components/matsa/landing/selayang-pandang";
import StatistikLembaga from "@/components/matsa/landing/statistik-lembaga";
import { useReportWebVitals } from 'next/web-vitals';

export default async function Home() {

  return (
    <LandingComponent>
      <Slideshow />
      <SelayangPandang />
      <KontenArtikel />
      <StatistikLembaga />
    </LandingComponent>
  );
}


export async function generateMetadata() {
  return {
    title: `MTsN 1 Ciamis | Beranda`,
    description: `Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.`,
  };
}

export function reportWebVitals(metric: any) {
  console.log(metric);
}