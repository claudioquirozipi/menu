import { Category } from "../../category/interfaces/category";

export interface CreateMenuDTO {
  name: string;
  price: number;
  images: string[];
  category: Category[];
}
