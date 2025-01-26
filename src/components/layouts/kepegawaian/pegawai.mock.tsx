

export const JadwalPage = () => {
    // Daftar pegawai
    // Daftar pegawai
    const pegawai: any[] = [
        { id: 1, name: "Budi" },
        { id: 2, name: "Siti" },
        { id: 3, name: "Joko" },
    ];

    // Daftar jadwal
    const jadwal: any[] = [
        { pegawaiId: 1, hari: "Senin", kelas: "10A", jam: 2, mapel: "Matematika" },
        { pegawaiId: 1, hari: "Rabu", kelas: "11B", jam: 2, mapel: "Bahasa Indonesia" },
        { pegawaiId: 2, hari: "Selasa", kelas: "12C", jam: 3, mapel: "Matematika" },
        { pegawaiId: 3, hari: "Jumat", kelas: "10A", jam: 2, mapel: "Bahasa Inggris" },
    ];


    // Daftar hari yang digunakan sebagai kolom
    const hariList = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];

    // Fungsi untuk mencari jam yang dijadwalkan pegawai pada hari tertentu
    const getJadwalForPegawai = (pegawaiId: number, hari: string) => {
        const jadwalItem = jadwal.find(
            (item) => item.pegawaiId === pegawaiId && item.hari === hari
        );
        return jadwalItem ? jadwalItem.jam : 0; // Mengembalikan 0 jika tidak ada jadwal
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Jadwal Pengajaran</h2>
            <table className="min-w-full table-auto mt-4">
                <thead>
                    <tr>
                        <th className="px-4 py-2">Nama Pegawai</th>
                        {hariList.map((hari) => (
                            <th key={hari} className="px-4 py-2">
                                {hari}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pegawai.map((pegawaiItem) => (
                        <tr key={pegawaiItem.id}>
                            <td className="px-4 py-2">{pegawaiItem.name}</td>
                            {hariList.map((hari) => (
                                <td key={hari} className="px-4 py-2">
                                    {getJadwalForPegawai(pegawaiItem.id, hari)} jam
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
