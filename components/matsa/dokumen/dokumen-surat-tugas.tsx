"use client"

import { useState } from "react"



export default function GenerateSuratTugas() {
    const [formData, setFormData] = useState({
        nomor: "",
        tanggal: new Date().toISOString().split("T")[0],
        nama: "",
        jabatan: "",
        tujuan: "",
        keperluan: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Generate Surat:", formData)
        // TODO: Simpan ke Supabase atau tampilkan preview PDF
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Generate Surat Tugas</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Nomor Surat</label>
                    <input
                        type="text"
                        name="nomor"
                        value={formData.nomor}
                        onChange={handleChange}
                        placeholder="SK-001/2025"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Tanggal</label>
                    <input
                        type="date"
                        name="tanggal"
                        value={formData.tanggal}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Nama Pegawai</label>
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleChange}
                        placeholder="Budi Santoso"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Jabatan</label>
                    <input
                        type="text"
                        name="jabatan"
                        value={formData.jabatan}
                        onChange={handleChange}
                        placeholder="Guru Matematika"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Tujuan Penugasan</label>
                    <input
                        type="text"
                        name="tujuan"
                        value={formData.tujuan}
                        onChange={handleChange}
                        placeholder="Dinas Pendidikan Kota"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Keperluan</label>
                    <textarea
                        name="keperluan"
                        value={formData.keperluan}
                        onChange={handleChange}
                        placeholder="Mengikuti pelatihan peningkatan kompetensi guru"
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Generate Surat
                    </button>
                </div>
            </form>
        </div>
    )
}
