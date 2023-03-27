// import { useQuery } from "react-query/types/react/useQuery";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

import { Menu } from "../interfaces/menu";

export function useMenuList() {
  const supabase = useSupabaseClient();
  const [menu, setMenu] = useState<Menu[]>([]);
  const [menuError, setMenuError] = useState<any>(null);
  const [menuLoading, setMenuLoading] = useState(false);

  async function initialize() {
    setMenuLoading(true);

    const { data, error } = await supabase
      .from("menu")
      .select("*, category ( * )");

    if (data) {
      setMenu(data);
    }
    setMenuError(error);
    setMenuLoading(false);
  }
  useEffect(() => {
    initialize();
  }, []);

  return {
    menu,
    menuError,
    menuLoading,
  };
}
