import axios from "axios";
import Cookies from "js-cookie";

const NEXT_APP_BACKEND_URI = process.env.NEXT_PUBLIC_BACKEND_URI;
// Instance Axios pour les requêtes authentifiées
export const axiosAuth = axios.create({
  baseURL: NEXT_APP_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

// Instance Axios pour les requêtes non authentifiées
export const axiosNoAuth = axios.create({
  baseURL: NEXT_APP_BACKEND_URI,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// // Intercepteur pour les requêtes authentifiées
// axiosAuth.interceptors.request.use(
//   (config) => {
//     // Ajouter des en-têtes d'authentification, par exemple
//     // config.headers['Authorization'] = `Bearer ${yourAuthToken}`;
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Intercepteur pour les réponses authentifiées
// axiosAuth.interceptors.response.use(
//   (response) => {
//     // Traiter les réponses authentifiées ici
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Intercepteur pour les requêtes non authentifiées
// axiosNoAuth.interceptors.request.use(
//   (config) => {
//     // Ajouter des configurations spécifiques pour les requêtes non authentifiées
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Intercepteur pour les réponses non authentifiées
// axiosNoAuth.interceptors.response.use(
//   (response) => {
//     // Traiter les réponses non authentifiées ici
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default { axiosAuth, axiosNoAuth };
