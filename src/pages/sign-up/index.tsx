"use client";
import { BsGoogle } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { FaFacebookF } from "react-icons/fa";
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
import { UserSignUpType, UserSignUp } from "@/model/UserSingUp";
import { useMutation } from "@tanstack/react-query";
import {
  createUser,
  createUserAndLogin,
  loginUser,
} from "@/services/users.services";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ButtonLoading } from "@/components/ui/LoadingBtn";
import Image from "next/image";
import { useUser } from "@/hooks/useUser";
import { UserTypes } from "@/types/users";

export default function SingUpAccount() {
  const { setUser } = useUser()!;

  // state

  const [phone, setPhone] = useState("");
  const router = useRouter();
  // Mutations
  const {
    mutate,
    isError,
    isSuccess,
    isPending,
    error,
    data: dataSingUp,
  } = useMutation({
    mutationFn: createUserAndLogin<UserTypes>,
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      toast.error("Something went wrong !  please try again");
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<UserSignUpType>({
    resolver: zodResolver(UserSignUp),
  });

  const handlerSubmitHelper = async (user: UserSignUpType) => {
    console.log("first form submission : ", user);
    await mutate(user);
  };

  const onSubmit: SubmitHandler<UserSignUpType> = (user) => {
    console.log("first form  : ", user);
    handlerSubmitHelper(user);
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

  // TODO create a route for sign up and login
  useEffect(
    function () {
      if (!isSuccess) {
        setUser(null);
        toast.error("Something went wrong !");

        return;
      }

      console.log("Main layout data : ", isSuccess, dataSingUp);
      setUser(dataSingUp);
      toast.success("success!");
      router.push("/");
    },
    [isSuccess, dataSingUp, router, setUser]
  );

  // TODO create a route for sign up and login
  useEffect(
    function () {
      if (!isError) return;

      toast.error(error.message);
    },
    [error, isError]
  );

  return (
    <>
      <div className="min-h-screen flex rounded-lg border bg-card  justify-center w-full">
        <Card className="flex w-full max-w-[900px] my-10">
          <div className="w-1/2 hidden md:flex flex-col justify-between">
            <Image
              src={"/images/545f9803-854b-4e4f-bbbb-895b94beb375.jpeg"}
              width={1080}
              height={720}
              className="w-full h-full object-cover"
              alt="image"
            />
          </div>

          <form
            className=" m-auto bg-white lg:max-w-lg mx-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl text-center">
                Créer votre compte Oubuntu
              </CardTitle>
              <CardDescription className="text-center">
                Entrez vos informations personelles
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-6 my-4">
                <div className="grid gap-2">
                  <Label htmlFor="first_name">
                    Nom <span className="text-red-500 text-[.7rem]">*</span>
                  </Label>
                  <Input
                    {...register("first_name", { required: true })}
                    id="first_name"
                    type="text"
                    placeholder=""
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="last_name">
                    Prénom <span className="text-red-500 text-[.7rem]">*</span>
                  </Label>
                  <Input
                    {...register("last_name", { required: true })}
                    id="last_name"
                    type="text"
                    placeholder=""
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-[.7rem]">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
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
                  Password <span className="text-red-500 text-[.7rem]">*</span>
                </Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                />
                {errors.password && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password_confirm">
                  Confirmer le mot de passe
                </Label>
                <Input
                  {...register("confirm_password")}
                  id="password_confirm"
                  type="password"
                />
                {errors.confirm_password && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>

              {/* <div className="grid gap-2">
                <Label htmlFor="phone_number">
                  Numéro de téléphone{" "}
                  <span className="text-red-500 text-[.7rem]">*</span>
                </Label>
                <PhoneInput
                  defaultCountry="cm"
                  onChange={(phone, { country }) => {
                    setPhone(phone);
                    // TODO set the country_code
                    setValue("country_code", country.iso2.toUpperCase());
                    setValue("phone_number", phone);
                  }}
                  className="outline-none border-none"
                  value={phone}
                />

                {errors.phone_number && (
                  <p className="text-red-500 text-[.7rem]">
                    {errors.phone_number.message}
                  </p>
                )}
              </div> */}

              {/* <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div> */}
            </CardContent>
            <CardFooter className="flex flex-col">
              {isPending ? (
                <ButtonLoading />
              ) : (
                <Button
                  type="submit"
                  className="w-full max-w-[400px] p-4 font-bold text-white "
                >
                  Créer le compte
                </Button>
              )}
              <p className="mt-2 text-xs text-center text-gray-700">
                {"  Vous avez deja un compte ? "}
                <Link
                  href={"/sign-in"}
                  className=" text-primary hover:underline"
                >
                  Connecter vous ici
                </Link>
              </p>
            </CardFooter>

            <div className="relative mb-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center my-4 mb-8 text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Ou Continuer
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
          </form>
        </Card>
      </div>
    </>
  );
}
