import type { AxiosInstance } from "axios";
import axios from "axios";
import { env } from "@/lib/env";

// Instantiate the custom Axios client
const apiClient: AxiosInstance = axios.create({
  baseURL:
    typeof window !== "undefined"
      ? "/api-proxy" // Client side: triggers the Next.js reverse-proxy
      : env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api", // Server side (SSR/RSC): query endpoint directly
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
