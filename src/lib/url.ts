export const URLS = {
  USERS: {
    CREATE: "/users",
    CREATE_LOGIN: "/users/createAndLogin",
  },
  AUTH: {
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    GET_STATUS: "/auth/status",
    GET_STATUS_GOOGLE: "/auth/google/success",
  },
  PRODUCTS: {
    GET: "/products",
    SEARCH: "/products/search",
    SEARCH_BY_NAME: "/products/search/name",
  },

  CATEGORIES: {
    GET: "/categories",
  },

  GROUPS: {
    GET_ALL_USERS_QTY: "/groups/getUserProductQuantityGroupes",
    GET_ALL_USERS_QTY_WITH_DETAILS: "/groups/getAllProductQty",
    GET: "/groups",
    GET_ALL_USERS_GROUPS: "/groups/getAllGroupsByUser",
    JOIN: (id: string) => "/groups/" + id + "/groupMenbers",
    ID: (id: string) => "/groups/" + id,
    PRODUCT_Quant: (id: string) => "/groups/" + id + "/productsQuantities/",
    PRODUCT_Quant_ALL: "/groups/getProductsQuantities/",
  },
  OFFERS: {
    index: "/offers",
  },
};
// const OUBUNTU_BACKEND_URI_GRP = `${
//   process.env.OUBUNTU_BACKEND_URI as string
// }/groups`;

// const link = `${OUBUNTU_BACKEND_URI_GRP}/${this._id}/groupMenbers`;
