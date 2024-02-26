import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosAuth, axiosNoAuth } from "./axios";
import { RequestReturnLogin,  } from "@/types/users";

export interface RequestRetturn {
  status: string;
  data: any;
}
/**
 * Une fonction pour effectuer n'importe quel type de requête avec l'instance Axios.
 */
export async function makeRequest<T extends RequestReturnLogin>(
  url: string,
  options: AxiosRequestConfig
): Promise<T> {
  return axiosAuth(url, options)
    .then((res: AxiosResponse<T>) => {
      if (res.data.status.toLocaleLowerCase() === "error") {
        console.log("status: " + res);
        return Promise.reject(res);
      }
      const data = res.data;
      // TODO à supprimer
      console.log("data : ", data, url);
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("erreur : ", err);
      return Promise.reject({ message: err.message });
    });
}

/**
 * Une fonction pour effectuer n'importe quel type de requête avec l'instance Axios.
 */
export async function makeSucureRequest<T extends RequestRetturn>(
  url: string,
  options: AxiosRequestConfig
): Promise<T> {
  return axiosAuth(url, options)
    .then((res: AxiosResponse<T>) => {
      // if (res.data.status.toLocaleLowerCase() === "error") {
      //   console.log("status: " + res);
      //   return Promise.reject(res);
      // }
      const data = res.data;
      // TODO à supprimer
      console.log("data : ", data, url);
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("erreur  ", err.message);
      return Promise.reject({ message: err.message });
    });
}
