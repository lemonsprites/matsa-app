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
import { Link } from "react-router-dom";

type MenuListItemProps = {
    title: string;
    data: {
        title: string;
        icon: LucideIcon;
        link: string;
        description: string;
    }[];
};

const MenuListItem: React.FC<MenuListItemProps> = ({ title, data = [] }) => {
    return (
        <NavigationMenuItem>
            <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
                {title}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-full md:grid-cols-2 lg:w-[600px]">
                    {data.map((x) => (
                        <ListItem
                            key={x.title}
                            title={x.title}
                            icon={x.icon}
                            to={x.link}
                        >
                            {x.description}
                        </ListItem>
                    ))}
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
};

const ListItem = React.forwardRef<
    React.ElementRef<typeof Link>,
    React.ComponentPropsWithoutRef<typeof Link> & { icon: LucideIcon }
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <Link
                    ref={ref}
                    className={cn(
                        "block select-none space-y-2 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <props.icon className="mb-4 h-6 w-6" />
                    <div className="text-sm font-semibold leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem";

export default MenuListItem;
