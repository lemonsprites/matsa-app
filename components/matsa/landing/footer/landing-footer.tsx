import NextLogo from "@/components/matsa/landing/footer/next-logo";
import SupabaseLogo from "@/components/matsa/landing/footer/supabase-logo";
import logoMadrasahPutih from "@/public/img/logo-putih-out-text.svg";


const LandingFooter = () => {
    const thProd = new Date().getFullYear();
    return (
        <footer className="bg-gray-900 text-white pt-8 border-t-4 border-yellow-300">
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 matsa-wrapper">
                {/* Contact Information */}
                <div>
                    <img
                        loading="lazy"
                        decoding="async"
                        width="320"
                        src={logoMadrasahPutih.src}
                        alt="MTsN 1 Ciamis Logo"
                        className="mb-4 mr-4 w-40 sm:w-48"
                    />
                    <p className="mb-5 text-sm sm:text-base">
                        <br /> Jl. Panyingkiran No. 70, Panyingkiran
                        <br /> Kec. Ciamis, Kab. Ciamis
                        <br /> Jawa Barat 46211, Indonesia
                    </p>
                    <p className="text-sm sm:text-base">
                        Telepon: (+62265) 772729
                        <br /> WhatsApp: -
                        <br /> Email: mtsn1ciamis@yahoo.com
                    </p>
                </div>

                {/* Akademik Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Akademik</h3>
                    <ul className="space-y-2 flex flex-col">
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Organisasi Intra Sekolah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Gerakan Disiplin Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Tim Adiwiyata Madrasah
                            </a>
                        </li>
                    </ul>
                </div>

                {/* About Faculty Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Tentang Madrasah</h3>
                    <ul className="space-y-2 flex flex-col">
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Sejarah Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Repositori
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Profil Dewan Guru
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Contact Us Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Hubungi Kami</h3>
                    <ul className="space-y-2 flex flex-col">
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Kunjungan Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Denah Madrasah
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline text-sm sm:text-base">
                                Sitemap
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="flex gap-8 justify-start items-center">
                    <div className="flex flex-col">
                        <span>Dibangun dengan:</span>
                        <div className="flex gap-8 items-center">
                            <a
                                href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <SupabaseLogo />
                            </a>
                            <span className="border-l rotate-45 h-6" />
                            <a href="https://nextjs.org/" target="_blank" rel="noreferrer">
                                <NextLogo />
                            </a>
                        </div>
                    </div>
                </div>
            </div>


            {/* Copyright Section */}
            <div className="bg-gray-800 text-center py-4">
                <p className="text-xs sm:text-sm">
                    Copyright &copy; {thProd}, Madrasah Tsanawiyah Negeri 1 Ciamis. All
                    Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default LandingFooter