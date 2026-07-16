import {
  LayoutDashboard,
  LogOut,
  Shield,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/features/auth";

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
    role: string;
  } | null;
}

export function UserDashboard({ user }: UserDashboardProps) {
  const { logout } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header Profile Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-border/30 pb-5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gradient-primary">
              User Dashboard
            </h1>
            <p className="text-muted-foreground text-sm">
              Selamat datang kembali, {user?.name || "User"}. Halaman ini
              diproteksi oleh server.
            </p>
          </div>
        </div>

        {/* User profile controls and logout */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
            {user?.role}
          </span>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-destructive/20 hover:bg-destructive/10 text-destructive transition-all cursor-pointer shadow-sm"
            title="Keluar"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Keluar</span>
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="glass-panel border-border/30 rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-500">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground">
              Sistem Autentikasi JWT
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Token akses berumur pendek disimpan secara aman di dalam memori
            React. Jika token tersebut kadaluarsa, interceptor pada client-side
            secara otomatis melakukan request refresh token silent.
          </p>
        </div>

        <div className="glass-panel border-border/30 rounded-2xl p-6 shadow-md relative overflow-hidden">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-10 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center justify-center text-destructive">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-foreground">
              Keamanan Refresh Token
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Refresh Token berumur panjang disimpan di dalam cookie berjenis{" "}
            <code className="text-xs bg-zinc-100 dark:bg-zinc-900 rounded px-1 text-primary">
              HttpOnly
            </code>
            . Cookie ini tidak bisa dibaca oleh script Javascript manapun di
            browser (Melindungi dari serangan XSS).
          </p>
        </div>
      </div>

      <div className="glass-panel border-border/30 rounded-2xl p-8 shadow-lg text-center space-y-4">
        <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          <Sparkles className="h-6 w-6 animate-pulse" />
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Backend-for-Frontend (BFF) Ready
        </h2>
        <p className="text-muted-foreground text-sm max-w-2xl mx-auto">
          Konfigurasi proxy NextBoi sudah aktif. Saat Anda siap menghubungkan
          backend native Anda seperti Hono atau Elysia, Anda hanya perlu
          mengubah endpoint URL pada file konfigurasi environment.
        </p>
      </div>
    </div>
  );
}
