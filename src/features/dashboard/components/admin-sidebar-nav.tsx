"use client";

import {
  BarChart3,
  LogOut,
  Settings,
  Shield,
  User as UserIcon,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import type { TabType } from "../types";

interface AdminSidebarNavProps {
  userName: string | undefined;
  userRole: string | undefined;
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onLogout: () => void;
}

export function AdminSidebarNav({
  userName,
  userRole,
  activeTab,
  onTabChange,
  onLogout,
}: AdminSidebarNavProps) {
  return (
    <Sidebar collapsible="icon" className="border-r border-border/30">
      <SidebarHeader className="border-b border-border/30 p-2 md:p-3">
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <div className="h-8.5 w-8.5 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <Shield className="h-4.5 w-4.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-extrabold text-sm text-foreground leading-none">
                Admin Panel
              </span>
              <span className="text-[10px] text-muted-foreground mt-1">
                NextBoi Kit
              </span>
            </div>
          </div>
          <SidebarTrigger className="hidden md:flex group-data-[collapsible=icon]:mx-auto" />
        </div>
      </SidebarHeader>

      <SidebarContent className="p-2 space-y-1">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "overview"}
              onClick={() => onTabChange("overview")}
              className="w-full text-left"
            >
              <BarChart3 className="h-4.5 w-4.5 shrink-0" />
              <span>Overview</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "users"}
              onClick={() => onTabChange("users")}
              className="w-full text-left"
            >
              <Users className="h-4.5 w-4.5 shrink-0" />
              <span>User Management</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              isActive={activeTab === "settings"}
              onClick={() => onTabChange("settings")}
              className="w-full text-left"
            >
              <Settings className="h-4.5 w-4.5 shrink-0" />
              <span>System Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/30 p-3">
        {/* Desktop: expanded view */}
        <div className="space-y-3 group-data-[collapsible=icon]:hidden">
          <div className="flex items-center gap-2.5 px-1.5">
            <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary text-xs font-bold shrink-0">
              <UserIcon className="h-4 w-4" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-foreground truncate">
                {userName}
              </span>
              <span className="text-[10px] text-muted-foreground truncate capitalize">
                {userRole}
              </span>
            </div>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={onLogout}
            className="w-full gap-1.5"
            title="Keluar"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar</span>
          </Button>
        </div>

        {/* Collapsed: icon-only */}
        <div className="hidden group-data-[collapsible=icon]:flex justify-center">
          <Button
            variant="destructive"
            size="icon-sm"
            onClick={onLogout}
            title="Keluar"
          >
            <LogOut className="h-3.5 w-3.5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
