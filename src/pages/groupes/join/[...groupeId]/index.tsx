import { useUser } from "@/hooks/useUser";
import { getGroudById, joinAGroup } from "@/services/products.services";
import { Group } from "@/types/grupes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

type Props = {};
function UserJoinGroup({}: Props) {
  const pathname = usePathname()?.split("/");
  const path = pathname ? pathname[pathname?.length - 1] : null;

  console.log("path : ", path);
  const {
    isError,
    isPending,
    data: group,
    mutateAsync: getGrpupeFoo,
    error,
    isSuccess,
  } = useMutation({
    mutationKey: ["getGroup"],
    mutationFn: getGroudById<Group>,
  });

  const {
    mutateAsync,
    isError: iserrJ,
    error: errJ,
    isSuccess: issucJ,
    isPending: ispenJ,
  } = useMutation({
    mutationKey: ["joinGroup"],
    mutationFn: joinAGroup<Group>,
  });

  const { setUser, user } = useUser()!;
  const router = useRouter();

  //
  useEffect(
    function () {
      if (!user) {
        router.push("/sign-in");
      }
    },
    [router, user]
  );

  //
  useEffect(
    function () {
      if (path) {
        getGrpupeFoo(path)
          .then((prev) => {
            console.log("res : ", prev);
            toast.success("Successfully joined the group");
          })
          .catch((err) => {
            isError &&
              toast.error(
                error?.name + " : " + error?.message ||
                  "Something went wrong!   "
              );
          });
      }
    },
    [errJ, error, getGrpupeFoo, isError, path, router]
  );

  useEffect(() => {
    if (isError) {
      console.log("error : ", error.message);
      toast.error(error.message);

      return router.back();
    }
  }, [error, isError, router]);

  useEffect(() => {
    if (iserrJ) {
      toast.error(errJ.message);

      return;
    }
  }, [errJ, iserrJ]);

  useEffect(() => {
    if (issucJ) {
      toast.success("Successfully joined the group");
      router.refresh();
    }
  }, [iserrJ, issucJ, router]);

  // fetch user data
  useEffect(() => {
    (async () => {
      if (isSuccess && group?._id) {
        console.log("group : ", group);
        mutateAsync({
          groupeId: group._id,
          quantity: 1,
          offerId: group.offer._id,
        })
          .then((res) => {
            toast.success("Successfully join the group!");
            router.replace("/groupes/" + group._id);
          })
          .catch((err) => {
            errJ &&
              toast.error(
                errJ?.name + errJ?.message || "Something went wrong!   "
              );
            router.replace("/");
          });
      }
    })();
  }, [errJ, group, isSuccess, mutateAsync, router]);

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

export default UserJoinGroup;
