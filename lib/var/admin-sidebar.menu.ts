import { IAdminSideMenu } from "@/lib/interface/admin-menu.interface";
import { LayoutGrid } from "lucide-react";

import { kepegawaianMenu } from "@/lib/var/kepegawaian-menu";
import { akademikMenu } from "@/lib/var/menu-list/akademik.menu";
import { artikelMenu } from "@/lib/var/menu-list/artikel.menu";
import { AsetPerMenu } from "@/lib/var/menu-list/aset-per.menu";
import { dokumenMenu } from "@/lib/var/menu-list/dokumen-menu";
import { dokumentasiPengMenu } from "@/lib/var/menu-list/dokumentasiPeng.menu";
import { komiteMenu } from "@/lib/var/menu-list/komite-menu";
import { settingMenu } from "@/lib/var/menu-list/setting.menu";
import { subOrganisasiMenu } from "@/lib/var/menu-list/subOrganisasi.menu";
import { suratNaskahMenu } from "@/lib/var/menu-list/suratNaskah.menu";
import { zonaIntegritasMenu } from "@/lib/var/menu-list/zona-integritas.menu";
import { JSX } from "react";

export const AdminSideMenu: IAdminSideMenu = {
    main: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutGrid,
            isActive: true,
        },
        settingMenu,
    ],
    komite: [
        {
            title: "Dashboard Komite",
            url: "/admin/komite",
            icon: LayoutGrid,
        },
        komiteMenu,
    ],
    madrasah: [
        dokumenMenu,
        AsetPerMenu,
        kepegawaianMenu,
        akademikMenu,
        subOrganisasiMenu,
        suratNaskahMenu,
        artikelMenu,
        dokumentasiPengMenu,
        zonaIntegritasMenu,
    ]
}