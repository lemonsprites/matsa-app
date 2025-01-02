import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ZonaIntegritasPop: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Untuk transisi

    useEffect(() => {
        // Cek apakah cookie sudah ada
        const popupSeen = Cookies.get("integrity_zone_popup");
        if (!popupSeen) {
            setIsOpen(true); // Tampilkan popup jika belum ada cookie
            document.body.style.overflow = "hidden";
            setTimeout(() => setIsVisible(true), 50); // Tambahkan sedikit delay untuk animasi fade in
        }
    }, []);

    const handleConfirm = () => {
        setIsVisible(false); // Mulai fade out
        document.body.style.overflow = "inherit";
        setTimeout(() => {
            Cookies.set("integrity_zone_popup", "true", { expires: 1 }); // Cookie berlaku 1 hari
            setIsOpen(false); // Tutup popup setelah animasi selesai
        }, 300); // Sesuaikan dengan durasi animasi
    };

    if (!isOpen) return null; // Jika popup tidak perlu ditampilkan

    return (
        <div
            id="popup"
            className={`fixed inset-0 bg-blue-900 bg-opacity-95 flex items-center justify-center text-center text-white z-50 transition-opacity duration-300 ${
                isVisible ? "opacity-100" : "opacity-0"
            }`}
        >
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-4">Selamat Datang!</h1>
                <p className="text-lg mb-6">
                    Anda telah memasuki <span className="font-semibold">Layanan Zona Integritas</span> menuju Wilayah Bebas dari Korupsi (WBK) dan Wilayah Birokrasi Bersih Melayani (WBBM).
                </p>
                <div className="flex justify-center space-x-4">
                    <button
                        id="proceed-btn"
                        className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition"
                        onClick={handleConfirm}
                    >
                        Masuk ke Layanan
                    </button>
                    <button
                        id="info-btn"
                        className="bg-yellow-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition"
                    >
                        Informasi Lebih Lanjut
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ZonaIntegritasPop;
