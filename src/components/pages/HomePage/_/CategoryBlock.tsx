import CustomImage from "@/components/ui/image";
import Link from "next/link";
import React, { FC } from "react";

type CategoryBlackProps = {
  image: string;
  label: string;
};

const CategoryBlock: FC<CategoryBlackProps> = ({ image, label }) => {
  return (
    <Link
      href="products"
      className="flex space-x-2 group cursor-pointer px-2 duration-200 py-2 border border-gray-100 rounded-2xl hover:border-primary"
    >
      <CustomImage
        path={image}
        className="rounded-full object-cover shadow lg:w-12 lg:h-12 w-8 h-8"
      />
      <p className="text-gray-800 truncate lg:truncate-nonw flex my-auto group-hover:text-primary duration-200  lg:text-sm text-xs">
        {label}
      </p>
    </Link>
  );
};

export default CategoryBlock;
