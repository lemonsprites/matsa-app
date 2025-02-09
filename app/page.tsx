import AppProvider from "@/components/matsa/app-provider";
import { createClient } from "@/utils/supabase/server";

const supabase = createClient();
export default async function Home() {

  return <AppProvider/>
}



export async function generateMetadata() {
  try {
    const { data, error } = await (await supabase)
      .from('web_config')
      .select('web_mode')
      .eq('id', 1)
      .single();

    if (error) {
      console.error(error);
      return <div>Error loading data</div>; // Handle error case
    }

    return data?.web_mode === 1 ? (
      {
        title: `MTsN 1 Ciamis | Maintenance`,
        description: `Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.`,
      }
    ) : (
      {
        title: `MTsN 1 Ciamis | Beranda`,
        description: `Selamat datang pada situs digital madrasah kami, silahkan eksplorasi fitur dan konten yang kami sajikan sepenuh hati.`,
      }
    );
  } catch (error) {
    console.error(error);
    return <div>Something went wrong</div>; // Handle catch errors
  }
}

export function reportWebVitals(metric: any) {
  console.log(metric);
}