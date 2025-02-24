import { z } from "zod";

export const SignupValidationFormSchema = z.object({
  // меняем содержимое формы , любые параметры
  name: z.string().min(2, { message: "Name should be 2+ characters" }).max(20),
  username: z.string().min(2).max(50),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password should be 8+ characters" })
    .max(20),
});
