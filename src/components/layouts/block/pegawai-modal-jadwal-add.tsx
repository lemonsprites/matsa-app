import { Dialog, DialogHeader, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface PegawaiModalJadwalAddProps {
  show: boolean;
  onSave: (formData: any) => void;
  onClose: () => void;
  selectedSlot: any;
}

const PegawaiModalJadwalAdd = ({ show, onSave, onClose, selectedSlot }: PegawaiModalJadwalAddProps) => {
  const [formData, setFormData] = useState({
    id_pegawai: selectedSlot?.data?.id_pegawai || "",
    id_kelas: selectedSlot?.data?.id_kelas || "",
    id_mapel: selectedSlot?.data?.id_mapel || "",
    jtm: selectedSlot?.data?.jtm || 0,
  });

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={show} onOpenChange={onClose}>
      <DialogHeader>
        <h2>{selectedSlot?.data ? "Edit Schedule" : "Add Schedule"}</h2>
      </DialogHeader>
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData); // Save data when form is submitted
          }}
        >
          <input
            type="number"
            name="id_pegawai"
            value={formData.id_pegawai}
            onChange={handleInputChange}
            placeholder="Teacher ID"
          />
          <input
            type="number"
            name="id_kelas"
            value={formData.id_kelas}
            onChange={handleInputChange}
            placeholder="Class ID"
          />
          <input
            type="number"
            name="id_mapel"
            value={formData.id_mapel}
            onChange={handleInputChange}
            placeholder="Subject ID"
          />
          <input
            type="number"
            name="jtm"
            value={formData.jtm}
            onChange={handleInputChange}
            placeholder="Total Hours"
          />
          <div>
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PegawaiModalJadwalAdd;
