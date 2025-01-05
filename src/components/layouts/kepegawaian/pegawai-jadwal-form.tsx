import { addSchedule, getActiveSemester } from '@/lib/services/jadwal-services';
import React, { useState, useEffect } from 'react';


interface Semester {
  id: number;
  nama_semester: string;
  tanggal_mulai: string;
  tanggal_selesai: string;
  created_at: string;
  updated_at: string;
}

const PegawaiJadwalForm = () => {
  const [semester, setSemester] = useState<Semester | null>(null);
  const [guruId, setGuruId] = useState('');
  const [kelasId, setKelasId] = useState('');
  const [mapelId, setMapelId] = useState('');
  const [hari, setHari] = useState('');
  const [jamMulai, setJamMulai] = useState('');
  const [jamSelesai, setJamSelesai] = useState('');

  useEffect(() => {
    const fetchSemester = async () => {
      const activeSemester = await getActiveSemester();
      setSemester(activeSemester);
    };

    fetchSemester();
  }, []);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!semester) {
      alert('Semesternya belum tersedia.');
      return;
    }

    try {
      await addSchedule({
        guruId: Number(guruId),
        kelasId: Number(kelasId),
        mapelId: Number(mapelId),
        hari,
        jamMulai,
        jamSelesai,
        semesterId: semester.id,
      });
      alert('Jadwal berhasil ditambahkan!');
    } catch (err:any) {
      alert(`Gagal menambahkan jadwal: ${err.message}`);
    }
  };

  if (!semester) return <p>Loading semester data...</p>;

  return (
    <form onSubmit={handleSubmit}>
      <h1>Tambah Jadwal untuk Semester: {semester.nama_semester}</h1>
      <input value={guruId} onChange={(e) => setGuruId(e.target.value)} placeholder="ID Guru" />
      <input value={kelasId} onChange={(e) => setKelasId(e.target.value)} placeholder="ID Kelas" />
      <input value={mapelId} onChange={(e) => setMapelId(e.target.value)} placeholder="ID Mapel" />
      <input value={hari} onChange={(e) => setHari(e.target.value)} placeholder="Hari" />
      <input value={jamMulai} onChange={(e) => setJamMulai(e.target.value)} placeholder="Jam Mulai" type="time" />
      <input value={jamSelesai} onChange={(e) => setJamSelesai(e.target.value)} placeholder="Jam Selesai" type="time" />
      <button type="submit">Tambah Jadwal</button>
    </form>
  );
};

export default PegawaiJadwalForm;
