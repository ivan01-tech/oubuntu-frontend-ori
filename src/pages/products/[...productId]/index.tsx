// import MainLayout from "@/components/layouts/MainLayout";
// import OubuntuComponent from "@/components/pages/HomePage/OubuntuComponent";
// import CustomImage from "@/components/ui/image";
// import { Progress } from "@/components/ui/progress";
// import { queryClient } from "@/pages/_app";
// import {
//   getGroudById,
//   getProductById,
//   getUserProductQuantites,
//   joinAGroup,
// } from "@/services/products.services";
// import { Group, ProductQuantityGroup } from "@/types/grupes";
// import { Avatar } from "@chakra-ui/react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { Group } from "lucide-react";
// import { usePathname } from "next/navigation";
// import { useRouter } from "next/router";

// import React, { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// type Props = {};

// function ProductDeatilsPage({}: Props) {
//   const {
//     isError,
//     isPending,
//     isLoading,
//     isFetching,
//     data: group,
//     error,
//     isSuccess,
//   } = useQuery({
//     queryKey: ["getGroup"],
//     queryFn: () => getProductById<Group>(path),
//   });

//   const {
//     isError: isErrU,
//     isPending: isPenU,
//     data: dataU,
//     error: errU,
//     mutateAsync,
//     isSuccess: isSuU,
//   } = useMutation({
//     mutationKey: ["getUserProductQuantites"],
//     mutationFn: getUserProductQuantites<ProductQuantityGroup[]>,
//   });
//   //
//   const [selectedOffer, setSelectedOffer] = useState(group?.offers[0]);
//   //

//   group?.offers.forEach((offer) => {
//     initialQuantities[offer._id] = 1;
//   });
//   // État local pour stocker les quantités choisies par l'utilisateur pour chaque offre
//   const [quantities, setQuantities] =
//     useState<QuantityState>(initialQuantities);

//   // Fonction pour mettre à jour la quantité choisie pour une offre donnée
//   const handleQuantityChange = (offerId: string, quantity: number) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [offerId]: quantity,
//     }));
//   };
//   // Mutations
//   const pathname = usePathname()?.split("/");
//   const router = useRouter();
//   const path = pathname ? pathname[pathname?.length - 1] : null;

//   const {
//     mutate,
//     isError: iserrJ,
//     error: errJ,
//     isSuccess: issucJ,
//     isPending: ispenJ,
//   } = useMutation({
//     mutationKey: ["joinGroup"],
//     mutationFn: joinAGroup<Group>,
//   });

//   //
//   const totalCommand =
//     dataU && dataU.length >= 0
//       ? dataU?.reduce((prev, curr) => prev + curr.quantity!, 0)
//       : 0;
//   // to join a group
//   const joinGroupHnadler = () => {
//     if (!user) {
//       toast.error("Vous devez etre connecter pour integrer un groupe");
//       return router.push("/sign-in");
//     }
//     if (!group?._id || !selectedOffer?._id) {
//       return toast.error("L'id du groupe ou de l'offre est requise");
//     }

//     mutate({
//       groupeId: group?._id,
//       offerId: selectedOffer?._id!,
//       quantity: quantities[selectedOffer?._id!],
//     });
//   };
//   //
//   const changeSelectedOfferHandler = (offerId: string) => {
//     setSelectedOffer(group?.offers.find((offer) => offer._id === offerId)!);
//   };
//   const handleIncrement = (offerId: string) => {
//     if (selectedOffer?.product_quantity) {
//       setQuantities((prevQuantities) => ({
//         ...prevQuantities,
//         [offerId]: Math.min(
//           (prevQuantities[offerId] || 0) + 1,
//           selectedOffer?.product_quantity! - totalCommand!
//         ),
//       }));
//     }
//   };

//   const handleDecrement = (offerId: string) => {
//     setQuantities((prevQuantities) => ({
//       ...prevQuantities,
//       [offerId]: Math.max((prevQuantities[offerId] || 0) - 1, 1),
//     }));
//   };

//   useEffect(() => {
//     if (!path) {
//       queryClient.invalidateQueries({
//         queryKey: ["getGroup"],
//       });
//     }
//   }, [path]);

//   useEffect(() => {
//     if (isError) {
//       console.log("error : ");
//       toast.error(error.message);

//       return router.back();
//     }
//   }, [error, isError, router]);

//   useEffect(() => {
//     if (iserrJ) {
//       toast.error(errJ.message);

//       return;
//     }
//   }, [errJ, iserrJ]);

//   useEffect(() => {
//     if (issucJ) {
//       toast.success("Successfully joined the group");
//       router.refresh();
//     }
//   }, [iserrJ, issucJ, router]);

//   useEffect(() => {
//     if (isSuccess) {
//       setSelectedOffer(group.offers[0]);
//       toast.success("Successfully loaded the group!");
//       const initial: QuantityState = {};
//       group?.offers.forEach((offer) => {
//         initialQuantities[offer._id] = 1;
//       });
//       setQuantities(initial);
//     }
//   }, [group, isSuccess]);

//   // fetch user data
//   useEffect(() => {
//     (async () => {
//       if (isSuccess && group?._id) {
//         mutateAsync(group._id)
//           .then((res) => {
//             toast.success("Successfully loaded group members");
//           })
//           .catch((err) => {
//             errU &&
//               toast.error(
//                 errU?.name + errU?.message || "Something went wrong!   "
//               );
//           });
//       }
//     })();
//   }, [errU, group, isSuccess, mutateAsync]);

//   if (isPending || isLoading || isFetching) {
//     return (
//       <div
//         id="loading-basic-example"
//         className="h-screen gap-4 flex justify-center items-center w-full"
//       >
//         <div
//           data-te-loading-management-init
//           className="flex flex-col gap-4 items-center"
//           data-te-parent-selector="#loading-basic-example"
//         >
//           <div
//             data-te-loading-icon-ref
//             className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
//             role="status"
//           ></div>
//           <span data-te-loading-text-ref>Please wait a moment...</span>
//         </div>
//       </div>
//     );
//   }
//   if (!group || !selectedOffer) {
//     return (
//       <div
//         id="loading-basic-example"
//         className="h-screen gap-4 flex justify-center items-center w-full"
//       >
//         <div
//           data-te-loading-management-init
//           className="flex flex-col gap-4 items-center"
//           data-te-parent-selector="#loading-basic-example"
//         >
//           <h2 data-te-loading-text-ref>Quelque chose s'est mal passée</h2>
//         </div>
//       </div>
//     );
//   }
//   return (
//     <MainLayout className="">
//       <div className="flex flex-col lg:p-8 p-4">
//         <div className="font-[sans-serif] bg-white">
//           <div className="p-6 lg:max-w-7xl max-w-4xl mx-auto">
//             <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12  p-6">
//               <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
//                 <CustomImage
//                   path="/images/products/10.jpg"
//                   className="w-4/5 rounded object-cover"
//                 />

//                 <div className="mt-6 flex flex-wrap justify-center gap-6 mx-auto">
//                   <div className="rounded-xl p-4  hover:border-gray-800 border-2">
//                     <CustomImage
//                       path="/images/products/10.jpg"
//                       className="w-24 cursor-pointer hover:border-gray-800 border-2"
//                     />
//                   </div>
//                   <div className="rounded-xl p-4  hover:border-gray-800 border-2">
//                     <CustomImage
//                       path="/images/products/10.jpg"
//                       className="w-24 cursor-pointer hover:border-gray-800 border-2"
//                     />
//                   </div>
//                   <div className="rounded-xl p-4  hover:border-gray-800 border-2">
//                     <CustomImage
//                       path="/images/products/10.jpg"
//                       className="w-24 cursor-pointer hover:border-gray-800 border-2"
//                     />
//                   </div>
//                   <div className="rounded-xl p-4  hover:border-gray-800 border-2">
//                     <CustomImage
//                       path="/images/products/10.jpg"
//                       className="w-24 cursor-pointer "
//                     />
//                   </div>
//                 </div>
//               </div>
//               <div className="lg:col-span-2">
//                 <h2 className="text-2xl font-extrabold text-[#333]">
//                   SunCo 1 litre | Jus de fruits
//                 </h2>
//                 <div className="flex flex-wrap gap-4 mt-6">
//                   <p className="text-[#333] text-4xl font-bold">XAF 1200</p>
//                   <p className="text-gray-400 text-xl">
//                     <p className="flex space-x-1 px-2 pb-4">
//                       <p className=" flex my-auto text-xs line-through opacity-60 ">
//                         {" "}
//                         1300 XAF{" "}
//                       </p>
//                       <p className="font-bold text-red-600 "> {"0.4"}% </p>
//                     </p>
//                   </p>
//                 </div>
//                 <div
//                   className={`p-1 text-white rounded-r-full flex w-2/3 my-3  truncate XAF {
//                     [
//                       "bg-primary",
//                       "bg-yellow-700",
//                       "bg-red-700",
//                       "bg-indigo-800",
//                     ][Math.floor(Math.random() * 4)]
//                   }`}
//                 >
//                   <p> {"Fruit"}</p>
//                 </div>

//                 <div className="mt-14 h-full rounded-lg border bg-white p-6 shadow-md w-full">
//                   <div className="flex justify-between my-3">
//                     <p className="text-gray-700">Quantité</p>
//                     <div className="flex items-center border-gray-100">
//                       <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-primary hover:text-white">
//                         {" "}
//                         -{" "}
//                       </span>
//                       <input
//                         className="h-8 w-8 border bg-white text-center text-xs outline-none"
//                         type="number"
//                         value="2"
//                         min="1"
//                       />
//                       <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-primary hover:text-white">
//                         {" "}
//                         +{" "}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mb-2 flex justify-between">
//                     <p className="text-gray-700">Prix</p>
//                     <p className="text-gray-700">XAF 129.99</p>
//                   </div>

//                   <hr className="my-4" />
//                   <div className="flex justify-between">
//                     <p className="text-lg font-bold">Total</p>
//                     <div className="">
//                       <p className="mb-1 text-lg font-bold">XAF 134.98 </p>
//                     </div>
//                   </div>
//                   <div className="flex flex-wrap justify-center gap-4 mt-10">
//                     <button
//                       type="button"
//                       className="min-w-[200px] px-4 py-3 bg-primary hover:bg-primary/80 text-white text-sm font-bold rounded w-full max-w-[350px] m-auto mt-3"
//                     >
//                       Ajouter au panier
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* <div className="mt-16  p-6">
//               <h3 className="text-lg font-bold text-[#333]">
//                 Product information
//               </h3>
//               <ul className="mt-6 space-y-6 text-[#333]">
//                 <li className="text-sm">
//                   TYPE <span className="ml-4 float-right">LAPTOP</span>
//                 </li>
//                 <li className="text-sm">
//                   RAM <span className="ml-4 float-right">16 BG</span>
//                 </li>
//                 <li className="text-sm">
//                   SSD <span className="ml-4 float-right">1000 BG</span>
//                 </li>
//                 <li className="text-sm">
//                   PROCESSOR TYPE{" "}
//                   <span className="ml-4 float-right">INTEL CORE I7-12700H</span>
//                 </li>
//                 <li className="text-sm">
//                   PROCESSOR SPEED{" "}
//                   <span className="ml-4 float-right">2.3 - 4.7 GHz</span>
//                 </li>
//                 <li className="text-sm">
//                   DISPLAY SIZE INCH{" "}
//                   <span className="ml-4 float-right">16.0</span>
//                 </li>
//                 <li className="text-sm">
//                   DISPLAY SIZE SM{" "}
//                   <span className="ml-4 float-right">40.64 cm</span>
//                 </li>
//                 <li className="text-sm">
//                   DISPLAY TYPE{" "}
//                   <span className="ml-4 float-right">
//                     OLED, TOUCHSCREEN, 120 Hz
//                   </span>
//                 </li>
//                 <li className="text-sm">
//                   DISPLAY RESOLUTION{" "}
//                   <span className="ml-4 float-right">2880x1620</span>
//                 </li>
//               </ul>
//             </div> */}
//             <div className="mt-16  p-6">
//               <div className="flex justify-between">
//                 <div className="flex flex-col ">
//                   <p className="text-lg font-bold opacity-90">
//                     {" "}
//                     Objectif: 300kg pour 10% de reduction{" "}
//                   </p>
//                   <p className=" text-md  font-display opacity-90">
//                     {" "}
//                     3200 XAF{" "}
//                   </p>
//                   <p className="text-sm text-red-600"> 20kg restants </p>
//                 </div>
//                 <div className="flex flex-col space-y-2">
//                   <p className="flex justify-end text-right text-xs opacity-70">
//                     {" "}
//                     Douala{" "}
//                   </p>
//                   <div className="flex space-x-1">
//                     <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
//                       05h
//                     </div>

//                     <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
//                       34m
//                     </div>

//                     <div className="p-1 w-8 h-8 text-xs flex justify-center items-center bg-red-500 text-white">
//                       54s
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-2 gap-12 mt-6">
//                 <div>
//                   <div className="space-y-3">
//                     <div className="flex items-center gap-6">
//                       <div className="text-sm text-[#333] flex gap-3 font-bold">
//                         <p>Progression</p>

//                         <p className="font-bold text-red-600 "> {"0.4"}% </p>
//                       </div>
//                       <Progress value={50} className="max-w-[400px]" />
//                     </div>
//                     <div className="flex flex-col gap-4">
//                       <div className="flex justify-between items-center">
//                         <Avatar
//                           name="Christian Nwamba"
//                           src="https://bit.ly/code-beast"
//                         />

//                         <p className="text-sm text-red-600"> 20kg </p>
//                       </div>

//                       <div className="flex justify-between items-center">
//                         <Avatar
//                           name="Prosper Otemuyiwa"
//                           src="https://bit.ly/prosper-baba"
//                         />

//                         <p className="text-sm text-red-600"> 20kg </p>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <Avatar
//                           name="Kent Dodds"
//                           src="https://bit.ly/kent-c-dodds"
//                         />

//                         <p className="text-sm text-red-600"> 20kg </p>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <Avatar
//                           name="Segun Adebayo"
//                           src="https://bit.ly/sage-adebayo"
//                         />

//                         <p className="text-sm text-red-600"> 20kg </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <OubuntuComponent />
//     </MainLayout>
//   );
// }

// export default ProductDeatilsPage;
