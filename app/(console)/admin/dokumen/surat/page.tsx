"use client"

import { useState, useRef } from "react"
import { format } from "date-fns"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { createRef } from "react"
import { SuratTugasPDF } from "@/components/pdf/pdf-surat-tugas"
import { pdf } from "@react-pdf/renderer"


type SuratTugas = {
    id: number
    nomor: string
    tanggal: string
    nama: string
    jabatan: string
    tujuan: string
    keperluan: string
}

export default function SuratTugasPage() {
    const [formData, setFormData] = useState<Omit<SuratTugas, "id">>({
        nomor: "",
        tanggal: new Date().toISOString().split("T")[0],
        nama: "",
        jabatan: "",
        tujuan: "",
        keperluan: "",
    })

    const [daftarSurat, setDaftarSurat] = useState<SuratTugas[]>([
        {
            id: 1,
            nomor: "ST-001/2025",
            tanggal: "2025-05-20",
            nama: "Ahmad Zaki",
            jabatan: "Kepala Sekolah",
            tujuan: "Dinas Pendidikan",
            keperluan: "Rapat koordinasi bulanan",
        },
    ])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newSurat: SuratTugas = {
            id: Date.now(),
            ...formData,
        }
        setDaftarSurat((prev) => [newSurat, ...prev])
        setFormData({
            nomor: "",
            tanggal: new Date().toISOString().split("T")[0],
            nama: "",
            jabatan: "",
            tujuan: "",
            keperluan: "",
        })
    }

    const handleGenerate = async (surat: SuratTugas) => {
        const blob = await pdf(<SuratTugasPDF data={surat} />).toBlob()
        const url = URL.createObjectURL(blob)
        window.open(url)
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">Manajemen Surat Tugas</h1>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid gap-4 mb-8 bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-2">Generate Surat Tugas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input name="nomor" type="text" value={formData.nomor} onChange={handleChange} placeholder="Nomor Surat" className="border px-3 py-2 rounded" required />
                    <input name="tanggal" type="date" value={formData.tanggal} onChange={handleChange} className="border px-3 py-2 rounded" required />
                    <input name="nama" type="text" value={formData.nama} onChange={handleChange} placeholder="Nama Pegawai" className="border px-3 py-2 rounded" required />
                    <input name="jabatan" type="text" value={formData.jabatan} onChange={handleChange} placeholder="Jabatan" className="border px-3 py-2 rounded" required />
                    <input name="tujuan" type="text" value={formData.tujuan} onChange={handleChange} placeholder="Tujuan Penugasan" className="border px-3 py-2 rounded" required />
                    <textarea name="keperluan" value={formData.keperluan} onChange={handleChange} placeholder="Keperluan" className="border px-3 py-2 rounded md:col-span-2" required />
                </div>
                <div className="pt-2">
                    <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Simpan Surat</button>
                </div>
            </form>

            {/* Tabel */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Daftar Surat Tugas</h2>
                <table className="w-full border text-sm">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="border px-3 py-2">#</th>
                            <th className="border px-3 py-2">Nomor</th>
                            <th className="border px-3 py-2">Tanggal</th>
                            <th className="border px-3 py-2">Nama</th>
                            <th className="border px-3 py-2">Tujuan</th>
                            <th className="border px-3 py-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {daftarSurat.map((surat, idx) => (
                            <tr key={surat.id} className="hover:bg-gray-50">
                                <td className="border px-3 py-2">{idx + 1}</td>
                                <td className="border px-3 py-2">{surat.nomor}</td>
                                <td className="border px-3 py-2">{format(new Date(surat.tanggal), "dd MMM yyyy")}</td>
                                <td className="border px-3 py-2">{surat.nama}</td>
                                <td className="border px-3 py-2">{surat.tujuan}</td>
                                <td className="border px-3 py-2">
                                    <button
                                        onClick={() => handleGenerate(surat)}
                                        className="text-blue-600 hover:underline"
                                    >
                                        PDF
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {daftarSurat.length === 0 && (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    Belum ada surat tugas.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
