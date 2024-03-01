import Hero from "@/components/layouts/Hero";
import MainLayout from "@/components/layouts/MainLayout";
import CategoriesSliderComponent from "@/components/pages/HomePage/CategoriesSliderComponent";
import GroupsComponent from "@/components/pages/HomePage/GroupsComponent";
import OubuntuComponent from "@/components/pages/HomePage/OubuntuComponent";
import ProductSection from "@/components/pages/HomePage/ProductSection";
import { getAllCategories, getAllProducts } from "@/services/products.services";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  const { isSuccess, data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories<Category[]>,
  });

  const {
    isSuccess: isSuccessP,
    data: dataP,
    isLoading: isLodP,
    isError: isErrP,
    error: errP,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts<Product[]>,
  });

  // useEffect()
  console.log("category : ", data);
  return (
    <MainLayout className="">
      <div className="flex flex-col lg:p-8 p-4">
        <Hero />

        {isLoading ? (
          <div className=" flex justify-center items-center flex-col">
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <p>Chargement des catégories</p>
          </div>
        ) : isError ? (
          <p>{error.message}</p>
        ) : data && data.length >= 0 ? (
          <CategoriesSliderComponent data={data} />
        ) : null}

        <GroupsComponent />
      </div>
      <div className="bg-gray-100 flex flex-col space-y-4">
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
        ) : dataP && dataP.length >= 0 ? (
          <ProductSection
            className="bg-none lg:px-8 px-4"
            data={dataP}
            label="Produits recommandés pour vous"
          />
        ) : null}

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
        ) : dataP && dataP.length >= 0 ? (
          <ProductSection
            className="bg-white lg:px-8 px-4"
            data={dataP}
            label="Meilleures affaires"
          />
        ) : null}
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
        ) : dataP && dataP.length >= 0 ? (
          <ProductSection
            className="bg-gradient-to-r from-[#00765B] via-[#C81025]  to-[#F4CA15] lg:px-8 px-4"
            data={dataP}
            label="Made in cameroun"
            textcolor="text-white"
          />
        ) : null}
      </div>
      <OubuntuComponent />
    </MainLayout>
  );
}
