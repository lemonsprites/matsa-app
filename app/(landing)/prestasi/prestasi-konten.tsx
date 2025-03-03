"use client";

import { useState } from "react";
import Masonry from "react-masonry-css";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { User, Users } from "lucide-react"; // Icon untuk individu & tim

type Prestasi = {
    id: number;
    nama: string;
    kategori: "Akademik" | "Seni" | "Olahraga";
    tahun: number;
    siswa: string[];
    ekskul: string;
    image: string;
    deskripsi: string;
    tipe: "individu" | "tim";
};

const prestasi: Prestasi[] = [
    // 🔹 Akademik - Individu
    { id: 1, nama: "Juara 1 Olimpiade Matematika", kategori: "Akademik", tahun: 2024, siswa: ["Ahmad Fauzan"], ekskul: "Olimpiade Sains", image: "/images/prestasi-1.jpg", deskripsi: "Siswa berhasil meraih juara dalam kompetisi tingkat nasional.", tipe: "individu" },
    { id: 2, nama: "Juara 2 Olimpiade Fisika", kategori: "Akademik", tahun: 2023, siswa: ["Budi Santoso"], ekskul: "Olimpiade Sains", image: "/images/prestasi-2.jpg", deskripsi: "Siswa meraih juara dalam olimpiade fisika tingkat provinsi.", tipe: "individu" },
    { id: 3, nama: "Juara 3 Lomba Pidato Bahasa Inggris", kategori: "Akademik", tahun: 2022, siswa: ["Citra Maharani"], ekskul: "Pidato & Debat", image: "/images/prestasi-3.jpg", deskripsi: "Memenangkan kompetisi pidato dalam bahasa Inggris.", tipe: "individu" },

    // 🔹 Akademik - Tim
    { id: 4, nama: "Juara 1 Debat Bahasa Indonesia", kategori: "Akademik", tahun: 2024, siswa: ["Tim Debat MTsN 1 Ciamis"], ekskul: "Pidato & Debat", image: "/images/prestasi-4.jpg", deskripsi: "Tim debat berhasil menjuarai lomba tingkat nasional.", tipe: "tim" },
    { id: 5, nama: "Juara 2 Lomba Karya Ilmiah Remaja", kategori: "Akademik", tahun: 2023, siswa: ["Tim KIR MTsN 1 Ciamis"], ekskul: "Karya Ilmiah Remaja", image: "/images/prestasi-5.jpg", deskripsi: "Tim berhasil membuat karya ilmiah terbaik.", tipe: "tim" },

    // 🔹 Seni - Individu
    { id: 6, nama: "Juara 1 Lomba Tari Tradisional", kategori: "Seni", tahun: 2023, siswa: ["Dewi Anggraini"], ekskul: "Tari Tradisional", image: "/images/prestasi-6.jpg", deskripsi: "Memenangkan kompetisi tari tingkat nasional.", tipe: "individu" },
    { id: 7, nama: "Juara 2 Lomba Melukis", kategori: "Seni", tahun: 2022, siswa: ["Rizky Ardiansyah"], ekskul: "Seni Rupa", image: "/images/prestasi-7.jpg", deskripsi: "Memenangkan lomba melukis antar sekolah.", tipe: "individu" },

    // 🔹 Seni - Tim
    { id: 8, nama: "Juara 1 Lomba Paduan Suara", kategori: "Seni", tahun: 2024, siswa: ["Tim Paduan Suara"], ekskul: "Paduan Suara", image: "/images/prestasi-8.jpg", deskripsi: "Tim paduan suara menampilkan harmoni terbaik.", tipe: "tim" },
    { id: 9, nama: "Juara 2 Lomba Teater", kategori: "Seni", tahun: 2023, siswa: ["Tim Teater"], ekskul: "Teater", image: "/images/prestasi-9.jpg", deskripsi: "Tim berhasil menampilkan drama terbaik.", tipe: "tim" },

    // 🔹 Olahraga - Individu
    { id: 10, nama: "Juara 1 Lomba Catur Nasional", kategori: "Olahraga", tahun: 2024, siswa: ["Bagas Pratama"], ekskul: "Catur", image: "/images/prestasi-10.jpg", deskripsi: "Menampilkan strategi terbaik dalam kompetisi catur nasional.", tipe: "individu" },
    { id: 11, nama: "Juara 2 Lomba Renang 100m", kategori: "Olahraga", tahun: 2023, siswa: ["Rina Astuti"], ekskul: "Renang", image: "/images/prestasi-11.jpg", deskripsi: "Berhasil memenangkan lomba renang gaya bebas.", tipe: "individu" },

    // 🔹 Olahraga - Tim
    { id: 12, nama: "Juara 1 Kejuaraan Futsal", kategori: "Olahraga", tahun: 2025, siswa: ["Tim Futsal MTsN 1 Ciamis"], ekskul: "Futsal", image: "/images/prestasi-12.jpg", deskripsi: "Tim futsal sukses menjuarai turnamen provinsi.", tipe: "tim" },
    { id: 13, nama: "Juara 2 Lomba Basket Antar Sekolah", kategori: "Olahraga", tahun: 2024, siswa: ["Tim Basket"], ekskul: "Basket", image: "/images/prestasi-13.jpg", deskripsi: "Menampilkan permainan basket luar biasa.", tipe: "tim" },

    // 🔹 Tambahan Dummy Data hingga 50 Prestasi
];


const breakpointColumnsObj: Record<string, number> = {
    default: 3,
    1100: 2,
    768: 1,
};

const PrestasiMasonry: React.FC = () => {
    const [selectedPrestasi, setSelectedPrestasi] = useState<Prestasi | null>(null);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">🏆 Prestasi Madrasah</h1>

            {/* Masonry Grid */}
            <Masonry breakpointCols={breakpointColumnsObj} className="flex gap-6" columnClassName="masonry-column">
                {prestasi.map((item) => (
                    <Card key={item.id} className="cursor-pointer hover:shadow-lg transition" onClick={() => setSelectedPrestasi(item)}>
                        <Image src={item.image} width={300} height={200} alt={item.nama} className="w-full h-48 object-cover rounded-t-md" />
                        <CardHeader className="pb-2 flex flex-row justify-between items-center">
                            <CardTitle className="text-lg">{item.nama}</CardTitle>
                            {item.tipe === "individu" ? <User className="text-gray-500 w-5 h-5" /> : <Users className="text-gray-500 w-5 h-5" />}
                        </CardHeader>
                        <CardContent>
                            <Badge variant={item.kategori === "Akademik" ? "default" : item.kategori === "Seni" ? "secondary" : "outline"}>
                                {item.kategori}
                            </Badge>
                            <p className="text-sm text-gray-600 mt-2">{item.tahun}</p>
                        </CardContent>
                    </Card>
                ))}
            </Masonry>

            {/* Dialog Detail Prestasi */}
            <Dialog open={!!selectedPrestasi} onOpenChange={() => setSelectedPrestasi(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{selectedPrestasi?.nama}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-3">
                        {selectedPrestasi?.image && (
                            <Image src={selectedPrestasi.image} width={500} height={300} alt={selectedPrestasi.nama} className="w-full h-40 object-cover rounded-md" />
                        )}
                        <div className="flex flex-wrap gap-2">
                            <Badge>{selectedPrestasi?.kategori}</Badge>
                            <Badge variant="secondary">{selectedPrestasi?.tahun}</Badge>
                            <Badge variant="outline">Ekskul: {selectedPrestasi?.ekskul}</Badge>
                        </div>
                        <p className="text-sm text-gray-700">{selectedPrestasi?.deskripsi}</p>
                        <div>
                            <h3 className="font-semibold mt-2">👨‍🎓 Siswa Terlibat:</h3>
                            <ul className="list-disc ml-5 text-sm text-gray-600">
                                {selectedPrestasi?.siswa.map((nama, index) => (
                                    <li key={index}>{nama}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default PrestasiMasonry;
