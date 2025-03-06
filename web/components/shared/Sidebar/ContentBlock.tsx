"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ROUTE } from "@/lib/constants";
import { UserRole } from "@/lib/schemas/user";
import { Calendar, Home, LucideIcon, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { ComponentPropsWithRef, useState } from "react";
import { AuthGuardClient } from "../AuthGuardClient";

type NavItem = {
  title: string;
  icon: LucideIcon;
  items: { title: string; url: string; guard?: UserRole[] }[];
};

// Menu items.
const navMain: NavItem[] = [
  {
    title: ROUTE.HOME.humanresource.root.title,
    icon: Calendar,
    items: [
      {
        title: ROUTE.HOME.humanresource.root.title,
        url: ROUTE.HOME.humanresource.root.path,
      },
      {
        title: ROUTE.HOME.coachmanagement.root.title,
        url: ROUTE.HOME.coachmanagement.root.path,
      },
      {
        title: ROUTE.HOME.managermanagement.root.title,
        url: ROUTE.HOME.managermanagement.root.path,
      },
      {
        title: ROUTE.HOME.studentmanagement.root.title,
        url: ROUTE.HOME.studentmanagement.root.path,
      },
      {
        title: ROUTE.HOME.teammanagement.root.title,
        url: ROUTE.HOME.teammanagement.root.path,
      },
    ],
  },
];

export function ContentBlock() {
  const [activeItem, setActiveItem] = useState<string>("");

  const handleSubItemClick = (title: string) => {
    setActiveItem(title);
  };
  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem key={"Home"}>
              <SidebarMenuButton asChild>
                <Link href={ROUTE.HOME.root.path}>
                  <Home />
                  <span>Home</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {navMain.map((item) => (
              <Collapsible className="group/collapsible" key={item.title}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      {item.icon ? <item.icon /> : null}
                      {item.title}{" "}
                      <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                      <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {item.items?.length ? (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((item) =>
                          !item.guard ? (
                            <SubmenuItem
                              isActive={activeItem === item.title}
                              item={item}
                              key={item.title}
                              onClick={() => handleSubItemClick(item.title)}
                            />
                          ) : (
                            <AuthGuardClient key={item.title} viewableFor="">
                              <SubmenuItem
                                isActive={activeItem === item.title}
                                item={item}
                                onClick={() => handleSubItemClick(item.title)}
                              />
                            </AuthGuardClient>
                          )
                        )}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <SidebarGroup />
    </SidebarContent>
  );
}
function SubmenuItem({
  item,
  ...props
}: { item: NavItem["items"][number] } & ComponentPropsWithRef<
  typeof SidebarMenuSubButton
>) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild {...props}>
        <Link href={item.url}>{item.title}</Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
