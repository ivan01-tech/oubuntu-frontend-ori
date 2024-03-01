import { ProductContext } from "@/context/productContext";
import { UserContext } from "@/context/userContext";
import { useContext } from "react";

export const useSearchProduct = () => {
  return useContext(ProductContext);
};
