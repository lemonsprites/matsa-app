"use client"

import logoMTs from "@/assets/img/logo.png";
import * as React from "react";


import { AdminSideNav } from "@/components/layouts/admin/admin-sidenav";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail
} from "@/components/ui/sidebar";
import { adminMenulist } from "@/lib/metadata/admin-menul-list";
import { Link } from "react-router-dom";

// This is sample data.


export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} >
            <SidebarHeader className="shadow-sm">
                <Link to="/admin" className="flex items-center bg-transparent">
                    <SidebarMenuButton tooltip="Logo" className=" hover:bg-transparent active:bg-transparent active:text-white text-white mt-3 hover:text-white">
                        <img src={logoMTs} width={32} height={32}></img>
                        <div className="pl-4">
                            <h1 className="font-bold">MTSN 1 CIAMIS</h1>
                            <small>PIDL MTsn 1 Ciamis</small>
                        </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarHeader>
            <ScrollArea >


                <SidebarContent className="pb-20">
                    <AdminSideNav items={adminMenulist.main} />
                </SidebarContent>

                <SidebarRail />
            </ScrollArea>
        </Sidebar>
    )
}
