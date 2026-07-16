export type TabType = "overview" | "users" | "settings";

export interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "active" | "suspended" | "pending";
}
