"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { type RegisterInput, registerSchema } from "../schemas/auth.schema";

export function useRegisterFormLogic() {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await apiClient.post("auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Pendaftaran Berhasil!", {
        description:
          "Akun Anda berhasil dibuat. Silakan masuk untuk melanjutkan.",
      });
    } catch (err) {
      const errorResponse = err as {
        response?: { data?: { message?: string } };
      };
      const message =
        errorResponse.response?.data?.message ??
        "Registrasi gagal. Silakan coba lagi.";
      form.setError("root", { type: "server", message });
      toast.error("Registrasi Gagal", { description: message });
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isSuccess: form.formState.isSubmitSuccessful,
    rootError: form.formState.errors.root?.message,
  };
}
