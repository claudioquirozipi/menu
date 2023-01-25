import { Category } from "../../category/interfaces/category";
import { Image } from "../../image/interfaces/image";

export interface CreateMenuDTO {
  name: string;
  price: number;
  images: string[];
  category: Category[];
}
