import React, { FC } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard, { ProductCardProps } from "./_/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getUserStatus } from "@/services/users.services";
import { getAllProducts } from "@/services/products.services";
type ProductSectionProps = {
  label: string;
  className: string;
  textcolor?: string;
  data?: Product[];
};

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

const randomComparator = () => Math.random() - 0.5;

const ProductSection: FC<ProductSectionProps> = ({
  label,
  className,
  textcolor = "text-gray-800",
}) => {
  // const { isSuccess, data, isLoading, isError, error } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getAllProducts,
  // });

  // console.log("data : ", data);
  return (
    <div className={`flex flex-col space-y-4 lg:py-6 py-3 ${className}`}>
      <p className={`font-bold lg:text-2xl text-lg ${textcolor}`}> {label} </p>
      <div className="w-full lg:py-8 py-4 flex justify-center">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className=" w-full "
        >
          <CarouselContent className=" w-full">
            {[...products].sort(randomComparator).map((product, index) => (
              <CarouselItem key={index} className="basis-1/2 lg:basis-1/6">
                <ProductCard
                  productImage={product.productImage}
                  productName={product.productName}
                  productPrice={product.productPrice}
                  productReduction={
                    +(product.productReduction * 100).toFixed(2)
                  }
                  productCat={product.productCat}
                />
              </CarouselItem>
            ))}
            {/* 
            {data.sort(randomComparator).map((product, index) => (
              <CarouselItem
                key={index}
                className="basis-1/2 lg:basis-1/6 flex justify-center"
              >
                <ProductCard
                  productImage={`${process.env.NEXT_PUBLIC_BACKEND_URL}/files/${product._id}.${product.image_ext}`}
                  productName={product.name}
                  productPrice={product.price}
                  productReduction={0.4}
                  productCat={product.category_id.name}
                />
              </CarouselItem>
            ))} */}
          </CarouselContent>
          <CarouselPrevious className="-left-4 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
          <CarouselNext className="-right-4  shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
        </Carousel>
      </div>
    </div>
  );
};

export default ProductSection;
