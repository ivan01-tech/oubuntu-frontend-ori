import { UserTypes } from "./users";

interface Offer {
  _id: string;
  product_id: Product;
  author_id: string;
  discount_price: number;
  product_quantity: number;
  price: number;
  name: string;
  description: string;
  created_at: string;
}

interface Group {
  _id: string;
  offer: Offer;
  author_id: string;
  expired_at: string;
  title: string;
  members: UserTypes[];
  link: string;
}

interface ProductQuantityGroup {
  _id: string;
  quantity: number;
  user_id: UserTypes;
}

interface ProductQuantity {
  _id: string;
  quantity: number;
  group_id: {
    _id: string;
    title: string;
    offer: {
      _id: string;
      product_id: {
        _id: string;
        name: string;
        price: number;
        discount_price: number;
        image_ext: string;
        created_by: string;
        category_id: string;
        created_at: string;
      };
      price: number;
      discount_price: number;
      product_quantity: number;
      author_id: string;
      description: string;
      created_at: string;
    };
    author_id: string;
    link: string;
    expired_at: string;
  };
  user_id: string;
  reserved_at: string;
  created_at: string;
}

interface ProductQuantityWithUserDetails {
  _id: string;
  quantity: number;
  group_id: {
    _id: string;
    title: string;
    offer: {
      _id: string;
      product_id: {
        _id: string;
        name: string;
        price: number;
        discount_price: number;
        image_ext: string;
        created_by: string;
        category_id: string;
        created_at: string;
      };
      price: number;
      discount_price: number;
      product_quantity: number;
      author_id: string;
      description: string;
      created_at: string;
    };
    author_id: string;
    link: string;
    expired_at: string;
  };
  user_id: UserTypes;
  reserved_at: string;
  created_at: string;
}
type ProductQuantityWithoutUser = Omit<ProductQuantity, "user_id">;
type SimpleProductQuantity = {
  _id: string;
  quantity: number;
  group_id: string;
  user_id: string;
};

type Offer = {
  _id: string;
  product_id: {
    _id: string;
    name: string;
    price: 2500;
    discount_price: 2300;
    image_ext: string;
    created_by: string;
    category_id: string;
    created_at: string;
  };
  price: number;
  discount_price: number;
  product_quantity: number;
  description: string;
  created_at: string;
};
