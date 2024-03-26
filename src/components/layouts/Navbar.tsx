/* eslint-disable @next/next/no-img-element */
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";

import { Avatar } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosList, IoIosSearch } from "react-icons/io";
import {
  IoBagAddOutline,
  IoCartOutline,
  IoHelpBuoySharp,
} from "react-icons/io5";
import { Button } from "../ui/button";
import CustomImage from "../ui/image";
import SearchBar from "../SearchComponents/SearchBar";
import {
  Drawer as ResponsiveDrawer,
  DrawerClose,
  DrawerContent as ResponsiveDrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader as ResponsiveDrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useUser } from "@/hooks/useUser";
import { use, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  getAllGroupsByUser,
  getAllUserProductQty,
  getUserStatus,
  logoutUser,
} from "@/services/users.services";
import { Group, ProductQuantity } from "@/types/grupes";

type Props = {};
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { FiUser, FiLogOut } from "react-icons/fi";
import { MdPerson, MdExitToApp } from "react-icons/md";
import { getImageUrlOnLocal } from "@/lib/isValidPhone";
import { group } from "console";
import toast from "react-hot-toast";
import { queryClient } from "@/pages/_app";

// Profile Icons
const ProfileIcon1 = <FaUserCircle />;
const ProfileIcon2 = <FiUser />;
const ProfileIcon3 = <MdPerson />;

// Logout Icons
const LogoutIcon1 = <FaSignOutAlt />;
const LogoutIcon2 = <FiLogOut />;
const LogoutIcon3 = <MdExitToApp />;

const Navbar = (props: Props) => {
  const { user, setUser } = useUser()!;
  const {
    isSuccess,
    mutateAsync,
    isError,
    data: groupUser,
  } = useMutation({
    mutationKey: ["getAllUserProductQty"],
    mutationFn: getAllUserProductQty<ProductQuantity[]>,
  });

  const {
    isOpen: isMenuOpen,
    onOpen: onMenuOpen,
    onClose: onMenuClose,
  } = useDisclosure();
  const {
    isOpen: isCartOpen,
    onOpen: onCartOpen,
    onClose: onCartClose,
  } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const logoutHandler = async () => {
    try {
      const data = await logoutUser();
      console.log(data);
      setUser(null);
      queryClient.invalidateQueries({ type: "all" });
    } catch (err) {
      toast.error("something went wrong");
    }
  };

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

  const cartTotal = groupUser?.reduce(
    (prev, cur) => prev + cur.quantity * cur.group_id.offer.discount_price,
    0
  );
  return (
    <nav className="w-full lg:px-8  py-3 sticky top-0 z-10 border-gray-100 border-b text-gray-800 ">
      {" "}
      <div className="w-full flex justify-between ">
        <div className="lg:hidden flex">
          <CustomImage path="/logo.svg" className="w-28 lg:w-32" />
        </div>
        <div className="lg:flex w-3/4 space-x-4 hidden">
          <div className="flex">
            <CustomImage path="/logo.svg" className="w-28 lg:w-32" />
          </div>
          <SearchBar />
          <Link
            href="/products"
            className="flex my-auto duration-200 hover:text-secondary"
          >
            <p> Catégories </p>
          </Link>
        </div>

        <div className="lg:hidden bg-white space-x-4 flex my-auto">
          <ResponsiveDrawer>
            <DrawerTrigger>
              {" "}
              <div className="flex relative  w-full items-center space-x-4 cursor-pointer">
                <IoIosSearch className=" text-3xl " />
              </div>
            </DrawerTrigger>
            <ResponsiveDrawerContent>
              <ResponsiveDrawerHeader className="flex space-x-4 border-b border-gray-100">
                <div className="flex relative w-full items-center">
                  <IoIosSearch className="absolute left-2 text-3xl  opacity-25" />
                  <input
                    type="text"
                    placeholder="Rechercher un produit"
                    className="pr-3 pl-12 py-3 font-thin text-sm outline-none border rounded w-full"
                  />
                </div>
              </ResponsiveDrawerHeader>
              <div className="flex justify-center items-center">
                <div className="flex w-1/2 flex-col space-y-3">
                  <CustomImage path="/images/search-icon.png" />
                  <p className="opacity-80 text-center">
                    {" "}
                    Aucun produit trouvé{" "}
                  </p>
                </div>
              </div>
            </ResponsiveDrawerContent>
          </ResponsiveDrawer>
          <div className="relative flex cursor-pointer" onClick={onCartOpen}>
            <div className="absolute -right-2 -top-2 rounded-full bg-red-600 flex justify-center items-center p-1 w-5 h-5 text-white">
              <p className="text-xs"> {groupUser?.length || 0} </p>
            </div>
            <IoCartOutline className="text-3xl" />
          </div>
          <div className="lg:hidden ">
            <ResponsiveDrawer>
              <DrawerTrigger>
                <div className="cursor-pointer">
                  <HiMenuAlt3 className="text-3xl" />
                </div>
              </DrawerTrigger>
              <ResponsiveDrawerContent>
                <ResponsiveDrawerHeader className="flex space-x-4 border-b border-gray-100">
                  <div className="grid grid-cols-2 gap-4 w-full items-center">
                    {!user ? (
                      <>
                        <Button className="rounded bg-transparent font-bold border-2 border-primary text-primary duration-300 hover:bg-primary hover:text-white">
                          <Link
                            href={"/sign-up"}
                            // className="rounded bg-transparent font-bold border-2 border-primary text-primary duration-300 hover:bg-primary hover:text-white"
                          >
                            Creer un compte
                          </Link>
                        </Button>
                        <Button className="rounded duration-300 hover:bg-gradient-to-tl bg-gradient-to-br from-pink-500 to-secondary font-bold text-white">
                          <Link href={"/sign-in"}>Connexion</Link>
                        </Button>
                      </>
                    ) : (
                      <Menu
                        menuButton={
                          <MenuButton>
                            <Avatar
                              name={user.first_name + " " + user.last_name}
                              src={user.picture || undefined}
                            />
                          </MenuButton>
                        }
                        transition
                      >
                        <MenuItem>
                          <Link
                            href={"/user/profile"}
                            className="flex justify-between items-center gap-3"
                          >
                            {ProfileIcon1}
                            <span>Profile</span>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Button
                            onClick={logoutHandler}
                            className="rounded bg-transparent font-bold border-2 border-primary text-primary duration-300 hover:bg-primary hover:text-white"
                          >
                            Se deconnecter
                          </Button>
                        </MenuItem>
                      </Menu>
                    )}
                  </div>
                </ResponsiveDrawerHeader>
                <div className="flex flex-col space-y-2 py-2 px-6">
                  <ul className="flex flex-col space-y-2">
                    <li className="flex space-x-2 cursor-pointer">
                      <IoIosList className="opacity-60 text-2xl" />
                      <p className="flex my-auto "> Mes groupes</p>

                      {JSON.stringify(groupUser)}
                    </li>
                    <li className="flex space-x-2 cursor-pointer">
                      <IoBagAddOutline className="opacity-60 text-2xl" />
                      <p className="flex my-auto"> Catégories</p>
                    </li>
                    <li className="flex space-x-2 cursor-pointer">
                      <IoHelpBuoySharp className="opacity-60 text-2xl" />
                      <p className="flex my-auto"> Comment ça marche</p>
                    </li>
                  </ul>
                </div>
              </ResponsiveDrawerContent>
            </ResponsiveDrawer>
          </div>
        </div>

        <div className="hidden w-1/2 justify-end lg:flex gap-4 ">
          <div className="flex items-center space-x-4 ">
            <div className="relative flex cursor-pointer" onClick={onCartOpen}>
              <div className="absolute -right-2 -top-2 rounded-full bg-red-600 flex justify-center items-center p-1 w-4 h-4 text-white">
                <p className="text-xs"> {groupUser?.length || 0} </p>
              </div>
              <IoCartOutline className="text-2xl" />
            </div>
            <Drawer
              placement={"right"}
              onClose={onCartClose}
              isOpen={isCartOpen}
            >
              <DrawerOverlay />
              <DrawerContent className=" lg:hidden font-display">
                <DrawerCloseButton />
                <DrawerHeader borderBottomWidth="1px">
                  Votre panier
                </DrawerHeader>
                <DrawerBody className="h-full flex justify-center ">
                  {groupUser && groupUser.length == 0 ? (
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
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
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
                                        XAF{" "}
                                        {group.group_id.offer.discount_price}
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
                  )}
                </DrawerBody>
              </DrawerContent>
            </Drawer>
            {!user ? (
              <>
                <Button className="rounded bg-transparent font-bold border-2 border-primary text-primary duration-300 hover:bg-primary hover:text-white">
                  <Link href={"/sign-up"}>Creer un compte</Link>
                </Button>
                <Button className="rounded duration-300 hover:bg-gradient-to-tl bg-gradient-to-br from-pink-500 to-secondary font-bold text-white">
                  <Link href={"/sign-in"}>Connexion</Link>
                </Button>
              </>
            ) : (
              <Menu
                menuButton={
                  <MenuButton>
                    <Avatar
                      name={user.first_name + " " + user.last_name}
                      src={user.picture || undefined}
                    />
                  </MenuButton>
                }
                transition
              >
                <MenuItem>
                  <Link
                    href={"/user/profile"}
                    className="flex justify-between items-center gap-3"
                  >
                    {ProfileIcon1}
                    <span>Profile</span>
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={logoutHandler}
                    className="flex justify-between items-center gap-3"
                  >
                    {LogoutIcon1}
                    <span>Se deconnecter</span>
                  </button>
                </MenuItem>
              </Menu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
