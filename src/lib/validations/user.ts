import { z } from "zod";

export const registerFormSchema = z
  .object({
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormInput = z.infer<typeof registerFormSchema>;

export const loginFormSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

export type LoginFormInput = z.infer<typeof loginFormSchema>;
