import { MapPin } from "lucide-react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
import {
  Group,
  ProductQuantity,
  ProductQuantityWithUserDetails,
} from "@/types/grupes";
import CountdownTimer from "@/components/ui/CountdownTimer";
import { calculateDiscountPercentage } from "@/lib/isValidPhone";
import { UserTypes } from "@/types/users";

type Props = {
  group: Group;
  users: UserTypes[];
  quantyGrp: ProductQuantityWithUserDetails[];
};

const GroupRow = ({ group, users, quantyGrp }: Props) => {
  const remainQty =
    group.offer.product_quantity -
    quantyGrp.reduce((sum, item) => sum + item.quantity, 0);

  //
  const groupProgression = calculateDiscountPercentage(
    group.offer.product_quantity,
    remainQty
  );
  return (
    <Link
      href={"/groupes/" + group._id}
      className="flex flex-col cursor-pointer font-display space-y-2 rounded border border-gray-200 p-2"
    >
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-lg font-bold opacity-90">
            {" "}
            Objectif:{group.title}
          </p>
          <p className=" text-md  font-display opacity-90">
            {" "}
            {group.offer.discount_price} XAF{" "}
          </p>
          <p className="text-sm text-red-600"> {remainQty}kg restants </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="flex justify-end text-right text-xs opacity-70">
            {" "}
            Douala{" "}
          </p>
          <div className="flex space-x-1">
            <CountdownTimer expirationDate={group.expired_at} />
          </div>
        </div>
      </div>
      <Progress value={groupProgression} />
      <div className="pb-2">
        <AvatarGroup size="sm" max={3}>
          {users.map((user) => (
            <Avatar
              name={user.first_name + " " + user.last_name}
              key={user._id}
            />
          ))}
        </AvatarGroup>
      </div>
    </Link>
  );
};

export default GroupRow;
