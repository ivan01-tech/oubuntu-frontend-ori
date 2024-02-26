import { isValidPhoneNumber } from "@/lib/isValidPhone";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/utils";
import { z, ZodError } from "zod";

export const LoginUserModel = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z.string(),
});

// Méthode pour transformer les erreurs Zod en un objet d'erreurs que vous pouvez utiliser dans le frontend
export function transformZodError(error: ZodError) {
  const errors: Record<string, string> = {};
  error.errors.forEach((err) => {
    if (err.path) {
      errors[err.path.join(".")] = err.message;
    }
  });
  return errors;
}

export type LoginUserModelType = z.infer<typeof LoginUserModel>;
