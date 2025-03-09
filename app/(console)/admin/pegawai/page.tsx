import PegGender from "@/app/(console)/admin/pegawai/peg-gender";
import PegKronologis from "@/app/(console)/admin/pegawai/peg-kronologis";
import PegPendidikan from "@/app/(console)/admin/pegawai/peg-pendidikan";
import PegSebaran from "@/app/(console)/admin/pegawai/peg-sebaran";
import AdminContent from "@/components/matsa/admin/admin-content";


const PegawaiPage = async () => {

  return (
    <AdminContent title="Pegawai">
      <div className="mb-4 items-center col-span-4 grid-cols-4 grid gap-4">
        <PegSebaran />
        <PegKronologis />
        <PegPendidikan classVar="col-span-3 h-full" />
        <PegGender classVar="col-span-1 h-full" />
      </div>
    </AdminContent>

  )
}

export default PegawaiPage
