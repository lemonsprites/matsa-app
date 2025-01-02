import { Button } from '@/components/ui/button';
import { Card, CardTitle, CardContent } from '@/components/ui/card';
import { getIntegritasEvidenceList } from '@/lib/services/integritas-services';
import { Evidence } from '@/lib/type/integritas-type';
import { Download } from 'lucide-react';
import { useState, useEffect } from 'react';

const IntegritasDokumen = () => {
    const [, setIsLoading] = useState<boolean>(false); // Loading state
    const [, setError] = useState<string | null>(null); // Error state
    const [evList, setEvList] = useState<Evidence[]>([]); // Store the evidence list

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading to true before fetching
            setError(null); // Clear previous errors

            try {
                const res = await getIntegritasEvidenceList(); // Fetch data
                if (res) {
                    setEvList(res); // Update state if data exists
                }
            } catch (err) {
                setError('An error occurred while fetching the data.');
            } finally {
                setIsLoading(false); // Set loading to false after fetch is done
            }
        };

        fetchData(); // Call the fetchData function inside useEffect

    }, []); // Dependency on `newTitle` to trigger the fetch when it changes


    return (
        <section className="my-10">
            {/* Section Header */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold">Dokumen Pendukung Kami dalam Pembangunan Zona Integritas</h2>
                <p className="text-gray-600">Unduh dokumen yang relevan untuk mendukung kegiatan.</p>
            </div>

            {/* Document List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {evList.map((doc) => (
                    <Card key={doc.id} className="flex flex-col h-full items-center justify-center">
                        <CardContent className="flex-1 grid grid-cols-3 py-3 gap-4">
                            <div className='col-span-2'>
                                <CardTitle className="text-lg font-semibold">
                                    {evList.length > 0 ? (
                                        // Accessing the first item in evList and getting the first segment of 'nama_dokumen'
                                        evList[doc.id - 1]?.nama_dokumen?.split('_')[0] || 'No file name available'
                                    ) : (
                                        'No evidence available'
                                    )}
                                </CardTitle>
                                <p className="text-gray-600">{doc.nama_dokumen}</p>
                            </div>
                            <div>
                                <a href={doc.file_path} target="_blank" rel="noopener noreferrer" className='h-full flex items-center'>
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