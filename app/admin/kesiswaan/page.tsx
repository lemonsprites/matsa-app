'use client'

import AdminContent from '@/components/matsa/admin/admin-content'
import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

interface Siswa {
  id: string
  nama: string
  nis: string
  kelas: string
  jenis_kelamin: string
  tahun_ajaran: string
}

// Dummy data
const dummySiswa: Siswa[] = [
  { id: '1', nama: 'Ali Akbar', nis: '12345', kelas: 'VII A', jenis_kelamin: 'Laki-laki', tahun_ajaran: '2022/2023' },
  { id: '2', nama: 'Siti Nurhaliza', nis: '12346', kelas: 'VII A', jenis_kelamin: 'Perempuan', tahun_ajaran: '2022/2023' },
  { id: '3', nama: 'Budi Santoso', nis: '12347', kelas: 'VII B', jenis_kelamin: 'Laki-laki', tahun_ajaran: '2023/2024' },
  { id: '4', nama: 'Intan Permata', nis: '12348', kelas: 'VII B', jenis_kelamin: 'Perempuan', tahun_ajaran: '2023/2024' },
  { id: '5', nama: 'Dina Lestari', nis: '12349', kelas: 'VII C', jenis_kelamin: 'Perempuan', tahun_ajaran: '2023/2024' },
]

const Siswa: NextPage = () => {
  const [data, setData] = useState<Siswa[]>([])

  useEffect(() => {
    setData(dummySiswa) // Ganti dengan ambil dari Supabase
  }, [])

  // Generate chart data
  const chartData = Object.entries(
    data.reduce<Record<string, { laki: number; perempuan: number }>>((acc, curr) => {
      const tahun = curr.tahun_ajaran
      if (!acc[tahun]) acc[tahun] = { laki: 0, perempuan: 0 }

      if (curr.jenis_kelamin === 'Laki-laki') acc[tahun].laki++
      else if (curr.jenis_kelamin === 'Perempuan') acc[tahun].perempuan++

      return acc
    }, {})
  ).map(([tahun_ajaran, count]) => ({
    tahun_ajaran,
    Laki: count.laki,
    Perempuan: count.perempuan,
  }))

  return (
    <AdminContent title="Overview Siswa">
      {/* Ringkasan */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Siswa</p>
          <h3 className="text-xl font-semibold">{data.length}</h3>
        </div>
        <div className="bg-white border shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Laki-laki</p>
          <h3 className="text-xl font-semibold">{data.filter((s) => s.jenis_kelamin === 'Laki-laki').length}</h3>
        </div>
        <div className="bg-white border shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Perempuan</p>
          <h3 className="text-xl font-semibold">{data.filter((s) => s.jenis_kelamin === 'Perempuan').length}</h3>
        </div>
      </div>

      {/* Grafik Per Tahun Ajaran */}
      <div className="bg-white border rounded-xl shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Perkembangan Siswa per Tahun Ajaran</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tahun_ajaran" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="Laki" fill="#3B82F6" />
            <Bar dataKey="Perempuan" fill="#F472B6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto bg-white rounded-xl shadow border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left border">NIS</th>
              <th className="px-4 py-2 text-left border">Nama</th>
              <th className="px-4 py-2 text-left border">Kelas</th>
              <th className="px-4 py-2 text-left border">Jenis Kelamin</th>
              <th className="px-4 py-2 text-left border">Tahun Ajaran</th>
              <th className="px-4 py-2 text-left border">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((siswa) => (
              <tr key={siswa.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border">{siswa.nis}</td>
                <td className="px-4 py-2 border">{siswa.nama}</td>
                <td className="px-4 py-2 border">{siswa.kelas}</td>
                <td className="px-4 py-2 border">{siswa.jenis_kelamin}</td>
                <td className="px-4 py-2 border">{siswa.tahun_ajaran}</td>
                <td className="px-4 py-2 border">
                  <button className="text-blue-600 hover:underline mr-2">Detail</button>
                  <button className="text-green-600 hover:underline">Edit</button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  Tidak ada data siswa ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminContent>
  )
}

export default Siswa
