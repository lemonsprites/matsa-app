import { useState, useEffect } from "react";
import supabase from "@/lib/supabase-client";

const PegawaiJadwalGeneral = () => {
  const [jadwal, setJadwal] = useState<any[]>([]);
  const [kelas, setKelas] = useState<any[]>([]);

  useEffect(() => {
    fetchJadwalAndKelas();
  }, []);

  const fetchJadwalAndKelas = async () => {
    // Fetch kelas data from tb_kelas
    const { data: kelasData, error: kelasError } = await supabase
      .from("tb_kelas")
      .select("*");

    // Fetch jadwal data including the teacher's name from tb_pegawai
    const { data: jadwalData, error: jadwalError } = await supabase
      .from("tb_jadwal")
      .select("*, tb_pegawai (nama)")

    if (kelasError) {
      console.error("Error fetching kelas:", kelasError);
    } else {
      setKelas(kelasData || []);
    }

    if (jadwalError) {
      console.error("Error fetching jadwal:", jadwalError);
    } else {
      setJadwal(jadwalData || []);
    }
  };

  // Generate time slots based on max jtm value (for example, 1-5)
  const maxJtm = Math.max(...jadwal.map((entry) => entry.jtm));
  const jtmSlots = Array.from({ length: maxJtm }, (_, index) => index + 1);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Jam</th>
            {kelas.map((kelasItem) => (
              <th key={kelasItem.id} className="px-4 py-2">{kelasItem.nama_kelas}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {jtmSlots.map((slot) => (
            <tr key={slot}>
              <td className="border px-4 py-2">{`${slot}`}</td>
              {kelas.map((kelasItem) => {
                const slotData = jadwal.find(
                  (entry) => entry.id_kelas === kelasItem.id && entry.jtm === slot
                );
                return (
                  <td key={kelasItem.id} className="border px-4 py-2">
                    {slotData ? (
                      <div>
                        <div>{slotData.id_pegawai}</div>
                      </div>
                    ) : (
                      <div className="text-gray-400"></div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PegawaiJadwalGeneral;
