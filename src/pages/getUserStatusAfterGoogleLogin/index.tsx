import { useUser } from "@/hooks/useUser";
import {
  getStatusForGoogleLogin,
} from "@/services/users.services";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {};

function GetUserStatusAfterGoogleLogin({}: Props) {
  const { setUser } = useUser()!;
  const router = useRouter();

  const { isSuccess, data, error } = useQuery({
    queryKey: ["getStatusAfterGoogleLogin"],
    queryFn: getStatusForGoogleLogin,
  });

  useEffect(
    function () {
      console.log("data : ", isSuccess, data);
      if (!isSuccess) return;

      if (data?.status.toLocaleLowerCase() == "success") {
        setUser(data?.data);
        toast.error(data.message || "");

        router.push("/");
      } else {
        setUser(null);
        toast.error(error);
        router.push("/");
      }
    },
    [router, isSuccess, data, setUser, error]
  );

  return (
    <div
      id="loading-basic-example"
      className="h-screen gap-4 flex justify-center items-center w-full"
    >
      <div
        data-te-loading-management-init
        className="flex flex-col gap-4 items-center"
        data-te-parent-selector="#loading-basic-example"
      >
        <div
          data-te-loading-icon-ref
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        ></div>
        <span data-te-loading-text-ref>Please wait a moment...</span>
      </div>
    </div>
  );
}

export default GetUserStatusAfterGoogleLogin;
