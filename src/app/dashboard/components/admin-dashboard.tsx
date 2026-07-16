"use client";

import {
  Activity,
  BarChart3,
  Cpu,
  Database,
  RefreshCw,
  Search,
  Settings,
  Shield,
  Sliders,
  UserCheck,
  Users,
  UserX,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AdminDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
}

type TabType = "overview" | "users" | "settings";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | "pending";
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Simulated users database
  const [mockUsers, setMockUsers] = useState<MockUser[]>([
    {
      id: "1",
      name: "Jekz Dev",
      email: "user@example.com",
      role: "admin",
      status: "active",
    },
    {
      id: "2",
      name: "Guest User",
      email: "guest@example.com",
      role: "user",
      status: "active",
    },
    {
      id: "3",
      name: "Alice Johnson",
      email: "alice@example.com",
      role: "editor",
      status: "active",
    },
    {
      id: "4",
      name: "Bob Smith",
      email: "bob@example.com",
      role: "user",
      status: "suspended",
    },
    {
      id: "5",
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "user",
      status: "pending",
    },
  ]);

  const handleStatusToggle = (
    userId: string,
    currentStatus: MockUser["status"],
  ) => {
    const newStatus: MockUser["status"] =
      currentStatus === "active" ? "suspended" : "active";
    setMockUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u)),
    );
    toast.success(`Status user berhasil diubah menjadi ${newStatus}`);
  };

  const handleSimulateSync = () => {
    toast.info("Sinkronisasi database...", {
      description: "Menghubungkan ke mock database server.",
    });
    setTimeout(() => {
      toast.success("Sinkronisasi selesai!", {
        description: "Data database berhasil diperbarui.",
      });
    }, 1200);
  };

  // Filtered users for User Management Tab
  const filteredUsers = mockUsers.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.role.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gradient-primary">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm">
            Selamat datang kembali, {user?.name}. Tingkat Akses:{" "}
            <span className="text-primary font-semibold uppercase">
              {user?.role}
            </span>
            .
          </p>
        </div>
        <button
          type="button"
          onClick={handleSimulateSync}
          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl border border-border/40 bg-zinc-100/50 hover:bg-zinc-100 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 text-foreground cursor-pointer transition-all self-start sm:self-auto shadow-sm"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Sync DB</span>
        </button>
      </div>

      {/* Main Layout: Sidebar & Content Panel */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="flex flex-row md:flex-col gap-1.5 md:w-64 bg-zinc-50/50 dark:bg-zinc-900/20 border border-border/30 rounded-2xl p-2.5 shadow-sm overflow-x-auto md:overflow-x-visible shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer w-full text-left whitespace-nowrap md:whitespace-normal ${
              activeTab === "overview"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <BarChart3 className="h-4.5 w-4.5 shrink-0" />
            <span>Overview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer w-full text-left whitespace-nowrap md:whitespace-normal ${
              activeTab === "users"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <Users className="h-4.5 w-4.5 shrink-0" />
            <span>User Management</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("settings")}
            className={`flex items-center gap-2.5 px-4 py-3 text-sm font-semibold rounded-xl transition-all cursor-pointer w-full text-left whitespace-nowrap md:whitespace-normal ${
              activeTab === "settings"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
            }`}
          >
            <Settings className="h-4.5 w-4.5 shrink-0" />
            <span>System Settings</span>
          </button>
        </aside>

        {/* Content Panel */}
        <main className="flex-1 glass-panel border-border/30 rounded-2xl p-6 shadow-md min-h-[400px]">
          {/* OVERVIEW TAB */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>Statistik & Layanan</span>
              </h2>

              {/* Stats Grid */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="border border-border/30 rounded-xl p-4 bg-zinc-50/30 dark:bg-zinc-950/20 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Total User
                    </span>
                    <Users className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-black text-foreground">
                    {mockUsers.length}
                  </p>
                </div>

                <div className="border border-border/30 rounded-xl p-4 bg-zinc-50/30 dark:bg-zinc-950/20 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Beban CPU
                    </span>
                    <Cpu className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-black text-foreground">1.8%</p>
                </div>

                <div className="border border-border/30 rounded-xl p-4 bg-zinc-50/30 dark:bg-zinc-950/20 space-y-2">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      API Health
                    </span>
                    <Database className="h-4 w-4" />
                  </div>
                  <p className="text-2xl font-black text-emerald-500">Normal</p>
                </div>
              </div>

              {/* System Architecture Details */}
              <div className="border border-border/30 rounded-xl p-5 space-y-4">
                <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                  <Shield className="h-4 w-4 text-purple-500" />
                  <span>Keamanan Admin Terproteksi</span>
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Semua data administratif pada dashboard dilindungi oleh proxy
                  di level middleware Next.js. Ketika Anda mengintegrasikan
                  backend native seperti Hono, Elysia, atau Fastify, Anda dapat
                  menyertakan bearer token JWT admin langsung pada header
                  otorisasi API Client.
                </p>
              </div>
            </div>
          )}

          {/* USER MANAGEMENT TAB */}
          {activeTab === "users" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Manajemen User</span>
                </h2>

                {/* Search Input */}
                <div className="relative w-full sm:w-60">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Cari user..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-border/40 bg-zinc-100/50 dark:bg-zinc-900/50 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-foreground"
                  />
                </div>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto border border-border/30 rounded-xl bg-zinc-50/10 dark:bg-zinc-950/10">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-border/30 text-muted-foreground font-bold bg-zinc-100/50 dark:bg-zinc-900/30">
                      <th className="p-3">Nama</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Role</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map((u) => (
                        <tr
                          key={u.id}
                          className="hover:bg-zinc-50/20 dark:hover:bg-zinc-900/20"
                        >
                          <td className="p-3 font-semibold text-foreground">
                            {u.name}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {u.email}
                          </td>
                          <td className="p-3">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold border capitalize ${
                                u.role === "admin"
                                  ? "bg-red-500/10 border-red-500/25 text-red-500"
                                  : u.role === "editor"
                                    ? "bg-purple-500/10 border-purple-500/25 text-purple-500"
                                    : "bg-zinc-500/10 border-zinc-500/25 text-zinc-400"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3">
                            <span className="flex items-center gap-1.5 capitalize text-muted-foreground">
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
                          </td>
                          <td className="p-3 text-right">
                            <button
                              type="button"
                              onClick={() => handleStatusToggle(u.id, u.status)}
                              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                u.status === "active"
                                  ? "border-red-500/20 hover:bg-red-500/10 text-red-500"
                                  : "border-emerald-500/20 hover:bg-emerald-500/10 text-emerald-500"
                              }`}
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
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="p-8 text-center text-muted-foreground"
                        >
                          User tidak ditemukan.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* SYSTEM SETTINGS TAB */}
          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Sliders className="h-5 w-5 text-primary" />
                <span>Pengaturan Sistem</span>
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-zinc-50/20 dark:bg-zinc-950/10">
                  <div>
                    <h4 className="font-semibold text-xs text-foreground">
                      Mode Pemeliharaan (Maintenance)
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Batasi akses hanya untuk administrator.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-border/30 rounded-xl bg-zinc-50/20 dark:bg-zinc-950/10">
                  <div>
                    <h4 className="font-semibold text-xs text-foreground">
                      Simulasi Rate Limiting
                    </h4>
                    <p className="text-[11px] text-muted-foreground">
                      Simulasikan pembatasan beban API request di sisi client.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-zinc-200 dark:bg-zinc-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  toast.success("Setelan sistem berhasil disimpan!")
                }
                className="w-full bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold py-2 px-4 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 cursor-pointer transition-all text-center text-xs"
              >
                Simpan Perubahan
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
