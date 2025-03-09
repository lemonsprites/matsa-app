import AppProvider from "@/lib/app-provider";

export default async function Home() {
  return <AppProvider/>
}

export async function generateMetadata() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"; // Fallback if env is missing
    const response = await fetch(`${baseUrl}/api/config`, { cache: "no-store" });
    const result = await response.json();

    return result?.data.web_mode === 1
      ? {
          title: "MTsN 1 Ciamis | Maintenance",
          description:
            "Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.",
        }
      : {
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
