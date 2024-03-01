import { Spinner } from "@chakra-ui/react";
import React, { FC, useEffect, useRef } from "react";
type SearchResultComponentProps = {
  onClose: () => void;
  loading: boolean;
  data: Product[];
};

const SearchResulComponent: FC<SearchResultComponentProps> = ({
  onClose,
  loading,
  data,
}) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const handleDocumentClick = (event: MouseEvent) => {
    if (
      componentRef.current &&
      !componentRef.current.contains(event.target as Node)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  console.log("data res : ", data);
  return (
    <div
      ref={componentRef}
      className="absolute z-50 p-3 bg-white shadow rounded w-full flex left-4 top-10"
    >
      {loading ? (
        <div className="flex w-full p-4 justify-center items-center">
          {" "}
          <Spinner className="text-secondary" />{" "}
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          {data.length > 0 ? (
            <>
              <h1 className="text-xl font-bold"> Resultats de la recherche </h1>
              <ul className="flex flex-col space-y-2">
                {data.map((prec) => (
                  <li
                    key={prec._id}
                    className="text-sm duration-300 hover:text-secondary hover:underline cursor-pointer"
                  >
                    {" "}
                    {prec.name}
                  </li>
                ))}
                {/* <li className="text-sm duration-300 hover:text-secondary hover:underline cursor-pointer">
              {" "}
              Poissons fumes
            </li>
            <li className="text-sm duration-300 hover:text-secondary hover:underline cursor-pointer">
              {" "}
              Papayes
            </li> */}
              </ul>
            </>
          ) : (
            <h1 className="text-xl font-bold"> Aucun Resultat </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchResulComponent;
