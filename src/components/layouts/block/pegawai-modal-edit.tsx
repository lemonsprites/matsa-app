// src/pages/pegawai/EditPegawaiModal.tsx
import React, { useState } from "react";

import supabase from "@/lib/supabase-client";
import { Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export const PegawaiModalEdit = ({ data, onClose, onRefresh }: any) => {
  const [form, setForm] = useState({
    name: data.name || "",
    nip: data.nip || "",
    position: data.position || "",
    active: data.active || false,
  });

  const handleSubmit = async () => {
    const { error } = await supabase
      .from("tb_pegawai")
      .update(form)
      .eq("id", data.id);
    if (error) console.error("Error updating pegawai:", error);
    onRefresh();
    onClose();
  };

  return (
    <Dialog onOpenChange={onClose}>
      <form className="space-y-4">
        <Input
          
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <Input

          value={form.nip}
          onChange={(e) => setForm({ ...form, nip: e.target.value })}
        />
        <Input

          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.active}
            onChange={(e) => setForm({ ...form, active: e.target.checked })}
          />
          <label>Aktif</label>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary"
        >
          Simpan
        </button>
      </form>
    </Dialog>
  );
};
