
import Toast from '@/components/toast';
import supabase from '@/lib/supabase-client';
import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

export const fetchTeachingScheduleData = async (idPegawai: any) => {
    // Ambil data tugas tambahan dan JTM yang terkait
    const { data: tb_tugas_tambahan, error: tugasError } = await supabase
        .from('tb_tugas_tambahan')
        .select('created_at, tb_jabatan(jtm)')
        .eq('id_pegawai', idPegawai);

    // Ambil data jadwal mengajar
    const { data: jadwalMengajar, error: jadwalError } = await supabase
        .from('tb_jadwal')
        .select('created_at AS tanggal, jtm')
        .eq('id_pegawai', idPegawai);

    // Tangani kesalahan jika ada
    if (tugasError || jadwalError) {
        console.error('Error fetching data:', tugasError || jadwalError);
        throw new Error('Failed to fetch data');
    }

    // Gabungkan data dari tugas tambahan dan jadwal mengajar
    const combinedData = [
        ...tb_tugas_tambahan.map((tugas: any) => ({
            date: tugas.created_at,
            count: tugas.tb_jabatan.jtm,
        })),
        ...jadwalMengajar.map((jadwal: any) => ({
            date: jadwal.tanggal,
            count: jadwal.jtm,
        })),
    ];

    return combinedData;
};

const PegawaiJadwalManajemen = ({ idPegawai = 1 }: any) => {
    const [heatmapData, setHeatmapData] = useState<any[]>([]);
    const [jadwalPreview, setJadwalPreview] = useState<any[]>([]); // State for temporary schedule
    const [isConfirmed, setIsConfirmed] = useState<boolean>(false); // State for confirmation

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTeachingScheduleData(idPegawai);
                setHeatmapData(data);
            } catch (error) {
                console.error('Error loading heatmap data:', error);
            }
        };

        fetchData();
    }, [idPegawai]);

    const generateSchedule = async () => {
        try {
            const { data: pegawai, error: pegawaiError } = await supabase.from('tb_pegawai').select('*');
            const { data: kelas, error: kelasError } = await supabase.from('tb_kelas').select('*');
            const { data: mapel, error: mapelError } = await supabase.from('tb_mapel').select('*');
            const { data: tugasTambahan, error: tugasTambahanError } = await supabase.from('tb_tugas_tambahan').select('*');

            if (pegawaiError || kelasError || mapelError || tugasTambahanError) {
                Toast({ title: "Error", variant: 'error', desc: 'Gagal memuat data untuk jadwal preview.' });
                return;
            }

            const hariList = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
            const preview: any[] = [];
            const minMengajar = 2;

            pegawai.forEach((pgw) => {
                const ekuivalensiJTM = tugasTambahan
                    .filter((tugas) => tugas.id_pegawai === pgw.id)
                    .reduce((sum, tugas) => sum + tugas.jtm, 0);

                const totalJTM = pgw.jtm + ekuivalensiJTM;
                let remainingJTM = totalJTM;

                let currentMengajar = 0;
                for (const hari of hariList) {
                    if (currentMengajar >= minMengajar) break;
                    for (let jam = 1; jam <= 10; jam++) {
                        if (currentMengajar >= minMengajar) break;

                        const kelasRandom = kelas[Math.floor(Math.random() * kelas.length)];
                        const mapelRandom = mapel[Math.floor(Math.random() * mapel.length)];

                        preview.push({
                            id_pegawai: pgw.id,
                            id_mapel: mapelRandom.id,
                            id_kelas: kelasRandom.id,
                            hari,
                            jam_slot: jam,
                            jtm: 1,
                        });

                        currentMengajar++;
                        remainingJTM--;
                    }
                }

                for (const hari of hariList) {
                    if (remainingJTM <= 0) break;
                    for (let jam = 1; jam <= 10; jam++) {
                        if (remainingJTM <= 0) break;

                        const kelasRandom = kelas[Math.floor(Math.random() * kelas.length)];
                        const mapelRandom = mapel[Math.floor(Math.random() * mapel.length)];

                        preview.push({
                            id_pegawai: pgw.id,
                            id_mapel: mapelRandom.id,
                            id_kelas: kelasRandom.id,
                            hari,
                            jam_slot: jam,
                            jtm: 1,
                        });

                        remainingJTM--;
                    }
                }
            });

            setJadwalPreview(preview);
        } catch (error) {
            Toast({ title: "Error", variant: 'error', desc: 'Gagal menghasilkan jadwal preview.' });
        }
    };

    const saveSchedule = async () => {
        const { error } = await supabase.from('tb_jadwal').insert(jadwalPreview);

        if (error) {
            Toast({ title: "Error", variant: 'error', desc: 'Gagal menyimpan jadwal!' });
            return;
        }

        Toast({ title: "Success", variant: 'success', desc: 'Jadwal berhasil disimpan!' });
        setJadwalPreview([]);
        setIsConfirmed(false);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Teaching Schedule Heatmap</h2>
            {!jadwalPreview.length ? (
                <button
                    onClick={generateSchedule}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Generate Preview Jadwal
                </button>
            ) : (
                <>
                    <CalendarHeatmap
                        startDate={new Date('2025-01-01')}
                        endDate={new Date('2025-12-31')}
                        values={heatmapData}
                        showWeekdayLabels
                        tooltipDataAttrs={(value) => {
                            if (!value || !value.date) {
                                return { 'aria-label': 'No data available' }; // Conform to the expected attribute structure
                            }
                            return { 'aria-label': `Date: ${value.date}, JTM: ${value.count}` }; // Use a valid HTML attribute
                        }}
                        classForValue={(value) => {
                            if (!value || !value.count) {
                                return 'color-empty';
                            }
                            if (value.count <= 5) {
                                return 'color-scale-1';
                            } else if (value.count <= 10) {
                                return 'color-scale-2';
                            } else {
                                return 'color-scale-3';
                            }
                        }}
                    />
                    {!isConfirmed ? (
                        <button
                            onClick={() => setIsConfirmed(true)}
                            className="bg-yellow-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Konfirmasi Jadwal
                        </button>
                    ) : (
                        <button
                            onClick={saveSchedule}
                            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
                        >
                            Simpan Jadwal
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default PegawaiJadwalManajemen;
