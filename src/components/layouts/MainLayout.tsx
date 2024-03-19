import React, { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import { Manrope } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@/hooks/useUser";
import { getUserStatus, loginUser } from "@/services/users.services";
import toast, { Toaster } from "react-hot-toast";
import { UserTypes } from "@/types/users";

const manrope = Manrope({ subsets: ["latin"] });

type Props = {
  className: string;
  children: ReactNode;
};

const MainLayout = (props: Props) => {
  const { setUser } = useUser()!;

  const { isSuccess, isError, data } = useQuery({
    queryKey: ["userStatus"],
    queryFn: getUserStatus<UserTypes>,
  });

  useEffect(
    function () {
      if (isSuccess) {
        console.log("Main layout data : ", isSuccess, data);
        setUser(data);
      }
    },
    [isSuccess, data, setUser]
  );

  useEffect(
    function () {
      if (isError) {
        setUser(null);
      }
    },
    [isError, setUser]
  );

  return (
    <main
      className={`flex min-h-screen flex-col overflow-x-hidden ${props.className} ${manrope.className}`}
    >
      <Navbar />
      <div className="flex flex-col  overflow-x-hidden">
        {props.children}

        <Toaster />
      </div>
    </main>
  );
};

export default MainLayout;
