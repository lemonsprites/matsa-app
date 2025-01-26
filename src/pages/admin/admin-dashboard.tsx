import AppSlot from "@/components/app-slot"
import AdminWrapper from "@/components/layouts/admin/admin-wrapper";

const AdminDashboard = ({ title }: any) => {
  return (
    <AppSlot title={title}>
      <AdminWrapper title={title}>
        <div>DashboardPage</div>

      </AdminWrapper>
    </AppSlot>
  )
}

export default AdminDashboard;