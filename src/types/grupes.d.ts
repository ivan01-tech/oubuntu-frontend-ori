import { UserTypes } from "./users";

interface Offer {
  _id: string;
  product_id: Product;
  author_id: string;
  discount_price:number;
  price:number;
  description: string;
  created_at: string;
}

interface Group {
  _id: string;
  offers: Offer[];
  author_id: string;
  expired_at: string;
  members: UserTypes[];
  link: string;
}
