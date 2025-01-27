import LogoMTs from "@/assets/img/logo-putih-out-text.svg";

const LandingFooter = () => {
  const thProd = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-white pt-8">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 matsa-wrapper">
        {/* Contact Information */}
        <div>
          <img
            loading="lazy"
            decoding="async"
            width="320"
            src={LogoMTs}
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
      </div>

      {/* Copyright Section */}
      <div className="bg-gray-800 text-center py-4 mt-8">
        <p className="text-xs sm:text-sm">
          Copyright &copy; {thProd}, Madrasah Tsanawiyah Negeri 1 Ciamis. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default LandingFooter;
