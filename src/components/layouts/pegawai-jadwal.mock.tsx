interface Jadwal {
    pegawaiId: number;
    hari: string;
    kelas: string;
    jamMulai: number;
    durasiJam: number;  // Durasi jam pelajaran, misalnya 2 untuk 2 jam berturut-turut
    kodeMapel: string;  // Kode mapel 3 digit
    tugasTambahan: string | null;  // Kolom tugas tambahan (nullable)
  }
  
  interface Pegawai {
    id: number;
    name: string;
  }
  
  const pegawai: Pegawai[] = [
    { id: 1, name: "Budi" },
    { id: 2, name: "Siti" },
    { id: 3, name: "Joko" },
  ];
  
  const jadwal: Jadwal[] = [
    { pegawaiId: 1, hari: "Senin", kelas: "10A", jamMulai: 2, durasiJam: 2, kodeMapel: "MAT", tugasTambahan: "Les" },
    { pegawaiId: 1, hari: "Rabu", kelas: "11B", jamMulai: 3, durasiJam: 1, kodeMapel: "BIND", tugasTambahan: "Laporan" },
    { pegawaiId: 2, hari: "Selasa", kelas: "12C", jamMulai: 1, durasiJam: 1, kodeMapel: "BIO", tugasTambahan: "Ujian" },
    { pegawaiId: 3, hari: "Jumat", kelas: "10A", jamMulai: 4, durasiJam: 1, kodeMapel: "BING", tugasTambahan: null },  // Tugas tambahan null
  ];
  
  export const JadwalPage = () => {
    const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
    const jumlahJam = 0;
    const tugasTambahan = ""
  
    // Fungsi untuk memeriksa apakah ada jadwal pada jam tertentu
    const getJadwalForPegawai = (pegawaiId: number, hari: string) => {
      return jadwal.filter((item) => item.pegawaiId === pegawaiId && item.hari === hari);
    };
  
    // Fungsi untuk menentukan apakah ada jadwal pada jam tertentu
    const isJadwalAvailable = (pegawaiId: number, hari: string, jam: number) => {
      return jadwal.some(
        (item) =>
          item.pegawaiId === pegawaiId &&
          item.hari === hari &&
          item.jamMulai <= jam &&
          item.jamMulai + item.durasiJam > jam
      );
    };
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold">Jadwal Pengajaran</h2>
        <table className="min-w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Nama Pegawai</th>
              {hariList.map((hari) => (
                <th key={hari} className="px-4 py-2">
                  {hari}
                </th>
              ))}
              <th className="px-4 py-2">Jumlah Jam</th>
              <th className="px-4 py-2">Tugas Tambahan</th>
            </tr>
          </thead>
          <tbody>
            {pegawai.map((pegawaiItem) => (
              <tr key={pegawaiItem.id}>
                <td className="px-4 py-2">{pegawaiItem.name}</td>
                {hariList.map((hari) => {
                  // Ambil jadwal pegawai untuk hari tertentu
                  const jadwalForHari = getJadwalForPegawai(pegawaiItem.id, hari);
                  const jumlahJam = jadwalForHari.reduce((acc, item) => acc + item.durasiJam, 0) || null; // Menghitung jumlah jam, jika tidak ada set null
                  const tugasTambahan = jadwalForHari.map((item) => item.tugasTambahan).filter(Boolean).join(", ") || null;  // Jika tidak ada, set null
                  
                  return (
                    <td key={hari} className="px-4 py-2">
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          gap: "5px",
                        }}
                      >
                        {Array.from({ length: 6 }).map((_, index) => {
                          const jam = index + 1;
                          const kelas = jadwalForHari.find((item) => item.jamMulai <= jam && item.jamMulai + item.durasiJam > jam)?.kelas || "";
                          return (
                            <div
                              key={jam}
                              className={`h-12 border ${isJadwalAvailable(pegawaiItem.id, hari, jam) ? 'bg-blue-500' : 'bg-gray-200'}`}
                            >
                              {isJadwalAvailable(pegawaiItem.id, hari, jam) && (
                                <span className="text-white text-center block">
                                  {kelas} {jadwalForHari.find((item) => item.jamMulai <= jam && item.jamMulai + item.durasiJam > jam)?.kodeMapel}
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                  );
                })}
                <td className="px-4 py-2">{jumlahJam || "Tidak ada"}</td>
                <td className="px-4 py-2">{tugasTambahan || "Tidak ada"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  