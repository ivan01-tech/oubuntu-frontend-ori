import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import SearchResulComponent from "./SearchResulComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import useDebouncedQuery from "@/hooks/useDebounce";
import {
  searchProduct,
  searchProductByName,
} from "@/services/products.services";

type Props = {};

interface SearchFormInput {
  search: string;
}

const SearchBar = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    isSuccess: isSuccessP,
    data: dataP,
    isPending: isLodP,
    isError: isErrP,
    mutate,
    error: errP,
  } = useDebouncedQuery(
    ["productsSearchByName"],
    searchProductByName<Product[]>,
    1000
  );

  // const { register, handleSubmit, setValue } = useForm<SearchFormInput>();

  const [searchResultComponentOpen, setSearchResultComponentOpen] =
    useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setSearchResultComponentOpen(true);
  };

  const handleCloseDarlino = () => {
    setSearchResultComponentOpen(false);
  };

  // const onSubmit: SubmitHandler<SearchFormInput> = (data: any) => {
  //   console.log(data);
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setSearchResultComponentOpen(false);
  //     setIsLoading(false);
  //   }, 3000);
  // };

  useEffect(
    function () {
      console.log("event: ", searchTerm);
      const p = searchTerm.trim();
      if (!p) return;
      mutate({ productName: p });
    },
    [searchTerm, mutate]
  );

  console.log("name search  ", dataP);

  return (
    <div className="flex flex-col relative w-full space-y-3">
      <div className="flex relative  w-full items-center space-x-4">
        <IoIosSearch className="absolute left-6 text-3xl opacity-25" />
        <form
          className="w-full"

          // onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Rechercher un produit"
            // {...register("search")}
            onChange={handleInputChange}
            className="pr-3 pl-12 py-3 outline-none border rounded w-full"
          />
        </form>
      </div>

      {searchResultComponentOpen && (
        <SearchResulComponent
          data={dataP || []}
          loading={isLodP}
          onClose={handleCloseDarlino}
        />
      )}
    </div>
  );
};

export default SearchBar;
