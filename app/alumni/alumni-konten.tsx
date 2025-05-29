"use client"
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

// Dummy data
const alumniData = [
    { name: "Ahmad Fadli", year: "2023", school: "SMA Negeri 1 Ciamis" },
    { name: "Siti Nurhaliza", year: "2022", school: "MA Al Hikmah" },
    { name: "Rizki Ramadhan", year: "2023", school: "SMK Negeri 2 Tasikmalaya" },
    { name: "Dewi Lestari", year: "2021", school: "SMA Negeri 3 Bandung" },
    { name: "Faisal Akbar", year: "2022", school: "MA Darussalam" },
    { name: "Nanda Prasetyo", year: "2023", school: "SMK PGRI Ciamis" },
];

const schoolStats = {
    "SMA Negeri 1 Ciamis": 5,
    "MA Al Hikmah": 3,
    "SMK Negeri 2 Tasikmalaya": 4,
    "SMA Negeri 3 Bandung": 2,
    "MA Darussalam": 3,
    "SMK PGRI Ciamis": 4,
};

const AlumniDashboard = () => {
    const [search, setSearch] = useState("");
    const [yearFilter, setYearFilter] = useState("all");

    const filteredAlumni = alumniData.filter((alumni) =>
        (yearFilter === "all" || alumni.year === yearFilter) &&
        alumni.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Alumni Madrasah</h1>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <Input
                    placeholder="Cari nama alumni..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Select onValueChange={setYearFilter}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Semua Tahun</SelectItem>
                        <SelectItem value="2023">2023</SelectItem>
                        <SelectItem value="2022">2022</SelectItem>
                        <SelectItem value="2021">2021</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Alumni List */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAlumni.map((alumni, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle>{alumni.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Tahun Lulus: {alumni.year}</p>
                            <p>Sekolah Tujuan: {alumni.school}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Alumni Statistics */}
            <div>
                <h2 className="text-2xl font-semibold mb-4">Statistik Sebaran Alumni</h2>
                <Bar
                    data={{
                        labels: Object.keys(schoolStats),
                        datasets: [
                            {
                                label: "Jumlah Alumni",
                                data: Object.values(schoolStats),
                                backgroundColor: "rgba(54, 162, 235, 0.6)",
                            },
                        ],
                    }}
                />
            </div>
        </div>
    );
};

export default AlumniDashboard;
