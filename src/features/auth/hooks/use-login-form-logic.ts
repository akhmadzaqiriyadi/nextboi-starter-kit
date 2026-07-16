"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";
import { type LoginInput, loginSchema } from "../schemas/auth.schema";

export function useLoginFormLogic() {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    setIsSubmitting(true);
    try {
      await login(data);
      toast.success("Masuk berhasil!", {
        description: "Selamat datang kembali di panel dashboard Anda.",
      });
    } catch (err) {
      const errorResponse = err as {
        response?: { data?: { message?: string } };
      };
      const message =
        errorResponse.response?.data?.message || "Email atau password salah";
      setError(message);
      toast.error("Gagal Masuk", {
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    error,
    isSubmitting,
  };
}
