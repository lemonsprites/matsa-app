"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase-client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type LaporanFormValues = {
  tanggal: string;
  kegiatan: string;
  pekerjaan: string;
  volume: string;
};

const supabase = createClient();

const FormLaporan = ({ initialData }: { initialData?: any }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LaporanFormValues>({
    defaultValues: initialData || {
      tanggal: "",
      kegiatan: "",
      pekerjaan: "",
      volume: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Handle form submission (update existing data)
  const onSubmit = async (data: LaporanFormValues) => {
    setLoading(true);
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      if (userError || !userData?.user) throw new Error("User not authenticated");

      const remapData = { ...data, pegawai_id: userData.user.id };

      const res = await fetch(`/api/laporan/${initialData?.id}`, {
        method: "PUT", // Use PUT to update existing data
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(remapData), // Send updated data to backend
      });

      if (!res.ok) throw new Error("Gagal menyimpan laporan");

      alert("Laporan berhasil diperbarui");
      reset();
      router.refresh();

      // Close the dialog after submission
      setIsDialogOpen(false); // Close the dialog after successful form submission
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memperbarui laporan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="tanggal">Tanggal</Label>
          <Input
            type="date"
            id="tanggal"
            {...register("tanggal", { required: "Tanggal wajib diisi" })}
          />
          {errors.tanggal && <p className="mt-1 text-sm text-red-600">{errors.tanggal.message}</p>}
        </div>

        <div>
          <Label htmlFor="kegiatan">Kegiatan</Label>
          <Input
            type="text"
            id="kegiatan"
            {...register("kegiatan", { required: "Kegiatan wajib diisi" })}
          />
          {errors.kegiatan && <p className="mt-1 text-sm text-red-600">{errors.kegiatan.message}</p>}
        </div>

        <div>
          <Label htmlFor="volume">Volume</Label>
          <Input
            type="text"
            id="volume"
            {...register("volume", { required: "Volume wajib diisi" })}
          />
          {errors.volume && <p className="mt-1 text-sm text-red-600">{errors.volume.message}</p>}
        </div>

        <div>
          <Label htmlFor="pekerjaan">Pekerjaan</Label>
          <Textarea
            id="pekerjaan"
            {...register("pekerjaan", { required: "Pekerjaan wajib diisi" })}
          />
          {errors.pekerjaan && <p className="mt-1 text-sm text-red-600">{errors.pekerjaan.message}</p>}
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </div>
  );
};

export default FormLaporan;
