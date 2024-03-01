import MainLayout from "@/components/layouts/MainLayout";
import ProductsPage from "@/components/pages/ProductsPage/Index";
import React from "react";

type Props = {};

const ProductPageFoo = (props: Props) => {
  return (
    <MainLayout className="">
      <div className="flex flex-col lg:p-8 p-4">
        <ProductsPage />
      </div>
    </MainLayout>
  );
};

export default ProductPageFoo;
