import { MapPin } from "lucide-react";
import { Avatar, AvatarGroup } from "@chakra-ui/react";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";
type Props = {};

const GroupRow = (props: Props) => {
  return (
    <div className="flex flex-col cursor-pointer font-display space-y-2 rounded border border-gray-200 p-2">
      <div className="flex justify-between">
        <div className="flex flex-col ">
          <p className="text-lg font-bold opacity-90">
            {" "}
            Objectif: 300kg pour 10% de reduction{" "}
          </p>
          <p className=" text-md  font-display opacity-90"> 3200 XAF </p>
          <p className="text-sm text-red-600"> 20kg restants </p>
        </div>
        <div className="flex flex-col space-y-2">
          <p className="flex justify-end text-right text-xs opacity-70">
            {" "}
            Douala{" "}
          </p>
          <div className="flex space-x-1">
            <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
              05h
            </div>

            <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
              34m
            </div>

            <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
              54s
            </div>
          </div>
        </div>
      </div>
      <Progress value={54} />
      <div className="pb-2">
        <AvatarGroup size="sm" max={3}>
          <Avatar name="Ryan Florence" src="https://bit.ly/ryan-florence" />
          <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
          <Avatar name="Kent Dodds" src="https://bit.ly/kent-c-dodds" />
          <Avatar name="Prosper Otemuyiwa" src="https://bit.ly/prosper-baba" />
          <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        </AvatarGroup>
      </div>
    </div>
  );
};

export default GroupRow;
