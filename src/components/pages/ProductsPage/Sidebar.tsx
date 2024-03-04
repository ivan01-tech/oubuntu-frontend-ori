import React, { useEffect } from "react";
import SidebarFilterRow from "./_/SidebarFilterRow";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { getAllCategories } from "@/services/products.services";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@chakra-ui/react";
import { useSearchProduct } from "@/hooks/useProduct";
import { CheckedState } from "@radix-ui/react-checkbox";
import NoDataComp from "@/components/ui/NoDataComp";

type Props = {
  className: string;
};

const Sidebar = (props: Props) => {
  const {
    setselectedCategory,
    selectedCategory,
    setMaxPrice,
    MaxPrice,
    MinPrice,
    setMinPrice,
  } = useSearchProduct()!;
  const { isSuccess, data, isLoading, isError, error } = useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories<Category[]>,
  });

  const handdleChangeCategory = (catId: string, isCheck: CheckedState) => {
    // TODO should normaly be id
    if (isCheck) {
      const newCat = data?.find((prev) => prev._id == catId);
      if (newCat)
        setselectedCategory((prev) => {
          if (!prev) return [newCat];
          else return [...prev, newCat];
        });
    } else {
      setselectedCategory((prev) => prev?.filter((c) => c._id !== catId));
    }
  };

  const categoriesIds = selectedCategory
    ? selectedCategory?.map((prev) => prev._id)
    : [];

  return (
    <div className={` flex-col space-y-2 sticky top-0 flex`}>
      <p className="text-lg font-bold lg:block hidden"> Filtres </p>
      <div
        className={` flex-col  border-gray-100 rounded-lg space-y-2 ${props.className}`}
      >
        <SidebarFilterRow title="Categories" value="category">
          <div className="flex flex-col space-y-2">
            {isLoading ? (
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
            ) : isError ? (
              <p>{error.message}</p>
            ) : data && data.length > 0 ? (
              data.map((cat) => (
                <div className="flex space-x-2 " key={cat._id}>
                  <Checkbox
                    checked={categoriesIds.includes(cat._id)}
                    onCheckedChange={(e) => handdleChangeCategory(cat._id, e)}
                    id={cat._id}
                  />
                  <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                    {cat.name}
                  </p>
                </div>
              ))
            ) : (
              <NoDataComp objectType="catégorie" />
            )}

            {/* <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Boites en conserve{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Boissons gazeuses{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Friandises{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Poissons et produits frais{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Legumes et Tubercules{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Viandes et Volailles{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Vins et Spiritieux{" "}
              </p>
            </div> */}
          </div>
        </SidebarFilterRow>
        <SidebarFilterRow title="Quartier" value="neighborhood">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Akwa{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Bonanjo{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Bonapriso{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Deido{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Bonamoussadi{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                {" "}
                Kotto{" "}
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                Logpom
              </p>
            </div>
          </div>
        </SidebarFilterRow>
        <SidebarFilterRow title="Méthode de paiement" value="payment">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                Mobile money
              </p>
            </div>
          </div>
        </SidebarFilterRow>
        <SidebarFilterRow title="Mode de livraison" value="payment">
          <div className="flex flex-col space-y-2">
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                Après 24h
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                Instantanée
              </p>
            </div>
            <div className="flex space-x-2 ">
              <Checkbox id="terms1" />
              <p className="flex my-auto opacity-80 duration-300 hover:text-primary">
                Week-end
              </p>
            </div>
          </div>
        </SidebarFilterRow>
        <div className=" p-2 flex flex-col space-y-2">
          <p className="font-bold"> Rangée des prix </p>
          <div className="grid lg:grid-cols-1 grid-cols-2 gap-4">
            <div className="flex space-x-0 rounded relative ">
              <Input
                onChange={(e) => {
                  setMinPrice(e.target.valueAsNumber);
                }}
                value={Number(MinPrice)}
                type="number"
                placeholder="Montant min"
                className=""
              />
              <div className="rounded-r absolute top-0 right-0 h-full bg-primary px-4 flex justify-center items-center text-white font-bold">
                XAF
              </div>
            </div>
            <div className="flex space-x-0 rounded relative ">
              <Input
                onChange={(e) => {
                  setMaxPrice(e.target.valueAsNumber);
                }}
                value={Number(MaxPrice)}
                type="number"
                placeholder="Montant max"
                className=""
              />
              <div className="rounded-r absolute top-0 right-0 h-full bg-primary px-4 flex justify-center items-center text-white font-bold">
                XAF
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
