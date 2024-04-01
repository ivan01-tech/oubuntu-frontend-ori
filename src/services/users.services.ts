import { makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function createUser(data: Object) {
  return makeSucureRequest(URLS.USERS.CREATE, {
    data,
    method: "POST",
  });
}

export async function createUserAndLogin<T = any>(data: Object) {
  return makeSucureRequest<T>(URLS.USERS.CREATE_LOGIN, {
    data,
    method: "POST",
  });
}

export async function logoutUser() {
  return makeSucureRequest(URLS.AUTH.LOGOUT, {
    method: "GET",
  });
}

export async function loginUser<T>(data: Object) {
  return makeSucureRequest<T>(URLS.AUTH.LOGIN, {
    data,
    method: "POST",
  });
}

export async function getAllGroupsByUser<T>() {
  return makeSucureRequest<T>(URLS.GROUPS.GET_ALL_USERS_GROUPS, {
    method: "GET",
  });
}

export async function getAllUserProductQty<T>() {
  return makeSucureRequest<T>(URLS.GROUPS.GET_ALL_USERS_QTY, {
    method: "GET",
  });
}

export async function getAllUserProductQtyWithUserDetails<T>() {
  return makeSucureRequest<T>(URLS.GROUPS.GET_ALL_USERS_QTY_WITH_DETAILS, {
    method: "GET",
  });
}

export async function getAllOffers<T>() {
  return makeSucureRequest<T>(URLS.OFFERS.index, {
    method: "GET",
  });
}

export async function getUserStatus<T>() {
  return makeSucureRequest<T>(URLS.AUTH.GET_STATUS, {
    method: "GET",
  });
}

export async function getStatusForGoogleLogin<T>() {
  return makeSucureRequest<T>(URLS.AUTH.GET_STATUS_GOOGLE, {
    method: "GET",
  });
}
