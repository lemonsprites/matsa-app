"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { createClient } from "@/lib/supabase-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Plus, MoreVertical, Upload, Printer } from "lucide-react";
import Papa from "papaparse";

type LaporanFormValues = {
  tanggal: string;
  kegiatan: string;
  pekerjaan: string;
  volume: string;
};

const supabase = createClient();

const FormLaporan = (data?: any) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LaporanFormValues>({
    defaultValues: data || {
      tanggal: "",
      kegiatan: "",
      pekerjaan: "",
      volume: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const onSubmit = async (data: LaporanFormValues) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) throw new Error("User not authenticated");

      const remapData = { ...data, pegawai_id: userData.user.id };

      const res = await fetch("/api/lap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(remapData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan laporan");

      alert("Laporan berhasil disimpan");
      reset();
      router.refresh();

      // ✅ Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat menyimpan laporan");
    } finally {
      setLoading(false);
    }
  };

  const handleCSVUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (result: any) => {
        if (result.errors.length > 0) {
          alert("Error parsing CSV file.");
          return;
        }

        const rows = result.data.map((row: any) => ({
          tanggal: row["Tanggal"],
          kegiatan: row["Kegiatan"],
          pekerjaan: row["Pekerjaan"],
          volume: row["Volume"],
        }));

        setLoading(true);
        try {
          const res = await fetch("/api/import-laporan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(rows),
          });

          if (!res.ok) throw new Error("Gagal mengimpor data");

          alert("Import berhasil!");
          router.refresh();
        } catch (error) {
          alert("Terjadi kesalahan saat mengimpor");
          console.error(error);
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="flex gap-2 items-center ">
      {/* Tambah Data Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex w-full gap-2 items-center">
            <Plus />
            Tambah Data
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Laporan</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="tanggal">Tanggal</Label>
              <Input type="date" id="tanggal" {...register("tanggal", { required: "Tanggal wajib diisi" })} />
              {errors.tanggal && <p className="mt-1 text-sm text-red-600">{errors.tanggal.message}</p>}
            </div>

            <div>
              <Label htmlFor="kegiatan">Kegiatan</Label>
              <Input type="text" id="kegiatan" {...register("kegiatan", { required: "Kegiatan wajib diisi" })} />
              {errors.kegiatan && <p className="mt-1 text-sm text-red-600">{errors.kegiatan.message}</p>}
            </div>

            <div>
              <Label htmlFor="volume">Volume</Label>
              <Input type="text" id="volume" {...register("volume", { required: "Volume wajib diisi" })} />
              {errors.volume && <p className="mt-1 text-sm text-red-600">{errors.volume.message}</p>}
            </div>

            <div>
              <Label htmlFor="pekerjaan">Pekerjaan</Label>
              <Textarea id="pekerjaan" {...register("pekerjaan", { required: "Pekerjaan wajib diisi" })} />
              {errors.pekerjaan && <p className="mt-1 text-sm text-red-600">{errors.pekerjaan.message}</p>}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Menyimpan..." : "Simpan"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Dropdown Menu for Additional Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Label className="flex cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              Import CSV
              <input type="file" accept=".csv" className="hidden" onChange={handleCSVUpload} />
            </Label>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => alert("Other option clicked!")}>
            <Printer className="w-4 h-4 mr-2" />
            Cetak Laporan
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FormLaporan;
