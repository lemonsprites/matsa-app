import supabase from "@/lib/supabase";

export async function generateNomorSurat({
  jenisSurat,
  kodeUnitKerja = "",
  kodeKategori = "",
  tanggal,
}: {
    jenisSurat:any,
    kodeUnitKerja:any,
    kodeKategori:any,
    tanggal:any
}) {
  const bulan = tanggal.split("-")[1]; // Ambil bulan dari format YYYY-MM-DD
  const tahun = tanggal.split("-")[0]; // Ambil tahun dari format YYYY-MM-DD

  // Ambil nomor terakhir dari database berdasarkan jenis surat
  const { data: nomorData } = await supabase
    .from("nomor_surat")
    .select("nomor, sub_nomor")
    .eq("jenis_surat", jenisSurat)
    .eq("bulan", bulan)
    .eq("tahun", tahun)
    .order("nomor", { ascending: false })
    .limit(1);

  let nomorTerakhir = 0;
  let subNomor = 0;

  if (nomorData && nomorData.length > 0) {
    nomorTerakhir = nomorData[0].nomor;
    subNomor = nomorData[0].sub_nomor || 0;
  }

  // Tambahkan 1 untuk nomor baru
  nomorTerakhir += 1;

  // Format nomor sesuai jenis surat
  let formattedNomor = "";

  if (jenisSurat === "SK") {
    // Format untuk Surat Keputusan
    formattedNomor = `${nomorTerakhir} Tahun ${tahun}`;
  } else if (jenisSurat === "SR") {
    // Format untuk Surat Keluar Reguler
    subNomor += 1; // Jika insidental
    const nomorSR = subNomor > 0 ? `${nomorTerakhir}.${subNomor}` : `${nomorTerakhir}`;
    formattedNomor = `S-${nomorSR}/${kodeUnitKerja}/${kodeKategori}/${bulan}/${tahun}`;
  }

  // Simpan ke database
  const { error: insertError } = await supabase.from("tb_surat").insert([
    {
      jenisSurat: jenisSurat,
      tanggalSurat: tanggal,
      bulan,
      tahun,
      nomorSurat: formattedNomor,
    },
  ]);

  if (insertError) {
    console.error("Error saving nomor surat:", insertError.message);
    return null;
  }

  return formattedNomor;
}