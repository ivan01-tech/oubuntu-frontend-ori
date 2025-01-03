import React, { useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import GroupCard, { GroupCardProps } from "./_/GroupCard";
import { Alegreya } from "next/font/google";
import { HiMiniChevronRight } from "react-icons/hi2";
import {
  Group,
  ProductQuantityGroup,
  ProductQuantityWithoutUser,
  SimpleProductQuantity,
} from "@/types/grupes";
import {
  calculateDiscountPercentage,
  getImageUrlOnLocal,
} from "@/lib/isValidPhone";
import { useMutation } from "@tanstack/react-query";
import { getProductsQuantities } from "@/services/products.services";
import toast from "react-hot-toast";

const ale = Alegreya({ subsets: ["latin"] });
type Props = {
  groups: Group[];
};
const GroupsComponent = ({ groups }: Props) => {
  const {
    isError: isErrU,
    isPending: isPenU,
    data: dataU,
    error: errU,
    mutateAsync,
    isSuccess: isSuU,
  } = useMutation({
    mutationKey: ["getProductsQuantities"],
    mutationFn: getProductsQuantities<SimpleProductQuantity[]>,
  });

  // fetch user data
  useEffect(() => {
    (async () => {
      if (groups && groups[0]?._id) {
        mutateAsync()
          .then((res) => {
            // toast.success("Successfully loaded group members");
            console.log("data1 : ", res);
          })
          .catch((err) => {
            errU &&
              toast.error(
                errU?.name + errU?.message || "Something went wrong!   "
              );
          });
      }
    })();
  }, [errU, groups, mutateAsync]);
  //

  // const fakeGroupes: GroupCardProps[] = [
  //   {
  //     productImage: "/images/group/viande.jpg",
  //     productName: "3kgs de viande",
  //     productPrice: 2400,
  //     productReduction: 23,
  //     progression: 30,
  //     maxNumbers: 2,
  //   },
  //   {
  //     productImage: "/images/group/booster.jpeg",
  //     productName: "Booster en cannette",
  //     productPrice: 600,
  //     productReduction: 13,
  //     progression: 56,
  //     maxNumbers: 4,
  //   },
  //   {
  //     productImage: "/images/group/carrotes.jpeg",
  //     productName: "1kg de carrotes",
  //     productPrice: 400,
  //     productReduction: 40,
  //     progression: 72,
  //     maxNumbers: 6,
  //   },
  //   {
  //     productImage: "/images/group/macaronis.jpeg",
  //     productName: "Paquet de macaroni",
  //     productPrice: 300,
  //     productReduction: 67,
  //     progression: 3,
  //     maxNumbers: 3,
  //   },
  //   {
  //     productImage: "/images/group/margarine.jpeg",
  //     productName: "Boite de beurre",
  //     productPrice: 800,
  //     productReduction: 97,
  //     progression: 25,
  //     maxNumbers: 5,
  //   },
  //   {
  //     productImage: "/images/group/tartina.webp",
  //     productName: "Tartina",
  //     productPrice: 2400,
  //     productReduction: 23,
  //     progression: 30,
  //     maxNumbers: 2,
  //   },
  // ];

  return (
    <div className="lg:py-8 py-4 flex flex-col space-y-4 w-full">
      <div className="flex justify-between">
        <p className="lg:text-2xl text-lg font-bold"> Groupes en tendance </p>
        <div className="p-1 lg:hidden rounded-full border border-gray-200 duration-150 hover:border-gray-400 bg-gray-50 cursor-pointer flex justify-center items-center ">
          <HiMiniChevronRight className="text-gray-400 text-2xl" />
        </div>
      </div>
      <div className="flex relative">
        <div
          className="rounded-xl flex justify-center items-center relative px-8 w-full lg:w-[400px] h-[350px] lg:h-[480px] lg:grid grid-cols-2  bg-gradient-to-br
        from-primary
        via-[#47B649]
        to-[#66BC46]
        background-animate"
        >
          <div className="lg:flex hidden  flex-col space-y-2 text-white">
            <p className=" text-2xl font-bold "> Faites vous livrer </p>
            <p
              className={ale.className + " text-6xl font-bold text-secondary "}
            >
              {" "}
              24h{" "}
            </p>
            <p className=" text-xl "> après avoir passé la commande </p>
            <div className="rounded-full text-sm font-bold text-center py-2 px-3 duration-200 hover:bg-opacity-90 flex space-x-2 cursor-pointer bg-secondary text-gray-800">
              Voir tous les groupes
            </div>
          </div>
        </div>
        {/* <div className="absolute w-full p-2 left-2 lg:left-[20%] top-4 lg:top-10 lg:w-[80%]">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className=" w-full "
          >
            <CarouselContent className=" w-full">
              {fakeGroupes.map((group, index) => (
                <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                  <GroupCard
                    productImage={group.productImage}
                    productName={group.productName}
                    productPrice={group.productPrice}
                    productReduction={group.productReduction}
                    progression={group.progression}
                    maxNumbers={2}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
            <CarouselNext className="-right-0  shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
          </Carousel>
        </div> */}

        <div className="absolute w-full p-2 left-2 lg:left-[20%] top-4 lg:top-10 lg:w-[80%]">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className=" w-full "
          >
            <CarouselContent className="w-full">
              {groups.map((group, index) => {
                // Calculate total quantity of products already ordered
                const conserGroup = dataU?.filter(
                  (prev) => prev.group_id === group._id
                );

                const totalCommand =
                  conserGroup && conserGroup.length > 0
                    ? conserGroup.reduce(
                        (prev, curr) => prev + curr.quantity,
                        0
                      )
                    : 0;

                // Calculate remaining quantity in the group
                const remainingQuantity =
                  group.offer.product_quantity - totalCommand;

                // Calculate percentage completion
                const groupProgression = calculateDiscountPercentage(
                  group.offer.product_quantity,
                  remainingQuantity
                );

                return (
                  <CarouselItem key={index} className="basis-1/2 lg:basis-1/4">
                    <GroupCard
                      productImage={getImageUrlOnLocal(
                        group.offer.product_id._id,
                        group.offer.product_id.image_ext
                      )}
                      group={group}
                      productName={group.offer.product_id.name}
                      productPrice={group.offer.discount_price}
                      discount={group.offer.price}
                      productReduction={calculateDiscountPercentage(
                        group.offer.price,
                        group.offer.discount_price
                      )}
                      progression={groupProgression} // Pass the calculated progression here
                      maxNumbers={10}
                      members={group.members}
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="-left-4 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
            <CarouselNext className="-right-0  shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default GroupsComponent;
