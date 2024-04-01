/* eslint-disable react/no-unescaped-entities */
import TruncatedLink from "@/components/SearchComponents/Truncate";
import MainLayout from "@/components/layouts/MainLayout";
import OubuntuComponent from "@/components/pages/HomePage/OubuntuComponent";
import CountdownTimer from "@/components/ui/CountdownTimer";
import CustomImage from "@/components/ui/image";
import { Progress } from "@/components/ui/progress";
import { useUser } from "@/hooks/useUser";
import { getGroupUrlFront } from "@/lib/getUrlGroupFront";
import {
  calculateDiscountPercentage,
  getImageUrlOnLocal,
} from "@/lib/isValidPhone";
import { queryClient } from "@/pages/_app";
import {
  getGroudById,
  getUserProductQuantites,
  joinAGroup,
  leaveAgroup,
  updateProductQuantity,
} from "@/services/products.services";
import { Group, ProductQuantityGroup } from "@/types/grupes";
import { Avatar } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { NextPageContext } from "next";
import { usePathname, useRouter } from "next/navigation";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

// ProductDeatilsPage.getInitialProps = async (ctx: NextPageContext) => {
//   const groupId = ctx?.query?.groupeId;

//   if (!groupId) {
//     return { group: null };
//   }
//   const group = await getGroudById<Group>(groupId[0]);
//   return { group: group };
// };

type Props = {
  group: Group | null;
};

function ProductDeatilsPage({}: Props) {
  const { user } = useUser()!;
  const {
    isError,
    isPending,
    isLoading,
    isFetching,
    data: group,
    error,
    isSuccess,
  } = useQuery({
    queryKey: ["getGroup"],
    queryFn: () => getGroudById<Group>(path),
  });
  console.log("gr : ", group);
  const {
    isError: isErrU,
    isPending: isPenU,
    data: dataU,
    error: errU,
    mutateAsync,
    isSuccess: isSuU,
  } = useMutation({
    mutationKey: ["getUserProductQuantites"],
    mutationFn: getUserProductQuantites<ProductQuantityGroup[]>,
  });
  //

  // Mutations
  const pathname = usePathname()?.split("/");
  const router = useRouter();
  const path = pathname ? pathname[pathname?.length - 1] : null;
  const [selectedOffer, setSelectedOffer] = useState(group?.offer);
  //
  // État local pour stocker les quantités choisies par l'utilisateur pour chaque offre
  const [quantity, setQuantity] = useState<number>(1);

  const {
    mutate,
    isError: iserrJ,
    error: errJ,
    isSuccess: issucJ,
    isPending: ispenJ,
  } = useMutation({
    mutationKey: ["joinGroup"],
    mutationFn: joinAGroup<Group>,
  });

  const {
    mutateAsync: updatemutateAsync,
    isError: iserrUP,
    error: errUP,
    isSuccess: issucUP,
    isPending: ispenUP,
  } = useMutation({
    mutationKey: ["updateProductQuantity"],
    mutationFn: updateProductQuantity<any>,
  });

  const {
    mutateAsync: leaveGroupMutate,
    isError: iserrL,
    error: errL,
    isSuccess: issucL,
    isPending: ispenL,
  } = useMutation({
    mutationKey: ["leaveAgroup"],
    mutationFn: leaveAgroup<any>,
  });

  //
  const totalCommand =
    dataU && dataU.length >= 0
      ? dataU?.reduce((prev, curr) => prev + curr.quantity!, 0)
      : 0;
  // to join a group
  const leaveGroupHnadler = async () => {
    if (!user) {
      toast.error("Vous devez etre connecter");
      return router.push("/sign-in");
    }
    if (!group?._id || !selectedOffer?._id) {
      return toast.error("L'id du groupe ou de l'offre est requise");
    }
    const mutateObj = {
      groupeId: group?._id,
      offerId: selectedOffer?._id!,
      quantity,
    };
    console.log("mutateObj: ", mutateObj);
    leaveGroupMutate(mutateObj)
      .then((res) => {
        console.log("res : ", res);
        toast.success("'User removed from the group successfully'");
        router.refresh();
      })
      .catch((err) => {
        toast.error("Something went wrong !");
        console.log("caught exception : ", err);
      });
  };
  const joinGroupHnadler = () => {
    if (!user) {
      toast.error("Vous devez etre connecter pour integrer un groupe");
      return router.push("/sign-in");
    }
    if (!group?._id || !selectedOffer?._id) {
      return toast.error("L'id du groupe ou de l'offre est requise");
    }
    const mutateObj = {
      groupeId: group?._id,
      offerId: selectedOffer?._id!,
      quantity,
    };
    console.log("mutateObj: ", mutateObj);
    mutate(mutateObj);
  };

  const updateProductHnadler = () => {
    if (!user) {
      toast.error("Vous devez etre connecter pour integrer un groupe");
      return router.push("/sign-in");
    }
    if (!group?._id || !selectedOffer?._id) {
      return toast.error("L'id du groupe ou de l'offre est requise");
    }
    const lastQuant = dataU?.find((u) => u.user_id._id === user._id);
    console.log("lastQuant", quantity, lastQuant);
    if (!lastQuant || lastQuant?.quantity === quantity) {
      return toast.error("La quantité de produit est la meme");
    }
    const mutateObj = {
      groupeId: group?._id,
      offerId: selectedOffer?._id!,
      quantity,
    };
    console.log("mutateObj: ", mutateObj);
    updatemutateAsync(mutateObj)
      .then((prev) => {
        console.log("prev : ", prev);
        toast.success("Product quantity updated successfully");
        router.refresh();
      })
      .catch((err) => {
        console.log("err : ", err);
        toast.error(errUP?.message || "Error updating product quantity");
      });
  };

  //
  console.log(totalCommand, selectedOffer?.product_quantity);
  const handleIncrement = (offerId: string) => {
    if (selectedOffer?.product_quantity) {
      setQuantity((prevQuantities) =>
        Math.min(
          (prevQuantities || 0) + 1,
          selectedOffer?.product_quantity - totalCommand!
        )
      );
    }
  };

  // Fonction pour mettre à jour la quantité choisie pour une offre donnée
  const handleQuantityChange = (offerId: string, quant: number) => {
    if (selectedOffer?.product_quantity)
      setQuantity((prevQuantities) =>
        Math.min(
          (prevQuantities || 0) + 1,
          selectedOffer?.product_quantity - totalCommand!
        )
      );
  };
  //
  const handleDecrement = () => {
    if (selectedOffer?.product_quantity) {
      setQuantity((prevQuantities) => Math.max(prevQuantities - 1, 1));
    }
  };
  //
  useEffect(() => {
    if (!path) {
      queryClient.invalidateQueries({
        queryKey: ["getGroup"],
      });
    }
  }, [path]);

  useEffect(() => {
    if (isError) {
      console.log("error : ");
      toast.error(error.message);

      return router.back();
    }
  }, [error, isError, router]);

  useEffect(() => {
    if (iserrJ) {
      toast.error(errJ.message);

      return;
    }
  }, [errJ, iserrJ]);

  useEffect(() => {
    if (issucJ) {
      toast.success("Successfully joined the group");
      router.refresh();
    }
  }, [iserrJ, issucJ, router]);

  useEffect(() => {
    if (isSuccess) {
      setSelectedOffer(group.offer);
      toast.success("Successfully loaded the group!");
      setQuantity((prevQuantities) => 1);
    }
  }, [group, isSuccess, selectedOffer?.product_quantity, totalCommand]);

  // fetch user data
  useEffect(() => {
    (async () => {
      if (isSuccess && group?._id) {
        mutateAsync(group._id)
          .then((res) => {
            toast.success("Successfully loaded group members");
          })
          .catch((err) => {
            errU &&
              toast.error(
                errU?.name + errU?.message || "Something went wrong!   "
              );
          });
      }
    })();
  }, [errU, group, isSuccess, mutateAsync]);

  if (isPending || isLoading || isFetching) {
    return (
      <div
        id="loading-basic-example"
        className="h-screen gap-4 flex justify-center items-center w-full"
      >
        <div
          data-te-loading-management-init
          className="flex flex-col gap-4 items-center"
          data-te-parent-selector="#loading-basic-example"
        >
          <div
            data-te-loading-icon-ref
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          ></div>
          <span data-te-loading-text-ref>Please wait a moment...</span>
        </div>
      </div>
    );
  }
  if (!group || !selectedOffer) {
    return (
      <div
        id="loading-basic-example"
        className="h-screen gap-4 flex justify-center items-center w-full"
      >
        <div
          data-te-loading-management-init
          className="flex flex-col gap-4 items-center"
          data-te-parent-selector="#loading-basic-example"
        >
          <h2 data-te-loading-text-ref>Quelque chose s'est mal passée</h2>
        </div>
      </div>
    );
  }

  const getCategoriesName = group?.offer.product_id.category_id.name;

  console.log("getCategories ", selectedOffer.product_quantity, totalCommand);
  const restQuantity = selectedOffer.product_quantity - totalCommand;
  const groupProgression =
    dataU && dataU.length >= 0
      ? calculateDiscountPercentage(
          selectedOffer.product_quantity,
          restQuantity
        )
      : null;
  return (
    <MainLayout className="">
      <div className="flex flex-col lg:p-8 p-4">
        <div className="font-[sans-serif] bg-white">
          <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
            <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12  p-6">
              <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                <CustomImage
                  path={getImageUrlOnLocal(
                    selectedOffer!.product_id._id,
                    selectedOffer!.product_id.image_ext
                  )}
                  className="w-4/5 rounded object-cover"
                />
                {/* {group.offer && (
                  <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
                    {
                      <div
                        className="rounded-xl p-4  border-gray-800 border-2"
                        key={group.offer._id}
                        // onClick={() => changeSelectedOfferHandler(offer._id)}
                      >
                        <CustomImage
                          path={getImageUrlOnLocal(
                            selectedOffer!.product_id._id,
                            selectedOffer!.product_id.image_ext
                          )}
                          className="w-24 cursor-pointer hover:border-gray-800 border-2"
                        />
                      </div>
                    }
                  </div>
                )} */}
              </div>
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-extrabold text-[#333]">
                  {selectedOffer!.product_id.name}
                </h2>
                <div className="flex flex-wrap gap-4 mt-6">
                  <p className="text-[#333] text-4xl font-bold">
                    XAF {selectedOffer!.discount_price}
                  </p>
                  <p className="text-gray-400 text-xl">
                    <p className="flex space-x-1 px-2 pb-4">
                      <p className=" flex my-auto text-xs line-through opacity-60 ">
                        {" "}
                        {selectedOffer!.price} XAF{" "}
                      </p>
                      <p className="font-bold text-red-600 ">
                        {" "}
                        {calculateDiscountPercentage(
                          selectedOffer!.price,
                          selectedOffer!.discount_price
                        )}
                        %{" "}
                      </p>
                    </p>
                  </p>
                </div>
                <div className="flex items-center flex-wrap gap-3 my-4">
                  <div
                    className={`p-1 px-3 text-white max-w-fit rounded-full  my-3  truncate ${
                      [
                        "bg-primary",
                        "bg-yellow-700",
                        "bg-red-700",
                        "bg-indigo-800",
                      ][Math.floor(Math.random() * 4)]
                    }`}
                  >
                    <p> {getCategoriesName}</p>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center gap-4 mt-1">
                  {/* {!group?.members.find((u) => u._id === user?._id) ? (
                    <button
                      type="button"
                      onClick={joinGroupHnadler}
                      className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                    >
                      Integrer le groupe
                    </button>
                  ) : (
                    <p
                      onClick={joinGroupHnadler}
                      className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                    >
                      Vous etes deja members de ce groupe
                    </p>
                  )} */}
                </div>

                <div className="mt-14 h-full rounded-lg border bg-white p-6 shadow-md w-full">
                  <div className="flex justify-between my-3">
                    <p className="text-gray-700">Quantité</p>
                    <div className="flex items-center border-gray-100">
                      <button
                        onClick={() => handleDecrement()}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary hover:text-white"
                      >
                        {" "}
                        -{" "}
                      </button>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        max={selectedOffer!.product_quantity}
                        min="1"
                        value={quantity || 1}
                        onChange={(e) =>
                          handleQuantityChange(
                            selectedOffer._id,
                            parseInt(e.target.value)
                          )
                        }
                      />
                      <button
                        onClick={() => handleIncrement(selectedOffer._id)}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-primary hover:text-white"
                      >
                        {" "}
                        +{" "}
                      </button>
                    </div>
                  </div>
                  <div className="mb-2 flex justify-between">
                    <p className="text-gray-700">Prix</p>
                    <p className="text-gray-700">
                      XAF {selectedOffer.discount_price}
                    </p>
                  </div>

                  <hr className="my-4" />
                  {selectedOffer && quantity && (
                    <div className="flex justify-between">
                      <p className="text-lg font-bold">Total</p>
                      <div className="">
                        <p className="mb-1 text-lg font-bold">
                          XAF {selectedOffer.discount_price * quantity}{" "}
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center gap-4 mt-10">
                    {/* <button
                      type="button"
                      className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-3"
                    >
                      Ajouter au panier
                    </button> */}

                    {!group?.members.find((u) => u._id === user?._id) ? (
                      <button
                        type="button"
                        disabled={ispenJ}
                        onClick={joinGroupHnadler}
                        className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                      >
                        {!ispenJ ? "Integrer le groupe" : "Veuillez patienter"}
                      </button>
                    ) : (
                      <div className="flex flex-col justify-center items-start gap-4 flex-wrap">
                        <TruncatedLink
                          maxLength={50}
                          url={getGroupUrlFront(group._id)}
                        />
                        <button
                          onClick={updateProductHnadler}
                          disabled={ispenUP}
                          className="min-w-[200px] px-2 py-2 text-center bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                        >
                          {!ispenUP
                            ? "Mettre à jour la quantité"
                            : "Veuillez patienter..."}
                        </button>
                        <button
                          onClick={leaveGroupHnadler}
                          disabled={ispenL}
                          className="min-w-[200px] px-2 py-2 text-center bg-red-600 hover:bg-red-500 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-1"
                        >
                          {!ispenL
                            ? "Quitter le groupe"
                            : "Veuillez patienter..."}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="mt-16  p-6">
              <h3 className="text-lg font-bold text-[#333]">
                Product information
              </h3>
              <ul className="mt-6 space-y-6 text-[#333]">
                <li className="text-sm">
                  TYPE <span className="ml-4 float-right">LAPTOP</span>
                </li>
                <li className="text-sm">
                  RAM <span className="ml-4 float-right">16 BG</span>
                </li>
                <li className="text-sm">
                  SSD <span className="ml-4 float-right">1000 BG</span>
                </li>
                <li className="text-sm">
                  PROCESSOR TYPE{" "}
                  <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
                </li>
                <li className="text-sm">
                  PROCESSOR SPEED{" "}
                  <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
                </li>
                <li className="text-sm">
                  DISPLAY SIZE INCH{" "}
                  <span className="ml-4 float-right">16.0</span>
                </li>
                <li className="text-sm">
                  DISPLAY SIZE SM{" "}
                  <span className="ml-4 float-right">40.64 cm</span>
                </li>
                <li className="text-sm">
                  DISPLAY TYPE{" "}
                  <span className="ml-4 float-right">
                    OLED, TOUCHSCREEN, 120 Hz
                  </span>
                </li>
                <li className="text-sm">
                  DISPLAY RESOLUTION{" "}
                  <span className="ml-4 float-right">2880x1620</span>
                </li>
              </ul>
            </div> */}
            <div className="mt-16  p-6">
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <p className="text-lg font-bold opacity-90">
                    {" "}
                    Objectif: {group?.title}
                  </p>
                  <p className=" text-md  font-display opacity-90">
                    {" "}
                    {group.offer.discount_price} XAF{" "}
                  </p>
                  <p className="text-sm text-red-600">
                    {" "}
                    {restQuantity}kg restants{" "}
                  </p>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="flex justify-end text-right text-xs opacity-70">
                    {" "}
                    Douala{" "}
                  </p>
                  {/* ddd */}
                  {group.expired_at && (
                    <CountdownTimer expirationDate={group.expired_at} />
                  )}
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 mt-6">
                <div>
                  <div className="space-y-3">
                    {groupProgression != null && (
                      <div className="flex items-center gap-6">
                        <div className="text-sm text-[#333] flex gap-3 font-bold">
                          <p>Progression</p>

                          <p className="font-bold text-red-600 ">
                            {" "}
                            {groupProgression}%{" "}
                          </p>
                        </div>
                        <Progress
                          value={groupProgression}
                          className="max-w-[400px]"
                        />
                      </div>
                    )}
                    <div className="flex flex-col gap-4">
                      {isPenU ? (
                        <div
                          data-te-loading-management-init
                          className="flex flex-col gap-4 items-center"
                          data-te-parent-selector="#loading-basic-example"
                        >
                          <div
                            data-te-loading-icon-ref
                            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
                            role="status"
                          ></div>
                          <span data-te-loading-text-ref>
                            chargements des membres du group
                          </span>
                        </div>
                      ) : isErrU ? (
                        <p>{errU.message}</p>
                      ) : (
                        dataU &&
                        dataU?.length >= 0 &&
                        dataU.map((grp) => {
                          return (
                            <div
                              className="flex justify-between items-center"
                              key={grp._id}
                            >
                              <Avatar
                                key={grp._id}
                                name={
                                  grp.user_id.first_name +
                                  " " +
                                  grp.user_id.last_name
                                }
                                // src={grp.picture}
                              />
                              <p className="text-sm text-red-600">
                                {" "}
                                {grp.quantity} kg{" "}
                              </p>
                            </div>
                          );
                        })
                      )}
                    </div>
                    {/* <div className="flex flex-col gap-4">
                      <div className="flex justify-between items-center">
                        <Avatar
                          name="Christian Nwamba"
                          src="https://bit.ly/code-beast"
                        />

                        <p className="text-sm text-red-600"> 20kg </p>
                      </div>

                      <div className="flex justify-between items-center">
                        <Avatar
                          name="Prosper Otemuyiwa"
                          src="https://bit.ly/prosper-baba"
                        />

                        <p className="text-sm text-red-600"> 20kg </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Avatar
                          name="Kent Dodds"
                          src="https://bit.ly/kent-c-dodds"
                        />

                        <p className="text-sm text-red-600"> 20kg </p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Avatar
                          name="Segun Adebayo"
                          src="https://bit.ly/sage-adebayo"
                        />

                        <p className="text-sm text-red-600"> 20kg </p>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <OubuntuComponent />
    </MainLayout>
  );
}

export default ProductDeatilsPage;
