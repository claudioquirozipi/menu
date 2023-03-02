import { Category } from "../../category/interfaces/category";
// import { Image } from "../../image/interfaces/image";

export interface Menu {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: Category[];
}

export type MenuType = "name" | "price" | "images" | "category";
