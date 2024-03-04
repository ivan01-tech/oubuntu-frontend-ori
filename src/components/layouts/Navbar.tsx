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
import { use } from "react";

type Props = {};

const Navbar = (props: Props) => {
  const { user } = useUser()!;
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

  return (
    <nav className="w-full lg:px-8 px-4 py-3 sticky top-0 z-10 border-gray-100 border-b text-gray-800 ">
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
              <p className="text-xs"> 2 </p>
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
                      <Avatar
                        name={user.first_name + " " + user.last_name}
                        src={user.picture || undefined}
                      />
                    )}
                  </div>
                </ResponsiveDrawerHeader>
                <div className="flex flex-col space-y-2 py-2 px-6">
                  <ul className="flex flex-col space-y-2">
                    <li className="flex space-x-2 cursor-pointer">
                      <IoIosList className="opacity-60 text-2xl" />
                      <p className="flex my-auto "> Mes groupes</p>
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
                <p className="text-xs"> 2 </p>
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
                <DrawerBody className="h-full flex justify-center items-center">
                  <div className="flex flex-col space-y-3">
                    <CustomImage path="/images/empty-cart.png" />
                    <p className="opacity-80 text-center">
                      {" "}
                      Votre panier est vide{" "}
                    </p>
                  </div>
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
              <Avatar
                name={user.first_name + " " + user.last_name}
                src={user.picture || undefined}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
