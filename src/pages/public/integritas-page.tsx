
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
            <main className="matsa-wrapper">
                <div className='banner mb-5 mt-4'>
                    <img src={BannerZI} className="" />
                </div>

                <div className="grid grid-cols-5 gap-4 mb-5">
                    <div className="max-w-7xl mx-auto p-4 grid gap-4 col-span-3 bg-blue-900 rounded-lg shadow-lg">
                        {/* Highlight Section */}
                        <div className=" bg-yellow-400 p-4 rounded-md shadow-md">
                            <h6 className="text-xl font-bold text-gray-900 text-left leading-tight">
                                Membangun Birokrasi Bersih dan Melayani di MTsN 1 Ciamis: Implementasi WBBM dan Zona Integritas
                            </h6>
                        </div>

                        {/* Content Section */}
                        <div className="bg-gray-800 text-white p-6 rounded-md shadow-md prose w-full max-w-4xl">
                            <ReactMarkdown>{md}</ReactMarkdown>
                        </div>

                        {/* Image Section */}
                        <div className=" flex justify-center">
                            <img
                                src="https://feb.ui.ac.id/uploads/2023/08/stop-gratifikasi.jpg"
                                alt="Stop Gratifikasi"
                                className="rounded-md shadow-md max-w-full"
                            />
                        </div>
                    </div>

                    {/* Menu Pengungkit Section */}
                    <div className="bg-yellow-400 px-4 py-3 gap-2 rounded-lg shadow-lg text-justify col-span-2">
                        <div className="bg-gradient-to-l from-blue-500 to-blue-700 p-4 rounded-lg flex items-center justify-between">
                            {/* Title */}
                            <h2 className="text-white text-lg font-bold">
                                Menu Pengungkit
                            </h2>

                            {/* Actions */}
                            <div className="flex space-x-3">
                                <button className="bg-blue-800 flex text-white px-4 py-2 rounded-lg shadow hover:bg-blue-900 transition">
                                    Hasil Survey <ExternalLink className='ml-1' />
                                </button>
                            </div>
                        </div>

                        <Accordion type="single" collapsible className="w-full mt-4 rounded-sm space-y-4" defaultValue="item-1">
                            <AccordionItem value="item-1" className="bg-white px-4 rounded-sm">
                                <AccordionTrigger>P1 - Manajemen Perubahan</AccordionTrigger>
                                <AccordionContent aria-expanded="true">
                                    Manajemen perubahan bertujuan untuk mengubah secara sistematis dan konsisten mekanisme kerja, pola piker (mind set), serta budaya kerja (culture set) individu pada unit kerja yang dibangun, menjadi lebih baik sesuai dengan tujuan dan sasaran pembangunan Zona Integritas.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-2" className="bg-white px-4 rounded-sm">
                                <AccordionTrigger>P2 - Penataan Tata Laksana</AccordionTrigger>
                                <AccordionContent aria-expanded="false">
                                    Penataan tatalaksana bertujuan untuk meningkatkan efisiensi dan efektivitas sistem, proses, dan prosedur kerja yang jelas, efektif, efisien, dan terukur pada Zona Integritas menuju WBK/WBBM.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-3" className="bg-white px-4 rounded-sm">
                                <AccordionTrigger>P3 - Penataan Sistem Manajemen SDM</AccordionTrigger>
                                <AccordionContent aria-expanded="false">
                                    Penataan sistem manajemen SDM aparatur bertujuan untuk meningkatkan profesionalisme SDM aparatur pada Zona Integritas Menuju WBK/WBBM.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-4" className="bg-white px-4 rounded-sm">
                                <AccordionTrigger>P4 - Penguatan Akuntabilitas</AccordionTrigger>
                                <AccordionContent>
                                    Akuntabilitas kinerja adalah perwujudan kewajiban suatu instansi pemerintah untuk mempertanggungjawabkan keberhasilan/ kegagalan pelaksanaan program dan kegiatan dalam mencapai misi dan tujuan organisasi. Area ini bertujuan untuk meningkatkan kapasitas dan akuntabilitas kinerja instansi pemerintah dalam menuju Zona Integritas.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-5" className="bg-white px-4 rounded-sm">
                                <AccordionTrigger>P5 - Penguatan Pengawasan</AccordionTrigger>
                                <AccordionContent>
                                    Penguatan pengawasan bertujuan untuk meningkatkan penyelenggaraan pemerintahan yang bersih dan bebas KKN pada masing-masing instansi pemerintah.
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="item-6" className="bg-white px-4 rounded-sm">
                                <AccordionTrigger>P6 - Peningkatan Kualitas Pelayanan Publik</AccordionTrigger>
                                <AccordionContent>
                                    Peningkatan kualitas pelayanan publik merupakan suatu upaya untuk meningkatkan kualitas dan inovasi pelayanan publik pada masing-masing instansi pemerintah secara berkala sesuai kebutuhan dan harapan masyarakat. Disamping itu, peningkatan kualitas pelayanan publik dilakukan untuk membangun kepercayaan masyarakat terhadap penyelenggara pelayanan publik dalam rangka peningkatan kesejahteraan masyarakat dengan menjadikan keluhan masyarakat sebagai sarana untuk melakukan perbaikan pelayanan publik.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>


                    </div>
                </div>

                <IntegritasDokumen />

                <div>
                    <IntegritasArtikel />
                </div>
            </main>
        </AppSlot>
    );
};

export default ZonaIntegritas;
