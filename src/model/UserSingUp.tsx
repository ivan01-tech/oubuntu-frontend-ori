import { isValidPhoneNumber } from "@/lib/isValidPhone";
import { EMAIL_REGEX, PASSWORD_REGEX } from "@/lib/utils";
import { CountryCode } from "libphonenumber-js";
import { z, ZodError } from "zod";

export const UserSignUp = z
  .object({
    first_name: z.string().min(4).max(15),
    // country_code: z.string(),
    confirm_password: z.string(),
    // phone_number: z.string(),
    email: z
      .string()
      .refine((v) => EMAIL_REGEX.test(v), { message: "Invalid email format" }),
    password: z.string().refine((v) => PASSWORD_REGEX.test(v), {
      message:
        "'Minimum eight characters, at least one letter, one number and one special character",
    }),
    last_name: z.string().min(4).max(15),
    // roles: z.array(z.enum(["ADMIN", "USER"])).default(["USER"]),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"], // path of error
  });
// .refine(
//   (data) =>
//     isValidPhoneNumber(data.phone_number, data.country_code as CountryCode),
//   {
//     message: "Ivalid phone number",
//     path: ["phone_number"], // path of error
//   }
// );

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

export type UserSignUpType = z.infer<typeof UserSignUp>;
