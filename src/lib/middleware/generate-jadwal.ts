import { Jadwal, MataPelajaran, Pegawai } from "@/lib/type/pegawai-type";

export const generateJadwal = (
    pegawai: Pegawai[],
    mataPelajaran: MataPelajaran[]
): Jadwal[] => {
    let jadwal: Jadwal[] = [];

    // Looping melalui mata pelajaran
    mataPelajaran.forEach((mapel) => {
        let totalJam = mapel.totalJamPerMinggu;

        // Looping melalui pegawai untuk menentukan siapa yang mengajar
        for (let i = 0; i < pegawai.length && totalJam > 0; i++) {
            const pegawaiItem = pegawai[i];

            // Tentukan hari dan jam yang tersedia
            const hariAvailable = pegawaiItem.ketersediaan;

            // Tentukan jam untuk pegawai
            for (let hari of hariAvailable) {
                if (totalJam > 0 && pegawaiItem.maxJamPerMinggu > 0) {
                    jadwal.push({
                        pegawaiId: pegawaiItem.id,
                        mapelId: mapel.id,
                        hari: hari,
                        jam: 1, // Satu jam per jadwal
                    });

                    // Kurangi jam yang belum dijadwalkan
                    totalJam--;
                    pegawaiItem.maxJamPerMinggu--;
                }
            }
        }
    });

    return jadwal;
};
