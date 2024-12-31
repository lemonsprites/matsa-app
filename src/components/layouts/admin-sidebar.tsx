"use client"

import {
    BookOpen,
    Feather,
    Frame,
    LayoutGrid,
    MailCheck,
    Map,
    PieChart,
    Settings2,
    ShieldCheck
} from "lucide-react"
import * as React from "react"
import logoMTs from "@/assets/img/logo.png";


import { AdminSideNav } from "@/components/layouts/admin-sidenav"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom";

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutGrid,
            isActive: true
        },
        {
            title: "Kepegawaian",
            url: "#",
            icon: LayoutGrid,
            items: [
                {
                    title: "Overview Pegawai",
                    url: 'pegawai/overview',
                },
                {
                    title: "RUH Beban Kerja",
                    url: 'pegawai/abk-ruh'
                },
                {
                    title: "Monitoring Anjab",
                    url: 'pegawai/anjab'
                },
                {
                    title: "referensi",
                    url: 'pegawai/ref'
                }
            ]
        },
        {
            title: "Surat/Naskah Dinas",
            url: '#',
            icon: MailCheck,
            items: [
                {
                    title: "Overview Naskah",
                    url: 'surat',
                },
                {
                    title: "Referensi Kodefikasi",
                    url: 'surat/kodefikasi'
                },
                {
                    title: "Laporan/Cetak",
                    url: '#'
                },
                {
                    title: "Monitoring",
                    url: '#'
                }
            ]
        },
        {
            title: "Artikel",
            url: "#",
            icon: Feather,
            items: [
                {
                    title: "Overview",
                    url: "#",
                },
                {
                    title: "Kategori/Tag",
                    url: "#",
                },
                {
                    title: "Daftar Postingan",
                    url: "#",
                },
                {
                    title: "Monitoring",
                    url: "#",
                },
                {
                    title: "Laporan",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Zona Integritas",
            url: "integritas",
            icon: ShieldCheck,
            items: [
                {
                    title: "Ihtisar",
                    url: "integritas/ikhtisar",
                },
                {
                    title: "Tim Pembangunan ZI",
                    url: "#",
                },
                {
                    title: "Monitoring",
                    url: "#",
                },
                {
                    title: "Laporan",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
    ],
}

export function AdminSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props} >
            <ScrollArea>


                <SidebarHeader>
                    <Link to="/admin" className="flex items-center bg-transparent">
                        <SidebarMenuButton tooltip="Logo" className=" hover:bg-transparent active:bg-transparent active:text-inherit mt-3 hover:text-white">
                            <img src={logoMTs} width={32} height={32}></img>
                            <div className="pl-4">
                                <h1 className="font-bold">MTSN 1 CIAMIS</h1>
                                <small>Matsa Dashboard</small>
                            </div>
                        </SidebarMenuButton>
                    </Link>
                </SidebarHeader>
                <SidebarContent>
                    <AdminSideNav items={data.navMain} />
                </SidebarContent>

                <SidebarRail />
            </ScrollArea>
        </Sidebar>
    )
}
