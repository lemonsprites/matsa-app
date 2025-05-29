// app/admin/dokumen-analytics/page.tsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, LineChart, Line } from "recharts"
import { FileText, BarChart3, Clock3 } from "lucide-react"

const docStats = {
    total: 128,
    categories: [
        { name: "Surat", count: 34 },
        { name: "Notulen", count: 22 },
        { name: "Laporan", count: 41 },
        { name: "Instruksi", count: 31 },
    ],
    uploads: [
        { month: "Jan", count: 10 },
        { month: "Feb", count: 15 },
        { month: "Mar", count: 20 },
        { month: "Apr", count: 18 },
        { month: "May", count: 25 },
    ],
    topDocs: [
        { title: "Panduan Operasional", views: 120 },
        { title: "Rapat Evaluasi", views: 89 },
        { title: "Instruksi Semester", views: 76 },
    ],
}

export default function SuratOverview() {
    return (
        <div className="grid gap-6 p-6">
            <h1 className="text-2xl font-bold">Analitik Dokumen</h1>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <FileText className="w-6 h-6 text-blue-600" />
                        <div>
                            <p className="text-sm text-muted-foreground">Total Dokumen</p>
                            <p className="text-xl font-semibold">{docStats.total}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <BarChart3 className="w-6 h-6 text-green-600" />
                        <div>
                            <p className="text-sm text-muted-foreground">Kategori Terbanyak</p>
                            <p className="text-xl font-semibold">
                                {
                                    docStats.categories.reduce((prev, curr) => (curr.count > prev.count ? curr : prev)).name
                                }
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <Clock3 className="w-6 h-6 text-orange-600" />
                        <div>
                            <p className="text-sm text-muted-foreground">Unggahan Bulan Ini</p>
                            <p className="text-xl font-semibold">{docStats.uploads.at(-1)?.count}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Upload Trend Chart */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Tren Unggahan Dokumen</h2>
                    <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={docStats.uploads}>
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Dokumen Paling Banyak Diakses */}
            <Card>
                <CardContent className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Dokumen Paling Banyak Diakses</h2>
                    <ul className="space-y-2">
                        {docStats.topDocs.map((doc, idx) => (
                            <li key={idx} className="flex justify-between border-b pb-1">
                                <span>{doc.title}</span>
                                <span className="text-muted-foreground">{doc.views} views</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
