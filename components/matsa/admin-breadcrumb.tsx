"use client";

import { 
    Breadcrumb, 
    BreadcrumbList, 
    BreadcrumbItem, 
    BreadcrumbLink, 
    BreadcrumbSeparator, 
    BreadcrumbPage 
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import React from "react";

const AdminBreadcrumb = () => {
    const pathName = usePathname();
    const pathNames = pathName.split("/").filter((x) => x);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {/* Always start with Home (no separate "Admin") */}
                <BreadcrumbItem>
                    <BreadcrumbLink href="/admin">Admin</BreadcrumbLink>
                </BreadcrumbItem>

                {pathNames
                    .filter((segment) => segment !== "admin") // Remove "admin" from breadcrumbs
                    .map((value, index, filteredPaths) => {
                        const to = `/${filteredPaths.slice(0, index + 1).join("/")}`;
                        const isLast = index === filteredPaths.length - 1;

                        return (
                            <React.Fragment key={to}>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                    {isLast ? (
                                        <BreadcrumbPage>{formatText(value)}</BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink href={to}>{formatText(value)}</BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                            </React.Fragment>
                        );
                    })}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

// Convert "artikel" to "Artikel" (capitalize first letter)
const formatText = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export default AdminBreadcrumb;
