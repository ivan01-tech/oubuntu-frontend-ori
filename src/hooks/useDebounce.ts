import loadash from "lodash";
import { useMutation } from "@tanstack/react-query";
import { searchProduct } from "@/services/products.services";
// import { useQuery } from "react-query";
// import loadash from "lodash";
// import { useMutation } from "@tanstack/react-query";
// import { searchProduct } from "@/services/products.services";

// const useDebouncedQuery = (
//   queryKey: string[],
//   delay: number
// ) => {
//   const debouncedQueryFn = loadash.debounce(queryFn, delay);
//   return useMutation({
//     mutationKey: queryKey,
//     mutationFn: searchProduct<Product[]>,
//   });
// };

export const useDebouncedQuery = <Z>(
  queryKey: string[],
  queryFn: (params: any) => Promise<Z>,
  delay: number
) => {
  const debouncedQueryFn = loadash.debounce(queryFn, delay);

  // Utilisez useQuery si vous souhaitez effectuer une requête côté client
  //   const query = useQuery({
  //     queryKey,
  //     queryFn: debouncedQueryFn, // Utilisez la fonction debounce ici
  //   });

  // Utilisez useMutation si vous souhaitez effectuer une mutation (POST, PUT, etc.)
  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: queryFn,
  });

  return { ...mutation };
};
export default useDebouncedQuery;
