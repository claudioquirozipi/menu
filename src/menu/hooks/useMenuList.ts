// import { useQuery } from "react-query/types/react/useQuery";

import { useQuery } from "@tanstack/react-query";
import { munuService } from "../services";

export function useMenuList() {
  const { data, error, isLoading } = useQuery(
    ["menu"],
    () => munuService.menuList
  );
  return {
    menus: data?.data,
    menuError: error,
    menuIsLoading: isLoading,
  };
}
