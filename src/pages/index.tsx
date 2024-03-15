import Hero from "@/components/layouts/Hero";
import MainLayout from "@/components/layouts/MainLayout";
import CategoriesSliderComponent from "@/components/pages/HomePage/CategoriesSliderComponent";
import GroupsComponent from "@/components/pages/HomePage/GroupsComponent";
import OubuntuComponent from "@/components/pages/HomePage/OubuntuComponent";
import ProductSection from "@/components/pages/HomePage/ProductSection";
import NoDataComp from "@/components/ui/NoDataComp";
import { getAllCategories, getAllProducts } from "@/services/products.services";
import { Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Home() {
  return (
    <MainLayout className="">
      <div className="flex flex-col lg:p-8 p-4">
        <Hero />

        <CategoriesSliderComponent 
        
        // data={data}
        
        
        />

        <GroupsComponent />
      </div>
      <div className="bg-gray-100 flex flex-col space-y-4">
        <ProductSection
          className="bg-none lg:px-8 px-4"
          // data={dataP}
          label="Produits recommandés pour vous"
        />

        <ProductSection
          className="bg-white lg:px-8 px-4"
          // data={dataP}
          label="Meilleures affaires"
        />

        <ProductSection
          className="bg-gradient-to-r from-[#00765B] via-[#C81025]  to-[#F4CA15] lg:px-8 px-4"
          // data={dataP}
          label="Made in cameroun"
          textcolor="text-white"
        />
      </div>
      <OubuntuComponent />
    </MainLayout>
  );
}
