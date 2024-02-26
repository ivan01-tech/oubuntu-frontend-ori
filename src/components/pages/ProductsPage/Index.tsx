import { NextPage } from "next";
import React from "react";
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

const randomComparator = () => Math.random() - 0.5;
const ProductsPage: NextPage = () => {
  const products: ProductCardProps[] = [
    {
      productImage: "/images/products/1.jpg",
      productName: "Bananes",
      productPrice: 5000,
      productReduction: 0.1,
      productCat: "Fruits",
    },
    {
      productImage: "/images/products/2.jpg",
      productName: "Tomates",
      productPrice: 3500,
      productReduction: 0.05,
      productCat: "Légumes",
    },
    {
      productImage: "/images/products/2.png",
      productName: "Riz Basmati",
      productPrice: 8000,
      productReduction: 0.15,
      productCat: "Céréales",
    },
    {
      productImage: "/images/products/3.png",
      productName: "Filet de Poulet",
      productPrice: 12000,
      productReduction: 0.2,
      productCat: "Viandes",
    },
    {
      productImage: "/images/products/4.jpg",
      productName: "Saumon frais",
      productPrice: 18000,
      productReduction: 0.12,
      productCat: "Poissons",
    },
    {
      productImage: "/images/products/5.png",
      productName: "Courgettes",
      productPrice: 3000,
      productReduction: 0.08,
      productCat: "Légumes",
    },
    {
      productImage: "/images/products/6.png",
      productName: "Mangues",
      productPrice: 6000,
      productReduction: 0.18,
      productCat: "Fruits",
    },
    {
      productImage: "/images/products/7.jpg",
      productName: "Quinoa",
      productPrice: 10000,
      productReduction: 0.1,
      productCat: "Céréales",
    },
    {
      productImage: "/images/products/8.jpg",
      productName: "Steak de Bœuf",
      productPrice: 15000,
      productReduction: 0.15,
      productCat: "Viandes",
    },
    {
      productImage: "/images/products/9.jpg",
      productName: "Thon en conserve",
      productPrice: 7500,
      productReduction: 0.07,
      productCat: "Poissons",
    },
    {
      productImage: "/images/products/10.jpg",
      productName: "Ananas",
      productPrice: 4500,
      productReduction: 0.2,
      productCat: "Fruits",
    },
  ];
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

      <div className="col-span-4 lg:p-4 grid lg:grid-cols-5 grid-cols-2 gap-4 ">
        {[...products].sort(randomComparator).map((product, index) => (
          <ProductCard
            key={index}
            productImage={product.productImage}
            productName={product.productName}
            productPrice={product.productPrice}
            productReduction={+(product.productReduction * 100).toFixed(2)}
            productCat={product.productCat}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
