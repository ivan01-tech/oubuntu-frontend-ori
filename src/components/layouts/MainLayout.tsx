import React, { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import { Manrope } from "next/font/google";
import Cookies from "js-cookie";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
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

  const { isSuccess, data } = useQuery({
    queryKey: ["userStatus"],
    queryFn: getUserStatus<UserTypes>,
    // TODO set it late
    // refetchInterval: 5 * 1000,
    // refetchOnMount: "always",
    // retryOnMount: true,
  });

  useEffect(
    function () {
      if (!isSuccess) {
        setUser(null);
        toast.error("Something went wrong !");

        return;
      }
      console.log("Main layout data : ", isSuccess, data);
      setUser(data);
      toast.success("success!");
    },
    [isSuccess, data, setUser]
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
