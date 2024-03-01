import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { axiosAuth, axiosNoAuth } from "./axios";

export interface RequestRetturn<W> {
  status: string;
  message?: string;
  data: W;
}
/**
 * Une fonction pour effectuer n'importe quel type de requête avec l'instance Axios.
 */
type U = {};
// export async function makeRequest<T>(
//   url: string,
//   options: AxiosRequestConfig
// ): Promise<T> {
//   return axiosAuth(url, options)
//     .then((res: AxiosResponse) => {
//       if (res.data.status.toLocaleLowerCase() === "error") {
//         console.log("status: " + res);
//         return Promise.reject(res);
//       }
//       const data = res.data;
//       // TODO à supprimer
//       console.log("data : ", data, url);
//       return data;
//     })
//     .catch((err: AxiosError) => {
//       console.log("erreur : ", err);
//       return Promise.reject({ message: err.message });
//     });
// }

// /**
//  * Une fonction pour effectuer n'importe quel type de requête avec l'instance Axios.
//  */
export async function makeSucureRequest<T=any>(
  url: string,
  options: AxiosRequestConfig
): Promise<T> {
  return axiosAuth(url, options)
    .then((res: AxiosResponse<RequestRetturn<T>>) => {
      if (res.data.status.toLocaleLowerCase() === "error") {
        console.log("status: " + res);
        return Promise.reject(res);
      }
      const data = res.data.data;
      // TODO à supprimer
      console.log("data : ", data, url);
      return data;
    })
    .catch((err: AxiosError) => {
      console.log("erreur  ", err.message);
      return Promise.reject({ message: err.message });
    });
}
