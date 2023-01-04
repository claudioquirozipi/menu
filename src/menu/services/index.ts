import axios from "axios";
import { Menu } from "../interfaces/menu";

const baseUrl = `http://localhost:3004/menu`;
export const munuService = {
  menuList: axios.get<Menu[]>(baseUrl),
};
