import { Category } from "../../category/interfaces/category";
import { Image } from "../../image/interfaces/image";

export interface Menu {
  id: string;
  name: string;
  image: Image[];
  category: Category[];
}
