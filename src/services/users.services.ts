import { makeRequest, makeSucureRequest } from "@/lib/makeRequest";
import { URLS } from "@/lib/url";

export async function createUser(data: Object) {
  return makeRequest(URLS.USERS.CREATE, {
    data,
    method: "POST",
  });
}



export async function createUserAndLogin(data: Object) {
  return makeRequest(URLS.USERS.CREATE_LOGIN, {
    data,
    method: "POST",
  });
}

export async function loginUser(data: Object) {
  return makeRequest(URLS.AUTH.LOGIN, {
    data,
    method: "POST",
  });
}

export async function getUserStatus() {
  return makeSucureRequest(URLS.AUTH.GET_STATUS, {
    method: "GET",
  });
}


export async function getStatusForGoogleLogin() {
  return makeSucureRequest(URLS.AUTH.GET_STATUS_GOOGLE, {
    method: "GET",
  });
}
