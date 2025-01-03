import { makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function getAllProducts<Z>() {
  return makeSucureRequest<Z>(URLS.PRODUCTS.GET, {
    method: "GET",
  });
}

export async function getAllCategories<Z>() {
  return makeSucureRequest<Z>(URLS.CATEGORIES.GET, {
    method: "GET",
  });
}

export async function getAllGroupes<Z>() {
  return makeSucureRequest<Z>(URLS.GROUPS.GET, {
    method: "GET",
  });
}

export async function getGroudById<Z>(groupeId: string | null) {
  if (groupeId === null) {
    console.log("err");

    throw new Error("Invalid groud id provided!");
  }
  console.log("passed");
  return makeSucureRequest<Z>(URLS.GROUPS.ID(groupeId), {
    method: "GET",
  });
}

export async function getProductById<Z>(groupeId: string | null) {
  if (groupeId === null) {
    console.log("err");

    throw new Error("Invalid groud id provided!");
  }
  console.log("passed");
  return makeSucureRequest<Z>(URLS.GROUPS.ID(groupeId), {
    method: "GET",
  });
}

export async function getUserProductQuantites<Z>(groupeId: string) {
  return makeSucureRequest<Z>(URLS.GROUPS.PRODUCT_Quant(groupeId), {
    method: "GET",
  });
}

export async function getProductsQuantities<Z>() {
  return makeSucureRequest<Z>(URLS.GROUPS.PRODUCT_Quant_ALL, {
    method: "GET",
  });
}

export async function joinAGroup<Z>({
  groupeId,
  offerId,
  quantity,
}: {
  groupeId: string;
  offerId: string;
  quantity: number;
}) {
  return makeSucureRequest<Z>(URLS.GROUPS.JOIN(groupeId), {
    method: "POST",
    data: { offerId, quantity },
  });
}

export async function createAGroup<Z>(offer_id: string) {
  return makeSucureRequest<Z>(URLS.GROUPS.GET, {
    method: "POST",
    data: { offer_id },
  });
}

export async function updateProductQuantity<Z>({
  groupeId,
  offerId,
  quantity,
}: {
  groupeId: string;
  offerId: string;
  quantity: number;
}) {
  return makeSucureRequest<Z>(URLS.GROUPS.JOIN(groupeId), {
    method: "PATCH",
    data: { offerId, quantity },
  });
}

export async function leaveAgroup<Z>({ groupeId }: { groupeId: string }) {
  return makeSucureRequest<Z>(URLS.GROUPS.JOIN(groupeId), {
    method: "DELETE",
  });
}

export async function searchProduct<Z>(params: any) {
  return makeSucureRequest<Z>(URLS.PRODUCTS.SEARCH, {
    method: "GET",
    params,
  });
}

export async function searchProductByName<Z>(params: any) {
  return makeSucureRequest<Z>(URLS.PRODUCTS.SEARCH_BY_NAME, {
    method: "GET",
    params,
  });
}
