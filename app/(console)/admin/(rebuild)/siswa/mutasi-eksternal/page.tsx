'use client';

import { useState } from 'react';

type Mutasi = {
    id: string;
    nama: string;
    nisn: string;
    jenis: 'Masuk' | 'Keluar';
    asalTujuan: string;
    tanggal: string;
    suratUrl: string;
};

const MutasiSiswa = () => {
    const [mutasiList, setMutasiList] = useState<Mutasi[]>([]);
    const [form, setForm] = useState({
        nama: '',
        nisn: '',
        jenis: 'Masuk' as 'Masuk' | 'Keluar',
        asalTujuan: '',
        tanggal: '',
    });
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = () => {
        const newMutasi: Mutasi = {
            id: Date.now().toString(),
            ...form,
            suratUrl: '/surat-placeholder.pdf', // Nanti diganti dengan URL dari backend
        };
        setMutasiList((prev) => [newMutasi, ...prev]);
        setForm({ nama: '', nisn: '', jenis: 'Masuk', asalTujuan: '', tanggal: '' });
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-white rounded-xl border shadow-md">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Manajemen Mutasi Siswa</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Tambah Mutasi
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-50 p-4 mb-6 rounded border">
                    <h3 className="font-semibold text-lg mb-2">Form Mutasi Siswa</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            placeholder="Nama Siswa"
                            value={form.nama}
                            onChange={(e) => setForm({ ...form, nama: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            placeholder="NISN"
                            value={form.nisn}
                            onChange={(e) => setForm({ ...form, nisn: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                        <select
                            value={form.jenis}
                            onChange={(e) => setForm({ ...form, jenis: e.target.value as 'Masuk' | 'Keluar' })}
                            className="border px-3 py-2 rounded"
                        >
                            <option value="Masuk">Mutasi Masuk</option>
                            <option value="Keluar">Mutasi Keluar</option>
                        </select>
                        <input
                            placeholder="Asal / Tujuan Madrasah"
                            value={form.asalTujuan}
                            onChange={(e) => setForm({ ...form, asalTujuan: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            type="date"
                            value={form.tanggal}
                            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                    >
                        Simpan Mutasi
                    </button>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-3 py-2">Nama</th>
                            <th className="border px-3 py-2">NISN</th>
                            <th className="border px-3 py-2">Jenis Mutasi</th>
                            <th className="border px-3 py-2">Asal / Tujuan</th>
                            <th className="border px-3 py-2">Tanggal</th>
                            <th className="border px-3 py-2">Surat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mutasiList.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-2">{m.nama}</td>
                                <td className="border px-3 py-2">{m.nisn}</td>
                                <td className="border px-3 py-2">{m.jenis}</td>
                                <td className="border px-3 py-2">{m.asalTujuan}</td>
                                <td className="border px-3 py-2">{m.tanggal}</td>
                                <td className="border px-3 py-2">
                                    <a
                                        href={m.suratUrl}
                                        target="_blank"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Lihat Surat
                                    </a>
                                </td>
                            </tr>
                        ))}
                        {mutasiList.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    Belum ada data mutasi.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MutasiSiswa;
