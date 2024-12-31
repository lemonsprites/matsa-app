import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Download } from 'lucide-react';

const IntegritasDokumen = () => {
    const documents = [
        { id: 1, title: "Peraturan Menteri Nomor 3 Tahun 2020", description: "Tentang Standar Nasional Pendidikan Tinggi", fileUrl: "/documents/permen3-2020.pdf" },
        { id: 2, title: "Peraturan Pemerintah Nomor 57 Tahun 2021", description: "Tentang Standar Nasional Pendidikan", fileUrl: "/documents/pp57-2021.pdf" },
        { id: 3, title: "Keputusan Rektor 2021", description: "Struktur Organisasi Universitas Indonesia", fileUrl: "/documents/sk-rektor-2021.pdf" },
    ];

    return (
        <section className="my-10">
            {/* Section Header */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold">Dokumen Pendukung Kami dalam Pembangunan Zona Integritas</h2>
                <p className="text-gray-600">Unduh dokumen yang relevan untuk mendukung kegiatan.</p>
            </div>

            {/* Document List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {documents.map((doc) => (
                    <Card key={doc.id} className="flex flex-col h-full items-center justify-center">
                        <CardContent className="flex-1 grid grid-cols-3 py-3 gap-4">
                            <div className='col-span-2'>
                                <CardTitle className="text-lg font-semibold">{doc.title}</CardTitle>
                                <p className="text-gray-600">{doc.description}</p>
                            </div>
                            <div>
                                <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" className='h-full flex items-center'>
                                    <Button variant="default" className="w-full flex items-center justify-center">
                                        <Download className="w-4 h-4 mr-2" /> Unduh
                                    </Button>
                                </a>

                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>
    )
}

export default IntegritasDokumen