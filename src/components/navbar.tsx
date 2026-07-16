"use client";

import { Menu, Zap } from "lucide-react";
import Link from "next/link";
import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/config/navigation";

export function Navbar() {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Logo & Badges */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            className="flex items-center gap-2 font-bold text-xl tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-purple-500 text-primary-foreground shadow-md shadow-primary/20">
              <Zap className="h-5 w-5 fill-current" />
            </div>
            <span className="bg-gradient-to-r from-foreground via-foreground/90 to-muted-foreground bg-clip-text text-transparent">
              Next<span className="text-primary">Boi</span>
            </span>
          </Link>
          <Badge
            variant="outline"
            className="border-primary/25 bg-primary/5 text-primary text-[10px] leading-[10px] px-2 font-mono rounded-full hidden xs:inline-flex"
          >
            by jekz
          </Badge>
          <Badge
            variant="secondary"
            className="bg-zinc-800 text-zinc-300 border border-zinc-700/50 text-[9px] leading-[9px] px-2 rounded-full hidden sm:inline-flex"
          >
            Open Source
          </Badge>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground py-1 px-2 rounded-md"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right side items */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <Link
            href="#feedback"
            className={`${buttonVariants({ size: "lg" })} hidden sm:inline-flex bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all duration-300 glow-hover`}
          >
            Get Started
          </Link>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-9 w-9 border border-input bg-background/50 hover:bg-accent hover:text-accent-foreground backdrop-blur-sm"
                />
              }
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="glass-panel border-l-border/50 w-[280px] sm:w-[350px]"
            >
              <SheetHeader className="text-left border-b border-border/40 pb-4 mb-4">
                <SheetTitle className="flex items-center gap-2 font-bold text-xl tracking-tight">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-primary to-purple-500 text-primary-foreground">
                    <Zap className="h-5 w-5 fill-current" />
                  </div>
                  <span>
                    Next<span className="text-primary">Boi</span>
                  </span>
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4 px-4">
                {navItems.map((item) => {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-base font-medium text-muted-foreground hover:text-foreground py-2 px-3 rounded-lg hover:bg-accent/40 transition-colors"
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="#feedback"
                  onClick={() => setOpen(false)}
                  className={`${buttonVariants({ size: "lg" })} mt-4 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground font-semibold shadow-lg hover:opacity-90 w-full justify-center`}
                >
                  Get Started
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
