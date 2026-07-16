"use client";

import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { useAuth } from "@/features/auth";
import { ThemeToggle } from "./theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 font-extrabold text-lg tracking-tight"
          >
            <span className="text-gradient-primary">NextBoi</span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-semibold bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full">
              Open Source
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link
              href="/#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </Link>
            <Link
              href="/#dx"
              className="hover:text-foreground transition-colors"
            >
              DX Specs
            </Link>
            <Link
              href="/#feedback"
              className="hover:text-foreground transition-colors"
            >
              Feedback
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className={`hover:text-foreground transition-colors ${
                  pathname === "/dashboard"
                    ? "text-foreground font-semibold"
                    : ""
                }`}
              >
                Dashboard
              </Link>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-semibold text-foreground">
                  {user?.name}
                </span>
                <span className="text-[10px] text-muted-foreground capitalize">
                  {user?.role}
                </span>
              </div>
              <div className="flex items-center gap-2 border border-border/40 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-full pl-2 pr-1 py-1">
                <div className="h-6 w-6 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold border border-primary/25">
                  <User className="h-3 w-3" />
                </div>
                <button
                  type="button"
                  onClick={logout}
                  className="p-1 hover:text-destructive rounded-full transition-colors cursor-pointer"
                  title="Keluar"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          ) : (
            <Link
              href="/login"
              className={`${buttonVariants({ size: "sm" })} bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300 flex items-center gap-1.5`}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Masuk</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
