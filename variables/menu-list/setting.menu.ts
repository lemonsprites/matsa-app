import { Settings2 } from "lucide-react";

export const settingMenu = {
    title: "Settings",
    url: "#",
    icon: Settings2,
    items: [
        {
            title: "General",
            url: "/admin/setting/general"
        },
        {
            title: "Users",
            url: "/admin/setting/users",
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
}