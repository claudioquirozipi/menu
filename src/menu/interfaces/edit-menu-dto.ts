import { Category } from "../../category/interfaces/category";

export interface EditMenuDTO {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: any;
}
