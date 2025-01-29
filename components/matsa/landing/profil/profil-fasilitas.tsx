import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

const facilities = [
    {
        title: "Ruang Kelas",
        description: "Fasilitas ruang kelas yang nyaman dengan fasilitas multimedia dan akses Wi-Fi.",
        icon: "📚"
    },
    {
        title: "Laboratorium",
        description: "Laboratorium IPA yang lengkap dengan alat-alat praktikum modern.",
        icon: "🔬"
    },
    {
        title: "Perpustakaan",
        description: "Perpustakaan dengan koleksi buku yang lengkap untuk menunjang pembelajaran.",
        icon: "📖"
    },
    {
        title: "Lapangan Olahraga",
        description: "Fasilitas lapangan olahraga untuk mendukung kegiatan ekstrakurikuler.",
        icon: "⚽"
    },
    {
        title: "Kantin",
        description: "Kantin yang menyediakan makanan sehat dan bergizi untuk siswa.",
        icon: "🍱"
    },
    {
        title: "Ruang UKS",
        description: "Ruang UKS dengan fasilitas kesehatan untuk menjaga kesejahteraan siswa.",
        icon: "🏥"
    }
];

const ProfilFasilitas = async () => {

    return (
        <section className="mt-8 bg-sky-300">
            <div className="matsa-wrapper px-8 flex flex-col justify-center">

                <h2 className='text-4xl font-bold pt-10 text-center mb-8'>Fasilitas Madrasah</h2>
                <div className="card-clouds grid grid-cols-1 md:grid-cols-3 gap-5">
                    {facilities.map((facility, index) => (

                        <Card key={index}>
                            <CardContent className="flex items-center p-5 h-full">
                                <div className="mr-8 md:text-4xl">{facility.icon}</div>
                                <div className="flex-col">
                                    <h3 className="font-bold tex-lg">{facility.title}</h3>
                                    <desc className="text-sm">{facility.description}</desc>
                                </div>
                            </CardContent>
                        </Card>


                    ))}

                </div>

            </div>
            <div className="grid grid-cols-2 gap-1 mt-4 min-h-16">
                <div className="bg-yellow-200">Ekstrakurikuler</div>
                <div className="bg-yellow-200">Program dan Kegiatan</div>

            </div>
        </section>
    );
};

export default ProfilFasilitas;