import React, { createContext, useState } from "react";

export interface SearchProductContextType {
  selectedCategory: Category[] | null | undefined;
  MaxPrice: Number | null | undefined;
  MinPrice: Number | null | undefined;
  setMaxPrice: React.Dispatch<React.SetStateAction<Number | null | undefined>>;
  setMinPrice: React.Dispatch<React.SetStateAction<Number | null | undefined>>;
  setselectedCategory: React.Dispatch<
    React.SetStateAction<Category[] | null | undefined>
  >;
}
export const SearchProductContext =
  createContext<SearchProductContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function SearchProductContextProvider({ children }: Props) {
  const [selectedCategory, setselectedCategory] = useState<Category[] | null>();
  const [MinPrice, setMinPrice] = useState<Number | null>();
  const [MaxPrice, setMaxPrice] = useState<Number | null>();

  const value: SearchProductContextType = {
    setselectedCategory,
    selectedCategory,
    MaxPrice,
    setMinPrice,
    MinPrice,
    setMaxPrice,
  };

  return (
    <SearchProductContext.Provider value={value}>
      {children}
    </SearchProductContext.Provider>
  );
}
