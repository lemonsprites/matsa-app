"use client";

import * as React from "react";
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";


type MenuListItemProps = {
    title: string;

};

const LandingNavbarMenuExt: React.FC<MenuListItemProps> = ({ title }) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger>
                {title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <div className="mt-2 w-full flex items-center justify-center">
                    <Badge>⚠️Sebagian menu masih dalam tahap pengembangan.⚠️</Badge>
                </div>
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <span className="row-span-3">
                        <NavigationMenuLink asChild>
                            <Link
                                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                href="/profil"
                            >
                                <div className="w-full flex justify-center">
                                    <Image src="/img/logo.png" width={52} height={52} layout="intrinsic" alt="logo-profil-menu" />

                                </div>

                                <div className="mb-2 mt-4 text-lg font-medium">
                                    {title}
                                </div>
                                <p className="text-sm leading-tight text-muted-foreground">
                                    Profil Madrasah gambaran umum serta pandangan singkat madrasah.
                                </p>
                            </Link>
                        </NavigationMenuLink>
                    </span>
                    <ListItem href="/struktur" title="Struktur Organisasi" className="flex-1">
                        Menampilkan Struktur Kepengurusan Satuan Pendidikan.
                    </ListItem>
                    <ListItem href="/pendidik" title="Pendidik" className="flex-1">
                        Daftar Pendidik Satuan Pendidikan.
                    </ListItem>
                    <ListItem href="/" title="Program dan Kegiatan" className="flex-1">
                        Menampilan Program dan Kegiatan pada Madrasah
                    </ListItem>
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
};

const ListItem = React.forwardRef<
    React.ComponentRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link href=""
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default LandingNavbarMenuExt;