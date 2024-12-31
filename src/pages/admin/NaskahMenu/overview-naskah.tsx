import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import supabase from '@/lib/supabase';
import { Surat } from '@/lib/type/surat-type';
import React, { useState } from 'react';
import { generateNomorSurat } from '@/lib/generateNumber';  // Assuming generateNomorSurat is in a separate file

const SuratOverview: React.FC<{ suratList: Surat[] }> = ({ suratList }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    nomorSurat: '',
    perihal: '',
    tanggalSurat: '',
    jenisSurat: '',
    kodeUnitKerja: '',
    kodeKategori: ''
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateSurat = async () => {
    try {
      // Generate nomorSurat using the generateNomorSurat function
      const generatedNomorSurat = await generateNomorSurat({
        jenisSurat: formData.jenisSurat,
        kodeUnitKerja: formData.kodeUnitKerja,
        kodeKategori: formData.kodeKategori,
        tanggal: formData.tanggalSurat,
      });

      if (!generatedNomorSurat) {
        throw new Error("Failed to generate nomor surat.");
      }

      // Insert data into Supabase table (assuming your table is called 'tb_surat')
      const { data, error } = await supabase
        .from('tb_surat')
        .insert([
          {
            nomorSurat: generatedNomorSurat,
            perihal: formData.perihal,
            tanggalSurat: formData.tanggalSurat,
            jenisSurat: formData.jenisSurat,
          },
        ]);

      if (error) {
        throw error; // If there's an error, throw it
      }

      // Close the dialog if data is successfully inserted
      handleCloseDialog();
      console.log('Surat generated successfully!', data);

      // Optionally, you can refresh the surat list or show a success message

    } catch (error: any) {
      console.error('Error creating surat:', error.message);
    }
  };

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold mb-4">Daftar Surat</h2>
      {/* Button to open the modal */}
      <Button onClick={handleOpenDialog} className="mb-4">
        Generate Surat
      </Button>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="text-left">Nomor Surat</TableHead>
            <TableHead className="text-left">Perihal</TableHead>
            <TableHead className="text-left">Tanggal Surat</TableHead>
            <TableHead className="text-left">Jenis Surat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suratList.map((surat) => (
            <TableRow key={surat.id}>
              <TableCell>{surat.nomorSurat}</TableCell>
              <TableCell>{surat.perihal}</TableCell>
              <TableCell>{surat.tanggalSurat}</TableCell>
              <TableCell>{surat.jenisSurat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Dialog for generating surat */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate Surat</DialogTitle>
          </DialogHeader>

          {/* Form Fields for Surat */}
          <div className="mb-4">
            <label className="block mb-2">Perihal</label>
            <input
              type="text"
              name="perihal"
              value={formData.perihal}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Perihal Surat"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Jenis Surat</label>
            <input
              type="text"
              name="jenisSurat"
              value={formData.jenisSurat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Jenis Surat"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Kode Unit Kerja</label>
            <input
              type="text"
              name="kodeUnitKerja"
              value={formData.kodeUnitKerja}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Kode Unit Kerja"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Kode Kategori</label>
            <input
              type="text"
              name="kodeKategori"
              value={formData.kodeKategori}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              placeholder="Kode Kategori"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Tanggal Surat</label>
            <input
              type="date"
              name="tanggalSurat"
              value={formData.tanggalSurat}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Footer buttons */}
          <DialogFooter>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button className="ml-2" onClick={handleGenerateSurat}>
              Generate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuratOverview;
