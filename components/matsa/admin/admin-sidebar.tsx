"use client"

import Image from "next/image";
import * as React from "react";


import { AdminSideNav } from "@/components/matsa/admin/admin-sidenav";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail
} from "@/components/ui/sidebar";
import Link from "next/link";
import { AdminSideMenu } from "@/lib/var/admin-sidebar.menu";


export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} >
            <SidebarHeader className="shadow-md min-h-16 bg-sidebar">
                <Link href="/admin" className="flex items-center bg-transparent">
                    <SidebarMenuButton tooltip="Logo" className=" hover:bg-transparent active:bg-transparent active:text-gray-600 text-black mt-3 hover:text-white">
                        <Image src="/img/logo.png" width={32} height={32} alt="logo-admin" />
                        <div className="pl-4">
                            <h1 className="font-bold">MTSN 1 CIAMIS</h1>
                            <small>PIDL MTsn 1 Ciamis</small>
                        </div>
                    </SidebarMenuButton>
                </Link>
            </SidebarHeader>
            <ScrollArea >


                <SidebarContent className="pb-20">
                    {Object.entries(AdminSideMenu).map(([key, group], index) => (
                        <AdminSideNav key={index} items={group} title={key} />
                    ))}
                </SidebarContent>

                <SidebarRail />
            </ScrollArea>
        </Sidebar>
    )
}
