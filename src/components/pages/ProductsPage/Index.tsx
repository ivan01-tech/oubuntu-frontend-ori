import { NextPage } from "next";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import ProductCard, { ProductCardProps } from "../HomePage/_/ProductCard";
import { FilterIcon, Settings, Settings2 } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllProducts, searchProduct } from "@/services/products.services";
import Image from "next/image";
import { useSearchProduct } from "@/hooks/useProduct";

// const randomComparator = () => Math.random() - 0.5;
const ProductsPage: NextPage = ({}) => {
  const { selectedCategory } = useSearchProduct()!;

  const {
    isSuccess: isSuccessP,
    data: dataP,
    isPending: isLodP,
    isError: isErrP,
    mutate,
    error: errP,
  } = useMutation({
    mutationKey: ["productsSearch"],
    mutationFn: searchProduct<Product[]>,
  });

  useEffect(
    function () {
      const params = {
        category_id: selectedCategory?._id,
      };

      mutate(params);
    },
    [selectedCategory, mutate]
  );

  console.log("data", dataP);

  return (
    <div className="lg:grid flex flex-col space-y-2 grid-cols-5 gap-4 relative">
      <div className="lg:hidden block">
        <Drawer>
          <DrawerTrigger>
            {" "}
            <div className="flex w-full cursor-pointer items-center justify-center duration-300 hover:border-primary lg:hidden rounded-md px-3 py-2 border border-gray-200 space-x-2">
              <Settings2 />
              <p> Filtre </p>
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filtre</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 overflow-y-scroll">
              <Sidebar className="flex lg:hidden shadow-none border-none" />
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      <Sidebar className="lg:flex hidden shadow-md border-2" />

      {isLodP ? (
        <div className=" flex justify-center items-center flex-col">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
          <p>Chargement des produits</p>
        </div>
      ) : isErrP ? (
        <p>{errP.message}</p>
      ) : dataP && dataP.length > 0 ? (
        <div className="col-span-4 lg:p-4  grid lg:grid-cols-5 grid-cols-2 gap-4 ">
          {dataP.map((product, index) => (
            <ProductCard
              key={product._id}
              productImage={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${product._id}.${product.image_ext}`}
              productName={product.name}
              productPrice={product.price}
              productReduction={0.4}
              productCat={product.category_id.name}
            />
          ))}
        </div>
      ) : (
        <div className="col-span-4 lg:p-4 flex flex-col  justify-center items-center lg:grid-cols-5 grid-cols-2 gap-4 ">
          <Image
            src={"/images/undraw_no_data_re_kwbl.svg"}
            width={200}
            // className="w-full sm:w/1/3"
            height={200}
            alt="not found image"
          />
          <p className="text-xl">Aucun produit trouver</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;

//  const products: ProductCardProps[] = [
//    {
//      productImage: "/images/products/1.jpg",
//      productName: "Bananes",
//      productPrice: 5000,
//      productReduction: 0.1,
//      productCat: "Fruits",
//    },
//    {
//      productImage: "/images/products/2.jpg",
//      productName: "Tomates",
//      productPrice: 3500,
//      productReduction: 0.05,
//      productCat: "Légumes",
//    },
//    {
//      productImage: "/images/products/2.png",
//      productName: "Riz Basmati",
//      productPrice: 8000,
//      productReduction: 0.15,
//      productCat: "Céréales",
//    },
//    {
//      productImage: "/images/products/3.png",
//      productName: "Filet de Poulet",
//      productPrice: 12000,
//      productReduction: 0.2,
//      productCat: "Viandes",
//    },
//    {
//      productImage: "/images/products/4.jpg",
//      productName: "Saumon frais",
//      productPrice: 18000,
//      productReduction: 0.12,
//      productCat: "Poissons",
//    },
//    {
//      productImage: "/images/products/5.png",
//      productName: "Courgettes",
//      productPrice: 3000,
//      productReduction: 0.08,
//      productCat: "Légumes",
//    },
//    {
//      productImage: "/images/products/6.png",
//      productName: "Mangues",
//      productPrice: 6000,
//      productReduction: 0.18,
//      productCat: "Fruits",
//    },
//    {
//      productImage: "/images/products/7.jpg",
//      productName: "Quinoa",
//      productPrice: 10000,
//      productReduction: 0.1,
//      productCat: "Céréales",
//    },
//    {
//      productImage: "/images/products/8.jpg",
//      productName: "Steak de Bœuf",
//      productPrice: 15000,
//      productReduction: 0.15,
//      productCat: "Viandes",
//    },
//    {
//      productImage: "/images/products/9.jpg",
//      productName: "Thon en conserve",
//      productPrice: 7500,
//      productReduction: 0.07,
//      productCat: "Poissons",
//    },
//    {
//      productImage: "/images/products/10.jpg",
//      productName: "Ananas",
//      productPrice: 4500,
//      productReduction: 0.2,
//      productCat: "Fruits",
//    },
//  ];
