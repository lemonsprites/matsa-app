import supabase from '@/lib/supabase-client';
import { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const PegawaiJadwalHeatmap = () => {
    const [jadwal, setJadwal] = useState<any[]>([]);

    useEffect(() => {
        const fetchJadwal = async () => {
            const { data } = await supabase.from('tb_jadwal').select('*');
            setJadwal(data || []);
        };
        fetchJadwal();
    }, []);

    const transformData = () => {
        // Transform jadwal data into heatmap format
        return jadwal.map((item) => ({
            date: `${item.hari}-${item.jam_slot}`, // Unique key for the day-slot
            count: item.jtm, // JTM value as intensity
        }));
    };

    return (
        <div className="heatmap-container">
            <h1 className="text-xl font-bold mb-4">Jadwal Pegawai</h1>
            <CalendarHeatmap
                startDate={new Date('2025-01-01')}
                endDate={new Date('2025-12-31')}
                values={transformData()}
                classForValue={(value) => {
                    if (!value) return 'color-empty';
                    return `color-scale-${Math.min(value.count, 4)}`;
                }}
                tooltipDataAttrs={(value) => {
                    if (!value) return {};
                    return { 'aria-label': `JTM: ${value.count}` }; // Ganti 'data-tip' dengan 'aria-label'
                }}
                showWeekdayLabels
            />
        </div>
    );
};

export default PegawaiJadwalHeatmap;
