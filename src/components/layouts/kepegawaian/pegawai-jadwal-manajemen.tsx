import supabase from '@/lib/supabase-client';
import React, { useState, useEffect } from 'react';

const PegawaiJadwalManajemen = () => {
    const [pegawai, setPegawai] = useState<any[]>([]);
    const [kelas, setKelas] = useState<any[]>([]);
    const [mapel, setMapel] = useState<any[]>([]);
    const [form, setForm] = useState({
        id_pegawai: '',
        id_mapel: '',
        id_kelas: '',
        hari: '',
        jam_slot: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            const { data: pegawaiData } = await supabase.from('tb_pegawai').select('*');
            const { data: kelasData } = await supabase.from('tb_kelas').select('*');
            const { data: mapelData } = await supabase.from('tb_mapel').select('*');
            setPegawai(pegawaiData || []);
            setKelas(kelasData || []);
            setMapel(mapelData || []);
        };
        fetchData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('tb_jadwal').insert([form]);
        if (error) alert('Error adding schedule: ' + error.message);
        else alert('Schedule added successfully!');
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <h1 className="text-xl font-bold mb-4">Tambah Jadwal Pelajaran</h1>
            <div className="mb-4">
                <label>Pegawai:</label>
                <select name="id_pegawai" onChange={handleChange}>
                    <option value="">Pilih Pegawai</option>
                    {pegawai.map((pgw) => (
                        <option key={pgw.id} value={pgw.id}>
                            {pgw.nama}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label>Kelas:</label>
                <select name="id_kelas" onChange={handleChange}>
                    <option value="">Pilih Kelas</option>
                    {kelas.map((kls) => (
                        <option key={kls.id} value={kls.id}>
                            {kls.nama}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label>Mata Pelajaran:</label>
                <select name="id_mapel" onChange={handleChange}>
                    <option value="">Pilih Mapel</option>
                    {mapel.map((mpl) => (
                        <option key={mpl.id} value={mpl.id}>
                            {mpl.nama}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label>Hari:</label>
                <select name="hari" onChange={handleChange}>
                    <option value="">Pilih Hari</option>
                    {['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'].map((hari) => (
                        <option key={hari} value={hari}>
                            {hari}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label>Jam Slot:</label>
                <input
                    type="number"
                    name="jam_slot"
                    min="1"
                    max="10"
                    onChange={handleChange}
                    placeholder="Jam ke-"
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Tambah Jadwal
            </button>
        </form>
    );
};

export default PegawaiJadwalManajemen;
