import { LucideIcon } from "lucide-react";
import { ComponentType, JSX } from "react";


export interface IAdminMenuItem {
  title: string;
  url: string;
  icon?: ComponentType<any> | LucideIcon;
  isActive?: boolean;
  items?: IAdminMenuItem[];
  roles?: string[];
}

export interface IAdminSideMenu {
  main: IAdminMenuItem[];
  komite: IAdminMenuItem[];
  madrasah: IAdminMenuItem[];
}