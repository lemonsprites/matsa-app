
import BannerZI from '@/assets/img/banner-zi-mtsn.jpg';
import AppSlot from '@/components/app-slot';
import IntegritasArtikel from '@/components/layouts/block/integritas-artikel';
import IntegritasDokumen from '@/components/layouts/block/integritas-dokumen';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ZonaIntegritas = ({ title }: any) => {
    const md = `**WBBM (Wilayah Birokrasi Bersih dan Melayani)** adalah predikat yang diberikan kepada instansi pemerintah yang berkomitmen untuk memberikan pelayanan yang cepat, tepat, efisien, dan ramah. MTsN 1 Ciamis menerapkan prinsip **WBBM** untuk meningkatkan pelayanan kepada siswa, orang tua, dan masyarakat. Inisiatif yang dilakukan antara lain:

- **Peningkatan Administrasi**: Penggunaan sistem digital untuk administrasi pendaftaran, ujian, dan pengumuman hasil belajar yang mudah diakses.
- **Layanan Informasi Terbuka**: Menyediakan informasi tentang kegiatan akademik dan kebijakan sekolah yang dapat diakses publik.
- **Sistem Pengaduan**: Memfasilitasi siswa dan orang tua memberikan masukan serta melaporkan keluhan terkait pelayanan sekolah.

Selain **WBBM**, MTsN 1 Ciamis juga berkomitmen untuk menerapkan **Zona Integritas (ZI)**, predikat untuk instansi yang serius dalam pencegahan korupsi dan peningkatan pelayanan publik. Implementasi **ZI** di MTsN 1 Ciamis meliputi pembentukan tim khusus, pelatihan anti-korupsi untuk siswa dan staf, serta fokus pada integritas dan akuntabilitas dalam layanan pendidikan.

Dengan penerapan **WBBM** dan **Zona Integritas**, MTsN 1 Ciamis berusaha menciptakan birokrasi yang bersih dan lingkungan pendidikan yang lebih profesional dan inklusif.
`;

    return (
        <AppSlot title={title}>
            <main className="matsa-wrapper px-4 sm:px-8">
                {/* Banner Section */}
                <div className="banner mb-5 mt-4">
                    <img src={BannerZI} className="w-full rounded-md" alt="Banner ZI" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-5">
                    {/* Left Section */}
                    <div className="col-span-1 lg:col-span-3 bg-blue-900 p-4 rounded-lg shadow-lg">
                        {/* Highlight Section */}
                        <div className="bg-yellow-400 p-4 rounded-md shadow-md mb-4">
                            <h6 className="text-xl font-bold text-gray-900 text-left leading-tight">
                                Membangun Birokrasi Bersih dan Melayani di MTsN 1 Ciamis: Implementasi WBBM dan Zona Integritas
                            </h6>
                        </div>

                        {/* Content Section */}
                        <div className="bg-gray-800 text-white p-6 rounded-md shadow-md prose w-full max-w-none mb-4">
                            <ReactMarkdown>{md}</ReactMarkdown>
                        </div>

                        {/* Image Section */}
                        <div className="flex justify-center">
                            <img
                                src="https://feb.ui.ac.id/uploads/2023/08/stop-gratifikasi.jpg"
                                alt="Stop Gratifikasi"
                                className="rounded-md shadow-md w-full lg:w-2/3"
                            />
                        </div>
                    </div>

                    {/* Right Section: Menu Pengungkit */}
                    <div className="col-span-1 lg:col-span-2 bg-yellow-400 p-4 rounded-lg shadow-lg text-justify">
                        <div className="bg-gradient-to-l from-blue-500 to-blue-700 p-4 rounded-lg flex items-center md:flex-row justify-between">
                            {/* Title */}
                            <h2 className="text-white text-lg font-bold md:mb-0">Menu Pengungkit</h2>

                            {/* Actions */}
                            <div className="flex space-x-3">
                                <button className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition text-sm md:text-base flex items-center">
                                    Hasil Survey <ExternalLink className="ml-1" />
                                </button>
                            </div>
                        </div>

                        <Accordion
                            type="single"
                            collapsible
                            className="w-full mt-4 rounded-sm space-y-4"
                            defaultValue="item-1"
                        >
                            {/* Accordion Items */}
                            {[
                                { id: "item-1", title: "P1 - Manajemen Perubahan", content: "Manajemen perubahan bertujuan untuk mengubah secara sistematis dan konsisten mekanisme kerja, pola piker (mind set), serta budaya kerja (culture set) individu pada unit kerja yang dibangun, menjadi lebih baik sesuai dengan tujuan dan sasaran pembangunan Zona Integritas." },
                                { id: "item-2", title: "P2 - Penataan Tata Laksana", content: "Penataan tatalaksana bertujuan untuk meningkatkan efisiensi dan efektivitas sistem, proses, dan prosedur kerja yang jelas, efektif, efisien, dan terukur pada Zona Integritas menuju WBK/WBBM." },
                                { id: "item-3", title: "P3 - Penataan Sistem Manajemen SDM", content: "Penataan sistem manajemen SDM aparatur bertujuan untuk meningkatkan profesionalisme SDM aparatur pada Zona Integritas Menuju WBK/WBBM." },
                                { id: "item-4", title: "P4 - Penguatan Akuntabilitas", content: "Akuntabilitas kinerja adalah perwujudan kewajiban suatu instansi pemerintah untuk mempertanggungjawabkan keberhasilan/ kegagalan pelaksanaan program dan kegiatan dalam mencapai misi dan tujuan organisasi. Area ini bertujuan untuk meningkatkan kapasitas dan akuntabilitas kinerja instansi pemerintah dalam menuju Zona Integritas." },
                                { id: "item-5", title: "P5 - Penguatan Pengawasan", content: "Penguatan pengawasan bertujuan untuk meningkatkan penyelenggaraan pemerintahan yang bersih dan bebas KKN pada masing-masing instansi pemerintah." },
                                { id: "item-6", title: "P6 - Peningkatan Kualitas Pelayanan Publik", content: "Peningkatan kualitas pelayanan publik merupakan suatu upaya untuk meningkatkan kualitas dan inovasi pelayanan publik pada masing-masing instansi pemerintah secara berkala sesuai kebutuhan dan harapan masyarakat. Disamping itu, peningkatan kualitas pelayanan publik dilakukan untuk membangun kepercayaan masyarakat terhadap penyelenggara pelayanan publik dalam rangka peningkatan kesejahteraan masyarakat dengan menjadikan keluhan masyarakat sebagai sarana untuk melakukan perbaikan pelayanan publik." },
                            ].map(({ id, title, content }) => (
                                <AccordionItem key={id} value={id} className="bg-white px-4 rounded-sm">
                                    <AccordionTrigger>{title}</AccordionTrigger>
                                    <AccordionContent>{content}</AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>

                {/* Dokumen and Artikel Components */}
                <IntegritasDokumen />

                <div>
                    <IntegritasArtikel />
                </div>
            </main>
        </AppSlot>
    );
};

export default ZonaIntegritas;
