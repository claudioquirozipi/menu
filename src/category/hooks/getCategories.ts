import { Dispatch, SetStateAction } from "react";

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Category } from "../interfaces/category";

export async function getCategories(
  setCategory: Dispatch<SetStateAction<Category[]>>
) {
  const supabase = useSupabaseClient();
  const { data, error } = await supabase.from("category").select("*");
  if (data) setCategory(data);
}
