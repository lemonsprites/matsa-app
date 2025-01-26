import {
  NavigationMenuItem,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import React from "react";
import { Link } from "react-router-dom";

interface MenuItemProps {
  href: string;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, label }) => {
  return (
    <NavigationMenuItem>

      <Link className={navigationMenuTriggerStyle()} to={href}>
        {label}
      </Link>
    </NavigationMenuItem>
  );
};

export default MenuItem;
