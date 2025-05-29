
import KontenArtikel from "@/components/matsa/artikel/artikel-konten";
import LandingComponent from "@/components/matsa/landing/landing-component";
import Slideshow from "@/components/matsa/landing/landing-slideshow";
import SelayangPandang from "@/components/matsa/landing/selayang-pandang";
import StatistikLembaga from "@/components/matsa/landing/statistik-lembaga";
import { cookies } from "next/headers";

export default function Home() {

  return (
    <LandingComponent>
      <Slideshow />
      <SelayangPandang />
      <KontenArtikel />
      <StatistikLembaga />
    </LandingComponent>
  );
}

export async function generateMetadata({ request }: { request?: Request }) {
  try {
    const cookieStore = cookies(); // ambil cookies server side
    const devModeCookie = (await cookieStore).get('dev_mode')?.value;

    if (devModeCookie === 'true') {
      // Kalau dev_mode aktif, skip maintenance
      return {
        title: "MTsN 1 Ciamis | Beranda",
        description:
          "Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.",
      };
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/config`, { cache: "no-store" });
    const result = await response.json();

    if (result?.data.web_mode === 1) {
      return {
        title: "MTsN 1 Ciamis | Maintenance",
        description:
          "Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.",
      };
    }

    return {
      title: "MTsN 1 Ciamis | Beranda",
      description:
        "Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.",
    };
  } catch (error) {
    return {
      title: "Error",
      description: "Something went wrong. Please try again later.",
    };
  }
}