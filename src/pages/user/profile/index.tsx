"use client";
import GroupsComponent from "@/components/pages/HomePage/GroupsComponent";
import GroupCard from "@/components/pages/HomePage/_/GroupCard";
import NoDataComp from "@/components/ui/NoDataComp";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CustomImage from "@/components/ui/image";
import { useUser } from "@/hooks/useUser";
import {
  calculateDiscountPercentage,
  getImageUrlOnLocal,
} from "@/lib/isValidPhone";
import { getAllGroupes } from "@/services/products.services";
import { Group } from "@/types/grupes";
import { Avatar, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

export default function ProfilePage({}: Props) {
  const { user } = useUser()!;
  const router = useRouter();
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

  if (!user) return router.push("/sign-in");
  
  return (
    <>
      <div className="max-w-2xl mx-4 sm:max-w-sm md:max-w-sm lg:max-w-sm xl:max-w-sm sm:mx-auto md:mx-auto lg:mx-auto xl:mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
        <div className="rounded-t-lg h-32 overflow-hidden">
          <CustomImage
            className="object-cover object-top w-full"
            path="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
          />
        </div>
        <div className="mx-auto w-32 h-32 relative -mt-16 border-4 border-white rounded-full overflow-hidden">
          <Avatar
            className="w-full h-full rounded-full"
            name={user.first_name + " " + user.last_name}
            src={user.picture || undefined}
          />
        </div>
        <div className="text-center mt-2">
          <h2 className="font-semibold">
            {user.first_name} {user.last_name}
          </h2>
        </div>
        <ul className="py-4 mt-2 text-gray-700 flex items-center justify-around">
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
            <div>2k</div>
          </li>
          <li className="flex flex-col items-center justify-between">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M7 8a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0 1c2.15 0 4.2.4 6.1 1.09L12 16h-1.25L10 20H4l-.75-4H2L.9 10.09A17.93 17.93 0 0 1 7 9zm8.31.17c1.32.18 2.59.48 3.8.92L18 16h-1.25L16 20h-3.96l.37-2h1.25l1.65-8.83zM13 0a4 4 0 1 1-1.33 7.76 5.96 5.96 0 0 0 0-7.52C12.1.1 12.53 0 13 0z" />
            </svg>
            <div>10k</div>
          </li>
          <li className="flex flex-col items-center justify-around">
            <svg
              className="w-4 fill-current text-blue-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>
            <div>15</div>
          </li>
        </ul>
        {/* <div className="p-4 border-t mx-8 mt-2">
          <button className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">
            Follow
          </button>
        </div> */}
      </div>
      <div>
        <div className="flex flex-col lg:p-8 p-4">
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
            <GroupsComponent groups={dataG} />
          ) : (
            <NoDataComp objectType="Groupe" />
          )}
        </div>
      </div>
      <div className="flex flex-col lg:p-8 p-4">
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
        ) : !dataG || dataG.length === 0 ? (
          <NoDataComp objectType="Groupe" />
        ) : (
          <div className="absolute w-full p-2 left-2 lg:left-[20%] top-4 lg:top-10 lg:w-[80%]">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className=" w-full "
            >
              <CarouselContent className=" w-full">
                {dataG.map((group, index) => (
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
                      progression={80}
                      maxNumbers={10}
                      members={group.members}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="-left-4 shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
              <CarouselNext className="-right-0  shadow-md border-none hover:bg-white hover:bg-opacity-75 bg-white duration-300 hover:shadow-lg" />
            </Carousel>
          </div>
        )}
      </div>
    </>
  );
}
