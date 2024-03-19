interface Product {
  _id: string;
  name: string;
  price: number;
  discount_price: string;
  image_ext: string;
  category_id: Category;
}
interface Category {
  _id: string;
  name: string;
  link: string | null;
  image_ext: string;
}
