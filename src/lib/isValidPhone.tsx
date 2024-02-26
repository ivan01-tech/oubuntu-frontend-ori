import { CountryCode, isPossiblePhoneNumber } from "libphonenumber-js";
export function isValidPhoneNumber(phone: string, code: CountryCode): boolean {
  const result = isPossiblePhoneNumber(phone, code);

  return result;
}
