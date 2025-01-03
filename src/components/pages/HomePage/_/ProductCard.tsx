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
import { calculateDiscountPercentage } from "@/lib/isValidPhone";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllGroupes } from "@/services/products.services";
import {
  Group,
  Offer,
  ProductQuantity,
  ProductQuantityWithUserDetails,
} from "@/types/grupes";
import { Spinner } from "@chakra-ui/react";
import NoDataComp from "@/components/ui/NoDataComp";
import {
  getAllOffers,
  getAllUserProductQty,
  getAllUserProductQtyWithUserDetails,
} from "@/services/users.services";
import OfferCard from "./OfferCrad";

export type ProductCardProps = {
  productImage: string;
  productName: string;
  productPrice: number;
  productReduction: number;
  productCat: string;
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({
  productImage,
  productName,
  productPrice,
  product,
  productReduction,
  productCat,
}) => {
  const [productInCart, setProductInCart] = useState(0);
  const [openGroupList, setOpenGroupList] = useState(false);
  const [openGroupCreate, setOpenGroupCreate] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const {
    isSuccess: isSuccessG,
    data: dataG,
    isLoading: isLodG,
    isError: isErrG,
    error: errG,
  } = useQuery({
    queryKey: ["groupes"],
    queryFn: getAllGroupes<Group[]>,
  });

  const {
    isSuccess,
    isError,
    data: usersQty,
  } = useQuery({
    queryKey: ["getAllUserProductQty"],
    queryFn: getAllUserProductQtyWithUserDetails<
      ProductQuantityWithUserDetails[]
    >,
  });

  const {
    isSuccess: isSucO,
    isError: iserrO,
    data: offers,
  } = useQuery({
    queryKey: ["getAllOffers"],
    queryFn: getAllOffers<Offer[]>,
  });

  console.log(" : ", offers);

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
          href={"products/" + product._id}
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
                    {isLodG ? (
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
                    ) : isErrG ? (
                      <p>{errG.message}</p>
                    ) : dataG && dataG.length > 0 ? (
                      dataG.map((grp) => {
                        console.log("pra : ", grp.members);
                        const usersList = usersQty
                          ? usersQty
                              .filter((data) =>
                                grp.members.includes(data.user_id)
                              )
                              .map((data) => data.user_id)
                          : [];
                        console.log("user list : ", usersList);

                        return (
                          <GroupRow
                            quantyGrp={
                              usersQty?.filter(
                                (prev) => prev.group_id._id === grp._id
                              ) || []
                            }
                            users={grp.members}
                            group={grp}
                            key={grp._id}
                          />
                        );
                      })
                    ) : (
                      <NoDataComp objectType="Groupe" />
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="new">
                  {offers?.map((prev) => (
                    <OfferCard offer={prev} key={prev._id} />
                  ))}
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
                    {isLodG ? (
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
                    ) : isErrG ? (
                      <p>{errG.message}</p>
                    ) : dataG && dataG.length > 0 ? (
                      dataG.map((grp) => {
                        const usersList = usersQty
                          ? usersQty
                              .filter((data) =>
                                grp.members.includes(data.user_id)
                              )
                              .map((data) => data.user_id)
                          : [];
                        console.log("user list : ", usersList);
                        return (
                          <GroupRow
                            quantyGrp={
                              usersQty?.filter(
                                (prev) => prev.group_id._id === grp._id
                              ) || []
                            }
                            users={usersList}
                            group={grp}
                            key={grp._id}
                          />
                        );
                      })
                    ) : (
                      <NoDataComp objectType="Groupe" />
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="new">
                  {offers?.map((prev) => (
                    <OfferCard offer={prev} key={prev._id} />
                  ))}
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
      <p className="lg:text-md text-sm px-2"> {product.discount_price} XAF </p>

      <span className="flex space-x-1 px-2 pb-4">
        <p className=" flex my-auto text-xs line-through opacity-60 ">
          {" "}
          {product.price}{" "}
        </p>
        <p className="font-bold text-red-600 ">
          {" "}
          {calculateDiscountPercentage(
            product.price,
            product.discount_price
          )}%{" "}
        </p>
      </span>
    </div>
  );
};

export default ProductCard;
