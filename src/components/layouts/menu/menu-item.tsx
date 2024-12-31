import {
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label }) => {
  return (
    <NavigationMenuItem>
      <a href={href}>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          {label}
        </NavigationMenuLink>
      </a>
    </NavigationMenuItem>
  );
};

export default MenuItem;
