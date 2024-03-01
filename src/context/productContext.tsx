import React, { createContext, useState } from "react";

export interface ProductContextType {
  selectedCategory: Category | null | undefined;
  setCategory: React.Dispatch<
    React.SetStateAction<Category[] | null | undefined>
  >;
  Category: Category[] | null | undefined;
  setselectedCategory: React.Dispatch<
    React.SetStateAction<Category | null | undefined>
  >;
}
export const ProductContext = createContext<ProductContextType | null>(null);

type Props = {
  children: React.ReactNode;
};
export function ProductContextProvider({ children }: Props) {
  
  const [selectedCategory, setselectedCategory] = useState<Category | null>();
  const [Category, setCategory] = useState<Category[] | null>();

  const value: ProductContextType = {
    setselectedCategory,
    selectedCategory,
    Category,
    setCategory,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}
