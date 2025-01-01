import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Komponen Card dari ShadCN
import { Dialog, DialogClose, DialogContent } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'; // Komponen Table dari ShadCN
import { fetchSuratData } from '@/lib/services/surat_services';
import supabase from '@/lib/supabase-client';
import { Surat, SuratData } from '@/lib/type/surat-type'; // Tipe data surat
import { PlusIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SuratOverview: React.FC = () => {
    const [selectedYear, setSelectedYear] = useState<string>(new Date().getFullYear().toString());
    const [suratList, setSuratList] = useState<Surat[]>([]);
    const [overviewData, setOverviewData] = useState({
        masuk: 0,
        keluar: 0,
        keputusan: 0,
        total: 0,
    });
    const [isOpen, setIsOpen] = useState<boolean>(false); // State to control Dialog visibility

    // Form fields state
    const [suratName, setSuratName] = useState('');
    const [kategori, setKategori] = useState('');
    const [judul, setJudul] = useState('');
    const [tanggal, setTanggal] = useState('');
    const [perihal, setPerihal] = useState('');





    // Reference data states (e.g., categories)
    const [kategoriOptions, setKategoriOptions] = useState<string[]>([]);

    // Fetch reference data (categories) when the component mounts
    useEffect(() => {
        const fetchReferenceData = async () => {
            // Fetch categories from the database or an API (adjust to your data source)
            const { data, error } = await supabase
                .from('tb_surat_klasifikasi') // Example table for categories
                .select('nama_klasifikasi'); // Adjust field name as per your database schema

            if (error) {
                console.error('Error fetching categories:', error.message);
                return;
            }

            setKategoriOptions(data.map((item) => item.nama_klasifikasi)); // Map category names to options
        };

        fetchReferenceData();
    }, [supabase]);

    const [suratData, setSuratData] = useState<SuratData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getData = async () => {
          const data = await fetchSuratData();
          setSuratData(data);
          setLoading(false);
        };
    
        getData();
      }, []);
    
      if (loading) {
        return <div>Loading...</div>;
      }
    


    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Check if all fields are filled
        if (!suratName || !kategori || !judul || !tanggal || !perihal) {
            alert('Please fill in all fields');
            return;
        }

        // Submit data to Supabase (or your database)
        try {
            const { error } = await supabase
                .from('surat')
                .insert([
                    {
                        nomor_surat: suratName,
                        kategori,
                        judul,
                        tanggal,
                        perihal,
                    },
                ]);

            if (error) {
                throw new Error(error.message);
            }

            // Reset form and close dialog
            setSuratName('');
            setKategori('');
            setJudul('');
            setTanggal('');
            setPerihal('');
            setIsOpen(false);
            alert('Surat added successfully');
        } catch (error) {
            console.error('Error adding surat:', error);
            alert('There was an error adding the surat.');
        }
    };



    return (
        <div className='matsa-grid'>
            <h2 className="text-2xl font-semibold mb-4 col-span-4">Surat Overview</h2>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6 col-span-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Surat Masuk</CardTitle>
                    </CardHeader>
                    <CardContent>{overviewData.masuk}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Surat Keluar</CardTitle>
                    </CardHeader>
                    <CardContent>{overviewData.keluar}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Surat Keputusan</CardTitle>
                    </CardHeader>
                    <CardContent>{overviewData.keputusan}</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Total Surat</CardTitle>
                    </CardHeader>
                    <CardContent>{overviewData.total}</CardContent>
                </Card>
            </div>

            <div className='col-span-2 w-full'>
                {/* Filter Tahun */}
                <div className="mb-4 flex items-center justify-between">
                    {/* Year Filter */}
                    <div className="flex items-center">
                        <Select onValueChange={(value) => setSelectedYear(value)} value={selectedYear}>
                            <SelectTrigger className="w-full sm:w-64">
                                <SelectValue placeholder="Pilih Tahun" />
                            </SelectTrigger>
                            <SelectContent>
                                {[...Array(10)].map((_, index) => {
                                    const year = new Date().getFullYear() - index;
                                    return (
                                        <SelectItem key={year} value={year.toString()}>
                                            {year}
                                        </SelectItem>
                                    );
                                })}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Button to trigger the Dialog Modal */}
                    <button
                        className="flex items-center justify-center px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onClick={() => setIsOpen(true)} // Open dialog on button click
                    >
                        <PlusIcon className="h-5 w-5 mr-2" /> {/* Plus Icon */}
                        Add Surat
                    </button>
                </div>
                {/* Dialog for Adding Surat */}
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-4">Add Surat</h3>
                            <form onSubmit={handleSubmit}>
                                {/* Surat Name */}
                                <div className="mb-4">
                                    <label htmlFor="surat-name" className="block mb-2">Nomor Surat:</label>
                                    <input
                                        id="surat-name"
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter Surat Name"
                                        value={suratName}
                                        onChange={(e) => setSuratName(e.target.value)}
                                    />
                                </div>

                                {/* Kategori */}
                                <div className="mb-4">
                                    <label htmlFor="kategori" className="block mb-2">Kategori:</label>
                                    <select
                                        id="kategori"
                                        className="w-full p-2 border rounded-md"
                                        value={kategori}
                                        onChange={(e) => setKategori(e.target.value)}
                                    >
                                        <option value="" disabled>Select Kategori</option>
                                        {kategoriOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Judul */}
                                <div className="mb-4">
                                    <label htmlFor="judul" className="block mb-2">Judul:</label>
                                    <input
                                        id="judul"
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter Judul"
                                        value={judul}
                                        onChange={(e) => setJudul(e.target.value)}
                                    />
                                </div>

                                {/* Tanggal */}
                                <div className="mb-4">
                                    <label htmlFor="tanggal" className="block mb-2">Tanggal:</label>
                                    <input
                                        id="tanggal"
                                        type="date"
                                        className="w-full p-2 border rounded-md"
                                        value={tanggal}
                                        onChange={(e) => setTanggal(e.target.value)}
                                    />
                                </div>

                                {/* Perihal */}
                                <div className="mb-4">
                                    <label htmlFor="perihal" className="block mb-2">Perihal:</label>
                                    <input
                                        id="perihal"
                                        type="text"
                                        className="w-full p-2 border rounded-md"
                                        placeholder="Enter Perihal"
                                        value={perihal}
                                        onChange={(e) => setPerihal(e.target.value)}
                                    />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-4 flex justify-between">
                                    <button
                                        type="submit"
                                        className="w-full bg-blue-600 text-white rounded-md py-2"
                                    >
                                        Add Surat
                                    </button>
                                    <DialogClose asChild>
                                        <button
                                            type="button"
                                            className="ml-2 w-full bg-gray-200 text-gray-800 rounded-md py-2"
                                            onClick={() => setIsOpen(false)} // Close dialog
                                        >
                                            Close
                                        </button>
                                    </DialogClose>
                                </div>
                            </form>
                        </div>
                    </DialogContent>
                </Dialog>



                {/* Table Daftar Surat */}
                <div className="overflow-x-auto w-full">
                    <Table className="w-full border-collapse">
                        <TableHeader>
                            <TableRow className="bg-gray-100">
                                <TableCell className="px-4 py-2 text-left">#</TableCell>
                                <TableCell className="px-4 py-2 text-left">Nomor Surat</TableCell>
                                <TableCell className="px-4 py-2 text-left">Kategori</TableCell>
                                <TableCell className="px-4 py-2 text-left">Judul</TableCell>
                                <TableCell className="px-4 py-2 text-left">Tanggal</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {suratData.map((surat) => (
                                <TableRow key={surat.id}>
                                    <TableCell className="px-4 py-2">{surat.id}</TableCell>
                                    <TableCell className="px-4 py-2">{surat.nomor_surat}</TableCell>
                                    <TableCell className="px-4 py-2">{surat.kategori}</TableCell>
                                    <TableCell className="px-4 py-2">{surat.judul}</TableCell>
                                    <TableCell className="px-4 py-2">{surat.tanggal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default SuratOverview;
