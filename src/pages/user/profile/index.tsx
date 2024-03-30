"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import GroupsComponent from "@/components/pages/HomePage/GroupsComponent";
import GroupCard from "@/components/pages/HomePage/_/GroupCard";
import NoDataComp from "@/components/ui/NoDataComp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CustomImage from "@/components/ui/image";
import { useUser } from "@/hooks/useUser";

import { getAllGroupes } from "@/services/products.services";
import { Group, ProductQuantity } from "@/types/grupes";
import { Avatar, Spinner } from "@chakra-ui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainLayout from "@/components/layouts/MainLayout";
import { getAllUserProductQty } from "@/services/users.services";
import { getImageUrlOnLocal } from "@/lib/isValidPhone";
import TruncatedLink from "@/components/SearchComponents/Truncate";
import CountdownTimer from "@/components/ui/CountdownTimer";

type Props = {};
enum Section {
  PROFILE = "profile",
  GROUPS = "groups",
  CHAGE_PASSWORD = "change_password",
  CARD = "card",
}

export default function ProfilePage({}: Props) {
  const { user } = useUser()!;
  const [profile, setProfile] = useState(user);
  const [section, setSection] = useState<Section>(Section.PROFILE);

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

  const {
    isSuccess,
    mutateAsync,
    isError,
    data: groupUser,
  } = useMutation({
    mutationKey: ["getAllUserProductQty"],
    mutationFn: getAllUserProductQty<ProductQuantity[]>,
  });

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  //
  useEffect(
    function () {
      if (!user) return router.push("/sign-in");
    },
    [user, router]
  );

  useEffect(
    function () {
      if (user) {
        mutateAsync()
          .then((resp) => {})
          .catch((err) => {});
      }
    },
    [user, mutateAsync]
  );

  // Fonction pour gérer le changement de section
  const handleSectionChange = (selectedSection: Section) => {
    setSection(selectedSection);
  };
  const cartTotal = groupUser?.reduce(
    (prev, cur) => prev + cur.quantity * cur.group_id.offer.discount_price,
    0
  );

  return (
    <MainLayout className="">
      <div className="bg-white w-full flex flex-col gap-5 px-3 md:flex-row">
        <div className="my-4 flex flex-col md:hidden">
          <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>

          <Select value={section} onValueChange={handleSectionChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="z-[900]">
              <SelectItem value={Section.CARD}>Panier</SelectItem>
              <SelectItem value={Section.CHAGE_PASSWORD}>
                Change de mot de passe
              </SelectItem>
              <SelectItem value={Section.GROUPS}>Groups</SelectItem>
              <SelectItem value={Section.PROFILE}>Profile</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Sidebar */}
        <aside className="hidden py-4 md:w-1/3 lg:w-1/4 md:block">
          <div className="sticky flex flex-col gap-2 p-4 text-sm border-r border-indigo-100 top-12">
            <h2 className="pl-3 mb-4 text-2xl font-semibold">Settings</h2>
            <button
              className={`${
                section === Section.PROFILE ? "font-bold" : "font-semibold"
              } px-3 py-2.5 rounded-full hover:text-indigo-900 hover:border hover:rounded-full focus:outline-none`}
              onClick={() => setSection(Section.PROFILE)}
            >
              Profile
            </button>
            <button
              className={`${
                section === Section.GROUPS ? "font-bold" : "font-semibold"
              } px-3 py-2.5 rounded-full hover:text-indigo-900 hover:border hover:rounded-full focus:outline-none`}
              onClick={() => setSection(Section.GROUPS)}
            >
              Mes groupes
            </button>

            <button
              className={`${
                section === Section.CHAGE_PASSWORD
                  ? "font-bold"
                  : "font-semibold"
              } px-3 py-2.5 rounded-full hover:text-indigo-900 hover:border hover:rounded-full focus:outline-none`}
              onClick={() => setSection(Section.CHAGE_PASSWORD)}
            >
              Mot de passe
            </button>
            <button
              className={`${
                section === Section.CARD ? "font-bold" : "font-semibold"
              } px-3 py-2.5 rounded-full hover:text-indigo-900 hover:border hover:rounded-full focus:outline-none`}
              onClick={() => setSection(Section.CARD)}
            >
              Paniers
            </button>
          </div>
        </aside>

        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
          {/* Affiche le contenu de la section sélectionnée */}
          {section === Section.PROFILE && (
            <div className="p-2 md:p-4">
              <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                <h2 className="pl-6 text-2xl font-bold sm:text-xl">Profile</h2>

                <div className="grid max-w-2xl mx-auto mt-8">
                  <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                    <Image
                      width={1280}
                      height={1280}
                      className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
                      alt="Bordered avatar"
                    />

                    <div className="flex flex-col space-y-5 sm:ml-8">
                      <button
                        type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                      >
                        Change picture
                      </button>
                      <button
                        type="button"
                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
                      >
                        Delete picture
                      </button>
                    </div>
                  </div>

                  <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                    <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                      <div className="w-full">
                        <label
                          htmlFor="first_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your first name
                        </label>
                        <input
                          type="text"
                          id="first_name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your first name"
                          value={profile?.first_name}
                          required
                        />
                      </div>

                      <div className="w-full">
                        <label
                          htmlFor="last_name"
                          className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                        >
                          Your last name
                        </label>
                        <input
                          type="text"
                          id="last_name"
                          className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                          placeholder="Your last name"
                          value={profile?.last_name}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-2 sm:mb-6">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                        value={profile?.email}
                        disabled
                      />
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {section === Section.GROUPS && (
            <div className="flex flex-col lg:p-8 p-4">
              <h2 className="pl-6 text-2xl font-bold sm:text-xl">Groupes</h2>

              {isLodG ? (
                <div className="flex justify-center items-center flex-col">
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
                <div className="mx-4 my-8">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Lien</TableHead>
                        <TableHead className="text-right">
                          Date expiration
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {groupUser?.map((invoice) => (
                        <TableRow key={invoice._id}>
                          <TableCell className="font-medium">
                            {invoice.group_id._id}
                          </TableCell>
                          <TableCell>{invoice.group_id.title}</TableCell>
                          <TableCell>
                            <TruncatedLink
                              maxLength={invoice.group_id.link.length / 2}
                              url={invoice.group_id.link}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <CountdownTimer
                              expirationDate={invoice.group_id.expired_at}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          )}

          {section === Section.CHAGE_PASSWORD && (
            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
              <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                <div className="w-full">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    Current password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your first name"
                    // value={profile}
                    required
                  />
                </div>

                <div className="w-full">
                  <label
                    htmlFor="new_password"
                    className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                  >
                    New password
                  </label>
                  <input
                    type="password"
                    id="last_name"
                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                    placeholder="Your last name"
                    value={profile?.last_name}
                    required
                  />
                </div>
              </div>

              <div className="mb-2 sm:mb-6">
                <label
                  htmlFor="confirm_password"
                  className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 "
                  value={profile?.email}
                />
              </div>

              <div className="flex ">
                <button
                  type="submit"
                  className="text-white bg-indigo-700  hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
                >
                  Save
                </button>
              </div>
            </div>
          )}

          {section === Section.CARD &&
            (groupUser && groupUser.length == 0 ? (
              <div className="flex flex-col space-y-3">
                <CustomImage path="/images/empty-cart.png" />
                <p className="opacity-80 text-center">
                  {" "}
                  Votre panier est vide{" "}
                </p>
              </div>
            ) : (
              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {groupUser?.map((group) => {
                      return (
                        <li className="flex py-6" key={group._id}>
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <CustomImage
                              className="lg:h-[210px] h-[160px] w-full object-cover rounded-t-xl"
                              path={getImageUrlOnLocal(
                                group.group_id.offer.product_id._id,
                                group.group_id.offer.product_id.image_ext
                              )}
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href="#">
                                    {group.group_id.offer.product_id.name}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  XAF {group.group_id.offer.discount_price}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {group.group_id.title}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                Qty {group.quantity}{" "}
                              </p>

                              {/* <div className="flex">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div> */}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="border-t border-gray-200  py-6 ">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p className="font-bold">Total : </p>
                      <p>{cartTotal}</p>
                    </div>

                    {/* <div className="mt-6">
          <a
            href="#"
            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
          >
            Checkout
          </a>
        </div> */}
                    {/* <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
          <p>
            or
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </p>
        </div> */}
                  </div>
                </div>
              </div>
            ))}
        </main>
      </div>
    </MainLayout>
  );
}
