import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { HistoryIcon, ListVideoIcon, ThumbsUpIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const items = [
  {
    title: "History",
    url: "/playlists/history",
    icon: HistoryIcon,
  },
  {
    title: "Liked",
    url: "/playlists/liked",
    icon: ThumbsUpIcon,
    auth: true,
  },
  {
    title: "All Playlists",
    url: "/playlists",
    icon: ListVideoIcon,
    auth: true,
  },
];

const PersonalSection = () => {
  return (
    <SidebarGroup>
      <SidebarGroupLabel></SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items?.map((item) => (
            <SidebarMenuItem key={item?.title}>
              <SidebarMenuButton tooltip={item?.title} asChild isActive={false}>
                <Link href={item?.url} className="flex items-center gap-4">
                  <item.icon />
                  <span className="text-sm">{item?.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

export default PersonalSection;
