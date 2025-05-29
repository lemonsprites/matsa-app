"use client"

import { ChevronRight } from "lucide-react"
import Link from "next/link"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { IAdminMenuItem } from "@/lib/interfaces/admin-menu.interface"


export function AdminSideNav({ items, title }: { items: IAdminMenuItem[], title?: string }) {
  function upperCase(arg: any) {
    return arg.charAt(0).toUpperCase() + arg.slice(1) + " Menu";
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{upperCase(title)}</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <RecursiveNavItem key={item.title} item={item} depth={0} />
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}

function RecursiveNavItem({ item, depth }: { item: IAdminMenuItem; depth: number }) {
  const hasChildren = item.items && item.items.length > 0


  if (depth === 0) {
    if (!hasChildren) {
      return (
        <SidebarMenuItem>
          <Link href={item.url}>
            <SidebarMenuButton tooltip={item.title} className="hover:bg-none">
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      )
    }

    return (
      <Collapsible key={item.title} asChild defaultOpen={item.isActive} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.title} className="hover:bg-none">
              {item.icon && <item.icon />}
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.items?.map((child) => (
                <RecursiveNavItem key={child.title} item={child} depth={depth + 1} />
              ))}

            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }


  if (!hasChildren) {
    return (
      <SidebarMenuSubItem>
        <SidebarMenuSubButton asChild>
          <Link href={item.url} className="text-black hover:text-gray-500 hover:bg-none bg-none">
            <span>{item.title}</span>
          </Link>
        </SidebarMenuSubButton>
      </SidebarMenuSubItem>
    )
  }

  return (
    <SidebarMenuSubItem>
      <Collapsible asChild defaultOpen={item.isActive} className="group/collapsible">
        <div>
          <CollapsibleTrigger asChild>
            <SidebarMenuSubButton>
              <span>{item.title}</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuSubButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub className="ml-2">
              {item.items?.map((child) => (
                <RecursiveNavItem key={child.title} item={child} depth={depth + 1} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </SidebarMenuSubItem>
  )
}
