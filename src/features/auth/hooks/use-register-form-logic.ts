"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type RegisterInput, registerSchema } from "../schemas/auth.schema";

export function useRegisterFormLogic() {
  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const onSubmit = async (_data: RegisterInput) => {
    try {
      // Simulate registration delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Pendaftaran Berhasil!", {
        description:
          "Akun Anda berhasil dibuat. Silakan masuk untuk melanjutkan.",
      });
    } catch (_err) {
      const message = "Registrasi gagal. Silakan coba lagi.";
      form.setError("root", { type: "server", message });
      toast.error("Registrasi Gagal", {
        description: message,
      });
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
