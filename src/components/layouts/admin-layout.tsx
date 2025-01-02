// components/Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";


import { AdminSidebar } from "@/components/layouts/admin-sidebar";
import {
    SidebarInset,
    SidebarProvider
} from "@/components/ui/sidebar";
import AdminNavbar from "@/components/layouts/admin-navbar";

const AdminLayout: React.FC = () => {
    return (
        <SidebarProvider>
            <AdminSidebar />
            <SidebarInset>
                <AdminNavbar />
                <div className="flex flex-1 flex-col gap-4 px-6 py-4 overflow-y-auto">
                    <Outlet />
                    {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                        <div className="aspect-video rounded-xl bg-muted/50" />
                    </div>
                    <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
                </div>
                <div className="flex justify-center text-xs text-muted-foreground p-4 italic">Versi {__APP_VERSION__} © Copyright {new Date().getFullYear()}, Tim PIDL MTsN 1 Ciamis</div>
            </SidebarInset>
        </SidebarProvider>
    );
};

export default AdminLayout;
