"use client";

import {
  Activity,
  BarChart3,
  Cpu,
  Database,
  LogOut,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sliders,
  UserCheck,
  User as UserIcon,
  Users,
  UserX,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type User, useAuth } from "@/features/auth";
import { useAdminDashboardLogic } from "../hooks/use-admin-dashboard-logic";

interface AdminDashboardProps {
  user: User | null;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const { logout } = useAuth();
  const {
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    maintenanceMode,
    setMaintenanceMode,
    rateLimiting,
    setRateLimiting,
    mockUsers,
    filteredUsers,
    handleStatusToggle,
    handleSimulateSync,
    handleSaveSettings,
  } = useAdminDashboardLogic();

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Shadcn UI Sidebar Component */}
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
                  onClick={() => setActiveTab("overview")}
                  className="w-full text-left"
                >
                  <BarChart3 className="h-4.5 w-4.5 shrink-0" />
                  <span>Overview</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "users"}
                  onClick={() => setActiveTab("users")}
                  className="w-full text-left"
                >
                  <Users className="h-4.5 w-4.5 shrink-0" />
                  <span>User Management</span>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeTab === "settings"}
                  onClick={() => setActiveTab("settings")}
                  className="w-full text-left"
                >
                  <Settings className="h-4.5 w-4.5 shrink-0" />
                  <span>System Settings</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-border/30 p-3">
            {/* Desktop View user info and logout button */}
            <div className="space-y-3 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2.5 px-1.5">
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/25 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                  <UserIcon className="h-4 w-4" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-semibold text-foreground truncate">
                    {user?.name}
                  </span>
                  <span className="text-[10px] text-muted-foreground truncate capitalize">
                    {user?.role}
                  </span>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={logout}
                className="w-full gap-1.5"
                title="Keluar"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span>Keluar</span>
              </Button>
            </div>

            {/* Collapsed Icon button for desktop view */}
            <div className="hidden group-data-[collapsible=icon]:flex justify-center">
              <Button
                variant="destructive"
                size="icon-sm"
                onClick={logout}
                title="Keluar"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Inset Main Panel */}
        <SidebarInset className="flex flex-col flex-1 overflow-hidden bg-background">
          {/* Header top bar */}
          <header className="flex items-center justify-between border-b border-border/30 px-6 py-4 shrink-0">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="md:hidden" />
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">
                  Tingkat Akses:{" "}
                </span>
                <Badge variant="outline" className="capitalize text-[10px]">
                  {user?.role}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleSimulateSync}
                className="gap-1.5"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Sync DB</span>
              </Button>
            </div>
          </header>

          {/* Content area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="max-w-6xl w-full mx-auto space-y-6">
              {/* Header Title */}
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-gradient-primary">
                  Admin Panel
                </h1>
                <p className="text-muted-foreground text-sm">
                  Kelola sistem, pengguna, dan konfigurasi API NextBoi.
                </p>
              </div>

              {/* TAB OVERVIEW */}
              {activeTab === "overview" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span>Statistik & Layanan</span>
                  </h2>

                  {/* Stats Grid with Card Components */}
                  <div className="grid gap-4 sm:grid-cols-3">
                    <Card className="glass-card">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Total User
                        </CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-black text-foreground">
                          {mockUsers.length}
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Beban CPU
                        </CardTitle>
                        <Cpu className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-black text-foreground">
                          1.8%
                        </p>
                      </CardContent>
                    </Card>

                    <Card className="glass-card">
                      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                        <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          API Health
                        </CardTitle>
                        <Database className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-black text-emerald-500">
                          Normal
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* System Architecture Details */}
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="font-bold text-sm text-foreground flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-500" />
                        <span>Keamanan Admin Terproteksi</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground leading-relaxed">
                      Semua data administratif pada dashboard dilindungi oleh
                      proxy di level middleware Next.js. Ketika Anda
                      mengintegrasikan backend native seperti Hono, Elysia, atau
                      Fastify, Anda dapat menyertakan bearer token JWT admin
                      langsung pada header otorisasi API Client.
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* TAB USER MANAGEMENT */}
              {activeTab === "users" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Users className="h-5 w-5 text-primary" />
                      <span>Manajemen User</span>
                    </h2>

                    {/* Input Search Component */}
                    <div className="relative w-full sm:w-60">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="text"
                        placeholder="Cari user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 text-xs rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Table Component */}
                  <div className="border border-border/30 rounded-xl overflow-hidden bg-zinc-50/10 dark:bg-zinc-950/10">
                    <Table>
                      <TableHeader className="bg-zinc-100/50 dark:bg-zinc-900/30">
                        <TableRow>
                          <TableHead className="font-bold">Nama</TableHead>
                          <TableHead className="font-bold">Email</TableHead>
                          <TableHead className="font-bold">Role</TableHead>
                          <TableHead className="font-bold">Status</TableHead>
                          <TableHead className="text-right font-bold pr-4">
                            Aksi
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredUsers.length > 0 ? (
                          filteredUsers.map((u) => (
                            <TableRow key={u.id}>
                              <TableCell className="font-semibold text-foreground">
                                {u.name}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {u.email}
                              </TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    u.role === "admin"
                                      ? "destructive"
                                      : u.role === "editor"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className="capitalize text-[10px]"
                                >
                                  {u.role}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <span className="flex items-center gap-1.5 capitalize text-muted-foreground text-xs">
                                  <span
                                    className={`h-1.5 w-1.5 rounded-full ${
                                      u.status === "active"
                                        ? "bg-emerald-500"
                                        : u.status === "suspended"
                                          ? "bg-red-500"
                                          : "bg-orange-500"
                                    }`}
                                  />
                                  <span>{u.status}</span>
                                </span>
                              </TableCell>
                              <TableCell className="text-right pr-4">
                                <Button
                                  variant="outline"
                                  size="icon-sm"
                                  onClick={() =>
                                    handleStatusToggle(u.id, u.status)
                                  }
                                  className={
                                    u.status === "active"
                                      ? "border-red-500/20 hover:bg-red-500/10 text-red-500"
                                      : "border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500"
                                  }
                                  title={
                                    u.status === "active"
                                      ? "Suspend User"
                                      : "Activate User"
                                  }
                                >
                                  {u.status === "active" ? (
                                    <UserX className="h-3.5 w-3.5" />
                                  ) : (
                                    <UserCheck className="h-3.5 w-3.5" />
                                  )}
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={5}
                              className="p-8 text-center text-muted-foreground"
                            >
                              User tidak ditemukan.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}

              {/* TAB SYSTEM SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Sliders className="h-5 w-5 text-primary" />
                    <span>Pengaturan Sistem</span>
                  </h2>

                  <div className="space-y-4">
                    {/* Switch Components */}
                    <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-zinc-50/20 dark:bg-zinc-950/10">
                      <div>
                        <h4 className="font-semibold text-xs text-foreground">
                          Mode Pemeliharaan (Maintenance)
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          Batasi akses hanya untuk administrator.
                        </p>
                      </div>
                      <Switch
                        checked={maintenanceMode}
                        onCheckedChange={setMaintenanceMode}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-zinc-50/20 dark:bg-zinc-950/10">
                      <div>
                        <h4 className="font-semibold text-xs text-foreground">
                          Simulasi Rate Limiting
                        </h4>
                        <p className="text-[11px] text-muted-foreground">
                          Simulasikan pembatasan beban API request di sisi
                          client.
                        </p>
                      </div>
                      <Switch
                        checked={rateLimiting}
                        onCheckedChange={setRateLimiting}
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleSaveSettings}
                    className="w-full bg-gradient-to-r from-primary to-purple-600 hover:shadow-primary/30"
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              )}
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
