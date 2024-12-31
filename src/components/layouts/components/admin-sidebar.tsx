"use client"

import {
    BookOpen,
    Feather,
    Frame,
    Map,
    PieChart,
    Settings2,
    LayoutGrid,
    ShieldCheck,
    MailCheck
} from "lucide-react"
import * as React from "react"


import { AdminNav } from "@/components/layouts/components/admin-nav"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarRail
} from "@/components/ui/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

// This is sample data.
const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "#",
            icon: LayoutGrid,
            isActive: true
        },
        {
            title: "Surat/Naskah Dinas",
            url: '#',
            icon: MailCheck,
            items: [
                {
                    title: "Overview Naskah",
                    url: 'surat/overview',
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
        <Sidebar collapsible="icon" {...props}>
            <ScrollArea>


                <SidebarHeader>
                    <h1>Matsa Admin App</h1>
                </SidebarHeader>
                <SidebarContent>
                    <AdminNav items={data.navMain} />
                </SidebarContent>

                <SidebarRail />
            </ScrollArea>
        </Sidebar>
    )
}
