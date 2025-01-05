interface BebanKerja {
  id: number;
  namaPegawai: string;
  jabatan: string;
  mapel: string;
  jumlahJam: number;
  tugasTambahan: string;
}

const bebanKerja: BebanKerja[] = [
  { id: 1, namaPegawai: "Budi", jabatan: "Guru Matematika", mapel: "Matematika", jumlahJam: 18, tugasTambahan: "Les" },
  { id: 2, namaPegawai: "Siti", jabatan: "Guru Biologi", mapel: "Biologi", jumlahJam: 20, tugasTambahan: "Kegiatan OSIS" },
  { id: 3, namaPegawai: "Joko", jabatan: "Guru Fisika", mapel: "Fisika", jumlahJam: 15, tugasTambahan: "Bimbingan" },
];

const PegawaiManajemenAbk = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Manajemen Beban Kerja</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th className="px-4 py-2">Nama Pegawai</th>
            <th className="px-4 py-2">Jabatan</th>
            <th className="px-4 py-2">Mata Pelajaran</th>
            <th className="px-4 py-2">Jumlah Jam</th>
            <th className="px-4 py-2">Tugas Tambahan</th>
            <th className="px-4 py-2">Beban Kerja</th>
          </tr>
        </thead>
        <tbody>
          {bebanKerja.map((item) => (
            <tr key={item.id}>
              <td className="px-4 py-2">{item.namaPegawai}</td>
              <td className="px-4 py-2">{item.jabatan}</td>
              <td className="px-4 py-2">{item.mapel}</td>
              <td className="px-4 py-2">{item.jumlahJam}</td>
              <td className="px-4 py-2">{item.tugasTambahan}</td>
              <td className="px-4 py-2">{item.jumlahJam > 18 ? "Terlalu Banyak" : "Sesuaikan"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default PegawaiManajemenAbk;