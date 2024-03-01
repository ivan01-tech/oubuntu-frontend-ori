import { SearchProductContext } from "@/context/searchProductContext";
import { useContext } from "react";

export const useSearchProduct = () => {
  return useContext(SearchProductContext);
};
