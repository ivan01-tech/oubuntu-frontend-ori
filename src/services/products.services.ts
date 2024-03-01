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

export async function searchProduct<Z>(params: any) {
  return makeSucureRequest<Z>(URLS.PRODUCTS.SEARCH, {
    method: "GET",
    params,
  });
}
