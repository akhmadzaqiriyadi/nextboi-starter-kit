"use client";

import { useAuth } from "@/features/auth";
import { AdminDashboard, UserDashboard } from "@/features/dashboard";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="flex-1 container mx-auto px-4 py-8 max-w-7xl relative z-10">
      {user?.role === "admin" ? (
        <AdminDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </div>
  );
}
