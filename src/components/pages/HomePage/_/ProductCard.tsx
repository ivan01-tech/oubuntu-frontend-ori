import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CustomImage from "@/components/ui/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { FC, useState } from "react";
import { GoPlus } from "react-icons/go";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { IoIosList } from "react-icons/io";
import { IoCreateOutline, IoEyeOutline } from "react-icons/io5";
import GroupRow from "./GroupRow";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type ProductCardProps = {
  productImage: string;
  productName: string;
  productPrice: number;
  productReduction: number;
  productCat: string;
};

const ProductCard: FC<ProductCardProps> = ({
  productImage,
  productName,
  productPrice,
  productReduction,
  productCat,
}) => {
  const [productInCart, setProductInCart] = useState(0);
  const [openGroupList, setOpenGroupList] = useState(false);
  const [openGroupCreate, setOpenGroupCreate] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <div className="flex flex-col  bg-white text-gray-800 space-y-1 rounded-xl shadow duration-200 hover:shadow-md">
      <div className="flex relative group">
        <CustomImage
          className="lg:h-[210px] h-[160px] w-full object-cover rounded-t-xl"
          path={productImage}
        />
        <div className="absolute bottom-0 group bg-white right-2 flex justify-center items-center w-8 h-8 rounded-full shadow-md duration-200 hover:shadow-lg">
          <GoPlus className="text-lg group-hover:rotate-45 duration-100" />
        </div>
        <div className="absolute group bottom-12  bg-blue-700 opacity-0 group-hover:opacity-100 translate-y-12 group-hover:translate-y-0 group right-6 flex justify-center items-center w-8 h-8 rounded-full shadow-md duration-200 hover:shadow-lg">
          <div className="flex opacity-0 group-hover:opacity-100 space-x-2 rounded-full p-1 bg-blue-700 text-white">
            <HiOutlineMinusSmall
              className={`cursor-pointer text-lg flex my-auto ${
                productInCart <= 0 && "cursor-not-allowed"
              }`}
              onClick={() => {
                productInCart >= 1 && setProductInCart(productInCart - 1);
              }}
            />
            <p className="flex my-auto "> {productInCart} </p>
            <GoPlus
              className="cursor-pointer text-lg flex my-auto"
              onClick={() => setProductInCart(productInCart + 1)}
            />
          </div>
        </div>
        <Link
          href={"products/1"}
          className="absolute bottom-24  opacity-0 group-hover:opacity-100 translate-y-24 group group-hover:translate-y-0 bg-primary right-2 flex justify-center items-center w-8 h-8 rounded-full shadow-md duration-200 hover:shadow-lg"
        >
          <IoEyeOutline className="text-lg  text-white duration-100" />
        </Link>
        {isDesktop ? (
          <Dialog open={openGroupList} onOpenChange={setOpenGroupList}>
            <DialogTrigger asChild>
              <div className="absolute bottom-32 opacity-0 cursor-pointer  group-hover:opacity-100 translate-y-32 group bg-secondary right-2 flex justify-center items-center w-8 h-8 rounded-full shadow-md duration-200 hover:shadow-lg">
                <IoIosList className="text-lg text-white duration-100" />
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px] font-display overflow-y-auto h-[500px]">
              <Tabs defaultValue="list" className="w-full mt-5">
                <DialogHeader>
                  <TabsList>
                    <TabsTrigger value="list">Liste des groupes</TabsTrigger>
                    <TabsTrigger value="new">Nouveau groupe</TabsTrigger>
                  </TabsList>
                </DialogHeader>
                <TabsContent value="list">
                  <div className="flex flex-col space-y-4 ">
                    <GroupRow />
                    <GroupRow />
                    <GroupRow />
                    <GroupRow />
                  </div>
                </TabsContent>
                <TabsContent value="new">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={openGroupList} onOpenChange={setOpenGroupList}>
            <DrawerTrigger asChild>
              <div className="absolute bottom-32 opacity-0 cursor-pointer  group-hover:opacity-100 translate-y-32 group bg-secondary right-2 flex justify-center items-center w-8 h-8 rounded-full shadow-md duration-200 hover:shadow-lg">
                <IoIosList className="text-lg text-white duration-100" />
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <Tabs defaultValue="list" className="w-full">
                <DrawerHeader>
                  <TabsList>
                    <TabsTrigger value="list">Liste des groupes</TabsTrigger>
                    <TabsTrigger value="new">Nouveau groupe</TabsTrigger>
                  </TabsList>
                </DrawerHeader>
                <TabsContent value="list">
                  <div className="flex flex-col space-y-4 px-4">
                    <GroupRow />
                    <GroupRow />
                    <GroupRow />
                    <GroupRow />
                  </div>
                </TabsContent>
                <TabsContent value="new">
                  Change your password here.
                </TabsContent>
              </Tabs>
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <div
        className={`p-1 text-white rounded-r-full flex w-2/3  text-[8px] truncate ${
          ["bg-primary", "bg-yellow-700", "bg-red-700", "bg-indigo-800"][
            Math.floor(Math.random() * 4)
          ]
        }`}
      >
        <p> {productCat}</p>
      </div>

      <p className="lg:text-lg truncate text-sm px-2 font-bold duration-200 hover:text-secondary">
        {productName}
      </p>
      <p className="lg:text-md text-sm px-2"> {productPrice} XAF </p>

      <span className="flex space-x-1 px-2 pb-4">
        <p className=" flex my-auto text-xs line-through opacity-60 ">
          {" "}
          1300 XAF{" "}
        </p>
        <p className="font-bold text-red-600 "> {productReduction}% </p>
      </span>
    </div>
  );
};

export default ProductCard;
