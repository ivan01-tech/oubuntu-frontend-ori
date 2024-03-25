import { CountryCode, isPossiblePhoneNumber } from "libphonenumber-js";
export function isValidPhoneNumber(phone: string, code: CountryCode): boolean {
  const result = isPossiblePhoneNumber(phone, code);

  return result;
}

export const getImageUrlOnLocal = (dataId: string, imageext: string) => {
  return `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${dataId}.${imageext}`;
};

export function calculateDiscountPercentage(
  initialPrice: number,
  discountedPrice: number
): number {
  // Vérifie si le prix initial est plus grand que le prix après réduction
  if (initialPrice <= discountedPrice) {
    throw new Error(
      "Le prix initial doit être supérieur au prix après réduction."
    );
  }

  // Calcul du montant de réduction
  const discountAmount = initialPrice - discountedPrice;

  // Calcul du pourcentage de réduction
  const discountPercentage = (discountAmount / initialPrice) * 100;

  // Retourne le pourcentage de réduction arrondi à deux décimales
  return parseFloat(discountPercentage.toFixed(2));
}
