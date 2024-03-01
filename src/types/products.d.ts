interface Product {
  _id: string;
  name: string;
  price: number;
  discount_price: string;
  image_ext: string;
//   created_by: {
//     _id: string;
//     first_name: string;
//     email: string;
//     last_name: string;
//     roles: [string];
//     googleId: string;
//     facebookId: null;
//     picture: string;
//     created_at: string;
//     __v: 0;
//   };
  category_id: {
    _id: string;
    name: string;
    link: null;
    image_ext: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  created_at: string;
  __v: 0;
}
interface Category {
  _id: string;
  name: string;
  link: string | null;
  image_ext: string;
}
