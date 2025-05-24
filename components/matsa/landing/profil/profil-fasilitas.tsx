import BackgoundButton from "@/components/matsa/landing/profil/components/button-background";
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
        <section className="mt-8 bg-gradient-to-r from-sky-300 via-cyan-300 to-teal-300 text-gray-900">
            <div className="matsa-wrapper px-8 flex flex-col justify-center mb-12">

                <h2 className='text-4xl font-bold pt-10 text-center mb-8'>Fasilitas Madrasah</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                    {facilities.map((f, i) => (
                        <div
                            key={i}
                            className="p-6 bg-white/30 rounded-2xl bg-white backdrop-blur-md shadow-lg cursor-pointer transition-transform hover:scale-105 hover:shadow-2xl flex flex-col items-center text-center"
                        >
                            <div className="text-5xl mb-4">{f.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                            <p className="text-gray-700">{f.description}</p>
                        </div>
                    ))}
                </div>


            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 min-h-16">
                <span className="text-center col-span-2 text-2xl text-black/75 font-bold mb-6">Informasi Lebih Lanjut</span>
                <BackgoundButton
                    navRoute="/pendidik"
                    imageURL="http://localhost:3000/_next/image?url=%2Fimg%2Fprofil-banner.png&w=1920&q=75"
                    text="Ekstrakurikuler"
                />
                <BackgoundButton
                    navRoute="/program-kegiatan"
                    imageURL="http://localhost:3000/_next/image?url=%2Fimg%2Fprofil-banner.png&w=1920&q=75"
                    text="Program dan Kegiatan"
                />


            </div>
        </section>
    );
};

export default ProfilFasilitas;