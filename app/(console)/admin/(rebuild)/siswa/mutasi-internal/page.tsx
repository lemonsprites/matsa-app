'use client';

import { useState } from 'react';

type MutasiKelas = {
    id: string;
    nama: string;
    nisn: string;
    dari_kelas: string;
    ke_kelas: string;
    tanggal: string;
    alasan: string;
};

const MutasiKelasSiswa = () => {
    const [mutasiList, setMutasiList] = useState<MutasiKelas[]>([]);
    const [form, setForm] = useState({
        nama: '',
        nisn: '',
        dari_kelas: '',
        ke_kelas: '',
        tanggal: '',
        alasan: '',
    });
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = () => {
        const newMutasi: MutasiKelas = {
            id: Date.now().toString(),
            ...form,
        };
        setMutasiList((prev) => [newMutasi, ...prev]);
        setForm({
            nama: '',
            nisn: '',
            dari_kelas: '',
            ke_kelas: '',
            tanggal: '',
            alasan: '',
        });
        setShowForm(false);
    };

    return (
        <div className="p-6 bg-white rounded-xl border shadow-md">
            <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold">Manajemen Mutasi Kelas Siswa</h2>
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    + Mutasi Kelas
                </button>
            </div>

            {showForm && (
                <div className="bg-gray-50 p-4 mb-6 rounded border">
                    <h3 className="font-semibold text-lg mb-2">Form Mutasi Kelas</h3>
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
                        <input
                            placeholder="Dari Kelas"
                            value={form.dari_kelas}
                            onChange={(e) => setForm({ ...form, dari_kelas: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            placeholder="Ke Kelas"
                            value={form.ke_kelas}
                            onChange={(e) => setForm({ ...form, ke_kelas: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            type="date"
                            value={form.tanggal}
                            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                            className="border px-3 py-2 rounded"
                        />
                        <input
                            placeholder="Alasan (opsional)"
                            value={form.alasan}
                            onChange={(e) => setForm({ ...form, alasan: e.target.value })}
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
                            <th className="border px-3 py-2">Dari Kelas</th>
                            <th className="border px-3 py-2">Ke Kelas</th>
                            <th className="border px-3 py-2">Tanggal</th>
                            <th className="border px-3 py-2">Alasan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {mutasiList.map((m) => (
                            <tr key={m.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-2">{m.nama}</td>
                                <td className="border px-3 py-2">{m.nisn}</td>
                                <td className="border px-3 py-2">{m.dari_kelas}</td>
                                <td className="border px-3 py-2">{m.ke_kelas}</td>
                                <td className="border px-3 py-2">{m.tanggal}</td>
                                <td className="border px-3 py-2">{m.alasan || '-'}</td>
                            </tr>
                        ))}
                        {mutasiList.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4">
                                    Belum ada data mutasi kelas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MutasiKelasSiswa;
