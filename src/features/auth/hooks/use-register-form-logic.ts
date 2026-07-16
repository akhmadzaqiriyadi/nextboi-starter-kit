"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type RegisterInput, registerSchema } from "../schemas/auth.schema";

export function useRegisterFormLogic() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (_data: RegisterInput) => {
    setError(null);
    setIsSubmitting(true);
    try {
      // Simulate registration delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSuccess(true);
      toast.success("Pendaftaran Berhasil!", {
        description:
          "Akun Anda berhasil dibuat. Silakan masuk untuk melanjutkan.",
      });
    } catch (_err) {
      const message = "Registrasi gagal. Silakan coba lagi.";
      setError(message);
      toast.error("Registrasi Gagal", {
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
    isSuccess,
  };
}
