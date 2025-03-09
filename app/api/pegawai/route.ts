import { getSupabaseServer } from "@/lib/helper/supabase-server";
import { HttpStatus } from "@/lib/httpEnum";
import { apiRes } from "@/utils/apiRes";
export const revalidate = 60;

/**
 * Fetch list of pegawai, can be used to get count only or paginated data
 * @param {Request} req - The incoming request
 * @returns {Response} - The response of the API
 * @example
 * GET /api/pegawai?count=true
 * => { "count": 10 }
 * GET /api/pegawai
 * => [{ "id": 1, "nama": "John Doe", ... }, ...]
 */
export async function GET(req: Request) {
    const supabase = await getSupabaseServer();
    const { searchParams } = new URL(req.url);

    const countOnly = searchParams.get("count") === "true";
    const jenisOnly = searchParams.get("jenis") === "true"; 
    try {
        if (countOnly) {
            // ✅ Fetch only count
            const { count, error } = await supabase
                .from("tb_pegawai")
                .select("*", { count: "exact", head: true })
                .eq("status", "aktif");

            if (error) {
                return apiRes(false, null, { code: "COUNT_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return apiRes(true, { count }, null, HttpStatus.OK);
        } else if (jenisOnly) {
            const { data, error } = await supabase.rpc("get_pegawai_grouped").select();

            if (error) {
                return apiRes(false, null, { code: "RAW_QUERY_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return apiRes(true, data, null, HttpStatus.OK);
        } else {
            // ✅ Fetch paginated data
            const { data, error } = await supabase
                .from("tb_pegawai")
                .select("*")
                .eq("status", "aktif")

            if (error) {
                return apiRes(false, null, { code: "FETCH_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
            }

            return apiRes(true, data, null, HttpStatus.OK);
        }
    } catch (error: Error | any) {
        return apiRes(false, null, { code: "UNKNOWN_ERROR", message: error.message }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

// export type GenderData = {
//   month: string; // Month name
//   male: number;  // Count of male employees
//   female: number; // Count of female employees
// };

// const supabase = await (await createClient())

// export const fetchPegawaiData = async (): Promise<GenderData[]> => {
//   const { data, error } = await supabase
//     .from("tb_pegawai")
//     .select("tmt_masuk_ke_satker, jk")
//     .eq("status", true); // Only active employees

//   if (error) {
//     console.error("Error fetching pegawai data:", error);
//     return [];
//   }

//   // Format data for the chart
//   const groupedData = data.reduce((acc: { [key: string]: GenderData }, curr) => {
//     const month = new Date(curr.tmt_masuk_ke_satker).toISOString().slice(0, 7);
//     if (!acc[month]) acc[month] = { month, male: 0, female: 0 };

//     if (curr.jk === "L") acc[month].male += 1;
//     if (curr.jk === "P") acc[month].female += 1;

//     return acc;
//   }, {});

//   return Object.values(groupedData).sort(
//     (a, b) => new Date(a.month).getTime() - new Date(b.month).getTime()
//   );
// };


// export const fetchActivePegawaiByYear = async (): Promise<{ year: number; count: number }[]> => {
//   const { data, error } = await supabase
//     .from("tb_pegawai")
//     .select("tmt_masuk_satker")
//     .eq("status", true); // Hanya pegawai aktif

//   if (error) {
//     console.error("Error fetching pegawai data:", error);
//     return [];
//   }

//   // Group data by year
//   const groupedData = data.reduce((acc: Record<number, number>, curr) => {
//     const year = new Date(curr.tmt_masuk_satker).getFullYear();
//     acc[year] = (acc[year] || 0) + 1;
//     return acc;
//   }, {});

//   // Convert grouped data to an array
//   return Object.entries(groupedData)
//     .map(([year, count]) => ({ year: parseInt(year, 10), count }))
//     .sort((a, b) => a.year - b.year); // Sort by year
// };

// export const fetchActivePegawaiByGenderAndYear = async (): Promise<
//   { year: string; male: number; female: number }[]
// > => {
//   const { data, error } = await supabase
//     .from("tb_pegawai")
//     .select("tmt_masuk_ke_satker, jk")
//     .eq("status", true); // Hanya pegawai aktif

//   if (error) {
//     console.error("Error fetching pegawai data:", error);
//     return [];
//   }

//   // Group data by year and gender
//   const groupedData = data.reduce((acc: Record<string, { male: number; female: number }>, curr) => {
//     const year = new Date(curr.tmt_masuk_ke_satker).getFullYear().toString();

//     if (!acc[year]) {
//       acc[year] = { male: 0, female: 0 };
//     }

//     if (curr.jk === "L") acc[year].male += 1;
//     if (curr.jk === "P") acc[year].female += 1;

//     return acc;
//   }, {});

//   // Convert grouped data to an array
//   return Object.entries(groupedData)
//     .map(([year, { male, female }]) => ({ year, male, female }))
//     .sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort by year
// };


// export const fetchRecentFiveYearsData = async (): Promise<
//   { year: string; male: number; female: number }[]
// > => {
//   const currentYear = new Date().getFullYear();
//   const startYear = currentYear - 4; // Ambil data mulai 5 tahun terakhir

//   const { data, error } = await supabase
//     .from("tb_pegawai")
//     .select("tmt_masuk_ke_satker, jk")
//     .eq("status", true); // Hanya pegawai aktif

//   if (error) {
//     console.error("Error fetching pegawai data:", error);
//     return [];
//   }

//   // Filter data untuk 5 tahun terakhir
//   const filteredData = data.filter((pegawai) => {
//     const year = new Date(pegawai.tmt_masuk_ke_satker).getFullYear();
//     return year >= startYear && year <= currentYear;
//   });

//   // Group data by year and gender
//   const groupedData = filteredData.reduce(
//     (acc: Record<string, { male: number; female: number }>, curr) => {
//       const year = new Date(curr.tmt_masuk_ke_satker).getFullYear().toString();

//       if (!acc[year]) {
//         acc[year] = { male: 0, female: 0 };
//       }

//       if (curr.jk === "L") acc[year].male += 1;
//       if (curr.jk === "P") acc[year].female += 1;

//       return acc;
//     },
//     {}
//   );

//   // Convert grouped data to an array
//   return Object.entries(groupedData)
//     .map(([year, { male, female }]) => ({ year, male, female }))
//     .sort((a, b) => parseInt(a.year) - parseInt(b.year)); // Sort by year
// };

// export type AccumulatedPegawaiData = {
//   year: string; // Tahun (e.g., "2023")
//   male: number; // Jumlah pegawai laki-laki aktif hingga tahun tersebut (akumulasi)
//   female: number; // Jumlah pegawai perempuan aktif hingga tahun tersebut (akumulasi)
// };

// export const fetchAccumulatedPegawaiData = async (): Promise<AccumulatedPegawaiData[]> => {
//   const currentYear = new Date().getFullYear();
//   const startYear = currentYear - 4; // 5 tahun terakhir

//   const { data, error } = await supabase
//     .from("tb_pegawai")
//     .select("tmt_masuk_ke_satker, jk")
//     .eq("status", true); // Hanya pegawai aktif

//   if (error) {
//     console.error("Error fetching pegawai data:", error);
//     return [];
//   }

//   // Format data berdasarkan tahun
//   const groupedData = [];
//   for (let year = startYear; year <= currentYear; year++) {
//     const yearlyData = data.reduce(
//       (acc, curr) => {
//         const tmtYear = new Date(curr.tmt_masuk_ke_satker).getFullYear();
//         if (tmtYear <= year) {
//           if (curr.jk === "L") acc.male += 1;
//           if (curr.jk === "P") acc.female += 1;
//         }
//         return acc;
//       },
//       { year: year.toString(), male: 0, female: 0 }
//     );

//     groupedData.push(yearlyData);
//   }

//   return groupedData;
// };

// export const fetchGenderCount = async () => {
//   const { data, error } = await supabase
//     .from('tb_pegawai')
//     .select('jk') // Select the jenis_kelamin column
//     .eq('status', true); // Only fetch active employees

//   if (error || !data) {
//     console.error('Error fetching data:', error);
//     return { male: 0, female: 0 }; // Return default values if error occurs
//   }

//   // Count the number of male and female employees
//   const genderCount = data.reduce(
//     (acc, curr) => {
//       if (curr.jk === 'L') acc.male += 1;
//       if (curr.jk === 'P') acc.female += 1;
//       return acc;
//     },
//     { male: 0, female: 0 } // Initialize with 0 counts
//   );

//   return genderCount;
// };


// export type PendidikanData = {
//   tk_pendidikan: string;  // Tingkat pendidikan
//   jumlah: number;         // Jumlah pegawai pada tingkat pendidikan tersebut
// };

// export const fetchTingkatPendidikan = async (): Promise<PendidikanData[]> => {
//   const { data, error } = await supabase
//     .from('tb_pegawai')
//     .select('tk_pendidikan') // Ambil kolom tk_pendidikan
//     .eq('status', true); // Hanya pegawai yang aktif

//   if (error) {
//     console.error('Error fetching data:', error);
//     return [];
//   }

//   // Hitung jumlah pegawai berdasarkan tingkat pendidikan
//   const pendidikanCount = data.reduce((acc, curr) => {
//     if (!curr.tk_pendidikan) return acc;

//     if (!acc[curr.tk_pendidikan]) {
//       acc[curr.tk_pendidikan] = 0;
//     }

//     acc[curr.tk_pendidikan] += 1;

//     return acc;
//   }, {} as { [key: string]: number });

//   // Mengubah hasil ke format yang lebih mudah digunakan
//   return Object.keys(pendidikanCount).map((key) => ({
//     tk_pendidikan: key,
//     jumlah: pendidikanCount[key],
//   }));
// };