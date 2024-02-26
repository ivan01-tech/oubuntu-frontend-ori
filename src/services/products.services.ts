import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

// export async function createUser(data: Object) {
//   return makeRequest(URLS.USERS.CREATE, {
//     data,
//     method: "POST",
//   });
// }

// export async function loginUser(data: Object) {
//   return makeRequest(URLS.AUTH.LOGIN, {
//     data,
//     method: "POST",
//   });
// }

export async function getAllProducts() {
  return makeSucureRequest(URLS.PRODUCTS.GET, {
    method: "GET",
  });
}
