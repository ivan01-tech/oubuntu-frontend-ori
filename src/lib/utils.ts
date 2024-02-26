import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const userRoles = {
  is_admin: "ADMIN",
  is_user: "USER",
};

export const USER_ROLES = ["ADMIN", "USER"];
export const SALT_HASH = 10;
export enum UserRoles {
  is_admin = "USER",
  is_user = "ADMIN",
}

export const PHONE_NUMBER_REGEX = /(\+237|237)\s(6|2)(2|3|[5-9])[0-9]{7}/;
export const EMAIL_REGEX = /\S+@\S+\.\S+/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
