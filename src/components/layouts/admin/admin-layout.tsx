import { Navigate, Outlet } from "react-router-dom";
import AdminNavbar from "@/components/layouts/admin/admin-navbar";
import { AdminSidebar } from "@/components/layouts/admin/admin-sidebar";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";
import { useAuth } from "@/lib/middleware/auth-guard";
import Toast from "@/components/toast";


const AdminLayout: React.FC = () => {
    const { isAuth } = useAuth();
    return isAuth ? (<SidebarProvider>
        <AdminSidebar />
        <SidebarInset>
            <AdminNavbar />
            <div className="flex flex-1 flex-col gap-4 px-6 py-4 overflow-y-auto">
                <Outlet />
            </div>
            <div className="flex justify-center text-xs text-muted-foreground p-4 italic">Versi {__APP_VERSION__} © Copyright {new Date().getFullYear()}, Tim PIDL MTsN 1 Ciamis</div>
        </SidebarInset>
    </SidebarProvider>) : (<>
        <Navigate to="/" />
        <Toast title="Auth Error" desc="Mohon maaf! Anda tidak terautentikasi!😉" variant="error"/>
    </>);
};

export default AdminLayout;
