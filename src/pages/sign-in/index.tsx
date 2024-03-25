"use client";
import { BsFacebook, BsGoogle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import "react-international-phone/style.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  getUserStatus,
  loginUser,
} from "@/services/users.services";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ButtonLoading } from "@/components/ui/LoadingBtn";
import { LoginUserModel, LoginUserModelType } from "@/model/LoginUserModel";
import { Checkbox } from "@chakra-ui/react";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";
import Cookies from "js-cookie";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { PasswordInput } from "@/components/ui/PasswordInputShad";
import CustomImage from "@/components/ui/image";
import { UserTypes } from "@/types/users";

export default function SignInAccount() {
  // state
  const router = useRouter();
  const { setUser } = useUser()!;

  // Mutations
  const { mutate, isError, isPending, data, error, isSuccess } = useMutation({
    mutationFn: loginUser<UserTypes>,
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<LoginUserModelType>({
    resolver: zodResolver(LoginUserModel),
  });

  const onSubmit: SubmitHandler<LoginUserModelType> = (user, e) => {
    console.log("first form  : ", user);

    mutate(user);
  };

  const googleAuthFoo = () => {
    if (typeof window !== "undefined") {
      window.open(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/google/callback`,
        "_self"
      );
    }
  };

  const facebookLogin = () => {
    if (typeof window !== "undefined") {
      window.open(
        `${process.env.NEXT_PUBLIC_BACKEND_URI}/auth/facebook/callback`,
        "_self"
      );
    }
  };

  useEffect(
    function () {
      if (isSuccess) {
        console.log("data : ", data);
        setUser(data);

        router.back();
        toast.success("Successfully authenticated !");
      }
    },
    [isSuccess, data, router, setUser]
  );

  useEffect(
    function () {
      if (isError) {
        toast.error(
          error?.message || "Something went wrong !  please try again"
        );
        setUser(null);
        return;
      }
    },
    [error, isError, setUser]
  );

  return (
    <>
      <div className="min-h-screen flex justify-center">
        <form
          className="w-full m-auto bg-white lg:max-w-lg mx-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl ">
                <CustomImage path="/logo.svg" className="w-28 lg:w-32" />
              </CardTitle>
              <CardDescription className="text-2xl font-bold my-3">
                Ravi de vous revoir
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">
                  Email <span className="text-red-500 text-[.7rem]">*</span>
                </Label>
                <Input
                  {...register("email", { required: true })}
                  id="email"
                  type="email"
                  placeholder=""
                />
                {errors.email && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">
                  Mot de passe{" "}
                  <span className="text-red-500 text-[.7rem]">*</span>
                </Label>
                <PasswordInput {...register("password")} id="password" />
                {errors.password && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Se souvenir de moi
                </label>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col">
              {isPending ? (
                <ButtonLoading />
              ) : (
                <Button type="submit" className="w-full text-white">
                  Se connecter
                </Button>
              )}
              <p className="mt-2 text-xs text-center text-gray-700">
                {"  Vous n'avez pas encore de compte ? "}
                <Link
                  href={"/sign-up"}
                  className=" text-primary hover:underline"
                >
                  Créez-en un ici.
                </Link>
              </p>
            </CardFooter>

            <div className="relative mb-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center my-4 mb-8 text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1  smm:grid-cols-2 gap-6 my-4 m-2">
              <Button
                type="button"
                onClick={googleAuthFoo}
                variant="outline"
                className="p-3 flex gap-3"
              >
                <BsGoogle className="mr-2 h-4  w-4 text-red" />
                <span>Continuer avec Google</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={facebookLogin}
                className="p-3 text-white bg-blue-800  flex gap-3"
              >
                <FaFacebookF />
                <span>Continuer avec Facbook</span>
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </>
  );
}
