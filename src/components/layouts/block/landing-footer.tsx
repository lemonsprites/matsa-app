import LogoMTs from "@/assets/img/logo-putih-out-text.svg";


const LandingFooter = () => {

    const thProd = new Date().getFullYear()
    return (
        <footer className="bg-gray-900 text-white pt-8">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 matsa-wrapper">
                {/* Contact Information */}
                <div>

                    <img
                        loading="lazy"
                        decoding="async"
                        width="320"
                        src={LogoMTs}
                        alt="MTsN 1 Ciamis Logo"
                        className="mb-4 mr-4"
                    />

                    <p className="mb-5">
                        <br /> Jl. Panyingkiran No. 70, Panyingkiran
                        <br /> Kec. Ciamis, Kab. Ciamis
                        <br /> Jawa Barat 46211, Indonesia
                    </p>
                    <p>
                        Telepon: (+62265) 772729
                        <br /> WhatsApp: -
                        <br /> Email: mtsn1ciamis@yahoo.com
                    </p>
                </div>

                {/* Akademik Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Akademik</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Organisasi Intra Sekolah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Gerakan Disiplin Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Tim Adiwiyata Madrasah
                            </a>
                        </li>
                    </ul>
                </div>

                {/* About Faculty Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Tentang Madrasah</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Sejarah Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Repositori
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Profil Dewan Guru
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Us Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                    <ul className="space-y-2">
                        <li>
                            <a href="#" className="hover:underline">
                                Kunjungan Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Denah Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">
                                Sitemap
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="bg-gray-800 text-center py-4 mt-8">
                <p className="text-sm">Copyright © {thProd}, Madrasah Tsanawiyah Negeri 1 Ciamis. All Rights Reserved.</p>
            </div>
        </footer>
    )
}

export default LandingFooter