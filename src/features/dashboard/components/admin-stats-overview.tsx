"use client";

import { Activity, Cpu, Database, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { MockUser } from "../types";

interface AdminStatsOverviewProps {
  mockUsers: MockUser[];
  onSimulateSync: () => void;
}

export function AdminStatsOverview({
  mockUsers,
  onSimulateSync,
}: AdminStatsOverviewProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <Activity className="h-5 w-5 text-primary" />
        <span>Statistik &amp; Layanan</span>
      </h2>

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
            <p className="text-2xl font-black text-foreground">1.8%</p>
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
            <p className="text-2xl font-black text-emerald-500">Normal</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-bold text-sm text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-purple-500" />
            <span>Keamanan Admin Terproteksi</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-3">
          <p>
            Semua data administratif pada dashboard dilindungi oleh proxy di
            level middleware Next.js. Ketika Anda mengintegrasikan backend
            native seperti Hono, Elysia, atau Fastify, Anda dapat menyertakan
            bearer token JWT admin langsung pada header otorisasi API Client.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={onSimulateSync}
            className="gap-1.5"
          >
            Simulasi DB Sync
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
