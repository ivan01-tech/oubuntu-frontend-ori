import { useUser } from "@/hooks/useUser";
import { createAGroup, joinAGroup } from "@/services/products.services";
import { Group, Offer } from "@/types/grupes";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Props = {
  offer: Offer;
};

const OfferCard = ({ offer }: Props) => {
  const { user } = useUser()!;
  const router = useRouter();
  const {
    mutateAsync,
    isError: iserrJ,
    error: errJ,
    isSuccess: issucJ,
    isPending: ispenJ,
  } = useMutation({
    mutationKey: ["createAGroup"],
    mutationFn: createAGroup<Group>,
  });

  const createGroupHandler = () => {
    if (!user) {
      toast.error("Vous devez etre connecter pour créer un groupe");
      return router.push("/sign-in");
    }
    if (!offer?._id) {
      return toast.error("L'id du groupe ou de l'offre est requise");
    }

    mutateAsync(offer._id)
      .then((resp) => {
        toast.success("Successfully created the group");
        console.log("data : ", resp);
        router.push("/groupes/" + resp._id);
      })
      .catch((err) => {
        console.log("err : ", err);
        toast.error(errJ?.message || "Quelque chose s'est mal passée");
      });
  };

  return (
    <div className="flex my-4 flex-col cursor-pointer font-display space-y-2 rounded border border-gray-200 p-2">
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-lg font-bold opacity-90"> Objectif:{offer.name}</p>
          <p className=" text-md  font-display opacity-90">
            {" "}
            {offer.discount_price} XAF{" "}
          </p>
          <p className="text-sm text-red-600"> {100}kg restants </p>
        </div>
        <div className="flex flex-col space-y-2 justify-between">
          <p className="flex justify-end text-right text-xs opacity-70">
            {" "}
            Douala{" "}
          </p>

          <button
            onClick={createGroupHandler}
            className="text-sm bg-primary text-white rounded-lg p-2"
          >
            Créer un groupe
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
