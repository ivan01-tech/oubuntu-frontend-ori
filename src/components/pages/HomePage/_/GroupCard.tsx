import CustomImage from "@/components/ui/image";
import React, { FC } from "react";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import Link from "next/link";
import { UserTypes } from "@/types/users";

export type GroupCardProps = {
  productImage: string;
  productName: string;
  productPrice: number;
  productReduction: number;
  progression: number;
  maxNumbers: number;
  discount: number;
  members?: UserTypes[];
};

const GroupCard: FC<GroupCardProps> = ({
  productImage,
  productName,
  productPrice,
  productReduction,
  maxNumbers,
  progression,
  discount,
  members,
}) => {
  return (
    <Link
      href="/"
      className="flex flex-col  bg-white text-gray-800 space-y-1 rounded-xl shadow duration-200 hover:shadow-md"
    >
      <CustomImage
        className="lg:h-[210px] h-[160px] w-full object-cover rounded-t-xl"
        path={productImage}
      />
      <p className="lg:text-lg truncate text-sm px-3 font-bold duration-200 hover:text-secondary">
        {productName}
      </p>
      <p className="lg:text-md text-sm px-3"> {productPrice} XAF </p>
      <span className="flex space-x-1 px-3">
        <p className=" flex my-auto text-xs line-through opacity-60 ">
          {discount} XAF
        </p>
        <p className="font-bold text-red-600 "> {productReduction}% </p>
      </span>
      <hr className="w-full" />
      <div className="px-3 py-2">
        <Progress value={progression} />
      </div>
      {/* <div className="pb-2">
        <AvatarGroup size="sm" max={maxNumbers}>
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </AvatarGroup>
      </div> */}

      <div className="pb-2">
        <AvatarGroup size="sm" max={maxNumbers}>
          {members?.map((member) => (
            <Avatar
              key={member._id}
              name={member.first_name + " " + member.last_name}
              src={member.picture || "https://bit.ly/code-beast"}
            />
          ))}
        </AvatarGroup>
      </div>
    </Link>
  );
};

export default GroupCard;
