import { Category } from "../../../category/interfaces/category";
import { EditMenuDTO } from "../../interfaces/edit-menu-dto";

export interface FormProps {
  initialValue?: EditMenuDTO;
  createOrEditOnSubmit: (formValue: FormValue) => Promise<void>;
}

export interface FormValue {
  id?: string;
  name: string;
  price: number;
  images: string[];
  category: any;
}
