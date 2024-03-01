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

export async function loginUser<T>(data: Object) {
  return makeSucureRequest<T>(URLS.AUTH.LOGIN, {
    data,
    method: "POST",
  });
}

export async function getUserStatus<T>() {
  return makeSucureRequest(URLS.AUTH.GET_STATUS, {
    method: "GET",
  });
}

export async function getStatusForGoogleLogin() {
  return makeSucureRequest(URLS.AUTH.GET_STATUS_GOOGLE, {
    method: "GET",
  });
}
